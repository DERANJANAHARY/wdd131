// form.js

// Product array
const products = [
  { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
  { id: "fc-2050", name: "power laces", averagerating: 4.7 },
  { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
  { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
  { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

// Populate Product Name select
const productSelect = document.getElementById("productName");

products.forEach(product => {
  const option = document.createElement("option");
  option.value = product.id; // use id as value
  option.textContent = product.name; // use name as display
  productSelect.appendChild(option);
});

// Track reviews using localStorage
// Only increment if review.html is loaded (after form submission)
if (window.location.pathname.endsWith("review.html")) {
  let reviewCount = localStorage.getItem("reviewCount");
  reviewCount = reviewCount ? parseInt(reviewCount) : 0;
  reviewCount++;
  localStorage.setItem("reviewCount", reviewCount);
  console.log(`Number of reviews submitted: ${reviewCount}`);
}

// Footer: current year
const yearSpan = document.getElementById("currentyear");
yearSpan.textContent = new Date().getFullYear();

// Footer: last modified date
const lastModifiedSpan = document.getElementById("lastModified");
lastModifiedSpan.textContent = document.lastModified;
