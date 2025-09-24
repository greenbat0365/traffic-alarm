import styles from "../styles/Calendar.module.css";

const CalendarFooter =({selectedDateStart,selectedDateEnd, selectedTime, setSelectedTime, handleSubmit }) => {
    return(
        <>
                {selectedDateStart && (
          <div className={styles.footer}>
            <input
              type="time"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            ></input>
            <p>
              {selectedTime} shift selected for {selectedDateStart} 
              {selectedDateEnd ? "-" + selectedDateEnd : null}
            </p>
            <button onClick={handleSubmit}>Submit</button>
          </div>
        )}
        </>
    )
}

export default CalendarFooter