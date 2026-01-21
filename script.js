// ===============================
// VARIABLES
// ===============================
const leftCol = document.getElementById('left-col');
const rightCol = document.getElementById('right-col');
const mainContainer = document.getElementById('main-container');
const imagesContainer = document.getElementById('project-images');

const IPHONE_BREAKPOINT = 680;
let isSyncing = false;

// ===============================
// SYNC SCROLL COLONNES
// ===============================
function syncFromLeft() {
  if (window.innerWidth <= IPHONE_BREAKPOINT || isSyncing) return;
  isSyncing = true;
  rightCol.scrollTop = leftCol.scrollHeight - leftCol.scrollTop - leftCol.clientHeight;
  isSyncing = false;
}

function syncFromRight() {
  if (window.innerWidth <= IPHONE_BREAKPOINT || isSyncing) return;
  isSyncing = true;
  leftCol.scrollTop = leftCol.scrollHeight - rightCol.scrollTop - rightCol.clientHeight;
  isSyncing = false;
}

leftCol.addEventListener('scroll', syncFromLeft);
rightCol.addEventListener('scroll', syncFromRight);

// ===============================
// GESTION REDIMENSIONNEMENT
// ===============================
window.addEventListener('resize', () => {
  if (window.innerWidth <= IPHONE_BREAKPOINT) {
    leftCol.scrollTop = 0;
    rightCol.scrollTop = 0;
  } else {
    syncFromLeft();
  }
});

window.addEventListener('load', () => {
  if (window.innerWidth > IPHONE_BREAKPOINT) {
    rightCol.scrollTop = rightCol.scrollHeight - rightCol.clientHeight;
  }
});

// ===============================
// BOUTON LOGO → RETOUR ACCUEIL
// ===============================
function goHome() {
  leftCol.scrollTop = 0;
  rightCol.scrollTop = rightCol.scrollHeight - rightCol.clientHeight;
  mainContainer.classList.remove("hidden");
}

// ===============================
// PROJETS
// ===============================
const projects = {
  proj1: { 
    title: "PROJET 1", 
    subtitle: "Gravure", 
    desc: "Description projet 1", 
    type: "illustration", 
    images: [
      "image/client-logo(1).webp",
      "image/client-logo(4).webp",
      "image/client-logo(2).webp",
      "image/anim-baton(1).webp",
      "image/client-logo(4).webp"
    ] 
  },
  proj2: { 
    title: "PROJET 2", 
    subtitle: "Animation", 
    desc: "Description projet 2", 
    type: "animation", 
    images: [
      "image/client-illu(1).webp",
      "image/anim-baton(1).webp",
      "image/client-illu(2).webp"
    ] 
  },
  proj3: { 
    title: "PROJET 3", 
    subtitle: "Calligraphie", 
    desc: "Description projet 3", 
    type: "illustration", 
    images: [
      "image/client-logo(3).webp",
      "image/client-logo(4).webp"
    ] 
  }
};

// Patterns de disposition des images
const patterns = {
  illustration: { wide:6, tall:2 },
  animation: { wide:5, tall:3 }
};

// ===============================
// CLIC SUR PROJET → AFFICHAGE PAGE PROJET
// ===============================
document.querySelectorAll('.image-box').forEach(box => {
  box.addEventListener('click', () => {
    const key = box.dataset.project;
    const project = projects[key];
    if(!project) return;

    // Remplir infos du projet
    document.getElementById('project-title').innerText = project.title;
    document.getElementById('project-desc').innerText = project.desc;
    document.getElementById('project-subtitle').innerText = project.subtitle;

    // Remplir les images
    imagesContainer.innerHTML = "";
    const pattern = patterns[project.type] || { wide:6, tall:4 };
    project.images.forEach((src, index) => {
      const div = document.createElement("div");
      div.classList.add("project-img");
      if(index % pattern.wide === 0) div.classList.add("wide");
      if(index % pattern.tall === 0) div.classList.add("tall");
      div.innerHTML = `<img src="${src}" alt="">`;
      imagesContainer.appendChild(div);
    });

    // Cacher le container principal
    mainContainer.classList.add("hidden");
  });
});
