// create a media query to check if the screen size is 786px or smaller
const mq = window.matchMedia("(max-width: 768px)")

// if the media query matches, run the code
if (mq.matches) {
    let slideIndex = 1;
    showSlides(slideIndex);


function fwdSlides(n) {
    showSlides(slideIndex += n)
    console.log("clicked slide")
}

function currentSlide(n) {
    showSlides(slideIndex = n)
}


    // Function to handle slide display
    function showSlides(n) {
        const slides = document.getElementsByClassName('projectIMGs');
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        slides[slideIndex - 1].style.display = "block";
    }
}

// function showSlides(n) {
//     let i;
//     let slides = document.getElementsByClassName('projectIMGs')
//     if (n > slides.length) {
//         slideIndex = 1
//         }
//     if (n < 1) {
//         slideIndex = slides.length
//         }
//     for (i = 0; i < slides.length; i++) {
//         slides[i].style.display = "none"
//         }
//     slides[slideIndex - 1].style.display = "block"
//     }
// }
