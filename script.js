// Initialize the map
const map = L.map('map').setView([0, 0], 2);

// Add the OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to fetch and display the latest animal movement
function displayAnimalMovement() {
    // Replace this URL with your actual data source
    fetch('https://www.movebank.org/movebank/service/direct-read?entity_type=event&study_id={174165487}&individual_id={769}&sensor_type=gps')
        .then(response => response.json())
        .then(data => {
            const latestPosition = data[data.length - 1];
            const marker = L.marker([latestPosition.latitude, latestPosition.longitude]).addTo(map);
            marker.bindPopup(`Latest position: ${latestPosition.timestamp}`).openPopup();
            map.setView([latestPosition.latitude, latestPosition.longitude], 10);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Call the function to display the animal movement
displayAnimalMovement();
