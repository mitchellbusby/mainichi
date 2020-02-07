import camelcaseKeys = require("camelcase-keys");

const getWeatherForecast = async (): Promise<IWeatherApiResponse> => {
  const response = await fetch("/.netlify/functions/weather");

  const json = await response.json();
  const correctCase = camelcaseKeys(json, {deep: true}) as any;

  // Check if the stupid API returns an error (it still returns a 200)
  if (correctCase.error) {
    throw new Error(correctCase.error);
  }

  return correctCase as any as IWeatherApiResponse;
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