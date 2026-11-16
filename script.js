const bagTrigger = document.querySelector('.bag-trigger');
const bagDrawer = document.querySelector('.bag-drawer');
const backdrop = document.querySelector('.drawer-backdrop');
const closeBagButton = document.querySelector('.close-bag');
const bagContent = document.querySelector('.bag-content');
const bagCount = document.querySelector('.bag-count');
const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');
let quantity = 0;
let previousFocus = null;

function renderBag() {
  bagCount.textContent = quantity;
  if (quantity === 0) {
    bagContent.innerHTML = '<p class="bag-empty">Your bag is taking a moment.<br>Find something made for your everyday.</p>';
    return;
  }
  bagContent.innerHTML = `
    <div class="bag-item">
      <img src="Meridian%20Silver.png" alt="Meridian Silver watch">
      <div>
        <h3>Meridian Silver</h3>
        <p>Brushed steel / Matte black dial</p>
        <div class="quantity-controls">
          <button type="button" data-action="decrease" aria-label="Decrease quantity">−</button>
          <span aria-label="Quantity">${quantity}</span>
          <button type="button" data-action="increase" aria-label="Increase quantity">+</button>
        </div>
        <button class="remove-item" type="button" data-action="remove">Remove</button>
      </div>
    </div>`;
}

function openBag() {
  previousFocus = document.activeElement;
  backdrop.hidden = false;
  bagDrawer.classList.add('open');
  bagDrawer.setAttribute('aria-hidden', 'false');
  document.body.classList.add('drawer-open');
  closeBagButton.focus();
}

function closeBag() {
  backdrop.hidden = true;
  bagDrawer.classList.remove('open');
  bagDrawer.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('drawer-open');
  if (previousFocus) previousFocus.focus();
}

bagTrigger.addEventListener('click', openBag);
closeBagButton.addEventListener('click', closeBag);
backdrop.addEventListener('click', closeBag);
document.querySelector('.add-to-bag').addEventListener('click', () => {
  quantity += 1;
  renderBag();
  openBag();
});
bagContent.addEventListener('click', (event) => {
  const action = event.target.closest('button')?.dataset.action;
  if (action === 'increase') quantity += 1;
  if (action === 'decrease') quantity = Math.max(0, quantity - 1);
  if (action === 'remove') quantity = 0;
  if (action) renderBag();
});
bagDrawer.querySelector('.drawer-footer a').addEventListener('click', closeBag);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && bagDrawer.classList.contains('open')) closeBag();
  if (event.key === 'Tab' && bagDrawer.classList.contains('open')) {
    const focusable = [...bagDrawer.querySelectorAll('button, a[href]')];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  menuToggle.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  mobileNav.hidden = expanded;
});
mobileNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    mobileNav.hidden = true;
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();
renderBag();
