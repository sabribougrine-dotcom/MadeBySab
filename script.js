/* =========================================================
   MADEBYSAB — GALLERY
========================================================= */


/* =========================================================
   PHOTOS
========================================================= */

const projects = {

    sport: {

        number: "01",

        title: "SPORT / CORPORATE",

        photos: [

            "images/Sportcorpo/A7R08125.jpg",
            "images/Sportcorpo/A7R08142.jpg",
            "images/Sportcorpo/A7R08181.jpg",
            "images/Sportcorpo/A7R08312.jpg",
            "images/Sportcorpo/A7R08355.jpg",
            "images/Sportcorpo/A7R08370.jpg",
            "images/Sportcorpo/A7R08449.jpg",
            "images/Sportcorpo/A7R08480.jpg",
            "images/Sportcorpo/A7R08522.jpg",

            "images/Sportcorpo/A7R07450.jpg",
            "images/Sportcorpo/A7R07721.jpg",
            "images/Sportcorpo/A7R07746.jpg",
            "images/Sportcorpo/A7R07774.jpg",
            "images/Sportcorpo/A7R07897.jpg",
            "images/Sportcorpo/A7R07961.jpg",
            "images/Sportcorpo/A7R08058.jpg",
            "images/Sportcorpo/A7R08071.jpg"

        ]

    },


    landscape: {

        number: "02",

        title: "LANDSCAPE",

        photos: [

            "images/paysages/A7R06301.jpg",
            "images/paysages/A7R08580.jpg",
            "images/paysages/A7R08753.jpg",
            "images/paysages/A7R08776.jpg",
            "images/paysages/A7R08798.jpg",
            "images/paysages/A7R08803.jpg",
            "images/paysages/A7R08887.jpg",
            "images/paysages/A7R08944.jpg",
            "images/paysages/IMG_2718.jpg",
            "images/paysages/A7R05722.jpg"

        ]

    },


    lifestyle: {

        number: "03",

        title: "LIFESTYLE",

        photos: [

            "images/lifestyle/A7R08625.jpg",
            "images/lifestyle/A7R08743.jpg",
            "images/lifestyle/Facetune_11-08-2026-00-20-38.jpg",
            "images/lifestyle/IMG_1056-Edit.jpg",
            "images/lifestyle/A7R05879.jpg",
            "images/lifestyle/A7R06090.jpg",
            "images/lifestyle/A7R06105.jpg",
            "images/lifestyle/A7R06717.jpg"

        ]

    }

};


/* =========================================================
   ELEMENTS
========================================================= */

const projectCards = document.querySelectorAll(".project-card");

const projectView = document.getElementById("project-view");

const projectTitle = document.getElementById("project-title");

const projectNumber = document.getElementById("project-number");

const projectGallery = document.getElementById("project-gallery");

const backButton = document.getElementById("back-to-work");

const loadMoreButton = document.getElementById("load-more");


/* =========================================================
   VARIABLES
========================================================= */

let currentProject = null;

let visiblePhotos = 6;

const photosPerLoad = 4;


/* =========================================================
   OPEN PROJECT
========================================================= */

projectCards.forEach(card => {

    card.addEventListener("click", () => {

        const projectName = card.dataset.project;

        openProject(projectName);

    });

});


function openProject(projectName) {

    currentProject = projects[projectName];

    visiblePhotos = 6;

    projectNumber.textContent = currentProject.number;

    projectTitle.textContent = currentProject.title;

    renderGallery();

    projectView.classList.add("active");

    setTimeout(() => {

        projectView.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }, 50);

}


/* =========================================================
   GALLERY
========================================================= */

function renderGallery() {

    projectGallery.innerHTML = "";

    const photosToShow =
        currentProject.photos.slice(0, visiblePhotos);


    photosToShow.forEach((photo, index) => {

        const wrapper = document.createElement("div");

        wrapper.className = "gallery-item";


        /*
         * Toutes les photos restent grandes.
         * Une photo pleine largeur,
         * puis deux côte à côte.
         */

        if (index % 3 === 0) {

            wrapper.classList.add("gallery-wide");

        } else {

            wrapper.classList.add("gallery-half");

        }


        const img = document.createElement("img");

        img.src = photo;

        img.alt = currentProject.title;

        img.loading = "lazy";


        img.addEventListener("click", () => {

            openLightbox(photo, index);

        });


        wrapper.appendChild(img);

        projectGallery.appendChild(wrapper);

    });


    if (visiblePhotos >= currentProject.photos.length) {

        loadMoreButton.style.display = "none";

    } else {

        loadMoreButton.style.display = "block";

    }

}


/* =========================================================
   LOAD MORE
========================================================= */

loadMoreButton.addEventListener("click", () => {

    visiblePhotos += photosPerLoad;

    renderGallery();

});


/* =========================================================
   BACK
========================================================= */

backButton.addEventListener("click", () => {

    projectView.classList.remove("active");

    window.scrollTo({
        top: document.getElementById("work").offsetTop,
        behavior: "smooth"
    });

});


/* =========================================================
   LIGHTBOX
========================================================= */

let lightbox;

let lightboxImage;

let currentLightboxIndex = 0;


function createLightbox() {

    lightbox = document.createElement("div");

    lightbox.id = "lightbox";

    lightbox.innerHTML = `

        <button class="lightbox-close">
            ×
        </button>

        <button class="lightbox-prev">
            ←
        </button>

        <img id="lightbox-image">

        <button class="lightbox-next">
            →
        </button>

        <div class="lightbox-counter"></div>

    `;

    document.body.appendChild(lightbox);


    lightboxImage =
        document.getElementById("lightbox-image");


    lightbox
        .querySelector(".lightbox-close")
        .addEventListener("click", closeLightbox);


    lightbox
        .querySelector(".lightbox-prev")
        .addEventListener("click", previousPhoto);


    lightbox
        .querySelector(".lightbox-next")
        .addEventListener("click", nextPhoto);


    lightbox.addEventListener("click", event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    });

}


function openLightbox(photo, index) {

    if (!lightbox) {

        createLightbox();

    }

    currentLightboxIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

}


function updateLightbox() {

    const photos = currentProject.photos;

    lightboxImage.src =
        photos[currentLightboxIndex];

    const counter =
        lightbox.querySelector(".lightbox-counter");

    counter.textContent =
        `${String(currentLightboxIndex + 1).padStart(2, "0")} / ${String(photos.length).padStart(2, "0")}`;

}


function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}


function previousPhoto() {

    currentLightboxIndex--;

    if (currentLightboxIndex < 0) {

        currentLightboxIndex =
            currentProject.photos.length - 1;

    }

    updateLightbox();

}


function nextPhoto() {

    currentLightboxIndex++;

    if (
        currentLightboxIndex >=
        currentProject.photos.length
    ) {

        currentLightboxIndex = 0;

    }

    updateLightbox();

}


/* =========================================================
   KEYBOARD
========================================================= */

document.addEventListener("keydown", event => {

    if (!lightbox ||
        !lightbox.classList.contains("active")) {

        return;

    }


    if (event.key === "Escape") {

        closeLightbox();

    }


    if (event.key === "ArrowLeft") {

        previousPhoto();

    }


    if (event.key === "ArrowRight") {

        nextPhoto();

    }

});


/* =========================================================
   INIT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
     * Rien à afficher dans la galerie
     * tant qu'un projet n'est pas ouvert.
     */

});
