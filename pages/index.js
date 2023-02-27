import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./form";
import TimeRangeButtons from "./buttons";
import Forecast from "./forecast";

const getForecastData = (data) => {
  const currentDate = new Date();

  const todayData = data.list.filter((item) => {
    const date = new Date(item.dt_txt);
    return (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth() &&
      date.getDate() === currentDate.getDate() &&
      date.getHours() === 12
    );
  });

  const tomorrowData = data.list.filter((item) => {
    const date = new Date(item.dt_txt);
    return (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() + 1 === currentDate.getMonth() + 1 &&
      date.getDate() === currentDate.getDate() + 1 &&
      date.getHours() === 12
    );
  });

  const nextDaysData = data.list.filter((item) => {
    const date = new Date(item.dt_txt);
    const diff = date.getDate() - currentDate.getDate();
    return diff >= 2 && diff <= 6 && date.getHours() >= 12;
  });
  const country = data.city.country;

  return {
    today: todayData,
    tomorrow: tomorrowData,
    nextDays: nextDaysData,
    country: country,
  };
};

const ForecastData = () => {
  const [forecastData, setForecastData] = useState({
    today: {},
    tomorrow: {},
    nextDays: [],
    country: "",
  });
  const [location, setLocation] = useState("Prague");

  const API_KEY = "d0f30d0ef26524ab8fc67add631bf76d";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`
        );
        const data = response.data;
        setForecastData(getForecastData(data));
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [location]);

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    setLocation(e.target.location.value);
  };

  const [selectedTimeRange, setSelectedTimeRange] = useState("today");
  console.log(forecastData);
  return (
    <div className="container">
      <h1 className="location">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="Layer_1"
          x="0px"
          y="0px"
          width="15px"
          height="15px"
          viewBox="50 -40 600 500"
        >
          <path d="M315.854,462.173C360.397,352.498,477.41,34.647,477.41,34.647S72.469,186.458,44.76,197.728  c-12.045,4.899-13.01,23.473-4.914,31.567c40.418,40.417,153.333,9.598,193.872,50.137c40.541,40.54,8.217,151.953,48.634,192.37  C293.853,483.302,310.487,475.38,315.854,462.173z" />
        </svg>
        {location}
      </h1>
      <Form handleSubmit={handleLocationSubmit} />
      <TimeRangeButtons
        selectedTimeRange={selectedTimeRange}
        setSelectedTimeRange={setSelectedTimeRange}
      />
      <Forecast
        forecast={forecastData[selectedTimeRange]}
        city={location}
        country={forecastData.country}
      />
    </div>
  );
};

export default ForecastData;
