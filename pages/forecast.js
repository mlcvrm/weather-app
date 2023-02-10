import StyledWeather from "../components/StyledWeather";
import WeatherSVG from "../components/WeatherSVG";

const Forecast = ({ forecast, city, country }) => {
  if (!forecast || !forecast.length) {
    return <div>No data available :(</div>;
  }

  if (forecast.length >= 3) {
    return forecast.map((day, i) => {
      const mainWeather = day.weather[0].main;
      const mainTemp = Math.round(day.main.temp - 273.15);
      const date = new Date(day.dt_txt);
      const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
      const feelsLikeTemp = Math.round(day.main.feels_like - 273.15);
      const humidity = day.main.humidity;
      const windSpeed = Math.round(day.wind.speed * 3.6);
      const pressure = day.main.pressure;

      return (
        <StyledWeather>
          <div key={i} className="nextDays">
            <div>
              <div className="mainTemp">{mainTemp}°</div>
              <div className="nextDaysDate">{formattedDate}</div>
            </div>
            <WeatherSVG weatherType={mainWeather} />
          </div>
        </StyledWeather>
      );
    });
  }
  const day = forecast[0];
  const mainWeather = day.weather[0].main;
  const mainTemp = Math.round(day.main.temp - 273.15);
  const feelsLikeTemp = Math.round(day.main.feels_like - 273.15);
  const humidity = day.main.humidity;
  const windSpeed = Math.round(day.wind.speed * 3.6);
  const pressure = day.main.pressure;

  return (
    <StyledWeather weatherType={mainWeather}>
      <div className="weatherForecast">
        <div className="svgContainer">
          <WeatherSVG weatherType={mainWeather} />
        </div>
        <div className="weatherInfo">
          <p className="mainWeather">{mainWeather}</p>
          <p className="mainTemp">{mainTemp}°</p>
          <div className="otherWeatherInfo">
            <p>feels like {feelsLikeTemp}°</p>
            <p>humidity {humidity} %</p>
            <p>wind speed {windSpeed} km/h</p>
            <p>pressure {pressure} hPa</p>
          </div>
        </div>
      </div>
    </StyledWeather>
  );
};

export default Forecast;
