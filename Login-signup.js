document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.wrapper');
    const registerLink = document.querySelector('.register-link');
    const loginLink = document.querySelector('.login-link');

    // Form elements
    const signupForm = document.querySelector('#signupForm');
    const loginForm = document.querySelector('#loginForm');

    // Signup error elements
    const signupNameErr = document.getElementById('signupNameErr');
    const signupEmailErr = document.getElementById('signupEmailErr');
    const signupPasswordErr = document.getElementById('signupPasswordErr');

    // Login error elements
    const loginNameErr = document.getElementById('loginNameErr');
    const loginPasswordErr = document.getElementById('loginPasswordErr');

    // Switch to register form
    registerLink.onclick = () => {
        clearErrors();
        wrapper.classList.add('active');
    };

    // Switch back to login form
    loginLink.onclick = () => {
        clearErrors();
        wrapper.classList.remove('active');
    };

    // Signup form submission
    signupForm.onsubmit = (event) => {
        event.preventDefault();
        clearErrors();

        const signupUsername = document.getElementById('signupUsername').value;
        const signupEmail = document.getElementById('signupEmail').value;
        const signupPassword = document.getElementById('signupPassword').value;

        if (validateSignup(signupUsername, signupEmail, signupPassword)) {
            const userDetails = {
                username: signupUsername,
                email: signupEmail,
                password: signupPassword
            };

            // Retrieve existing users array from localStorage or create a new one
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if user with the same email or username already exists
            const userExists = users.some(user => user.username === signupUsername || user.email === signupEmail);
            if (userExists) {
                alert("Username or email already registered.");
                return;
            }

            // Add the new user and save back to localStorage
            users.push(userDetails);
            localStorage.setItem('users', JSON.stringify(users));

            alert('Signup successful! You can now log in.');
            wrapper.classList.remove('active');  // Switch to login form
        }
    };

    // Login form submission
    loginForm.onsubmit = (event) => {
        event.preventDefault();
        clearErrors();

        const loginUsername = document.getElementById('loginUsername').value;
        const loginPassword = document.getElementById('loginPassword').value;

        if (validateLogin(loginUsername, loginPassword)) {
            const users = JSON.parse(localStorage.getItem('users')) || [];

            const user = users.find(user => user.username === loginUsername && user.password === loginPassword);
            if (user) {
                window.location.href="Dashbord.html"
            } else {
                alert('Invalid username or password!');
            }
        }
    };

    // Clear error messages
    function clearErrors() {
        signupNameErr.textContent = '';
        signupEmailErr.textContent = '';
        signupPasswordErr.textContent = '';
        loginNameErr.textContent = '';
        loginPasswordErr.textContent = '';
    }

    // Validation for signup form
    function validateSignup(username, email, password) {
        let isValidate = true;

        function emailValidation(email) {
            var result = /\S+@\S+\.\S+/;
            return result.test(email);
        }

        function capitalLetter(password) {
            var result = /[A-Z]/;
            return result.test(password);
        }

        function specialChar(password) {
            var result = /[!@#$%^&*()_+]/;
            return result.test(password);
        }

        function nameValidation(username) {
            var result = /^[a-zA-Z\s]+$/; 
            return result.test(username);
        }

        if (username == '') {
            signupNameErr.textContent = "Enter your name";
            isValidate = false;
        } else if (!nameValidation(username)) {
            signupNameErr.textContent = 'Your name should contain only letters';
            isValidate = false;
        } else {
            signupNameErr.textContent = "";
        }

        if (password == '') {
            signupPasswordErr.textContent = 'Enter Your Password';
            isValidate = false;
        } else if (password.length < 8) {
            signupPasswordErr.textContent = "Your password length should be greater than 8";
            isValidate = false;
        } else if (!capitalLetter(password)) {
            signupPasswordErr.textContent = "Your password contains at least one Capital letter";
            isValidate = false;
        } else if (!specialChar(password)) {
            signupPasswordErr.textContent = "Your password must contain one special character ";
            isValidate = false;
        } else {
            signupPasswordErr.textContent = '';
        }

        if (email == '') {
            signupEmailErr.textContent = "Enter your Email";
            isValidate = false;
        } else if (!emailValidation(email)) {
            signupEmailErr.textContent = "Your email format should contain @";
            isValidate = false;
        } else {
            signupEmailErr.textContent = "";
        }
        return isValidate;
    }

    // Validation for login form
    function validateLogin(username, password) {
        let isValidate = true;
        function capitalLetter(password) {
            var result = /[A-Z]/;
            return result.test(password);
        }

        function specialChar(password) {
            var result = /[!@#$%^&*()_+]/;
            return result.test(password);
        }

        function nameValidation(username) {
            var result = /^[a-zA-Z\s]+$/; 
            return result.test(username);
        }

        if (username == '') {
            loginNameErr.textContent = "Enter your name";
            isValidate = false;
        } else if (!nameValidation(username)) {
            loginNameErr.textContent = 'Your name should contain only letters';
            isValidate = false;
        } else {
            loginNameErr.textContent = "";
        }

        if (password == '') {
            loginPasswordErr.textContent = 'Enter Your Password';
            isValidate = false;
        } else if (password.length < 8) {
            loginPasswordErr.textContent = "Your password length should be greater than 8";
            isValidate = false;
        } else if (!capitalLetter(password)) {
            loginPasswordErr.textContent = "Your password contains at least one Capital letter";
            isValidate = false;
        } else if (!specialChar(password)) {
            loginPasswordErr.textContent = "Your password must contain one special character ";
            isValidate = false;
        } else {
            loginPasswordErr.textContent = '';
        }

        return isValidate;
    }
});