const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');
const backToTop = document.querySelector('.back-to-top');
const year = document.querySelector('#year');
const revealItems = document.querySelectorAll('.reveal');

if (year) {
	year.textContent = new Date().getFullYear();
}

if (menuToggle && navMenu) {
	menuToggle.addEventListener('click', () => {
		const isOpen = navMenu.classList.toggle('open');
		menuToggle.setAttribute('aria-expanded', String(isOpen));
	});

	navMenu.querySelectorAll('a').forEach((link) => {
		link.addEventListener('click', () => {
			navMenu.classList.remove('open');
			menuToggle.setAttribute('aria-expanded', 'false');
		});
	});
}

const observer = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		}
	});
}, { threshold: 0.12 });

revealItems.forEach((item) => observer.observe(item));

window.addEventListener('scroll', () => {
	backToTop?.classList.toggle('visible', window.scrollY > 500);
}, { passive: true });

backToTop?.addEventListener('click', () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
});
