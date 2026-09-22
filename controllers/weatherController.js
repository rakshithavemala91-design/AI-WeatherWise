const axios = require("axios");
require("dotenv").config();

const {
  generateWeatherInsight,
} = require("../services/geminiService");

const getWeather = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        message: "City is required",
      });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "OpenWeather API key is missing",
      });
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/weather",
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      }
    );

    const data = response.data;

    const weatherData = {
      city: data.name,
      country: data.sys.country,

      temperature: data.main.temp,
      feelsLike: data.main.feels_like,

      humidity: data.main.humidity,
      pressure: data.main.pressure,

      weather: data.weather[0].description,

      windSpeed: data.wind.speed,

      cloudiness: data.clouds.all,

      visibility: data.visibility
        ? data.visibility / 1000
        : null,

      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    };

    const aiInsight =
      await generateWeatherInsight(weatherData);

    res.json({
      ...weatherData,
      aiInsight,
    });
  } catch (error) {
    console.error(
      "Weather error:",
      error.response?.data || error.message
    );

    if (error.response) {
      return res.status(error.response.status).json({
        message: "Unable to fetch weather data",
        error: error.response.data?.message,
        code: error.response.data?.cod,
      });
    }

    res.status(500).json({
      message: "Weather service failed",
      error: error.message,
    });
  }
};


// 5-Day Forecast
const getForecast = async (req, res) => {
  try {
    const { city } = req.query;

    if (!city) {
      return res.status(400).json({
        message: "City is required",
      });
    }

    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        message: "OpenWeather API key is missing",
      });
    }

    const response = await axios.get(
      "https://api.openweathermap.org/data/2.5/forecast",
      {
        params: {
          q: city,
          appid: apiKey,
          units: "metric",
        },
      }
    );

    const data = response.data;

    const daily = [];
    const seenDates = new Set();

    for (const item of data.list) {
      const date = item.dt_txt.split(" ")[0];

      if (
        !seenDates.has(date) &&
        daily.length < 5
      ) {
        seenDates.add(date);

        daily.push({
          date: date,
          temperature: item.main.temp,
          weather: item.weather[0].description,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
        });
      }
    }

    res.json({
      city: data.city.name,
      country: data.city.country,
      forecast: daily,
    });
  } catch (error) {
    console.error(
      "Forecast error:",
      error.response?.data || error.message
    );

    if (error.response) {
      return res.status(error.response.status).json({
        message: "Unable to fetch forecast data",
        error: error.response.data?.message,
        code: error.response.data?.cod,
      });
    }

    res.status(500).json({
      message: "Forecast service failed",
      error: error.message,
    });
  }
};


module.exports = {
  getWeather,
  getForecast,
};