const WeatherAPI = async (searchInputValue) => {
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${searchInputValue}&days=5`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Error fetching weather data: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        throw error;
    }
};

export default WeatherAPI;
