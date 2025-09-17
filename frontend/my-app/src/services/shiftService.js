import supabase from "../supabase/supabase";

export const fetchShiftsForUser = async (userId) => {
  const { data, error } = await supabase
    .from("shifts")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

export const deleteShift = async (date) => {
  const { error } = await supabase
    .from("shifts")
    .update({ time: null })
    .eq("date", date);

  if (error) throw error;
};

export const upsertShifts = async (shiftData) => {
  const { data, error } = await supabase
    .from("shifts")
    .upsert(shiftData, { onConflict: ["user_id", "date"] });

  if (error) throw error;
  return data;
};

export const notifyBackendSchedule = async (endpoint, shifts) => {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(shifts),
  });
  if (!res.ok) throw new Error("Failed to send shifts to backend");
};
