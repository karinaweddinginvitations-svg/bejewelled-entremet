const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}));

const dialog = document.querySelector('.calculator');
document.querySelector('.calculator-open').addEventListener('click', () => dialog.showModal());
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
const tariff = document.querySelector('#tariff');
const total = document.querySelector('#total');
const updateTotal = () => {
  const extra = [...dialog.querySelectorAll('input:checked')].reduce((sum, item) => sum + Number(item.value), 0);
  total.textContent = `${(Number(tariff.value) + extra).toLocaleString('ru-RU')} ₽`;
};
tariff.addEventListener('change', updateTotal);
dialog.querySelectorAll('input').forEach((input) => input.addEventListener('change', updateTotal));

const observer = new IntersectionObserver((entries) => entries.forEach(({ isIntersecting, target }) => {
  if (isIntersecting) { target.classList.add('is-visible'); observer.unobserve(target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
