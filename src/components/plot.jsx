import Plot from "react-plotly.js";
import * as data from "../data/data";
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
      size: 2,
      colorbar: metaData.colorbar,
    },
  };

  var selected = metaData.frame;

  if (metaData.x.length < data.totalFrames) {
    selected = (metaData.x.length * selected) / data.totalFrames;
  }

  var point = {
    x: [metaData.x[Math.ceil(selected)]],
    y: [metaData.y[Math.ceil(selected)]],
    name: "frame",
    mode: "markers",
    type: "scatter",
    marker: {
      color: "rgb(255, 0, 0)",
      size: 10,
    },
  };

  var plots = [xy, point];

  if (metaData.vector !== C.vectorsOptions[0]) {
    // total frames value is different from the length of position array -> the red point is taken proportionally wrt to those values.
    // when visualizing velocity, however, i visualize the velocity at the "real" frame, not at he one where the red point currently is.

    var dx = metaData.vector.dx[metaData.frame]; //> 0 ? 0.1 : -0.1;
    var dy = metaData.vector.dy[metaData.frame]; //> 0 ? 0.1 : -0.1;

    var line = {
      x: [
        metaData.x[Math.ceil(selected)],
        metaData.x[Math.ceil(selected)] + dx,
      ],
      y: [
        metaData.y[Math.ceil(selected)],
        metaData.y[Math.ceil(selected)] + dy,
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
    
    if(dx > 0 && dy < 0) angle -= 360;
    else if(dx < 0 && dy > 0) angle -= 180;
    else if(dx < 0 && dy < 0) angle += 180;

    var arrow = {
      x: [metaData.x[Math.ceil(selected)] + dx],
      y: [metaData.y[Math.ceil(selected)] + dy],
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


    console.log(dx)
    console.log(dy)
    console.log(angle)

    plots.push(line);
    plots.push(arrow);
  }

  var layout = {
    title: metaData.title,
    xaxis: {
      title: {
        text: metaData.xlabel,
      },
    },
    yaxis: {
      title: {
        text: metaData.ylabel,
      },
    },
    font: {
      family: "Arial",
      size: 10,
    },
    height: 180,
    width: 600,
    maxWidth: "100%",
    margin: {
      r: 10,
      b: 50,
      t: 50,
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

// var trace2 = {
//   x: [0.8],
//   y: [0.8],
//   mode: 'markers',
//   marker: {
//     symbol: 'triangle-down',
//     angle: 90,
//     size: 20,
//     color: 'blue'
//   },
//   type: 'scatter'
// };
