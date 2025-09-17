

const CalendarHeader = ({currentMonth, setCurrentMonth, setSelectedDateStart, setSelectedDateEnd}) => {

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
    setSelectedDateStart(null);
    setSelectedDateEnd(null);
  };
  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
    setSelectedDateStart(null);
    setSelectedDateEnd(null);
  };






    return(
      <>
          <button onClick={prevMonth}>&lt;</button>
          <div>
            {currentMonth.toLocaleString("default", { month: "long" })}{" "}
            {currentMonth.getFullYear()}
          </div>
          <button onClick={nextMonth}>&gt;</button>
      </>

    )
  }


export default CalendarHeader;