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
