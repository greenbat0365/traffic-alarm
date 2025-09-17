

const getUserEmail = async (supabaseAdmin, user_id) => {
  const { data: user, error } = await supabaseAdmin.auth.admin.getUserById(user_id);
  if (error || !user?.user?.email) {
    throw new Error("User email not found");
  }
  return user.user.email;
};

const getUserRoute = async (supabaseAdmin, user_id) => {
  const { data, error } = await supabaseAdmin
    .from("routes")
    .select("*")
    .eq("user_id", user_id)
    .single();

  if (error || !data) {
    throw new Error("Route data not found");
  }

  return data;
};

const getTrafficTime = async (start, end) => {
  const googleApiKey = process.env.GOOGLE_API_KEY;
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(start)}&destinations=${encodeURIComponent(end)}&departure_time=now&key=${googleApiKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const traffic = data.rows?.[0]?.elements?.[0]?.duration_in_traffic?.text;

  if (!traffic) {
    throw new Error("Traffic data not available");
  }

  return traffic;
};

const sendTrafficEmail = async (resend, email, traffic) => {
  const { error } = await resend.emails.send({
    from: "TrafficAlarm <onboarding@resend.dev>",
    to: [email],
    subject: "Traffic Alert",
    html: `<strong>The traffic/travel time on your route is currently ${traffic}</strong>`,
  });

  if (error) {
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = {
  getUserEmail,
  getUserRoute,
  getTrafficTime,
  sendTrafficEmail,
};
