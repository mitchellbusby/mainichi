import * as React from "react";
import "./App.scss";
import { TransitTimes } from "./TransitTimes";
import { getBusTimes, IDeparture } from "./TfNswApi";
import { getWeatherForecast, IApiForecast } from "./WeatherApi";
import { Forecast } from "./Forecast";
import { AppLoader } from "./AppLoader";
import { ModuleLoadFailure } from "./ModuleLoadFailure";

interface IAppState {
  isLoading: boolean;
  departures?: IDeparture[];
  weatherForecast?: IApiForecast[];
}

enum RequestStatus {
  Loading = "loading",
  Success = "success",
  Failed = "failed",
}

interface IDepartureState {
  departures?: IDeparture[];
  status: RequestStatus;
}

interface IWeatherForecastState {
  weatherForecast?: IApiForecast[];
  status: RequestStatus;
}

const App = () => {
  const [departureState, setDepartureState] = React.useState<IDepartureState>({
    status: RequestStatus.Loading,
  });
  
  const [weatherForecastState, setWeatherForecastState] = React.useState<IWeatherForecastState>({
    status: RequestStatus.Loading,
  });

  React.useEffect(() => {
    async function fetchWeather() {
      try {
        const weatherForecast = await getWeatherForecast();

        setWeatherForecastState({
          ...weatherForecastState,
          status: RequestStatus.Success,
          weatherForecast: weatherForecast.data,
        });
      } catch (err) {
        setWeatherForecastState({
          ...weatherForecast,
          status: RequestStatus.Failed,
        });
      }
    }
    fetchWeather();
  }, [])

  React.useEffect(() => {
    async function fetchBusTimes() {
      try {
        const buses = await getBusTimes();
        setDepartureState({
          ...departureState,
          departures: buses,
          status: RequestStatus.Success,
        });
      } catch {
        setDepartureState({
          status: RequestStatus.Failed,
        });
      }
    }
    fetchBusTimes();
  }, []);

  const {weatherForecast, status: weatherStatus} = weatherForecastState;
  const {departures, status: departureStatus} = departureState;

  const isLoading = weatherStatus === RequestStatus.Loading || departureStatus === RequestStatus.Loading;

  return (
    <div className="p3">
      <div>
        <h1 className="h1">Today</h1>
      </div>
      {
        isLoading ? (
          <div className="app-loader-container">
            <AppLoader />
          </div>
        ) : (
          <React.Fragment>
            <div className="weather mb2">
              {
                weatherStatus === RequestStatus.Success ? (
                  <Forecast
                    forecast={weatherForecast}
                  />
                ) : (
                  <ModuleLoadFailure
                    moduleName={"Weather"}
                  />
                )
              }

            </div>
            <hr className="m2 my3" />
            <div className="buses">
              {
                departureStatus === RequestStatus.Success ? (
                  <TransitTimes
                    stopName="St. Peters Station"
                    services={departures}
                  />                  
                ) : (
                  <ModuleLoadFailure
                    moduleName="Departures"
                  />
                )
              }
            </div>
          </React.Fragment>
        )
      }
    </div>
  )
};

export {App};