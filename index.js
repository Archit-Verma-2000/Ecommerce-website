document.addEventListener('DOMContentLoaded', function() { 
    let header = document.getElementsByClassName("header")[1]; // Access the first element
    let topbar = document.getElementsByClassName("topbar")[0]; // Access the first element
    console.log(topbar);
    header.style.background="#00A5c4";
if (header) { // Check if the header exists
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            header.style.background="";
            header.classList.add("bg-nav");
            topbar.classList.remove("d-lg-flex");
        } else {
            header.classList.remove("bg-nav");
            header.style.background="#00A5c4";
            topbar.classList.add("d-lg-flex");
        }
    });
}
    let slideIndex = 1;
    let i;
    let startX, endX; // Variables for swipe start and end positions
    const threshold = 50; // Minimum swipe distance for triggering slide change
    let slider = document.getElementsByClassName("slider");
    let dots = document.getElementsByClassName("dots");
    // Show the first slide initially
    showSlide(slideIndex);

    // Function to handle showing the current slide based on index
    window.currentSlide = function(n) {
        showSlide(slideIndex = n);
    }

    // Function to show slides
    function showSlide(n) {
        if (n > slider.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slider.length;
        }
        for (i = 0; i < slider.length; i++) {
            slider[i].style.display = "none"; // Hide all slides
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", ""); // Deactivate all dots
        }
        slider[slideIndex - 1].style.display = "block"; // Show the current slide
        dots[slideIndex - 1].classList.add('active'); // Activate the current dot
    }

    // Automatic sliding effect
    setInterval(function() {
        slideIndex++;
        showSlide(slideIndex);
    }, 6000); // Slide changes every 6 seconds

    // Swipe effect for mobile/touch devices
    const container = document.querySelector(".slide");
    
    container.addEventListener('touchstart', (e) => {
        console.log(e.pageX);
        startX = e.touches[0].clientX; // Get the starting X position
    });
    
    container.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX; // Update endX while swiping
    });
    
    container.addEventListener("touchend", (e) => {
        // Check if swipe distance exceeds the threshold
        if (startX - endX > threshold) { 
            // Swipe left (next slide)
            slideIndex++;
            showSlide(slideIndex);
        } else if (endX - startX > threshold) {
            // Swipe right (previous slide)
            slideIndex--;
            showSlide(slideIndex);
        }
    });
/*mobile toggle*/
    const mobiletoggle=document.querySelector(".mobile-nav-toggle");
    const cart=document.querySelector("span");
    function mobileToggle(){
        document.querySelector('body').classList.toggle("mobile-nav-active");
        document.querySelector('body').classList.toggle('disabled');
        mobiletoggle.classList.toggle('bi-list');
        mobiletoggle.classList.toggle('bi-x-lg');
        // Toggle the cart visibility
    }
    mobiletoggle.addEventListener('click',mobileToggle);

/*mobile toggle ends*/
/*for dropdown toggle*/

document.querySelectorAll(".btn-dropdown").forEach(menu=>{
    menu.addEventListener('click',function(e){
        e.preventDefault();
        console.log(this);
        this.classList.toggle('bi-chevron-down'); 
        this.classList.toggle('bi-chevron-up');
        this.parentNode.classList.toggle("active");
        var cd=this.parentNode.nextElementSibling.classList.toggle("dropdown-active");
        console.log(cd);
        e.stopImmediatePropagation();
    });
});

/*dropdown toggle ends*/
/*top sale carousel*/
/*let imgs = document.querySelectorAll(".product img"); // Select all images

imgs.forEach(img=>{
    img.addEventListener('click', function(e) {
        const width = this.offsetWidth; // Get the width of the clicked image
        console.log(width); // Log the width
    });
});*/
let left=document.querySelector(".top-sale").getElementsByClassName("bi-chevron-left");
let right=document.querySelector(".top-sale").getElementsByClassName("bi-chevron-right");
let slide=document.getElementsByClassName("top-sale-inner");
let slides=document.querySelectorAll(".top-sale-inner .item .product img");
let product=document.querySelectorAll(".top-sale-inner .item .product");
let cont=document.querySelectorAll(".top-sale>.container");
var width,pos;


for(i=0;i<left.length;i++){
    pos=1;
    left[0].addEventListener("click",function(e){
        console.log("left");
        if(pos==visible){
            --pos;
        }
        if(pos>0){
            translateX(--pos);    
        }
    });
    right[0].addEventListener("click",function(e){
        if(pos==0){
            pos=1;
        }
        if(pos>=0&&pos<=hiddenItems(pos))
        {   console.log(pos);
            translateX(pos++); //translate items
        }
    });
}
function translateX(pos){
    width=slides[0].offsetWidth;
    slide[0].style.left=pos*(-width)+"px";
}
function hiddenItems(pos){
   console.log(cont[0].offsetWidth);
   console.log(slides[0].offsetWidth);
   visible=Math.floor(cont[0].offsetWidth/slides[0].offsetWidth);
   console.log(visible);
   console.log(slides.length);
   console.log(slides.length-visible);
   return(slides.length-visible);
}

/*top sale carousel end*/

/*sale image filter */
    let filters=document.querySelectorAll(".filter li button");
    let saleprod=document.querySelectorAll(".products .item");
    console.log(filters);
    const filtering= e =>{
        e.preventDefault;
        document.querySelector(".special-price .filter .active").classList.remove("active");
        e.target.classList.add("active");
        saleprod.forEach(prod=>{
            prod.classList.add('hide');
            if(prod.dataset.name===e.target.dataset.name||e.target.dataset.name==="all")
            {
                prod.classList.remove('hide');
            }
        });
    }
    filters.forEach(filter=>filter.addEventListener("click",filtering));
    console.log(saleprod);
/*sale image filter  end*/

});
