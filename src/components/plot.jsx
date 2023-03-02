import Plot from "react-plotly.js";
import * as C from "../data/constants";

export default function PlotNuoto({ metaData }) {
  var plots = [];

  var minX = C.n;
  var maxX = -C.n;
  var minY = C.n;
  var maxY = -C.n;

  for (let i = 0; i < metaData.x.length; i++) {
    var xy = {
      x: metaData.x[i],
      y: metaData.y[i],
      name: metaData.legendName[i],
      mode: metaData.mode,
      type: metaData.type,
      marker: {
        color:
          typeof metaData.color[i] === "string"
            ? metaData.color[i]
            : metaData.color,
        size: 6,
        colorbar: metaData.colorbar,
      },
      showlegend: true,
    };

    plots.push(xy);

    if (
      !isNaN(metaData.x[i][metaData.frame]) &&
      !isNaN(metaData.y[i][metaData.frame])
    ) {
      var point = {
        x: [metaData.x[i][metaData.frame]],
        y: [metaData.y[i][metaData.frame]],
        name: "frame",
        mode: "markers",
        type: "scatter",
        marker: {
          color: "rgb(255, 0, 0)",
          size: 10,
        },
        showlegend: false,
      };
      plots.push(point);

      if (metaData.vector !== C.vectorsOptions[0]) {
        var dx = metaData.vector.dx[i][metaData.frame];
        var dy = metaData.vector.dy[i][metaData.frame];

        var line = {
          x: [
            metaData.x[i][metaData.frame],
            metaData.x[i][metaData.frame] + dx,
          ],
          y: [
            metaData.y[i][metaData.frame],
            metaData.y[i][metaData.frame] + dy,
          ],
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
          x: [metaData.x[i][metaData.frame] + dx],
          y: [metaData.y[i][metaData.frame] + dy],
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
    let xFiltered = metaData.x[i].filter((val) => !isNaN(val));
    let yFiltered = metaData.y[i].filter((val) => !isNaN(val));

    minX = Math.min(...xFiltered) < minX ? Math.min(...xFiltered) : minX;
    minY = Math.min(...yFiltered) < minY ? Math.min(...yFiltered) : minY;

    maxX = Math.max(...xFiltered) > maxX ? Math.max(...xFiltered) : maxX;
    maxY = Math.max(...yFiltered) > maxY ? Math.max(...yFiltered) : maxY;
  }

  let offsetX = (maxX - minX) / 10;
  let offsetY = (maxY - minY) / 10;

  var layout = {
    title: metaData.title,
    xaxis: {
      range: [minX - offsetX, maxX + offsetX],
      title: {
        text: metaData.xlabel,
        standoff: 0,
      },
    },
    yaxis: {
      range: [minY - offsetY, maxY + offsetY],
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
