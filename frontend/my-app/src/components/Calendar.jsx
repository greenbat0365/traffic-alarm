import styles from "../styles/Calendar.module.css";

import { useState, useEffect } from "react";
import auth from "../supabase/auth";

import Notification from "./Notification.jsx";
import CalendarHeader from "./CalendarHeader.jsx";
import CalandarGrid from "./CalendarGrid.jsx";
import CalendarFooter from "./CalendarFooter.jsx";
import {
  fetchShiftsForUser,
  deleteShift,
  upsertShifts,
  notifyBackendSchedule,
} from "../services/shiftService.js";

const ENDPOINT = "https://traffic-alarm.onrender.com/api/schedule"

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const [hoveredDate, setHoveredDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [shifts, setShifts] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const now = new Date();
    const currentHours = String(now.getHours()).padStart(2, "0");
    const currentMinutes = String(now.getMinutes()).padStart(2, "0");

    setSelectedTime(`${currentHours}:${currentMinutes}`);
  }, []);

  useEffect(() => {
    async function fetchData() {
      const userId = await auth.checkUser();
      const data = await fetchShiftsForUser(userId);
      const shifts = {};
      data.forEach((item) => {
        if (!item.time) return;

        const timeDate = new Date(item.time);
        const formattedTime = timeDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
        shifts[item.date] = formattedTime;
      });
      setShifts(shifts);
    }
    fetchData();
  }, []);

  const handleSubmit = async () => {
    const [hour, minute] = selectedTime.split(":").map(Number);
    const userID = await auth.checkUser();

    const selectedDates = selectedDateEnd
      ? Array.from(
          { length: selectedDateEnd - selectedDateStart + 1 },
          (_, i) => selectedDateStart + i
        )
      : [selectedDateStart];

    const shiftData = selectedDates.map((date) => {
      const localDate = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        date,
        hour,
        minute,
        0
      );

      return {
        date: localDate.toISOString().split("T")[0],
        time: localDate.toISOString(),
        user_id: userID,
      };
    });

    await upsertShifts(shiftData);
    setMessage("Shifts sent successfully");
   
    const updatedShifts = { ...shifts };
    shiftData.forEach(({ date, time }) => {
      console.log(date, time);
      const localTime = new Date(time).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      updatedShifts[date] = localTime;
    });
    console.log(updatedShifts, "updatedShifts");
    setShifts(updatedShifts);

    try {
       await notifyBackendSchedule(ENDPOINT, shiftData);
    } catch (err) {
      console.error("Error sending shifts:", err.message);
    }
  };

  const handleDelete = async (e, date) => {
    e.stopPropagation();

    await deleteShift(date);
    const updatedShifts = { ...shifts };
    delete updatedShifts[date];
    setShifts(updatedShifts);
  };

  return (
    <>
      <Notification message={message} />
      <div className={styles.container}>
        <div className={styles.calendar}>
          <div className={styles.header}>
            <CalendarHeader
              currentMonth={currentMonth}
              setCurrentMonth={setCurrentMonth}
              setSelectedDateStart={setSelectedDateStart}
              setSelectedDateEnd={setSelectedDateEnd}
            />
          </div>
          <CalandarGrid
            setHoveredDate={setHoveredDate}
            selectedDateStart={selectedDateStart}
            selectedDateEnd={selectedDateEnd}
            setSelectedDateEnd={setSelectedDateEnd}
            setSelectedDateStart={setSelectedDateStart}
            currentMonth={currentMonth}
            shifts={shifts}
            handleDelete={handleDelete}
            hoveredDate={hoveredDate}
          />
          <CalendarFooter
            selectedDateStart={selectedDateStart}
            setSelectedDateEnd={setSelectedDateEnd}
            selectedTime={selectedTime}
             selectedDateEnd={selectedDateEnd}
            setSelectedTime={setSelectedTime}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};
export default Calendar;
