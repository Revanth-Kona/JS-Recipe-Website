// HOME PAGE
// Toggle navbar on mobile
function toggleNavbar() {
    const navbarNav = document.getElementById("navbarNav");
    navbarNav.classList.toggle("show");
}

// Autoslide show
let firstIndex = 0;
function Autoslide() {
    setTimeout(Autoslide, 3000);
    var pics;
    const img = document.querySelectorAll('#pho');
    for (pics = 0; pics < img.length; pics++) {
        img[pics].style.display = 'none';
    }
    firstIndex++;
    if (firstIndex > img.length) {
        firstIndex = 1;
    }
    img[firstIndex - 1].style.display = 'block';
}
Autoslide()

// popup
let popup = document.getElementById('popup')
function openPopup(){
    popup.classList.add("open-popup")
}
function closeiPopup(){
    popup.classList.remove('open-popup')
}

// Rating System
const starchange = document.querySelectorAll('.star'); // Select stars by class
const ratingOutput = document.getElementById('ratingc');

starchange.forEach((star, index) => {
    star.addEventListener('click', function () {
        starchange.forEach((front, back) => {
            if (back <= index) {
                front.classList.add('selected'); // Highlight selected stars
            } else {
                front.classList.remove('selected'); // Remove highlight from unselected stars
            }
        });
        ratingOutput.textContent = index + 1;
    });
});