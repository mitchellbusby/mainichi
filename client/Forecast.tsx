import * as React from "react";
import "./Forecast.scss";
import { IApiForecast } from "./WeatherApi";
import { ForecastGraph } from "./ForecastGraph";

interface IForecastProps {
  forecast: IApiForecast[]
}

const Forecast = ({
  forecast,
}: IForecastProps) => {
  const weatherStatus = forecast.reduce((previous, next) => {
    if (previous === WeatherStatus.WillRain) {
      // Skip
      return previous
    }
    // Threshold is 10% rain
    if (next.pop > 10) {
      return WeatherStatus.WillRain;
    }
  }, WeatherStatus.Sunny);

  return (
    <div className="c-forecast">
      <div className="h2 mb3">
        The weather will be {weatherStatus === WeatherStatus.Sunny ? "fine. You're sweet 👌" : "potentially rainy. Better bring an umbrella just in case  ☔"}
      </div>
      <div className="forecast-graph-container">
        <ForecastGraph
          forecast={forecast}
        />
      </div>
    </div>
  )
}

enum WeatherStatus {
  Unknown = "unknown",
  Sunny = "sunny",
  WillRain = "willrain"
}

export {
  Forecast,
  WeatherStatus,
}