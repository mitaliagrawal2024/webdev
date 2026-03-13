let selectedCity = "";

function loadCity() {

    const citySelect = document.getElementById("citySelect");
    selectedCity = citySelect.value;

    if (!selectedCity) return;

    loadSpots(selectedCity);
    loadHotels(selectedCity);
    loadItinerary(selectedCity);
}

function showSection(sectionId) {

    const sections = document.querySelectorAll(".content");

    sections.forEach(section => {
        section.style.display = "none";
    });

    document.getElementById(sectionId).style.display = "block";
}


// ------------------ TOURIST SPOTS ------------------

function loadSpots(city) {

    fetch(`/spots?city=${city}`)
        .then(response => response.json())
        .then(data => {

            const gallery = document.getElementById("spotGallery");
            gallery.innerHTML = "";

            data.forEach(spot => {

                const card = document.createElement("div");
                card.className = "spot-card";

                card.innerHTML = `
                    <img src="${spot.image}" alt="${spot.name}">
                    <h3>${spot.name}</h3>
                    <p>${spot.description}</p>
                `;

                gallery.appendChild(card);
            });

        })
        .catch(error => console.error("Error loading spots:", error));
}


// ------------------ HOTELS ------------------

function loadHotels(city) {

    fetch(`/hotels?city=${city}`)
        .then(response => response.json())
        .then(data => {

            const hotelList = document.getElementById("hotelList");
            hotelList.innerHTML = "";

            data.forEach(hotel => {

                const card = document.createElement("div");
                card.className = "hotel-card";

                card.innerHTML = `
                    <h3>${hotel.name}</h3>
                    <p>Price: ₹${hotel.price}</p>
                    <p>Rating: ⭐ ${hotel.rating}</p>
                `;

                hotelList.appendChild(card);
            });

        })
        .catch(error => console.error("Error loading hotels:", error));
}


// ------------------ ITINERARY ------------------

function loadItinerary(city) {

    fetch(`/itinerary?city=${city}`)
        .then(response => response.json())
        .then(data => {

            const itineraryText = document.getElementById("itineraryText");

            itineraryText.innerHTML = `
                <b>Day 1:</b> ${data.day1} <br><br>
                <b>Day 2:</b> ${data.day2} <br><br>
                <b>Day 3:</b> ${data.day3}
            `;

        })
        .catch(error => console.error("Error loading itinerary:", error));
}