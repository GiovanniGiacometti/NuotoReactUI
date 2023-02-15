import {createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Video from '../components/video';
import ImageBody from '../components/image';
import { useState } from 'react';
import * as data from "../data/data";
import PlotNuoto from '../components/plot';
import PlotMetadata from '../structures/plotmetadata';
import ButtonsMetadata from '../structures/buttonsmetadata';


const mdTheme = createTheme();


export default function Dashboard() {

    const [target, setTarget] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [duration, setDuration] = useState(0);
    const [plotVelocity, setPlotVelocity] = useState(true);
    const [plotX, setPlotX] = useState(true);
    
    var metaPlotUp = new PlotMetadata({
                                        x: data.position_x[target],
                                        y: data.position_y[target], 
                                        title: "Position of " + Object.keys(data.mapping)[target],   
                                        xlabel: "X",      
                                        ylabel: "Y",        
                                        legendName: "Position", 
                                        mode: "markers",  
                                        type: "scatter", 
                                        frame: getFrame(seconds, duration)});
    
    

    var toPlot = data.velocity_x[target];
    var title = "X velocity of ";
    if(plotVelocity && !plotX) {
        toPlot = data.velocity_y[target];
        title = "Y velocity of ";
    }
    else if(!plotVelocity && plotX) {
        toPlot = data.acceleration_x[target]; 
        title = "X acceleration of ";
    }
    else if(!plotVelocity && !plotX) {
        toPlot = data.acceleration_y[target]; 
        title = "Y acceleration of ";
    }

    var metaPlotDown = new PlotMetadata({
                                        x: [...Array(data.totalFrames).keys()], 
                                        y: toPlot ,  
                                        title: title + Object.keys(data.mapping)[target], 
                                        xlabel: "Frames", 
                                        ylabel: plotVelocity ? "Velocity" : "Acceleration", 
                                        legendName: plotVelocity ? "Velocity" : "Acceleration",  
                                        mode:"markers",  
                                        type:"scatter", 
                                        frame:getFrame(seconds, duration)});

    var functionsUp = [
        ()=>{},
        ()=>{},
        ()=>{},
    ];
    
    const namesUp = ["Trajectories", "KPI", "Radar"];
    
    var functionsDown = [
        ()=>{setPlotX(true)},
        ()=>{setPlotX(false)},
        ()=>{setPlotVelocity(true)},
        ()=>{setPlotVelocity(false)},
    ];

    const namesDown = ["X-Frames", "Y-Frames", "Velocity", "Acceleration"];

    var buttonsPlotUp = new ButtonsMetadata({functions:functionsUp, names:namesUp});
    var buttonsPlotDown = new ButtonsMetadata({functions:functionsDown, names:namesDown});

    var updateFrame = (progress) => setSeconds(progress.playedSeconds);

    var updateDuration = (duration) => setDuration(duration);
    
    var targetSelection = (id) => {
        const newTarget = data.mapping[id];
        setTarget(newTarget);
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <CssBaseline />
            <Box
            sx={{
                backgroundColor: mdTheme.palette.grey[100],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto'}}> 
                <Grid container 
                    justifyContent="center"
                    alignItems="center"
                    rowSpacing={5}
                    columnSpacing={5}
                    sx={{p:2}}>
                    <Grid item xs={12} lg={6} 
                        container
                        direction="column"
                        justifyContent="space-evenly"
                        rowSpacing={1}
                        columnSpacing={1}>
                            <Grid item xs={12} md={12} lg={12} >
                                <PlotNuoto metaData={metaPlotUp} buttonsMetadata={buttonsPlotUp}/>
                            </Grid>
                            <Grid item xs={12} md={12} lg={12}>
                                <PlotNuoto  metaData={metaPlotDown} buttonsMetadata={buttonsPlotDown}/>
                            </Grid>
                    </Grid>
                    <Grid item 
                        container
                        alignItems="center"
                        direction="column"
                        justifyContent="space-evenly"
                        rowSpacing={4} 
                        columnSpacing={1} 
                        xs={12}lg={6}>
                        <Grid item xs={12} lg={4}>
                            <ImageBody targetSelection={targetSelection}/>
                        </Grid>
              
                        <Grid item xs={12} lg={4}>
                            <Video onProg={updateFrame} onDur={updateDuration}/>
                        </Grid>
                    </Grid>
                
                
                </Grid>
            </Box>
        </ThemeProvider>
    );
}




 function getFrame(seconds,length){
    return Math.ceil(seconds / length * data.totalFrames);
 }