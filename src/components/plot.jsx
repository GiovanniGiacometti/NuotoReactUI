import Plot from "react-plotly.js";
import * as C from "../data/constants";
import { useRef, memo } from "react";

function PN({ metaData, onDrag, width, height }) {
  var plots = [];

  let frame = parseInt(metaData.frame);

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
        color: metaData.color[i],
        size: 6,
        colorbar: metaData.colorbar,
      },
      showlegend: true,
    };

    plots.push(xy);

    if (!isNaN(metaData.x[i][frame]) && !isNaN(metaData.y[i][frame])) {
      var point = {
        x: [metaData.x[i][frame]],
        y: [metaData.y[i][frame]],
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
        var dx = metaData.vector.dx[i][frame];
        var dy = metaData.vector.dy[i][frame];

        var line = {
          x: [metaData.x[i][frame], metaData.x[i][frame] + dx],
          y: [metaData.y[i][frame], metaData.y[i][frame] + dy],
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
          x: [metaData.x[i][frame] + dx],
          y: [metaData.y[i][frame] + dy],
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

  let offsetX = (maxX - minX) / 15;
  let offsetY = (maxY - minY) / 15;

  if (metaData.x.length === 0) {
    minX *= -1;
    maxX *= -1;
    minY *= -1;
    maxY *= -1;
  }

  var layout = {
    // title: metaData.title,
    dragmode: "lasso",
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
    height: height,
    width: width,
    autosize: false,
    margin: {
      r: 70,
      b: 30,
      t: 10,
    },
    legend: {
      x: 0.95,
      y: 1,
      traceorder: "normal",
      font: {
        family: "Arial",
        size: 12,
        color: "#000",
      },
      bgcolor: "#FFFFFF",
    },
  };

  const plotlyRef = useRef(null);
  return (
    <Plot
      ref={plotlyRef}
      data={plots}
      layout={layout}
      config={{ displayModeBar: false }}
      onSelected={(area) => {
        const plotlyNode = plotlyRef.current;
        console.log(area);
        if (plotlyNode) {
        }
        onDrag();
      }}
      onDoubleClick={() => {}}
    ></Plot>
  );
}

const PlotNuoto = memo(PN);
export default PlotNuoto;
