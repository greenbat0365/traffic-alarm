import { useState, useEffect } from "react";

import Calendar from "./components/Calendar"
import Auth from "./components/Auth"
import Map from "./components/Map"
import Header from "./components/Header"
import auth from "./supabase/auth";

import supabase from "./supabase/supabase";

function App() {

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    auth.checkUser()
  }, []);


  return ( 
    <>
    {session? (<><Header /> <Calendar /> <Map /> </>): <Auth />}
      
    

    </>
  )
}

export default App
