document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. GESTION DU MODE SOMBRE / LUMINEUX ---
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('i');

    // Vérifie le choix précédent de l'utilisateur stocké localement
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggle.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = theme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            icon.className = 'fa-solid fa-sun';
        } else {
            icon.className = 'fa-solid fa-moon';
        }
    }

    // --- 2. NAVBAR DÉFILANTE EFFECT & BOUTON RETOUR EN HAUT ---
    const header = document.querySelector('.navbar-header');
    const scrollTopBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', () => {
     if (window.scrollY > 50) {
        header.classList.add('scrolled');
        } else {
        header.classList.remove('scrolled');
        }
});

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 3. COMPTE À REBOURS TEXTUEL DYNAMIQUE ---
    // Date cible fixée au 15 Octobre 2026 à 09:00:00 (Lancement du Sommet)
    const countdownDate = new Date('October 15, 2026 09:00:00').getTime();

    const countdownTimer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // Calcul du temps pour les Jours, Heures, Minutes, Secondes
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Sélection et injection dans les nœuds HTML correspondants
        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

        // Si la date est dépassée, arrêter le compte à rebours
        if (distance < 0) {
            clearInterval(countdownTimer);
            document.querySelector('.countdown-container').innerHTML = "<p>Le sommet a commencé !</p>";
        }
    }, 1000);

    // --- 4. MISE À JOUR AUTOMATIQUE DE L'ANNÉE DU FOOTER ---
    document.getElementById('footer-year').textContent = new Date().getFullYear();

    // --- 5. MENU HAMBURGER MOBILE ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const isOpened = navLinks.classList.contains('active');
        hamburger.innerHTML = isOpened ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
});
// =======================================================
// ANIMATION DES COMPTEURS AU SCROLL (INTERSECTION OBSERVER)
// =======================================================

const animateCounters = () => {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const updateCount = () => {
            const target = +stat.getAttribute('data-target'); // On récupère la valeur cible (+1200, 48, etc.)
            const count = +stat.innerText; // On récupère la valeur actuelle (commence à 0)
            
            // On calcule la vitesse de l'incrémentation
            const speed = target / 80; // Divise pour avoir une animation fluide en environ 1.5s
            
            if (count < target) {
                // On ajoute la fraction et on arrondit à l'entier supérieur
                stat.innerText = Math.ceil(count + speed);
                setTimeout(updateCount, 20); // Relance toutes les 20ms
            } else {
                // Une fois la cible atteinte, on affiche le chiffre propre (avec un "+" pour le 1200)
                stat.innerText = target === 1200 ? `+${target}` : target;
            }
        };
        
        updateCount();
    });
};

// Configuration de l'Intersection Observer
const statsSection = document.querySelector('.stats-section');

if (statsSection) {
    const observerOptions = {
        root: null, // Surveille par rapport à la fenêtre du navigateur (Viewport)
        threshold: 0.3 // L'animation démarre quand 30% de la section est visible à l'écran
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters(); // On lance l'animation
                observer.unobserve(entry.target); // On arrête de surveiller pour ne la lancer qu'une seule fois
            }
        });
    }, observerOptions);

    observer.observe(statsSection);
}