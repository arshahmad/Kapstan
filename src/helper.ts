export function convertTimestampToTime(timestamp: number): string {
  // Create a new Date object using the timestamp (in milliseconds)
  const date: Date = new Date(timestamp * 1000);

  // Get hours, minutes, and AM/PM indicator
  let hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  const ampm: string = hours >= 12 ? "PM" : "AM";

  // Convert hours from 24-hour format to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // Handle midnight (0 hours)

  // Add leading zeros to minutes if necessary
  const formattedMinutes: string =
    minutes < 10 ? "0" + minutes : minutes.toString();

  // Construct the time string
  const time: string = hours + ":" + formattedMinutes + " " + ampm;

  return time;
}

export function timeDifference(timestamp: string): string {
  const currentDate: Date = new Date();
  const inputDate: Date = new Date(parseInt(timestamp) * 1000); // Convert to milliseconds

  const timeDifference: number = currentDate.getTime() - inputDate.getTime();
  const seconds: number = Math.floor(timeDifference / 1000);
  const minutes: number = Math.floor(seconds / 60);
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? "1 day ago" : days + " days ago";
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : hours + " hours ago";
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : minutes + " minutes ago";
  } else {
    return seconds < 0
      ? "Event will occur in future"
      : seconds === 1
      ? "1 second ago"
      : seconds + " seconds ago";
  }
}
