// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
  } else {
      navbar.classList.remove('scrolled');
  }
});

// Expandable gemstone details
document.querySelectorAll('.expand-btn').forEach(btn => {
  btn.addEventListener('click', () => {
      const details = btn.nextElementSibling;
      details.style.display = details.style.display === 'block' ? 'none' : 'block';
  });
});

// Contact form submission
document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
  };

  try {
      const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
      });
      const result = await res.json();
      document.getElementById('form-message').textContent = result.message.toUpperCase();
      form.reset();
  } catch (error) {
      document.getElementById('form-message').textContent = 'ERROR SENDING MESSAGE';
  }
});