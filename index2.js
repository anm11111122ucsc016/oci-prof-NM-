const apiKey = 'YOUR_OPENWEATHER_API_KEY'; // Replace with your OpenWeather API Key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

function getWeather() {
    const city = document.getElementById('city').value;
    const errorMessage = document.getElementById('error-message');

    if (city === '') {
        errorMessage.textContent = 'Please enter a city name.';
        return;
    }

    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                throw new Error(data.message);
            }

            errorMessage.textContent = ''; // Clear previous error message
            displayWeather(data);
        })
        .catch(error => {
            errorMessage.textContent = error.message;
        });
}

function displayWeather(data) {
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const description = document.getElementById('weather-description');
    const icon = document.getElementById('weather-icon');

    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    description.textContent = `Condition: ${data.weather[0].description}`;
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}
