
const registerBtn = document.getElementById('register-btn');

registerBtn.addEventListener('click', function() {
  const name = document.getElementById('name').value;
  const gender = document.getElementById('gender').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const userType = document.getElementById('user-type').value;
  
  const data = {
    name: name,
    gender: gender,
    email: email,
    password: password,
    user_types_id: userType
  };
  
  axios.post("http://localhost/hospital-back-end/register.php", data)
    .then(function(response) {
      console.log(response.data);
      alert(response.data.status);
    })
    .catch(function(error) {
      console.log(error);
      alert('Error registering user');
    });
});

const loginForm = document.getElementById('login-form');
const loginBtn = document.getElementById('login-btn');

loginBtn.addEventListener('click', (event) => {
  event.preventDefault(); 
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  axios.post('http://localhost/hospital-back-end/login.php', {
    email: email,
    password: password
  })
  .then((response) => {
    const token = response.data.token;
    localStorage.setItem('token', token);
    const userType = response.data.user_type;
    if (userType === 'admin') {
      window.location.href = 'admins.html';
    } else if (userType === 'employee') {
      window.location.href = 'employees.html';
    } else if (userType === 'patient') {
      window.location.href = 'patients.html';
    } else {
      console.log('Unknown user type');
    }
  })
  .catch((error) => {
    console.error(error);
    alert('Invalid email or password. Please try again.');
  });
});
