// DOM Elements
const contentSections = document.querySelectorAll('.content-section');
const navLinks = document.querySelectorAll('nav ul li a');
const userProfileBtn = document.getElementById('user-profile-btn');

// Navigation functionality
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Update active nav link
        navLinks.forEach(navLink => navLink.parentElement.classList.remove('active'));
        link.parentElement.classList.add('active');
        
        // Show the corresponding section
        contentSections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    });
});

// User profile click
userProfileBtn.addEventListener('click', () => {
    // Show profile section
    contentSections.forEach(section => {
        if (section.id === 'profile') {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
    
    // Update active nav
    navLinks.forEach(navLink => {
        if (navLink.getAttribute('href') === '#profile') {
            navLink.parentElement.classList.add('active');
        } else {
            navLink.parentElement.classList.remove('active');
        }
    });
});

// Simulate sensor data updates
function updateSensorData() {
    // Random values for demo purposes
    const temp = (Math.random() * 5 + 32).toFixed(1);
    const humidity = (Math.random() * 20 + 50).toFixed(0);
    const weight = (Math.random() * 5 + 10).toFixed(1);
    
    document.getElementById('temperature').textContent = `${temp}°C`;
    document.getElementById('humidity').textContent = `${humidity}%`;
    document.getElementById('honey-weight').textContent = `${weight} kg`;
    
    // Update status indicators
    const tempStatus = document.querySelector('#temperature + .status');
    const humidityStatus = document.querySelector('#humidity + .status');
    const weightStatus = document.querySelector('#honey-weight + .status');
    const beeStatus = document.querySelector('#bee-status + .status');
    
    // Temperature status
    if (temp > 35) {
        tempStatus.textContent = "High";
        tempStatus.className = "status danger";
    } else if (temp < 30) {
        tempStatus.textContent = "Low";
        tempStatus.className = "status warning";
    } else {
        tempStatus.textContent = "Optimal";
        tempStatus.className = "status good";
    }
    
    // Humidity status
    if (humidity > 70) {
        humidityStatus.textContent = "High";
        humidityStatus.className = "status warning";
    } else if (humidity < 50) {
        humidityStatus.textContent = "Low";
        humidityStatus.className = "status warning";
    } else {
        humidityStatus.textContent = "Optimal";
        humidityStatus.className = "status good";
    }
    
    // Weight status
    if (weight < 8) {
        weightStatus.textContent = "Low";
        weightStatus.className = "status warning";
    } else if (weight > 15) {
        weightStatus.textContent = "Excellent";
        weightStatus.className = "status good";
    } else {
        weightStatus.textContent = "Good";
        weightStatus.className = "status good";
    }
    
    // Bee status
    const statuses = ["Normal", "Active", "Slightly Agitated"];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    document.getElementById('bee-status').textContent = randomStatus;
    
    if (randomStatus === "Slightly Agitated") {
        beeStatus.className = "status warning";
    } else {
        beeStatus.className = "status good";
    }
}

// Honey calculator functionality
document.getElementById('calculate-btn').addEventListener('click', () => {
    const hiveCount = parseInt(document.getElementById('hive-count').value);
    const avgProduction = parseFloat(document.getElementById('avg-production').value);
    const honeyPrice = parseFloat(document.getElementById('honey-price').value);
    
    const totalProduction = hiveCount * avgProduction;
    const totalRevenue = totalProduction * honeyPrice;
    
    document.getElementById('total-production').textContent = totalProduction.toFixed(1);
    document.getElementById('total-revenue').textContent = totalRevenue.toFixed(2);
});

// Initialize market data
function initMarketData() {
    const honeyTypes = [
        { type: "Wildflower", price: 12.5, trend: "up" },
        { type: "Clover", price: 10.8, trend: "down" },
        { type: "Manuka", price: 45.0, trend: "up" },
        { type: "Acacia", price: 15.2, trend: "up" },
        { type: "Orange Blossom", price: 13.7, trend: "down" }
    ];
    
    const marketTable = document.getElementById('market-data');
    marketTable.innerHTML = '';
    
    honeyTypes.forEach(honey => {
        const row = document.createElement('tr');
        
        const typeCell = document.createElement('td');
        typeCell.textContent = honey.type;
        
        const priceCell = document.createElement('td');
        priceCell.textContent = `$${honey.price}`;
        
        const trendCell = document.createElement('td');
        trendCell.textContent = honey.trend === "up" ? "↑" : "↓";
        trendCell.className = honey.trend === "up" ? "trend-up" : "trend-down";
        
        row.appendChild(typeCell);
        row.appendChild(priceCell);
        row.appendChild(trendCell);
        
        marketTable.appendChild(row);
    });
}

// Initialize the app
function initApp() {
    updateSensorData();
    initMarketData();
    
    // Update sensor data every 5 seconds
    setInterval(updateSensorData, 5000);
}

document.addEventListener('DOMContentLoaded', initApp);