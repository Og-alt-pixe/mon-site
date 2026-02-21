document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. BARRE DE PROGRESSION ---
    const progressBar = document.querySelector('.progress-bar');
    
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const pixels = window.pageYOffset || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const percentage = (pixels / height) * 100;
            progressBar.style.width = percentage + '%';
        });
    }

    // --- 2. RÉCUPÉRATION DES ÉLÉMENTS (Accueil + Projets) ---
    const projects = document.querySelectorAll('.grid-item');
    const filters = document.querySelectorAll('.filter-btn');
    const filterNav = document.querySelector('.filter-nav');
    
    // On inclut bien .reveal-mask et .reveal-right
    const itemsToReveal = document.querySelectorAll('.grid-item, .reveal-mask, .reveal-right');

    // --- 3. LOGIQUE DU REVEAL AU SCROLL ---
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { 
    threshold: 0.05, // Déclenche plus tôt
    rootMargin: "0px 0px 200px 0px" // Charge et prépare l'image 200px AVANT qu'elle n'apparaisse
});

    itemsToReveal.forEach(item => {
        revealObserver.observe(item);
    });
    
    if (filterNav) {
        revealObserver.observe(filterNav);
    }

    // --- 4. GESTION DES FILTRES (Accueil) ---
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            filters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projects.forEach(project => {
                if (!project) return; 

                const isMatch = filterValue === 'all' || project.classList.contains(filterValue);
                
                if (isMatch) {
                    project.style.display = "block";
                    setTimeout(() => {
                        project.style.opacity = "1";
                        project.classList.add('is-visible');
                    }, 10);
                } else {
                    project.style.opacity = "0";
                    project.classList.remove('is-visible');
                    setTimeout(() => {
                        if (project.style.opacity === "0") {
                            project.style.display = "none";
                        }
                    }, 400);
                }
            });
        });
    });
});