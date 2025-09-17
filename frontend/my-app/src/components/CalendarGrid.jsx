import styles from "../styles/Calendar.module.css";
import { getDaysInMonth, getFirstDayOfMonth } from "../../utils/dateUtils";

const CalendarGrid = ({setHoveredDate, selectedDateStart, selectedDateEnd, setSelectedDateStart, setSelectedDateEnd, currentMonth, shifts, handleDelete, hoveredDate}) => {


  
  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);


  const handleMouseEnter = (i) => {
    if (selectedDateStart && !selectedDateEnd) {
      setHoveredDate(i);
    }
  };
  const handleDateClick = (i) => {
    if (!selectedDateStart) {
      setSelectedDateStart(i);
      setSelectedDateEnd(null);
    } else if (!selectedDateEnd && i > selectedDateStart) {
      setSelectedDateEnd(i);
    } else {
      setSelectedDateStart(null);
      setSelectedDateEnd(null);

      setHoveredDate(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredDate(null);
  };


  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`}></div>);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    let currentDate = `${currentMonth.getFullYear()}-${(
      currentMonth.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${i.toString().padStart(2, "0")}`;
    let dayClass = styles.date;
    if (i === selectedDateStart || i === selectedDateEnd) {
      dayClass += " " + styles.dateSelected;
    }
    if (
      selectedDateStart &&
      !selectedDateEnd &&
      i > selectedDateStart &&
      i <= hoveredDate
    ) {
      dayClass += " " + styles.dateSelecting;
    }

    if (
      selectedDateStart &&
      selectedDateEnd &&
      i > selectedDateStart &&
      i < selectedDateEnd
    ) {
      dayClass += ` ${styles.dateSelected}`;
    }

    days.push(
      <div
        key={`day-${i}`}
        className={`${dayClass}`}
        onClick={() => {
          handleDateClick(i);
        }}
        onMouseEnter={(e) => handleMouseEnter(i, e)}
        onMouseLeave={handleMouseLeave}
      >
        {i}
        {shifts[currentDate] && (
          <div className={styles["shift-time"]}>
            {shifts[currentDate]}
            <button
              onClick={(e) => handleDelete(e,currentDate)}
              className={styles["delete-button"]}
            >
              x
            </button>
          </div>
        )}
      </div>
    );
  }




    return (
      <>
      
      <div className={styles.weekday}>
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (day, index) => (
              <div key={index}>{day}</div>
            )
          )}
        </div>

        <div className={styles.dates}>{days}</div>
      </>
    )
  }

export default CalendarGrid

/*
days.push(<dayCell/>)
*/