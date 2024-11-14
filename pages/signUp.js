const scriptURL = 'https://script.google.com/macros/s/AKfycbzB_UMexWDjUXplqGW8sjqPi3s_TPFYToVuqGmyZSi2qDGxj969D9H6alJZO6oxvx3yRA/exec';
const signUpForm = document.forms['contact_form'];
const signInForm = document.getElementById('signinForm');

// Function to check if email exists and submit form in a single request
async function checkEmailAndSubmit(formData) {
  try {
    const response = await fetch(scriptURL, {
      method: 'POST',
      body: formData
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Request failed');
  }
}

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Function to validate password strength
function isValidPassword(password) {
  return password.length >= 8;
}

// Function to validate form fields
function validateForm(form) {
  const email = form.querySelector('[name="email"]').value;
  const password = form.querySelector('[name="password"]').value;

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return false;
  }
  
  if (!isValidPassword(password)) {
    alert('Password must be at least 8 characters long.');
    return false;
  }
  
  return true;
}

// Submit sign-up form handler
signUpForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!validateForm(signUpForm)) return;

  const formData = new FormData(signUpForm);
  formData.append('action', 'signUp');

  try {
    const result = await checkEmailAndSubmit(formData);
    if (result.exists) {
      alert('Email already exists');
    } else if (result.success) {
      alert("Thank you! Your form has been submitted successfully.");
      window.location.href = 'dashboard.html';
    } else {
      throw new Error('Form submission failed');
    }
  } catch (error) {
    console.error('Error!', error.message);
    alert('There was an error submitting your form. Please try again later.');
  }
});

// Show sign-in and sign-up forms
document.getElementById('showSignIn').addEventListener('click', function () {
  document.querySelector('.signup-box').style.display = 'none';
  document.querySelector('.signin-box').style.display = 'block';
});

document.getElementById('showSignUp').addEventListener('click', function () {
  document.querySelector('.signup-box').style.display = 'block';
  document.querySelector('.signin-box').style.display = 'none';
});

// Login form handler
signInForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!validateForm(signInForm)) return;

  const formData = new FormData(signInForm);
  formData.append('action', 'signIn');

  try {
    const result = await checkEmailAndSubmit(formData);
    if (result.success) {
      alert("Login successful!");
      window.location.href = 'dashboard.html';
    } else {
      alert("Invalid email or password");
    }
  } catch (error) {
    console.error('Error:', error.message);
    alert('There was an error with the login process. Please try again later.');
  }
});
