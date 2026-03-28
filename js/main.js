
const themeToggle = document.getElementById('themeToggle');
const scrollTopBtn = document.getElementById('scrollTopBtn');

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
    }
  } else {
    document.body.classList.remove('dark-mode');
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
    }
  }
  localStorage.setItem('freelanceX-theme', theme);
}

function getStoredTheme() {
  return localStorage.getItem('freelanceX-theme');
}

function initTheme() {
  const stored = getStoredTheme();
  if (stored) {
    applyTheme(stored);
    return;
  }
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(prefersDark ? 'dark' : 'light');
}

function toggleTheme() {
  const active = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  applyTheme(active === 'dark' ? 'light' : 'dark');
}

function showScrollButton() {
  if (!scrollTopBtn) return;
  if (window.scrollY > 250) {
    scrollTopBtn.style.display = 'flex';
  } else {
    scrollTopBtn.style.display = 'none';
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function revealOnScroll() {
  document.querySelectorAll('.reveal').forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      element.classList.add('revealed');
    }
  });
}

function setFieldState(field, message, isValid) {
  const feedback = document.getElementById(field.id + 'Error');
  field.classList.remove('is-valid', 'is-invalid');
  if (isValid) {
    field.classList.add('is-valid');
    if (feedback) feedback.textContent = '';
  } else {
    field.classList.add('is-invalid');
    if (feedback) feedback.textContent = message;
  }
}

function validateContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');
    const formMessage = document.getElementById('formMessage');

    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameField.value.trim()) {
      setFieldState(nameField, 'Please enter your name.', false);
      valid = false;
    } else {
      setFieldState(nameField, '', true);
    }

    if (!emailField.value.trim()) {
      setFieldState(emailField, 'Please enter your email.', false);
      valid = false;
    } else if (!emailPattern.test(emailField.value.trim())) {
      setFieldState(emailField, 'Please enter a valid email address.', false);
      valid = false;
    } else {
      setFieldState(emailField, '', true);
    }

    const messageValue = messageField.value.trim();
    if (!messageValue) {
      setFieldState(messageField, 'Please enter a message.', false);
      valid = false;
    } else if (messageValue.length < 10) {
      setFieldState(messageField, 'Message must be at least 10 characters.', false);
      valid = false;
    } else {
      setFieldState(messageField, '', true);
    }

    if (valid) {
      formMessage.textContent = 'Your message looks great — we will be in touch soon.';
      formMessage.style.color = 'var(--success-color)';
      form.reset();
      [nameField, emailField, messageField].forEach((field) => field.classList.remove('is-valid'));
    } else {
      formMessage.textContent = 'Please fix the highlighted fields before sending.';
      formMessage.style.color = 'var(--danger-color)';
    }
  });
}

window.addEventListener('DOMContentLoaded', function () {
  initTheme();
  setupSmoothScroll();
  validateContactForm();
  revealOnScroll();
});

window.addEventListener('scroll', function () {
  showScrollButton();
  revealOnScroll();
});

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', scrollToTop);
}

document.getElementById("btn").addEventListener("click",function(m){

m.preventDefault();



let phone=document.getElementById("phone").value;
let email=document.getElementById("email").value;
let Masseage=document.getElementById("Masseage").value;
let isValid=true

// //////////////////////////////////////////

document.getElementById("phone").style.border="2px solid black";
document.getElementById("email").style.border="2px solid black";
document.getElementById("Masseage").style.border="2px solid black";


// /////////////////////////////////////////////

document.getElementById("p1").innerHTML=""
document.getElementById("p2").innerHTML=""
document.getElementById("p3").innerHTML=""
document.getElementById("p").innerHTML=""

// Conditions


if (phone === "" || email === "" || Masseage === "") {
    document.getElementById("p").innerHTML="please enter Your data"
    return;
}

if(isNaN(phone) || phone.length>12){
document.getElementById("p1").innerHTML="not a valid number"
document.getElementById("phone").style.border="2px solid red";
isValid = false;
}
if(!email.includes("@") || !email.includes(".")){
document.getElementById("p2").innerHTML="not a valid email"
document.getElementById("email").style.border="2px solid red";
isValid = false;
}
if(Masseage.length>50){
document.getElementById("p3").innerHTML="Don't be more than 50 letters"
document.getElementById("Masseage").style.border="2px solid red";
isValid = false;
}
if (isValid) {
    document.getElementById("p").innerHTML="All data is Correct"
}
}
    
)

let btn1 = document.getElementById("scrollTopBtn");

window.onscroll = function () {
  if (document.documentElement.scrollTop > 200) {
    btn1.style.display = "block";
  } else {
    btn1.style.display = "none";
  }
};


btn1.onclick = function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
};

