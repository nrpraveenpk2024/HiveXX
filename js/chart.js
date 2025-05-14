// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Temperature Chart
    const tempCtx = document.getElementById('tempChart').getContext('2d');
    const tempChart = new Chart(tempCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Temperature (°C)',
                data: [32.5, 33.1, 34.2, 33.8, 34.5, 33.9, 34.1],
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 30,
                    max: 36
                }
            }
        }
    });
    
    // Humidity Chart
    const humidityCtx = document.getElementById('humidityChart').getContext('2d');
    const humidityChart = new Chart(humidityCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Humidity (%)',
                data: [65, 62, 68, 70, 67, 63, 66],
                borderColor: 'rgba(54, 162, 235, 1)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderWidth: 2,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    min: 50,
                    max: 80
                }
            }
        }
    });
    
    // Honey Production Chart
    const honeyCtx = document.getElementById('honeyChart').getContext('2d');
    const honeyChart = new Chart(honeyCtx, {
        type: 'bar',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Honey (kg)',
                data: [1.2, 1.5, 1.8, 2.1, 1.9, 2.3, 2.0],
                backgroundColor: 'rgba(255, 206, 86, 0.7)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
    
    // Update charts with random data every 10 seconds (for demo)
    setInterval(() => {
        // Update temperature data
        tempChart.data.datasets[0].data = tempChart.data.datasets[0].data.map(() => 
            (Math.random() * 3 + 32).toFixed(1)
        );
        tempChart.update();
        
        // Update humidity data
        humidityChart.data.datasets[0].data = humidityChart.data.datasets[0].data.map(() => 
            Math.floor(Math.random() * 15 + 60)
        );
        humidityChart.update();
        
        // Update honey data
        honeyChart.data.datasets[0].data = honeyChart.data.datasets[0].data.map(() => 
            (Math.random() * 1.5 + 1).toFixed(1)
        );
        honeyChart.update();
    }, 10000);
});