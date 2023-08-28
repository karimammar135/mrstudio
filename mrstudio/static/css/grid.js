
// Carousel object
const carousel = document.querySelector('.carousel');
const arrowBtns = document.querySelectorAll('.wrapper i');
const firstCardWidth = document.querySelector('.card').offsetWidth;

let isDragging = false, startX, startScrollLeft;

// Add event listener for arrows to handle carousel scroll left and right
arrowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add('dragging');
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove('dragging');
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Update the scroll position od the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('mouseup', dragStop);
