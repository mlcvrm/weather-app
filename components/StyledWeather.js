import { useEffect } from "react";

const StyledWeather = ({ weatherType, children }) => {
  let backgroundColor, fontColor;
  switch (weatherType) {
    case "Sunny":
      backgroundColor = "#eae5ca";
      fontColor = "#1b1c1e";
      break;
    case "Clear":
      backgroundColor = "#eae5ca";
      fontColor = "#1b1c1e";
      break;
    case "Rain":
      backgroundColor = "#4e815d";
      fontColor = "#8eafc5";
      break;
    case "Clouds":
      backgroundColor = "#233947";
      fontColor = "#eae5ca";
      break;

    default:
      backgroundColor = "#1b1c1e";
      fontColor = "#d5d9d4";
  }

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = fontColor;
  }, [backgroundColor, fontColor]);

  return <div>{children}</div>;
};

export default StyledWeather;
