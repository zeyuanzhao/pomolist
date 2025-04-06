export const secondsToTimeString = (seconds: number): string => {
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const remainingSeconds = String(seconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${remainingSeconds}`;
};

export const timeStringToSeconds = (time: string): number => {
  const dayMatch = time.match(/(\d+)\s+day/);
  const timeMatch = time.match(/(\d{1,2}):(\d{2}):(\d{2})/);

  const days = dayMatch ? parseInt(dayMatch[1]) : 0;
  const hours = timeMatch ? parseInt(timeMatch[1]) : 0;
  const minutes = timeMatch ? parseInt(timeMatch[2]) : 0;
  const seconds = timeMatch ? parseInt(timeMatch[3]) : 0;

  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
};

export const secondsToTimeSimple = (seconds: number | null): string => {
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

export const timeSimple = (time: string | null): string => {
  if (time === null) {
    return "00:00";
  }
  const timeParts = time.split(":");
  if (timeParts.length === 3) {
    return `${timeParts[1]}:${timeParts[2]}`;
  } else if (timeParts.length === 2) {
    return time;
  }
  return "00:00";
};
