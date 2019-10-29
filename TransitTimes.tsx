import * as React from "react";

interface ITransitService {
  actualDeparture?: string;
  scheduledDeparture: string;
  actualArrival?: string;
  scheduledArrival?: string;
}


interface ITransitTimeProps {
  stopName: string;
  services: ITransitService[];
}

const TransitTimes = ({stopName, services}: ITransitTimeProps) => (
  <div className="c-transit-times">
    Hey, here's your transit times...
    <div className="c-transit-times__stop-name h4">{stopName}</div>
    <div className="c-transit-times__services">
      {services.map((service) => (
        <div>
          {service.scheduledDeparture} | {service.scheduledArrival}
        </div>
      ))}
    </div>
  </div>
);

export {TransitTimes};