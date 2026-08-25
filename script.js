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

const calculator = document.querySelector('.calculator');
const calculatorOpen = document.querySelector('.calculator-open');
const calculatorClose = document.querySelector('.dialog-close');
const tariff = document.querySelector('#tariff');
const total = document.querySelector('#total');

calculatorOpen.addEventListener('click', () => calculator.showModal());
calculatorClose.addEventListener('click', () => calculator.close());
calculator.addEventListener('click', (event) => {
  if (event.target === calculator) calculator.close();
});

const updateTotal = () => {
  const extras = [...calculator.querySelectorAll('input:checked')]
    .reduce((sum, input) => sum + Number(input.value), 0);
  total.textContent = `${(Number(tariff.value) + extras).toLocaleString('ru-RU')} ₽`;
};

tariff.addEventListener('change', updateTotal);
calculator.querySelectorAll('input').forEach((input) => input.addEventListener('change', updateTotal));
