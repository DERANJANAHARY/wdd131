// Get the current year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

// Get the last modified date of the document
document.getElementById("lastModified").innerHTML = document.lastModified;


// WIND CHILL CALCULATION
const temperature = 10; // °C
const windSpeed = 5;    // km/h

function calculateWindChill(temp, wind) {
  if (temp <= 10 && wind > 4.8) {
    return (
      13.12 +
      0.6215 * temp -
      11.37 * Math.pow(wind, 0.16) +
      0.3965 * temp * Math.pow(wind, 0.16)
    ).toFixed(1);
  } else {
    return "N/A";
  }
}

document.getElementById("chill").textContent =
  calculateWindChill(temperature, windSpeed);
