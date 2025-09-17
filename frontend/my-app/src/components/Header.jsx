import styles from "../styles/Header.module.css";
import auth from "../supabase/auth";

import { useState, useEffect } from "react";

const Header = () => {
    const [email, setEmail] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const userEmail = await auth.getEmail()
            setEmail(userEmail)
        }
        fetchData()

    },[])
/* const email = auth.getEmail() */
return (
<div className={styles.container}>
<h1>Traffic Alarm</h1>
    <button onClick={() => setIsOpen(!isOpen)} className={styles.greeting}>

     Hello, {email}
    {isOpen && <button onClick={() => auth.signOut()} className={styles.logout}>Logout</button>}
    </button>

    
    
</div>
)
}

export default Header;