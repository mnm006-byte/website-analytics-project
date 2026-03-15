document.addEventListener('DOMContentLoaded', function() {

const yearSpan = document.getElementById('year');
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

const mobileToggle = document.getElementById('mobile-menu-toggle');
const siteNav = document.getElementById('site-nav');
if (mobileToggle && siteNav) {
mobileToggle.addEventListener('click', () => {
siteNav.classList.toggle('open');
mobileToggle.classList.toggle('open');
});
}

document.querySelectorAll('a.nav-link[href^="#"]').forEach(a => {
a.addEventListener('click', (e) => {
e.preventDefault();
const id = a.getAttribute('href');
const el = document.querySelector(id);
if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
if (siteNav && siteNav.classList.contains('open'))
siteNav.classList.remove('open');
});
});

const io = new IntersectionObserver((entries) => {
entries.forEach(ent => {
if (ent.isIntersecting) {

ent.target.classList.add('in-view');
io.unobserve(ent.target);
}
});
}, { threshold: 0.12 });
document.querySelectorAll('.section, .project, .service-card,.about-image, .hero-image').forEach(el => {el.classList.add('pre-reveal');io.observe(el);
});

const projects = document.querySelectorAll('.project');
const modal = document.getElementById('project-modal');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalYear = document.getElementById('modal-year');
const modalDesc = document.getElementById('modal-desc');
const modalClose = document.getElementById('modal-close');
function openModalFor(el){
const img = el.querySelector('img');
const src = img ? img.src : '';
const title = el.dataset.title || '';
const year = el.dataset.year || '';
const desc = el.dataset.desc || '';
modalImage.src = src;
modalImage.alt = title;
modalTitle.textContent = title;
modalYear.textContent = year;
modalDesc.textContent = desc;
modal.classList.add('open');
modal.setAttribute('aria-hidden','false');
document.body.style.overflow = 'hidden';
}
projects.forEach(p => {
p.addEventListener('click', () => openModalFor(p));
p.addEventListener('keydown', (e) => {

if (e.key === 'Enter' || e.key === ' ') { e.preventDefault();
openModalFor(p); }
});
});
function closeModal(){
if (!modal) return;
modal.classList.remove('open');
modal.setAttribute('aria-hidden','true');
document.body.style.overflow = '';
}
if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => {
if (e.target === modal) closeModal();
});
document.addEventListener('keydown', (e) => {
if (e.key === 'Escape') closeModal();
});

const btnBook = document.getElementById('btn-book');
const btnTouch = document.getElementById('btn-touch');
const panelBook = document.getElementById('form-book');
const panelTouch = document.getElementById('form-touch');
if (btnBook && btnTouch && panelBook && panelTouch) {
btnBook.addEventListener('click', () => {
panelBook.classList.toggle('active');
panelTouch.classList.remove('active');
panelBook.setAttribute('aria-hidden',
!panelBook.classList.contains('active'));
});
btnTouch.addEventListener('click', () => {
panelTouch.classList.toggle('active');
panelBook.classList.remove('active');
panelTouch.setAttribute('aria-hidden',
!panelTouch.classList.contains('active'));
});
}

const bookingForm = document.getElementById('booking-form');
const touchForm = document.getElementById('touch-form');

function createOrGetBox(form, className) {
let box = form.querySelector('.' + className);
if (!box) {
box = document.createElement('div');
box.className = className;
box.setAttribute('aria-live', 'polite');
form.prepend(box);
}
return box;
}
function clearFieldError(field) {
if (!field) return;
const fe = field.closest('label') ?
field.closest('label').querySelector('.field-error') :
field.parentNode.querySelector('.field-error');
if (fe) fe.remove();
field.classList.remove('input-error');
field.removeAttribute('aria-invalid');
}
function showFieldError(field, message) {
if (!field) return;
clearFieldError(field);
const el = document.createElement('div');
el.className = 'field-error';
el.textContent = message;
el.style.marginTop = '6px';
el.style.fontSize = '0.95rem';
el.style.color = '#b00020';
if (field.parentNode && field.parentNode.tagName &&
field.parentNode.tagName.toLowerCase() === 'label') {

field.parentNode.parentNode.insertBefore(el,
field.parentNode.nextSibling);
} else {
field.parentNode.insertBefore(el, field.nextSibling);
}
field.classList.add('input-error');
field.setAttribute('aria-invalid', 'true');
}
function clearFormErrors(form) {
if (!form) return;
const top = form.querySelector('.form-errors');
if (top) top.remove();
const succ = form.querySelector('.form-success');
if (succ) succ.remove();
form.querySelectorAll('.field-error').forEach(n => n.remove());
form.querySelectorAll('.input-error').forEach(n =>
n.classList.remove('input-error'));
form.querySelectorAll('[aria-invalid="true"]').forEach(n =>
n.removeAttribute('aria-invalid'));
}
function showFormErrors(form, messages) {
clearFormErrors(form);
const box = createOrGetBox(form, 'form-errors');
box.style.cssText = 'background:#fff4f4;border:1px solid #f5c2c2;color:#7a1414;padding:10px;border-radius:6px;margin-bottom:12px;font-size:0.95rem;';box.innerHTML = '<strong>Please fix the following:</strong><ulstyle="margin:.5rem 0 0;padding-left:1.2rem;">' +messages.map(m => `<li>${m}</li>`).join('') + '</ul>';
}
function showFormSuccess(form, message) {
clearFormErrors(form);
const box = createOrGetBox(form, 'form-success');box.style.cssText = 'background:#f0fff4;border:1px solid #cfe9d2;color: #1b7a2b; padding:10px; border-radius:6px; margin-bottom:12px; font-size:0.95rem;';box.textContent = message;setTimeout(() => {const b = form.querySelector('.form-success');
if (b) b.remove();}, 5000);}

function isValidEmail(value) {
if (!value) return false;
return /^[^\s@]+@[^\s@]+\.(?:com|in)$/i.test(value.trim());
}
function isValidPhone(value) {
if (!value) return false;
return /^\d{10}$/.test(value.trim());
}

function validateBooking(form) {
clearFormErrors(form);
const errors = [];
const name = form.querySelector('input[name="name"]');
const email = form.querySelector('input[name="email"]');
const phone = form.querySelector('input[name="phone"]') ||
form.querySelector('input[name="contact"]') ||
form.querySelector('input[type="tel"]');
const date = form.querySelector('input[name="date"]');
const brief = form.querySelector('textarea[name="brief"]') ||
form.querySelector('textarea[name="message"]') ||
form.querySelector('textarea[name="query"]');
if (!name || name.value.trim() === '') {
errors.push('Name is required.');
if (name) showFieldError(name, 'Name is required.');
}

if (!email || email.value.trim() === '') {
errors.push('Email is required.');
if (email) showFieldError(email, 'Email is required.');
} else if (!isValidEmail(email.value)) {
errors.push('Enter a valid email that contains "@" and ends with.com or .in.');
if (email) showFieldError(email, 'Enter a valid email (e.g.name@example.com).');
}
if (!phone || phone.value.trim() === '') {
errors.push('Contact number is required.');
if (phone) showFieldError(phone, 'Contact number is required.');
} else if (!isValidPhone(phone.value)) {
errors.push('Contact number must be exactly 10 digits.');
if (phone) showFieldError(phone, 'Contact number must be 10 digits(numbers only).');
}
if (!date || date.value.trim() === '') {
errors.push('Please select a booking date.');
if (date) showFieldError(date, 'Please choose a date.');
}
if (errors.length) {
showFormErrors(form, errors);
return false;
}
return true;
}

function validateTouch(form) {
clearFormErrors(form);
const errors = [];
const name = form.querySelector('input[name="name"]');
const email = form.querySelector('input[name="email"]');

const phone = form.querySelector('input[name="phone"]') ||
form.querySelector('input[name="contact"]') ||
form.querySelector('input[type="tel"]');
const message = form.querySelector('textarea[name="message"]') ||
form.querySelector('textarea[name="brief"]') ||
form.querySelector('textarea[name="query"]');
if (!name || name.value.trim() === '') {
errors.push('Name is required.');
if (name) showFieldError(name, 'Name is required.');
}
if (!email || email.value.trim() === '') {
errors.push('Email is required.');
if (email) showFieldError(email, 'Email is required.');
} else if (!isValidEmail(email.value)) {
errors.push('Enter a valid email that contains "@" and ends with.com or .in.');
if (email) showFieldError(email, 'Enter a valid email (e.g.name@example.com).');
}
if (phone && phone.value.trim() !== '' && !isValidPhone(phone.value))
{
errors.push('If provided, contact number must be exactly 10 digits.');
showFieldError(phone, 'Contact number must be 10 digits.');
}
if (!message || message.value.trim() === '') {
errors.push('Please enter your query or message.');
if (message) showFieldError(message, 'Please enter a message.');
}
if (errors.length) {
showFormErrors(form, errors);
return false;
}
return true;
}

if (bookingForm) {
bookingForm.addEventListener('submit', function(e) {
if (!validateBooking(this)) {
e.preventDefault();
return;
}
e.preventDefault();
showFormSuccess(this, 'Booking request submitted (demo). We will contact you soon.');
this.reset();
});

bookingForm.querySelectorAll('input, textarea').forEach(el => {
el.addEventListener('blur', () => {
clearFieldError(el);
if (el.name === 'email') {
if (el.value.trim() === '') showFieldError(el, 'Email isrequired.');
else if (!isValidEmail(el.value)) showFieldError(el, 'Email mustcontain "@" and end with .com or .in.');
} else if (el.type === 'tel' || el.name === 'phone' || el.name ===
'contact') {
if (el.value.trim() !== '' && !isValidPhone(el.value))
showFieldError(el, 'Contact number must be 10 digits.');
} else if (el.name === 'name') {
if (el.value.trim() === '') showFieldError(el, 'Name isrequired.');
} else if (el.name === 'date') {
if (el.value.trim() === '') showFieldError(el, 'Please choose adate.');
}
});
});
}

if (touchForm) {
touchForm.addEventListener('submit', function(e) {
if (!validateTouch(this)) {
e.preventDefault();
return;
}
e.preventDefault();
showFormSuccess(this, 'Message sent (demo). Thank you — we willreply soon.');
this.reset();
});
touchForm.querySelectorAll('input, textarea').forEach(el => {
el.addEventListener('blur', () => {
clearFieldError(el);
if (el.name === 'email') {
if (el.value.trim() === '') showFieldError(el, 'Email isrequired.');
else if (!isValidEmail(el.value)) showFieldError(el, 'Email mustcontain "@" and end with .com or .in.');
} else if (el.type === 'tel' || el.name === 'phone' || el.name ===
'contact') {
if (el.value.trim() !== '' && !isValidPhone(el.value))
showFieldError(el, 'Contact number must be 10 digits.');
} else if (el.name === 'name') {
if (el.value.trim() === '') showFieldError(el, 'Name isrequired.');
} else if (el.tagName.toLowerCase() === 'textarea') {
if (el.value.trim() === '') showFieldError(el, 'Please enter amessage.');
}
});
});
}

document.addEventListener('focus', function(e){
if (modal && modal.classList.contains('open') &&
!modal.contains(e.target)) {

e.stopPropagation();
modalClose && modalClose.focus();
}
}, true);});