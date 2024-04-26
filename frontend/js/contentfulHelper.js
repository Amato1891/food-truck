document.addEventListener('DOMContentLoaded', async function() {
    const upcomingLocationsElement = document.getElementById('upcomingLocations');
    try {
        async function initContentful() {
            console.log('Contentful SDK has been loaded.');

            // Initialize the Contentful client
            const client = contentful.createClient({
                space: '40l7w0646cm9',
                environment: 'master',
                accessToken: 'J11_-MiX4j-7LZtZxE4VusAfxFEzIywF2lrZz77FFdw' // Replace 'your_access_token' with your actual access token
            });

            try {
                // Retrieve an entry from Contentful
                const entry = await client.getEntries(); // Replace 'your_entry_id' with the ID of the entry you want to retrieve
                // console.log(entry);
                return entry;
            } catch (error) {
                console.error(error);
            }

            
        }
        
        const contentfulResponse = await initContentful();
        // console.log(contentfulResponse)
        // console.log(contentfulResponse.items)
        // Check if locations are returned in the response

        if (contentfulResponse && contentfulResponse.items.length >= 1) {
            console.log(contentfulResponse && contentfulResponse.items >= 1)
            contentfulResponse.items.forEach(location => {
                location = location.fields;
                console.log(location.imageUrl)
                console.log(location.name)
                console.log(location.address)
                console.log(location.locationDetails)
                const locationHtml = `
                    <div class="location-card">
                        <img src="${location.imageUrl}">
                        <h2 class="text-primary">${location.name}</h2>
                        <p><em>${location.address}</em></p>
                        <p><strong>${location.locationDetails}</strong></p>
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
        // console.log(upcomingLocationsElement)
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
