document.addEventListener('DOMContentLoaded', () => {
    
    // On récupère les éléments
    const projects = document.querySelectorAll('.grid-item');
    const filters = document.querySelectorAll('.filter-btn');
    const filterNav = document.querySelector('.filter-nav');

    // --- 1. REVEAL AU SCROLL ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    // On n'applique l'observeur que si les éléments existent
    if (projects.length > 0) {
        projects.forEach(project => revealObserver.observe(project));
    }
    
    if (filterNav) {
        revealObserver.observe(filterNav);
    }

    // --- 2. GESTION DES FILTRES ---
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // 1. Gérer l'état actif des boutons
            filters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            // 2. Filtrer les projets
            projects.forEach(project => {
                // VERIFICATION : on vérifie que project existe avant de toucher au .style
                if (!project) return; 

                const isMatch = filterValue === 'all' || project.classList.contains(filterValue);
                
                if (isMatch) {
                    project.style.display = "block"; // Utilisation du style sécurisée
                    setTimeout(() => {
                        project.style.opacity = "1";
                        project.classList.add('is-visible');
                    }, 10);
                } else {
                    project.style.opacity = "0";
                    project.classList.remove('is-visible');
                    setTimeout(() => {
                        // On vérifie encore si on doit vraiment le cacher (si l'utilisateur n'a pas re-cliqué)
                        if (project.style.opacity === "0") {
                            project.style.display = "none";
                        }
                    }, 400);
                }
            });
        });
    });
});