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
    // Trigger once on load
    revealFunction();

    // 3. Form Submission Handling
    const form = document.getElementById('registrationForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('button[type="submit"]');
        const originalText = btn.innerHTML;
        
        // Change button state
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
        btn.disabled = true;

        // Get form data
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const num = document.getElementById('telephone').value;
        const adress = document.getElementById('adresse').value;
        const univ = document.getElementById('ecole').value;

        try {
            // Actual fetch request to Google Apps Script
            await fetch("https://script.google.com/macros/s/AKfycbzF3UKTS1hu3YtsK3kA0UzBBDvzoDjAW5J6Lxbn5q9P12c1wf1KI2nwac3pI74p-F-31A/exec", {
                method: "POST",
                body: new URLSearchParams({
                    nom: nom,
                    prenom: prenom,
                    num: num,
                    adress: adress,
                    univ: univ
                })
            });

            // Success state - SweetAlert2 Pop up
            Swal.fire({
                title: 'Inscription réussie !',
                text: 'Vos informations ont été enregistrées avec succès. Préparez votre carte étudiante pour le jour J !',
                icon: 'success',
                confirmButtonColor: '#00a8ff',
                confirmButtonText: 'Super !'
            });

            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire({
                title: 'Oups...',
                text: 'Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.',
                icon: 'error',
                confirmButtonColor: '#ff3366'
            });
        } finally {
            // Revert button
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    });

    // 4. Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Offset for fixed header
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
