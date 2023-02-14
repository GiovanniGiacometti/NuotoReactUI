import Plot from 'react-plotly.js';


export default function PlotNuoto ({metaData}){
    var xy = {
        x: metaData.x,
        y:  metaData.x,
        name: metaData.name,
        mode: metaData.mode,
        type: metaData.type
    };

    // var point = {
    //     x: [position_x[selectedTarget][selected]],
    //     y: [position_y[selectedTarget][selected]],
    //     name: "frame",
    //     mode: 'markers',
    //     type: 'scatter',
    //     marker: {
    //         color: 'rgb(255, 0, 0)',
    //         size: 15
    //     },
    // };

    // var data = [xy,point];
    var data = [xy];

    var layout = {
        title: metaData.title,
        xaxis: {
            title: {
                text: metaData.xLabel,
            },
        },
        yaxis: {
            title: {
                text: metaData.yLabel,
        },
        },
        font: {
            family: 'Arial',
            size: 18,
          }
    
    }
    return (
        <Plot data={data} layout={layout} displayModeBar={false}/>
      );
}

