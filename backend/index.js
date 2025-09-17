require("dotenv").config();
const express = require("express");
const cors = require("cors");
const schedule = require("node-schedule");
const { createClient } = require("@supabase/supabase-js");
const { Resend } = require("resend");
const { getUserEmail, getUserRoute, getTrafficTime, sendTrafficEmail } = require("./services");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

const supabaseUrl = process.env.SUPABASEURL;
const supabaseKey = process.env.SUPABASEKEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const supabaseAdmin = createClient(supabaseUrl, process.env.SUPABASE_SECRET_KEY);

const scheduledJobs = {};
const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/api/test", (req, res) => {
  console.log("Request received from client");
  res.json({ message: "Hello from server!" });
});

app.post("/api/schedule", async (req, res) => {
  const shifts = req.body;

  for (const shift of shifts) {
    const { date, time, user_id } = shift;
    const dateTime = new Date(time);
    const jobId = `${user_id}-${date}`;

    
    if (scheduledJobs[jobId]) {
      scheduledJobs[jobId].cancel();
    }

    
    scheduledJobs[jobId] = schedule.scheduleJob(dateTime, async () => {
      try {
        console.log(`Running scheduled job for ${jobId} at ${dateTime}`);
        
        const email = await getUserEmail(supabaseAdmin, user_id);
        const route = await getUserRoute(supabaseAdmin, user_id);
        const trafficTime = await getTrafficTime(route.start_location, route.end_location);
        
        await sendTrafficEmail(resend, email, trafficTime);
      } catch (error) {
        console.error(`Error in job ${jobId}:`, error);
      }
    });
  }

  res.json({ message: "Jobs scheduled successfully." });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
