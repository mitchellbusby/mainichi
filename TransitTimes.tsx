import * as React from "react";
import { IDeparture } from "./TfNswApi";
import {take} from "lodash";


interface ITransitTimeProps {
  stopName: string;
  services: IDeparture[];
}

const TransitTimes = ({stopName, services}: ITransitTimeProps) => (
  <div className="c-transit-times">
    <div className="c-transit-times__stop-name h3 bold mb2">{stopName}</div>
    <div className="c-transit-times__services">
      {take(services, 3).map((service) => (
        <div className="mb1">
          {service.departureInMinutes} minutes
        </div>
      ))}
    </div>
  </div>
);

export {TransitTimes};