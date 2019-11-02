import camelcaseKeys = require("camelcase-keys");

const getWeatherForecast = async (): Promise<IWeatherApiResponse> => {
  const response = await fetch("/.netlify/functions/weather");

  const json = await response.json();
  const correctCase = camelcaseKeys(json, {deep: true});

  return correctCase as unknown as IWeatherApiResponse;
}

interface IWeatherApiResponse {
  data: IApiForecast[];
}

interface IApiForecast {
  timestampUtc: string;
  temp: number;
  /**
   * Probability of precipitation (%)
   */
  pop: number
}

export {
  getWeatherForecast,
  IApiForecast,
}