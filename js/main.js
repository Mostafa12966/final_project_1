const themeToggle = document.getElementById("themeToggle");
const scrollTopBtn = document.getElementById("scrollTopBtn");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i> Light Mode';
    }
  } else {
    document.body.classList.remove("dark-mode");
    if (themeToggle) {
      themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i> Dark Mode';
    }
  }
  localStorage.setItem("freelanceX-theme", theme);
}

function getStoredTheme() {
  return localStorage.getItem("freelanceX-theme");
}

function initTheme() {
  const stored = getStoredTheme();
  if (stored) {
    applyTheme(stored);
    return;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

function toggleTheme() {
  const active = document.body.classList.contains("dark-mode")
    ? "dark"
    : "light";
  applyTheme(active === "dark" ? "light" : "dark");
}

function showScrollButton() {
  if (!scrollTopBtn) return;
  if (window.scrollY > 250) {
    scrollTopBtn.style.display = "flex";
  } else {
    scrollTopBtn.style.display = "none";
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

function revealOnScroll() {
  document.querySelectorAll(".reveal").forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      element.classList.add("revealed");
    }
  });
}

function setFieldState(field, message, isValid) {
  const feedback = document.getElementById(field.id + "Error");
  field.classList.remove("is-valid", "is-invalid");
  if (isValid) {
    field.classList.add("is-valid");
    if (feedback) feedback.textContent = "";
  } else {
    field.classList.add("is-invalid");
    if (feedback) feedback.textContent = message;
  }
}

function validateContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const messageField = document.getElementById("message");
    const formMessage = document.getElementById("formMessage");

    let valid = true;
    const namePattern = /^[a-zA-Z\s]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Validate name
    const nameValue = nameField.value.trim();
    if (!nameValue) {
      setFieldState(nameField, "Please enter your name.", false);
      valid = false;
    } else if (nameValue.length < 2) {
      setFieldState(
        nameField,
        "Name must be at least 2 characters long.",
        false,
      );
      valid = false;
    } else if (!namePattern.test(nameValue)) {
      setFieldState(
        nameField,
        "Name can only contain letters and spaces.",
        false,
      );
      valid = false;
    } else {
      setFieldState(nameField, "", true);
    }

    // Validate email
    const emailValue = emailField.value.trim();
    if (!emailValue) {
      setFieldState(emailField, "Please enter your email.", false);
      valid = false;
    } else if (!emailPattern.test(emailValue)) {
      setFieldState(emailField, "Please enter a valid email address.", false);
      valid = false;
    } else {
      setFieldState(emailField, "", true);
    }

    // Validate message
    const messageValue = messageField.value.trim();
    if (!messageValue) {
      setFieldState(messageField, "Please enter a message.", false);
      valid = false;
    } else if (messageValue.length < 10) {
      setFieldState(
        messageField,
        "Message must be at least 10 characters.",
        false,
      );
      valid = false;
    } else if (messageValue.length > 500) {
      setFieldState(
        messageField,
        "Message must not exceed 500 characters.",
        false,
      );
      valid = false;
    } else {
      setFieldState(messageField, "", true);
    }

    if (valid) {
      formMessage.textContent =
        "Your message looks great — we will be in touch soon.";
      formMessage.style.color = "var(--success-color)";
      form.reset();
      [nameField, emailField, messageField].forEach((field) =>
        field.classList.remove("is-valid"),
      );
    } else {
      formMessage.textContent =
        "Please fix the highlighted fields before sending.";
      formMessage.style.color = "var(--danger-color)";
    }
  });
}

window.addEventListener("DOMContentLoaded", function () {
  initTheme();
  setupSmoothScroll();
  validateContactForm();
  revealOnScroll();
});

window.addEventListener("scroll", function () {
  showScrollButton();
  revealOnScroll();
});

if (themeToggle) {
  themeToggle.addEventListener("click", toggleTheme);
}

if (scrollTopBtn) {
  scrollTopBtn.addEventListener("click", scrollToTop);
}
