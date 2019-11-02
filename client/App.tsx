import * as React from "react";
import "./App.scss";
import { TransitTimes } from "./TransitTimes";
import { getBusTimes, IDeparture } from "./TfNswApi";
import { getWeatherForecast, IApiForecast } from "./WeatherApi";
import { Forecast } from "./Forecast";

interface IAppState {
  isLoading: boolean;
  departures?: IDeparture[];
  weatherForecast?: IApiForecast[];
}

const App = () => {
  const [state, setState] = React.useState<IAppState>({
    isLoading: true,
  });

  React.useEffect(() => {
    async function fetchBusTimesAndWeather() {

      const [buses, weatherForecast] = await Promise.all([
        getBusTimes(),
        getWeatherForecast(),
      ]);

      setState({
        ...state,
        isLoading: false,
        departures: buses,
        weatherForecast: weatherForecast.data,
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
            <Forecast
              forecast={state.weatherForecast}
            />
            </div>
            <hr className="m2" />
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