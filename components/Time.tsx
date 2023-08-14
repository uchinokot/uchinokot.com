import { formatInTimeZone } from "date-fns-tz";

export default function Time({ date }: { date: string }) {
  const isoString = `${date}T00:00+0900`;
  return (
    <time
      dateTime={isoString}
      className="block text-[.9rem] text-gray-500 dark:text-gray-400"
    >
      {formatInTimeZone(new Date(isoString), "Asia/Tokyo", "yyyy-MM-dd")}
    </time>
  );
}
