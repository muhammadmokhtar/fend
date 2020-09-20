/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const sections = document.getElementsByTagName('section'); 
const navBarUList = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function nearTopOfViewport(el) {
    const rect = el.getBoundingClientRect();
    return  rect.top < window.innerHeight && rect.bottom >= 0;
}

function getYCoord(elem) {
    let box = elem.getBoundingClientRect();
    return box.top + window.pageYOffset;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavMen(sections) {
    const fragment = document.createDocumentFragment();
    for (const section of sections) {
        const listItem = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.setAttribute("href", "#" + section.getAttribute("id"));
        anchor.innerText = section.dataset.nav;
        listItem.appendChild(anchor);
        fragment.appendChild(listItem);
    }
    // use DcoumentFragment temporarly change to display none and block for navBarUList
    navBarUList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
function toggleActiveSection() {
    for (let i = 1; i <= sections.length; i++) {
        const section = document.getElementById('section' + i);
        if (nearTopOfViewport(section)) {
            section.classList.add("active");
        } else {
            section.classList.remove("active");
        }
    }
}

// Scroll to anchor ID using scrollTO event

function smothScrollTo(anchor) {
    const section = document.querySelector(anchor.getAttribute("href"));
    window.scrollTo({top: getYCoord(section), left: 0, behavior:"smooth"});
}

function onClick(event) {
    event.preventDefault();
    smothScrollTo(event.target);
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNavMen(sections));
// Scroll to section on link click
const anchorElements = document.querySelectorAll('a');
for(anchorElement of anchorElements) {
    anchorElement.addEventListener('click', onClick);
}
// Set sections as active

document.addEventListener('scroll', toggleActiveSection, {passive: true});


