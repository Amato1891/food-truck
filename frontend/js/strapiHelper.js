document.addEventListener('DOMContentLoaded', async function() {
    try {
        let environment = 'development';
        let endpoint = environment === 'production' ? 'https://www.produrl.com' : 'http://localhost:1337';
        const response = await axios.get(`${endpoint}/api/locations`);
        const locations = response.data;
        // console.log(locations)
        const upcomingLocationsElement = document.getElementById('upcomingLocations');

        // Check if locations are returned in the response
        if (locations.data && locations.data.length >= 1) {
            locations.data.forEach(location => {
                location = location.attributes;
                const locationHtml = `
                    <div class="location-card">
                        <img src="${endpoint + location.imageUrl}">
                        <h2 class="text-primary">${location.locationName}</h2>
                        <p><em>${location.locationAddress}</em></p>
                        <p><strong>${location.details}</strong></p>
                    </div>
                `;
                upcomingLocationsElement.innerHTML += locationHtml;
            });
        } else {
            // Render placeholder info if locations array is empty
            const locationHtml = `
                <div class="location-card">
                    <img src="img/check_back_soon.png">
                    <h2 class="text-primary">More Locations Coming Soon!</h2>
                </div>
            `;
            upcomingLocationsElement.innerHTML = locationHtml;
        }
    } catch (error) {
        // Render placeholder info if an error occurs
        const upcomingLocationsElement = document.getElementById('upcomingLocations');
        console.log(upcomingLocationsElement)
        const locationHtml = `
                <div class="location-card">
                    <img src="img/check_back_soon.png">
                    <h2 class="text-primary">More Locations Coming Soon!</h2>
                </div>
            `;
        upcomingLocationsElement.innerHTML = locationHtml;
        console.log(upcomingLocationsElement.innerHTML)
        console.error('Error fetching locations:', error);
    }
});
