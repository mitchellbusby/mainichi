import * as React from "react";
import { IDeparture } from "./TfNswApi";
import {take} from "lodash";
import classNames from "classnames";
import "./TransitTimes.scss";

interface ITransitTimeProps {
  stopName: string;
  services: IDeparture[];
}

const TransitTimes = ({stopName, services}: ITransitTimeProps) => (
  <div className="c-transit-times">
    <div className="c-transit-times__stop-name h3 bold mb2">{stopName}</div>
    <div className="c-transit-times__services">
      {take(services, 3).map((service, idx) => (
        // Note: using idx isn't ideal but we're using it here in lieu
        // of a unique id
        <div key={idx} className={classNames(
          "c-transit-times__service mb1",
          {
            [`c-transit-times__service--${service.departureStatus}`]: service.departureStatus,
          }
        )}>
          {service.departureInMinutes} minutes
          {
            service.delta && (
              <span>&nbsp;({service.delta})</span>
            )
          }
        </div>
      ))}
    </div>
  </div>
);

export {TransitTimes};