/**
 * The interface with the server side.
 */

import { DateTime } from "luxon";

// todo: move this to util, or see if lodash has somethign
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
  const response = await fetch("/.netlify/functions/buses");
  const json: IApiDeparture[] = await response.json();
  return json.map((departure) => {
    const {departureTimeEstimated, departureTimePlanned} = departure;
    const departureTimeToUse = coalesce(departureTimeEstimated, departureTimePlanned);
    const departureTime = convertToLuxonDateTime(departureTimeToUse);
    const departureInMinutes = departureTime.diffNow("minutes").minutes;
    const {departureStatus, delta} = calculateStatusOfDeparture(departure);
    // todo: fill out the rest of this interface
    return {
      departureInMinutes: Math.floor(departureInMinutes),
      departureStatus,
      delta,
    } as IDeparture;
  });
}

const calculateStatusOfDeparture = (departure: IApiDeparture): IDepartureStatus => {
  const {
    departureTimeEstimated,
    departureTimePlanned
  } = departure;

  if (!departureTimeEstimated) {
    return {
      departureStatus: DepartureStatus.Estimated
    };
  }

  const estimatedTime = convertToLuxonDateTime(departureTimeEstimated);
  const timetabledTime = convertToLuxonDateTime(departureTimePlanned);

  if (estimatedTime > timetabledTime) {
    const delta = `+${estimatedTime.diff(timetabledTime, "minutes").minutes}min`
    return {
      departureStatus: DepartureStatus.Late,
      delta,
    }
  }

  if (estimatedTime < timetabledTime) {
    return { 
      departureStatus: DepartureStatus.Early,
    };
  }

  return {
    departureStatus: DepartureStatus.OnTime,
  };
}

const convertToLuxonDateTime = (input: string) => DateTime.fromISO(input);

enum DepartureStatus {
  Estimated = "estimated",
  OnTime = "on-time",
  Late = "late",
  Early = "early"
}

interface IDepartureStatus {
  departureStatus: DepartureStatus;
  delta?: string;
}

interface IDeparture {
  departureTimePlanned: string;
  departureTimeEstimated: string;
  departureInMinutes: number;
  departureStatus: DepartureStatus,
  delta?: string;
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