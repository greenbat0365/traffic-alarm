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
