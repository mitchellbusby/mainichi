import * as React from "react";
import { TransitTimes } from "./TransitTimes";

enum WeatherStatus {
  Unknown = "unknown",
  Sunny = "sunny",
  WillRain = "willrain"
}


interface IAppState {
  isLoading: boolean;
  weatherStatus: WeatherStatus
}

const App = () => {
  const [state, setState] = React.useState<IAppState>({
    isLoading: true,
    weatherStatus: WeatherStatus.Unknown,
  });

  React.useEffect(() => {
    console.log(process.env.TFNSW_API_KEY);
    setTimeout(() => {
      setState({
        ...state,
        isLoading: false,
        weatherStatus: WeatherStatus.Sunny,
      })
    }, 1000);
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
                services={[{
                  actualDeparture: "8 min",
                  scheduledDeparture: "10 min",
                  scheduledArrival: "8:48am"
                }]}
              />
            </div>
          </React.Fragment>
        )
      }
    </div>
  )
};

export {App};