/**
 * The interface with the server side.
 */

import { DateTime } from "luxon";

/**
 * Return the first truthy arg from a set of args.
 */
const coalesce = <T>(...args: T[]) => {
  for (const arg of args) {
    if (arg) {
      return arg;
    }
  }
}

const getBusTimes = async (): Promise<IDeparture[]> => {
  const response = await fetch("/buses");
  const json: IApiDeparture[] = await response.json();
  return json.map((departure) => {
    const {departureTimeEstimated, departureTimePlanned} = departure;
    const departureTimeToUse = coalesce(departureTimeEstimated, departureTimePlanned);
    const departureTime = convertToLuxonDateTime(departureTimeToUse);
    const departureInMinutes = departureTime.diffNow("minutes").minutes;
    return {
      departureInMinutes: Math.floor(departureInMinutes),
    } as IDeparture;
  });
}

const convertToLuxonDateTime = (input: string) => DateTime.fromISO(input);

enum DepartureType {
  Estimated,
  OnTime,
  Late,
  Early
}

interface IDeparture {
  departureTimePlanned: string;
  departureTimeEstimated: string;
  departureInMinutes: number;
  departureType: DepartureType,
}

interface IApiDeparture {
  departureTimePlanned: string;
  departureTimeEstimated?: string;
  realtimeEnabled?: boolean;
  destination: string;
  number: string;
}

export {
  IDeparture,
  getBusTimes
};