const projects = {

    sport: {

        number: "01",

        title: "SPORT",

        photos: [

            "Images/Sportcorpo/A7R08125_resultat.jpg",
            "Images/Sportcorpo/A7R08142_resultat.jpg",
            "Images/Sportcorpo/A7R08181_resultat.jpg",
        
            
            
            
            
            
            
            "Images/Sportcorpo/A7R07721_resultat.jpg",
            "Images/Sportcorpo/A7R07746_resultat.jpg",
            "Images/Sportcorpo/A7R07774_resultat.jpg",
            "Images/Sportcorpo/A7R07897_resultat.jpg",
            "Images/Sportcorpo/A7R07961_resultat.jpg",
            "Images/Sportcorpo/A7R08058_resultat.jpg",
            "Images/Sportcorpo/A7R08071_resultat.jpg"

        ]

    },

    /* =========================================================
       PAYSAGES
    ========================================================= */

    landscape: {

        number: "02",

        title: "PAYSAGES",

        photos: [

            "Images/paysages/A7R06301_resultat.jpg",
            "Images/paysages/A7R08580_resultat.jpg",
            "Images/paysages/A7R08753_resultat.jpg",
            "Images/paysages/A7R08776_resultat.jpg",
            "Images/paysages/A7R08798_resultat.jpg",
            "Images/paysages/A7R08803_resultat.jpg",
            "Images/paysages/A7R08887_resultat.jpg",
            "Images/paysages/A7R08944_resultat.jpg",
            "Images/paysages/IMG_2718_resultat.jpg",
            "Images/paysages/A7R05722_resultat.jpg"

        ]

    },

    /* =========================================================
       LIFESTYLE
    ========================================================= */

    lifestyle: {

        number: "03",

        title: "LIFESTYLE",

        photos: [

            "Images/lifestyle/A7R08625_resultat.jpg",
            "Images/lifestyle/A7R08743_resultat.jpg",
            "Images/lifestyle/Facetune_11-08-2026-00-20-38_resultat.jpg",
            "Images/lifestyle/IMG_1056-Edit_resultat.jpg",
            "Images/lifestyle/A7R05879_resultat.jpg",
            "Images/lifestyle/A7R06090_resultat.jpg",
            "Images/lifestyle/A7R06105_resultat.jpg",
            "Images/lifestyle/A7R06717_resultat.jpg"

        ]

    },

    /* =========================================================
       ÉVÉNEMENTS
    ========================================================= */

    events: {

        number: "04",

        title: "ÉVÉNEMENTS",

        photos: [

            "Images/events/A7R07450_resultat.jpg",
            "Images/events/A7R08312_resultat.jpg",
            "Images/events/A7R08355_resultat.jpg",
            "Images/events/A7R08370_resultat.jpg",
            "Images/events/A7R08449_resultat.jpg",
            "Images/events/A7R08480_resultat.jpg",
            "Images/events/A7R08522_resultat.jpg"

        ]

    }
};

/* =========================================================
ÉLÉMENTS DE LA GALERIE
========================================================= */

const projectCards = document.querySelectorAll(".project-card");
const projectView = document.getElementById("project-view");
const projectGallery = document.getElementById("project-gallery");
const projectTitle = document.getElementById("project-title");
const projectNumber = document.getElementById("project-number");
const backButton = document.getElementById("back-to-work");
const loadMoreButton = document.getElementById("load-more");

let currentProject = null;
let visiblePhotos = 6;

/* =========================================================
OUVRIR UNE GALERIE
========================================================= */

projectCards.forEach(card => {

    card.addEventListener("click", () => {

        const projectName = card.dataset.project;

        openProject(projectName);

    });
});

function openProject(projectName) {

    const project = projects[projectName];

    if (!project) {
        return;
    }

    currentProject = projectName;

    visiblePhotos = 6;

    projectTitle.textContent = project.title;

    projectNumber.textContent = project.number;

    projectGallery.innerHTML = "";

    projectView.classList.add("active");

    document.querySelector(".projects").style.display = "none";

    document.querySelector(".work-intro").style.display = "none";

    renderPhotos();

    window.scrollTo({
        top: projectView.offsetTop - 40,
        behavior: "smooth"
    });
}

/* =========================================================
AFFICHER LES PHOTOS
========================================================= */

