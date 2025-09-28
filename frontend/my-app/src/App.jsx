import { useState, useEffect } from "react";

import Calendar from "./components/Calendar";
import Auth from "./components/Auth";
import Map from "./components/Map";
import Header from "./components/Header";
import auth from "./supabase/auth";
import MUINotification from "./components/NotificationMui";
import supabase from "./supabase/supabase";

function App() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifMessage, setNotifMessage] = useState("");
  const [notifSeverity, setNotifSeverity] = useState("");

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    auth.checkUser();
  }, []);

/*   useEffect(() => {
  if (session) {
    handleNotify("Logged in successfully!", "success");
  }
}, [session]); */


  const handleNotify = (msg, severity) => {
    setNotifMessage(msg);
    setNotifSeverity(severity);
    setNotifOpen(true);
  };

  return (
    <>
      
      <MUINotification
        open={notifOpen}
        message={notifMessage}
        severity={notifSeverity}
        onClose={() => setNotifOpen(false)}
      />

      {/* Conditionally render main content */}
      {session ? (
        <>
          <Header /* onNotify={handleNotify} */ />
          {session && (
  <div style={{
    backgroundColor: "#f0f4f8",
    border: "1px solid #ccc",
    padding: "15px",
    borderRadius: "8px",
    margin: "10px 20px",
    fontSize: "14px",
    lineHeight: "1.5"
  }}>
    <h3>How to Use the Traffic Alert App:</h3>
    <ol>
      <li>Select a date or range of dates.</li>
      <li>Select the shift timing for that date.</li>
      <li>Enter your route to your office, home, and office location, then click "Update Route".</li>
      <li>You will receive an email notification at the time you selected.</li>
    </ol>

    <strong>Note:</strong>
    <p>
      Currently, for testing, the traffic alert/email will be sent at the exact time of the shift.
      For example, if you selected today's date and shift time as 3:30 PM, the alert will be scheduled for 3:30 PM and you will receive it at that time.
    </p>

    <strong>For Testing:</strong>
    <p>
      Please schedule the alert a few minutes from now because the render webservice takes a while to spin up.
      For example, if the current time is 3:30 PM, do not schedule it for 3:31 PM. Please schedule for 3:35 PM instead.
    </p>
  </div>
)}
          <Calendar /* onNotify={handleNotify} */ />
          <Map /* onNotify={handleNotify} */ />
        </>
      ) : (
        <Auth onNotify={handleNotify} />
      )}
    </>
  );
}

export default App;
