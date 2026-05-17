document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const nav = document.querySelector('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // 2. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');

    const revealFunction = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealFunction);
    revealFunction();

    // 3. Form Submission Handling
    const form = document.getElementById('registrationForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;

        // Prevent double click
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';

        // Get form data
        const nom = document.getElementById('nom').value.trim();
        const prenom = document.getElementById('prenom').value.trim();
        const num = document.getElementById('telephone').value.trim();
        const adress = document.getElementById('adresse').value.trim();
        const univ = document.getElementById('ecole').value.trim();

        try {
            await fetch("https://script.google.com/macros/s/AKfycbzesx4mVuj9ibE2nJMN4dMXKvgtxsYd4e0i8daHlVN35yKj7tx4Y7gedq0GUMiXH4aDKg/exec", {
                method: "POST",
                mode: "no-cors",
                body: new URLSearchParams({
                    nom,
                    prenom,
                    num,
                    adress,
                    univ
                })
            });

            // IMPORTANT:
            // This only means "request sent", NOT confirmed success
            Swal.fire({
                title: 'Formulaire envoyé !',
                text: 'Vos informations ont bien été envoyées.',
                icon: 'success',
                confirmButtonColor: '#00a8ff',
                confirmButtonText: 'OK'
            });

            form.reset();

        } catch (error) {
            console.error('Error submitting form:', error);

            Swal.fire({
                title: 'Erreur',
                text: 'Impossible d’envoyer le formulaire. Vérifiez votre connexion et réessayez.',
                icon: 'error',
                confirmButtonColor: '#ff3366'
            });

        } finally {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });

    // 4. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});