function renderPhotos() {

    const project = projects[currentProject];

    if (!project) {
        return;
    }

    projectGallery.innerHTML = "";

    const photosToShow = project.photos.slice(
        0,
        visiblePhotos
    );

    photosToShow.forEach((photo, index) => {

        const item = document.createElement("div");

        item.classList.add("gallery-item");

        if (index % 3 === 0) {

            item.classList.add("gallery-wide");

        } else {

            item.classList.add("gallery-half");

        }

        const img = document.createElement("img");

        img.src = photo;

        img.alt = `${project.title} — photographie ${index + 1}`;

        img.loading = "lazy";

        item.appendChild(img);

        projectGallery.appendChild(item);

        item.addEventListener("click", () => {

            openLightbox(
                project.photos,
                index
            );

        });

    });

    if (visiblePhotos >= project.photos.length) {

        loadMoreButton.style.display = "none";

    } else {

        loadMoreButton.style.display = "block";

    }
}

/* =========================================================
VOIR PLUS DE PHOTOS
========================================================= */

loadMoreButton.addEventListener("click", () => {

    visiblePhotos += 6;

    renderPhotos();
});

/* =========================================================
RETOUR AUX RÉALISATIONS
========================================================= */

backButton.addEventListener("click", () => {

    projectView.classList.remove("active");

    document.querySelector(".projects").style.display = "";

    document.querySelector(".work-intro").style.display = "";

    currentProject = null;

    window.scrollTo({
        top: document.getElementById("work").offsetTop,
        behavior: "smooth"
    });
});

/* =========================================================
LIGHTBOX
========================================================= */

let lightbox = null;
let lightboxImage = null;
let lightboxClose = null;
let lightboxPrev = null;
let lightboxNext = null;

let lightboxPhotos = [];
let lightboxIndex = 0;

/* =========================================================
CRÉER LA LIGHTBOX
========================================================= */

function createLightbox() {

    lightbox = document.createElement("div");

    lightbox.className = "lightbox";

    lightbox.innerHTML = `

        <button class="lightbox-close">
            ×
        </button>

        <button class="lightbox-prev">
            ←
        </button>

        <img
            id="lightbox-image"
            src=""
            alt=""
        >

        <button class="lightbox-next">
            →
        </button>

    `;

    document.body.appendChild(lightbox);

    lightboxImage =
        document.getElementById("lightbox-image");

    lightboxClose =
        document.querySelector(".lightbox-close");

    lightboxPrev =
        document.querySelector(".lightbox-prev");

    lightboxNext =
        document.querySelector(".lightbox-next");

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );

    lightboxPrev.addEventListener(
        "click",
        previousPhoto
    );

    lightboxNext.addEventListener(
        "click",
        nextPhoto
    );

    lightbox.addEventListener(
        "click",
        (event) => {

            if (event.target === lightbox) {

                closeLightbox();

            }

        }
    );
}

/* =========================================================
OUVRIR LIGHTBOX
========================================================= */

function openLightbox(photos, index) {

    if (!lightbox) {

        createLightbox();

    }

    lightboxPhotos = photos;

    lightboxIndex = index;

    updateLightbox();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";
}

/* =========================================================
METTRE À JOUR LIGHTBOX
========================================================= */

function updateLightbox() {

    if (!lightboxImage) {
        return;
    }

    lightboxImage.src =
        lightboxPhotos[lightboxIndex];
}

/* =========================================================
PHOTO PRÉCÉDENTE
========================================================= */

function previousPhoto() {

    if (!lightboxPhotos.length) {
        return;
    }

    lightboxIndex--;

    if (lightboxIndex < 0) {

        lightboxIndex =
            lightboxPhotos.length - 1;

    }

    updateLightbox();
}

/* =========================================================
PHOTO SUIVANTE
========================================================= */

function nextPhoto() {

    if (!lightboxPhotos.length) {
        return;
    }

    lightboxIndex++;

    if (
        lightboxIndex >=
        lightboxPhotos.length
    ) {

        lightboxIndex = 0;

    }

    updateLightbox();
}

/* =========================================================
FERMER LIGHTBOX
========================================================= */

function closeLightbox() {

    if (!lightbox) {
        return;
    }

    lightbox.classList.remove("active");

    document.body.style.overflow = "";
}

/* =========================================================
CLAVIER
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

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

    }
);