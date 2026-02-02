// Get the current year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").innerHTML = currentYear;

// Get the last modified date of the document
document.getElementById("lastModified").innerHTML = document.lastModified;



const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.site-nav');

hamButton.addEventListener('click', () => {
  navigation.classList.toggle('open');
  hamButton.classList.toggle('open');
});


// TEMPLE DATA ARRAY
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005-08-07",
    area: 11500,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, USA",
    dedicated: "1888-05-21",
    area: 74792,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, USA",
    dedicated: "2015-06-07",
    area: 96630,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020-05-02",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, USA",
    dedicated: "1974-11-19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986-01-10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983-12-02",
    area: 116642,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, USA",
    dedicated: "1893-04-06",
    area: 253015,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/92c33bcbf9cf85483e008d6871f8ced5f6d7b661/full/800%2C/0/default?lang=eng"
  },
  {
    templeName: "Paris France Temple",
    location: "Le Chesnay, France",
    dedicated: "2017-05-21",
    area: 44000,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/5ec026c4efeaaa19a98e40f0f1b4c6069ae63517/full/%21500%2C/0/default"
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019-03-10",
    area: 40000,
    imageUrl: "https://www.churchofjesuschrist.org/imgs/7d937c68dd48389d8a411a1e2fe0b98cef6fd921/full/%21500%2C/0/default"
  }
];


// DOM REFERENCES
const grid = document.querySelector(".grid");
const pageTitle = document.querySelector(".name");
const navLinks = document.querySelectorAll(".site-nav a");


// DISPLAY FUNCTION
function displayTemples(templeList) {
  grid.innerHTML = "";

  templeList.forEach(temple => {
    const card = document.createElement("section");
    card.classList.add("temple-card");

    const h2 = document.createElement("h2");
    h2.textContent = temple.templeName;

    const location = document.createElement("p");
    location.innerHTML = `<strong>Location:</strong> ${temple.location}`;

    const dedicated = document.createElement("p");
    dedicated.innerHTML = `<strong>Dedicated:</strong> ${temple.dedicated}`;

    const area = document.createElement("p");
    area.innerHTML = `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;

    const img = document.createElement("img");
    img.src = temple.imageUrl;
    img.alt = temple.templeName;
    img.loading = "lazy";

    card.appendChild(h2);
    card.appendChild(location);
    card.appendChild(dedicated);
    card.appendChild(area);
    card.appendChild(img);

    grid.appendChild(card);
  });
}

// NAVIGATION FILTERING
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    const filter = link.dataset.filter;
    pageTitle.textContent = link.textContent;

    switch (filter) {
      case "old":
        displayTemples(
          temples.filter(t => new Date(t.dedicated).getFullYear() < 1900)
        );
        break;

      case "new":
        displayTemples(
          temples.filter(t => new Date(t.dedicated).getFullYear() > 2000)
        );
        break;

      case "large":
        displayTemples(
          temples.filter(t => t.area > 90000)
        );
        break;

      case "small":
        displayTemples(
          temples.filter(t => t.area < 10000)
        );
        break;

      default:
        displayTemples(temples);
    }
  });
});