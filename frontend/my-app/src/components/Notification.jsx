import styles from "../styles/Notification.module.css"
import { useEffect, useState } from "react"

const Notification = ({message}) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (message) {
            setVisible(true)

            const timer = setTimeout(() => {
                setVisible(false)
            }, 5000)

            return () => clearTimeout(timer)
        }
    }, [message])

    if (!visible || !message) return null;

    return(
        <div className={styles.notification}>
            {message}
        </div>
    )
}

export default Notification