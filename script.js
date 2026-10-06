const apiUrl = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "989e021168dced62da0a5d97e82c6512";

const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-box button");

const cityName = document.querySelector(".weather-card h2");
const temperature = document.querySelector(".weather-card h3");
const condition = document.querySelector(".weather-card > p");

const humidity = document.querySelector(".weather-details div:nth-child(1) strong");
const windSpeed = document.querySelector(".weather-details div:nth-child(2) strong");
const pressure = document.querySelector(".weather-details div:nth-child(3) strong");
const visibility = document.querySelector(".weather-details div:nth-child(4) strong");

const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");



searchButton.addEventListener("click", function () {

    const city = searchInput.value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }


    

const url = `${apiUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error("City not found or API error");
        }
        return response.json();
    })
    .then(data => {
        console.log("API Response:", data);
        console.log("API City:", data.name);
        console.log("API Temperature:", data.main.temp);

        cityName.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        const weatherType = data.weather[0].main;

let icon = "🌤️";

if (weatherType === "Clear") {
    icon = "☀️";
} else if (weatherType === "Clouds") {
    icon = "☁️";
} else if (weatherType === "Rain" || weatherType === "Drizzle") {
    icon = "🌧️";
} else if (weatherType === "Thunderstorm") {
    icon = "⛈️";
} else if (weatherType === "Snow") {
    icon = "❄️";
} else if (weatherType === "Mist" || weatherType === "Fog" || weatherType === "Haze") {
    icon = "🌫️";
}

condition.textContent = `${icon} ${data.weather[0].description}`;
        humidity.textContent = `${data.main.humidity}%`;
         windSpeed.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
         pressure.textContent = `${data.main.pressure} hPa`;
        visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;

        
        const formatTime = (timestamp, timezone) => {
    return new Date((timestamp + timezone) * 1000)
        .toISOString()
        .slice(11, 16);
};

sunrise.textContent = formatTime(data.sys.sunrise, data.timezone);
sunset.textContent = formatTime(data.sys.sunset, data.timezone);
        searchInput.value = "";
    })



   


    .catch(error => {
        console.log("Error:", error);
        alert("Unable to fetch weather. Please check the city name or API key.");
    });

    

    console.log("Search button clicked");
    console.log(city);

   
});


searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchButton.click();
    }
});




const locationButton = document.querySelector("#locationButton");

locationButton.addEventListener("click", function() {

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(
        function(position) {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url = `${apiUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetch(url)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Unable to fetch weather");
                    }
                    return response.json();
                })
                .then(data => {

                    cityName.textContent = data.name;
                    temperature.textContent = `${Math.round(data.main.temp)}°C`;
                    condition.textContent = data.weather[0].description;

                    humidity.textContent = `${data.main.humidity}%`;
                    windSpeed.textContent = `${(data.wind.speed * 3.6).toFixed(1)} km/h`;
                    pressure.textContent = `${data.main.pressure} hPa`;
                    visibility.textContent = `${(data.visibility / 1000).toFixed(1)} km`;

                    searchInput.value = "";

                })
                .catch(error => {
                    console.log("Error:", error);
                    alert("Unable to fetch weather for your location.");
                });

        },
        function(error) {
            alert("Please allow location access to use this feature.");
        }
    );

});



// Dark and Light Theme Toggle

const themeToggle = document.querySelector("#themeToggle");

themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("light-theme");

    if (document.body.classList.contains("light-theme")) {
        themeToggle.textContent = "🌙 Dark Mode";
    } else {
        themeToggle.textContent = "☀️ Light Mode";
    }

});