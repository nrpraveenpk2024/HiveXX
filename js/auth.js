// DOM Elements
const authModal = document.getElementById('auth-modal');
const loginTab = document.getElementById('login-tab');
const signupTab = document.getElementById('signup-tab');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const logoutBtn = document.getElementById('logout');

// Sample user data (in a real app, this would be from a database)
let users = [
    {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        hiveName: "Sunny Meadows",
        location: "California, USA",
        joinDate: "January 2023"
    }
];

// Check if user is logged in
function checkAuth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        authModal.classList.remove('hidden');
    } else {
        authModal.classList.add('hidden');
        updateUserDisplay(user);
    }
}

// Switch between login and signup tabs
loginTab.addEventListener('click', () => {
    loginTab.classList.add('active');
    signupTab.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
});

signupTab.addEventListener('click', () => {
    signupTab.classList.add('active');
    loginTab.classList.remove('active');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
});

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        checkAuth();
    } else {
        alert('Invalid email or password');
    }
});

// Signup form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const hiveName = document.getElementById('signup-hive').value;
    
    const newUser = {
        name,
        email,
        password,
        hiveName,
        location: "Unknown",
        joinDate: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
    };
    
    users.push(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    checkAuth();
});

// Logout functionality
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('user');
    checkAuth();
});

// Update UI with user data
function updateUserDisplay(user) {
    document.getElementById('hive-name').textContent = user.hiveName;
    document.getElementById('username-display').textContent = user.name.split(' ')[0];
    
    // Profile section
    document.getElementById('profile-username').textContent = user.name;
    document.getElementById('profile-email').textContent = user.email;
    document.getElementById('profile-hive').textContent = user.hiveName;
    document.getElementById('profile-location').textContent = user.location;
    document.getElementById('profile-join-date').textContent = user.joinDate;
}

// Initialize auth check when page loads
document.addEventListener('DOMContentLoaded', checkAuth);