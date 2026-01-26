
// FOOTER DATES
document.getElementById("currentyear").textContent =
  new Date().getFullYear();

document.getElementById("lastModified").textContent =
  document.lastModified;


// STATIC WEATHER VALUES
const temperature = 10; // °C
const windSpeed = 5; // km/h

document.getElementById("temp").textContent = temperature;
document.getElementById("wind").textContent = windSpeed;


// WIND CHILL FUNCTION
function calculateWindChill(temp, wind) {
  return (temp <= 10 && wind > 4.8)
    ? (13.12 + 0.6215 * temp - 11.37 * wind ** 0.16 + 0.3965 * temp * wind ** 0.16).toFixed(1)
    : "N/A";
}

// DISPLAY WIND CHILL
document.getElementById("chill").textContent =
  calculateWindChill(temperature, windSpeed);
