/* =========================================================
MADEBYSAB — GALERIES
========================================================= */

const projects = {

    sport: {

        number: "01",

        title: "SPORT",

        photos: [

            "Images/Sportcorpo/A7R08125_resultat.jpg",
            "Images/Sportcorpo/A7R08142_resultat.jpg",
            "Images/Sportcorpo/A7R08181_resultat.jpg",
            "Images/Sportcorpo/A7R08312_resultat.jpg",
            "Images/Sportcorpo/A7R08355_resultat.jpg",
            "Images/Sportcorpo/A7R08370_resultat.jpg",
            "Images/Sportcorpo/A7R08449_resultat.jpg",
            "Images/Sportcorpo/A7R08480_resultat.jpg",
            "Images/Sportcorpo/A7R08522_resultat.jpg",
            "Images/Sportcorpo/A7R07450_resultat.jpg",
            "Images/Sportcorpo/A7R07721_resultat.jpg",
            "Images/Sportcorpo/A7R07746_resultat.jpg",
            "Images/Sportcorpo/A7R07774_resultat.jpg",
            "Images/Sportcorpo/A7R07897_resultat.jpg",
            "Images/Sportcorpo/A7R07961_resultat.jpg",
            "Images/Sportcorpo/A7R08058_resultat.jpg",
            "Images/Sportcorpo/A7R08071_resultat.jpg"

        ]

    },

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

    }

};

/* =========================================================
ÉLÉMENTS
========================================================= */

const projectCards =
document.querySelectorAll(".project-card");

const projectView =
document.getElementById("project-view");

const projectTitle =
document.getElementById("project-title");

const projectNumber =
document.getElementById("project-number");

const projectGallery =
document.getElementById("project-gallery");

const backButton =
document.getElementById("back-to-work");

const loadMoreButton =
document.getElementById("load-more");

/* =========================================================
VARIABLES
========================================================= */

let currentProject = null;

let visiblePhotos = 6;

const photosPerLoad = 4;

/* =========================================================
OUVRIR UNE GALERIE
========================================================= */

projectCards.forEach(card => {

    card.addEventListener("click", () => {

        const projectName =
            card.dataset.project;

        openProject(projectName);

    });

});

function openProject(projectName) {

    currentProject =
        projects[projectName];

    if (!currentProject) {
        return;
    }

    visiblePhotos = 6;

    projectNumber.textContent =
        currentProject.number;

    projectTitle.textContent =
        currentProject.title;

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
AFFICHER LA GALERIE
========================================================= */

function renderGallery() {

    projectGallery.innerHTML = "";

    const photosToShow =
        currentProject.photos.slice(
            0,
            visiblePhotos
        );

    photosToShow.forEach((photo, index) => {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "gallery-item";

        if (index % 3 === 0) {

            wrapper.classList.add(
                "gallery-wide"
            );

        } else {

            wrapper.classList.add(
                "gallery-half"
            );

        }

        const img =
            document.createElement("img");

        img.src = photo;

        img.alt =
            currentProject.title;

        img.loading = "lazy";

        img.addEventListener("click", () => {

            openLightbox(
                photo,
                index
            );

        });

        wrapper.appendChild(img);

        projectGallery.appendChild(wrapper);

    });

    if (
        visiblePhotos >=
        currentProject.photos.length
    ) {

        loadMoreButton.style.display =
            "none";

    } else {

        loadMoreButton.style.display =
            "block";

    }

}

/* =========================================================
VOIR PLUS
========================================================= */

loadMoreButton.addEventListener(
"click",
() => {

    visiblePhotos +=
        photosPerLoad;

    renderGallery();

}
);

/* =========================================================
RETOUR
========================================================= */

backButton.addEventListener(
"click",
() => {

    projectView.classList.remove(
        "active"
    );

    window.scrollTo({

        top:
            document.getElementById(
                "work"
            ).offsetTop,

        behavior: "smooth"

    });

}
);

/* =========================================================
LIGHTBOX
========================================================= */

let lightbox = null;

let lightboxImage = null;

let currentLightboxIndex = 0;

function createLightbox() {

    lightbox =
        document.createElement("div");

    lightbox.id =
        "lightbox";

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

    document.body.appendChild(
        lightbox
    );

    lightboxImage =
        document.getElementById(
            "lightbox-image"
        );

    lightbox
        .querySelector(".lightbox-close")
        .addEventListener(
            "click",
            closeLightbox
        );

    lightbox
        .querySelector(".lightbox-prev")
        .addEventListener(
            "click",
            previousPhoto
        );

    lightbox
        .querySelector(".lightbox-next")
        .addEventListener(
            "click",
            nextPhoto
        );

    lightbox.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                lightbox
            ) {

                closeLightbox();

            }

        }
    );

}

function openLightbox(
photo,
index
) {

    if (!lightbox) {

        createLightbox();

    }

    currentLightboxIndex =
        index;

    updateLightbox();

    lightbox.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";

}

function updateLightbox() {

    const photos =
        currentProject.photos;

    lightboxImage.src =
        photos[currentLightboxIndex];

    const counter =
        lightbox.querySelector(
            ".lightbox-counter"
        );

    counter.textContent =
        `${String(
            currentLightboxIndex + 1
        ).padStart(2, "0")} / ${String(
            photos.length
        ).padStart(2, "0")}`;

}

function closeLightbox() {

    if (!lightbox) {
        return;
    }

    lightbox.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}

function previousPhoto() {

    currentLightboxIndex--;

    if (
        currentLightboxIndex < 0
    ) {

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
CLAVIER
========================================================= */

document.addEventListener(
"keydown",
event => {

    if (
        !lightbox ||
        !lightbox.classList.contains(
            "active"
        )
    ) {

        return;

    }

    if (
        event.key ===
        "Escape"
    ) {

        closeLightbox();

    }

    if (
        event.key ===
        "ArrowLeft"
    ) {

        previousPhoto();

    }

    if (
        event.key ===
        "ArrowRight"
    ) {

        nextPhoto();

    }

}
);