const apikey = "c21c6b4d97cfb56957f47cde6593b14a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const WeatherIcon = document.querySelector(".weather-icon");

async function CheckWeather(city) {
    try {
        // Fetch the API response
        const response = await fetch(apiUrl + city + `&appid=${apikey}`);

        if (response.status === 404) {
            // Display error message for invalid city
            document.querySelector(".Error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            // Parse JSON data
            const data = await response.json();

            // Update weather details
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

            // Update weather icon based on the condition
            if (data.weather[0].main === "Clouds") {
                WeatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main === "Rain") {
                WeatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main === "Clear") {
                WeatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main === "Snow") {
                WeatherIcon.src = "images/snow.png";
            } else if (data.weather[0].main === "Drizzle") {
                WeatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main === "Mist") {
                WeatherIcon.src = "images/mist.png";
            }

            // Display weather information and hide error
            document.querySelector(".weather").style.display = "block";
            document.querySelector(".Error").style.display = "none";
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Add event listener to the search button
searchbtn.addEventListener("click", () => {
    const city = searchbox.value.trim(); // Get the entered city name
    if (city) {
        CheckWeather(city);
    }
});