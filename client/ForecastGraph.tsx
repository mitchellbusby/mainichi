import * as React from "react";
import ChartJs from "chart.js";
import { IApiForecast } from "./WeatherApi";
import { DateTime } from "luxon";

interface IForecastGraphProps {
  forecast: IApiForecast[];
}

const ForecastGraph = ({forecast}: IForecastGraphProps) => {
  const canvasRef = React.useRef<HTMLCanvasElement>();

  React.useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    
    const context = canvasRef.current.getContext("2d");

    const flatPrecipitation = forecast.map(item => item.pop);

    const flatDates = forecast.map(item => 
      DateTime.fromISO(item.timestampUtc, {
        zone: DateTime.utc().zone,
      }).setZone(DateTime.local().zoneName).toLocaleString(DateTime.TIME_24_SIMPLE)
    )

    const flatTemp = forecast.map(item => item.temp);

    const chart = new ChartJs(context, {
      type: "line",
      data: {
        labels: flatDates,
        datasets: [{
          label: "Precipitation %",
          data: flatPrecipitation,
          borderColor: 'rgba(41, 128, 185,1.0)',
          backgroundColor: "rgba(41, 128, 185,0.4)",
          borderWidth: 1,
          yAxisID: "y-axis-precipitation",
          hideInLegendAndTooltip: true,
          pointRadius: 0,
        }, {
          label: "Temperature (C*)",
          data: flatTemp,
          yAxisID: "y-axis-temperature",
          borderColor: "rgba(231, 76, 60,1.0)",
          backgroundColor: "rgba(231, 76, 60,0.4)",
          pointRadius: 0,
          hideInLegendAndTooltip: true,
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 25,
              max: 100,
            },
            scaleLabel: {
              display: true,
              labelString: "Precipitation (%)",
            },
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
            id: "y-axis-precipitation",
            position: "right",
          }, {
            ticks: {
              // beginAtZero: true,
              max: 40,
              stepSize: 10,
            },
            scaleLabel: {
              display: true,
              labelString: "Temperature (C*)",
            },
            id: "y-axis-temperature",
            position: "left",
          }]
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => {
      chart.destroy();
    }
  }, [forecast]);
  return (
    <canvas 
      id="c-forecast-graph"
      className="c-forecast-graph"
      ref={canvasRef}
      height="300"
      width="300"
    >
      
    </canvas>
  )
}

export {ForecastGraph};