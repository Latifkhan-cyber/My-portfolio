/* =========================================================================
   script.js  —  Portfolio interactivity for Latif Khan's portfolio
   Author : Latif Khan
   Stack  : Vanilla JavaScript (no frameworks / libraries needed)
   Notes  : This file adds smooth navigation, a working contact form,
            a sticky navbar effect and a simple mobile menu toggle.
            All behaviour is kept lightweight so the page stays fast.
   ========================================================================= */


/* -------------------------------------------------------------------------
   1. Wait for the DOM to be fully loaded before running any code.
      This guarantees every element we reference actually exists.
   ------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {

    /* ---------------------------------------------------------------------
       2. Smooth scrolling for all in-page anchor links (#home, #about, ...)
          The browser's native scrollIntoView gives a smooth glide.
       --------------------------------------------------------------------- */
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href'); // e.g. "#about"

            // Ignore a bare "#" just in case
            if (targetId === '#') {
                return;
            }

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                event.preventDefault(); // stop the instant jump
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    /* ---------------------------------------------------------------------
       3. "Hire Me" button -> smooth scroll to the contact section.
          (Kept here so the HTML stays clean of inline onclick handlers.)
       --------------------------------------------------------------------- */
    const hireMeBtn = document.querySelector('nav button');

    if (hireMeBtn) {
        hireMeBtn.addEventListener('click', function () {
            const contactSection = document.getElementById('contact');

            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }


    /* ---------------------------------------------------------------------
       4. Contact form handling.
          We prevent the default page reload, show a friendly confirmation,
          and reset the form. (No backend yet — swap this for a fetch()
          call to your email/API service when you have one.)
       --------------------------------------------------------------------- */
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // stop the browser from reloading

            // Grab the values the user typed (handy for future backend use)
            const name  = document.getElementById('cname').value.trim();
            const email = document.getElementById('cemail').value.trim();
            const msg   = document.getElementById('cmsg').value.trim();

            // Simple guard: make sure nothing is empty
            if (name && email && msg) {
                alert('Thanks ' + name + '! I will get back to you soon.');
                contactForm.reset(); // clear the inputs
            } else {
                alert('Please fill in all the fields before sending.');
            }
        });
    }


    /* ---------------------------------------------------------------------
       5. Add a subtle "scrolled" shadow to the navbar once the user
          scrolls down a little — improves readability over content.
       --------------------------------------------------------------------- */
    const header = document.querySelector('header');

    if (header) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 40) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }


    /* ---------------------------------------------------------------------
       6. Optional: build a mobile hamburger menu toggle.
          If you add a <button class="menu-toggle"> in the navbar later,
          this will show/hide the nav links on small screens.
       --------------------------------------------------------------------- */
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('open'); // CSS controls the open/closed look
        });
    }

});
