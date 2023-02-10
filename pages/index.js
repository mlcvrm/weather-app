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
      date.getMonth() + 1 === currentDate.getMonth() + 1 &&
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
    return diff >= 2 && diff <= 6 && date.getHours() === 12;
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
          `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}`
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

  return (
    <div className="container">
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
