document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous errors
  clearErrors();
  document.getElementById('generalError').textContent = '';

  // Get form values
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  // Validation
  let isValid = true;

  if (!username) {
    showError('usernameError', 'Username is required');
    isValid = false;
  }

  if (!password) {
    showError('passwordError', 'Password is required');
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  // Send login request
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      // Store user data in localStorage
      localStorage.setItem('userData', JSON.stringify(data.user));

      // Show success message
      document.getElementById('successMessage').textContent = data.message;
      document.getElementById('successMessage').classList.add('show');

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = data.redirect;
      }, 2000);
    } else {
      // Show error message
      document.getElementById('generalError').textContent = data.message;
    }
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('generalError').textContent = 'An error occurred. Please try again.';
  }
});

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  errorElement.textContent = message;
  errorElement.classList.add('show');

  // Add error class to input
  const fieldName = elementId.replace('Error', '');
  const inputElement = document.getElementById(fieldName);
  if (inputElement) {
    inputElement.parentElement.classList.add('error');
  }
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error-message');
  errorElements.forEach(el => {
    el.textContent = '';
    el.classList.remove('show');
  });

  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach(el => {
    el.classList.remove('error');
  });
}
