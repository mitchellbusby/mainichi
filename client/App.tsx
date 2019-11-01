import * as React from "react";
import { TransitTimes } from "./TransitTimes";
import { getBusTimes, IDeparture } from "./TfNswApi";

enum WeatherStatus {
  Unknown = "unknown",
  Sunny = "sunny",
  WillRain = "willrain"
}


interface IAppState {
  isLoading: boolean;
  weatherStatus: WeatherStatus;
  departures?: IDeparture[];
}

const App = () => {
  const [state, setState] = React.useState<IAppState>({
    isLoading: true,
    weatherStatus: WeatherStatus.Unknown,
  });

  React.useEffect(() => {
    async function fetchBusTimesAndWeather() {
      const result = await getBusTimes();
      setState({
        ...state,
        isLoading: false,
        weatherStatus: WeatherStatus.Sunny,
        departures: result,
      });
    }
    fetchBusTimesAndWeather();
  }, []);

  return (
    <div className="p3">
      <div>
        <h1 className="h1">Today</h1>
      </div>
      {
        state.isLoading ? (
          <div>Loading...</div>
        ) : (
          <React.Fragment>
            <div className="weather mb2">
              <div className="h2">
                The weather will be {state.weatherStatus === WeatherStatus.Sunny ? "fine. You're sweet 👌" : "rainy. Better bring an umbrella ☔"}
              </div>
            </div>
            <div className="buses">
              <TransitTimes
                stopName="Catherine Street @ Moore St"
                services={state.departures}
              />
            </div>
          </React.Fragment>
        )
      }
    </div>
  )
};

export {App};