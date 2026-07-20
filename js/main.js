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

   // --- COMPTE À REBOURS (COUNTDOWN) ---
function startCountdown() {
    // FIXE LA DATE CIBLE ICI (ex: 15 Octobre 2026 à 09:00:00)
    const targetDate = new Date("October 15, 2026 09:00:00").getTime();

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // Si la date n'est pas encore passée
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Mettre à jour dans le HTML (ajoute un '0' devant si < 10)
            if (document.getElementById("days")) document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            if (document.getElementById("hours")) document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            if (document.getElementById("minutes")) document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            if (document.getElementById("seconds")) document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        } else {
            clearInterval(timer);
        }
    }, 1000);
}

// Lancer le compte à rebours au chargement
document.addEventListener("DOMContentLoaded", startCountdown);

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
document.addEventListener('DOMContentLoaded', () => {
    
    // --- GESTION DES ONGLETS (PROGRAMME) ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // 1. Retirer la classe active de tous les boutons
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // 2. Retirer la classe active de tous les contenus (panes)
                tabPanes.forEach(pane => pane.classList.remove('active'));

                // 3. Activer le bouton cliqué
                button.classList.add('active');

                // 4. Récupérer l'ID cible (ex: "jour2")
                const targetTabId = button.getAttribute('data-tab');
                const targetPane = document.getElementById(targetTabId);

                // 5. Activer le contenu correspondant
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

});
document.addEventListener('DOMContentLoaded', () => {
    // Target date : 15 Octobre 2026 à 09:00:00
    const targetDate = new Date("2026-10-15T09:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance <= 0) {
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Recherche par ID ou par classe CSS (sécurité)
        const daysEl = document.getElementById('days') || document.querySelector('.days-val');
        const hoursEl = document.getElementById('hours') || document.querySelector('.hours-val');
        const minutesEl = document.getElementById('minutes') || document.querySelector('.minutes-val');
        const secondsEl = document.getElementById('seconds') || document.querySelector('.seconds-val');

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    // Exécution immédiate puis toutes les secondes
    updateCountdown();
    setInterval(updateCountdown, 1000);
});