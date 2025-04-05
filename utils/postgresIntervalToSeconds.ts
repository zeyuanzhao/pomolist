export function postgresIntervalToSeconds(interval: string): number {
  const dayMatch = interval.match(/(\d+)\s+day/);
  const timeMatch = interval.match(/(\d{1,2}):(\d{2}):(\d{2})/);

  const days = dayMatch ? parseInt(dayMatch[1]) : 0;
  const hours = timeMatch ? parseInt(timeMatch[1]) : 0;
  const minutes = timeMatch ? parseInt(timeMatch[2]) : 0;
  const seconds = timeMatch ? parseInt(timeMatch[3]) : 0;

  return days * 86400 + hours * 3600 + minutes * 60 + seconds;
}
