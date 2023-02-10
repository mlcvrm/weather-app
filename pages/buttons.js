import React from "react";

const TimeRangeButtons = ({ selectedTimeRange, setSelectedTimeRange }) => {
  const buttonClass = (selected) => `timeRangeButton ${selected && "active"}`;

  return (
    <div className="timeRangeSection">
      <button
        className={buttonClass(selectedTimeRange === "today")}
        onClick={() => setSelectedTimeRange("today")}
      >
      Today
      </button>
      <button
        className={buttonClass(selectedTimeRange === "tomorrow")}
        onClick={() => setSelectedTimeRange("tomorrow")}
      >
        Tomorrow
      </button>
      <button
        className={buttonClass(selectedTimeRange === "nextDays")}
        onClick={() => setSelectedTimeRange("nextDays")}
      >
        Next Days
      </button>
    </div>
  );
};

export default TimeRangeButtons;
