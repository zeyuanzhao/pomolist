export const secondsToTime = (seconds: number | null): string => {
  if (seconds === null) {
    return "00:00";
  }
  const h = Math.floor(seconds / 3600)
    .toString()
    .padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");

  return h === "00" ? `${m}:${s}` : `${h}:${m}:${s}`;
};
