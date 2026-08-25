const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.header nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav.classList.toggle('is-open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}));

const observer = new IntersectionObserver((entries) => entries.forEach(({ isIntersecting, target }) => {
  if (isIntersecting) {
    target.classList.add('is-visible');
    observer.unobserve(target);
  }
}), { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
