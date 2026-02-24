document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Clear previous errors
  clearErrors();
  document.getElementById('generalError').textContent = '';

  // Get form values
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  // Validation
  let isValid = true;

  if (!username) {
    showError('usernameError', 'Username is required');
    isValid = false;
  } else if (username.length < 3) {
    showError('usernameError', 'Username must be at least 3 characters');
    isValid = false;
  }

  if (!email) {
    showError('emailError', 'Email is required');
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError('emailError', 'Please enter a valid email address');
    isValid = false;
  }

  if (!password) {
    showError('passwordError', 'Password is required');
    isValid = false;
  } else if (password.length < 6) {
    showError('passwordError', 'Password must be at least 6 characters');
    isValid = false;
  }

  if (!confirmPassword) {
    showError('confirmPasswordError', 'Please confirm your password');
    isValid = false;
  } else if (password !== confirmPassword) {
    showError('confirmPasswordError', 'Passwords do not match');
    isValid = false;
  }

  if (!isValid) {
    return;
  }

  // Send registration request
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        email,
        password,
        confirmPassword
      })
    });

    const data = await response.json();

    if (data.success) {
      // Show success message
      document.getElementById('successMessage').textContent = data.message;
      document.getElementById('successMessage').classList.add('show');

      // Clear form
      document.getElementById('registerForm').reset();

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

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
