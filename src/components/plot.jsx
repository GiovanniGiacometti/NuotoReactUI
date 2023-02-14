import Plot from 'react-plotly.js';
import * as data from "../data/data";



export default function PlotNuoto ({metaData}){
    var xy = {
        x: metaData.x,
        y:  metaData.y,
        name: metaData.legendName,
        mode: metaData.mode,
        type: metaData.type
    };


    var selected = metaData.frame;

    if (metaData.x.length < data.totalFrames){
        selected = Math.ceil(metaData.x.length * selected / data.totalFrames);
    }

     var point = {
         x: [metaData.x[Math.ceil(selected)]],
         y: [metaData.y[Math.ceil(selected)]],
         name: "frame",
         mode: 'markers',
         type: 'scatter',
         marker: {
             color: 'rgb(255, 0, 0)',
             size: 15
         },
     };

    var plots = [xy,point];

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
            family: 'Arial',
            size: 18,
          },
        width: "100%", 
        height:"320"
    
    
    }
    return (
        <Plot data={plots} layout={layout} config={{displayModeBar:false}}/>
      );
}

