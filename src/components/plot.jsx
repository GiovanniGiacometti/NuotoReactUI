import Plot from 'react-plotly.js';
import * as data from "../data/data";
import GraphButtons from './graphbuttons';
import Grid from '@mui/material/Grid';




export default function PlotNuoto ({metaData,buttonsMetadata}){
    var xy = {
        x: metaData.x,
        y:  metaData.y,
        name: metaData.legendName,
        mode: metaData.mode,
        type: metaData.type
    };
    
    var selected = metaData.frame;

    if (metaData.x.length < data.totalFrames){
        selected = metaData.x.length * selected / data.totalFrames;
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
          height : 250,
          width : 700,
          maxWidth:"100%",
          margin: {
            r: 10,
            b: 50,
            t: 50,
          }
    }
    return (
        <>
            <Grid container direction="column">
                <Grid item >
                    <GraphButtons functions={buttonsMetadata.functions} names={buttonsMetadata.names}/>
                </Grid>
                <Grid item >
                    <Plot data={plots} layout={layout} config={{displayModeBar:false}}/>
                </Grid>
                
            </Grid>
        </>
        
      );
}

