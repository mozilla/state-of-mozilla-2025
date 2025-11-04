import "./style.css";

// Update date and time every second
function updateDateTime() {
  const now = new Date();

  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const year = now.getFullYear();

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Get timezone offset in hours
  const timezoneOffset = -now.getTimezoneOffset() / 60;
  const timezoneStr = `GMT${timezoneOffset >= 0 ? "+" : ""}${timezoneOffset}`;

  const dateTimeStr = `${day}.${month}.${year} ${hours}:${minutes}:${seconds} (${timezoneStr})`;

  document.getElementById("datetime").textContent = dateTimeStr;
}

// Update immediately and then every second
updateDateTime();
setInterval(updateDateTime, 1000);
