import "./style.css";

// Check for submitted query parameter
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("submitted")) {
  // Replace form with success message
  const formElement = document.querySelector("form");
  if (formElement) {
    const successMessage = document.createElement("div");
    successMessage.className = "space-y-3 lg:space-y-6";
    successMessage.innerHTML = `
      <h2 class="text-3xl lg:text-4xl xl:text-5xl font-bold">
        THANK YOU!
      </h2>
      <p class="text-balance lg:w-3/4">
        YOUR SUBMISSION HAS BEEN RECEIVED.<br />
        CHECK YOUR E-MAIL FOR THE REPORT LINK.
      </p>
    `;
    formElement.replaceWith(successMessage);
  }
}

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
