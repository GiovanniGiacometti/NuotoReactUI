import Plot from "react-plotly.js";
import * as C from "../data/constants";

export default function PlotNuoto({ metaData }) {
  var xy = {
    x: metaData.x,
    y: metaData.y,
    name: metaData.legendName,
    mode: metaData.mode,
    type: metaData.type,
    marker: {
      color: metaData.color,
      size: 6,
      colorbar: metaData.colorbar,
    },
    showlegend: true,
  };

  var plots = [xy];

  if (
    !isNaN(metaData.x[metaData.frame]) &&
    !isNaN(metaData.y[metaData.frame])
  ) {
    var point = {
      x: [metaData.x[metaData.frame]],
      y: [metaData.y[metaData.frame]],
      name: "frame",
      mode: "markers",
      type: "scatter",
      marker: {
        color: "rgb(255, 0, 0)",
        size: 10,
      },
    };
    plots.push(point);

    if (metaData.vector !== C.vectorsOptions[0]) {
      var dx = metaData.vector.dx[metaData.frame];
      var dy = metaData.vector.dy[metaData.frame];

      var line = {
        x: [metaData.x[metaData.frame], metaData.x[metaData.frame] + dx],
        y: [metaData.y[metaData.frame], metaData.y[metaData.frame] + dy],
        mode: "lines",
        line: {
          width: 2,
          color: "red",
        },
        type: "scatter",
        showlegend: false,
      };

      let angle = Math.abs((Math.atan2(dy, dx) * 180) / Math.PI);

      if (dx > 0 && dy < 0) angle = 360 - angle;
      else if (dx < 0 && dy > 0) angle = 180 - angle;
      else if (dx < 0 && dy < 0) angle += 180;

      var arrow = {
        x: [metaData.x[metaData.frame] + dx],
        y: [metaData.y[metaData.frame] + dy],
        mode: "markers",
        marker: {
          symbol: "triangle-right",
          angle: -angle,
          size: 10,
          color: "red",
        },
        showlegend: false,
        type: "scatter",
      };

      plots.push(line);
      plots.push(arrow);
    }
  }
  let xFiltered = metaData.x.filter((val) => !isNaN(val));
  let yFiltered = metaData.y.filter((val) => !isNaN(val));

  let offsetX = (Math.max(...xFiltered) - Math.min(...xFiltered)) / 10;
  let offsetY = (Math.max(...yFiltered) - Math.min(...yFiltered)) / 10;

  var layout = {
    title: metaData.title,
    xaxis: {
      range: [
        Math.min(...xFiltered) - offsetX,
        Math.max(...xFiltered) + offsetX,
      ],
      title: {
        text: metaData.xlabel,
        standoff: 0,
      },
    },
    yaxis: {
      range: [
        Math.min(...yFiltered) - offsetY,
        Math.max(...yFiltered) + offsetY,
      ],
      title: {
        text: metaData.ylabel,
        standoff: 0,
      },
    },
    font: {
      family: "Arial",
      size: 12,
    },
    height: 200,
    width: 750,
    margin: {
      r: 10,
      b: 30,
      t: 40,
    },
  };
  return (
    <Plot
      data={plots}
      layout={layout}
      config={{ displayModeBar: false }}
    ></Plot>
  );
}
