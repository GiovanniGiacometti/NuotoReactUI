import {createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Video from '../components/video';
import Image from '../components/image';
import { useState } from 'react';
import * as data from "../data/data";
import PlotNuoto from '../components/plot';
import defineMetadata from "../structures/plotmetadata";


const mdTheme = createTheme();


export default function Dashboard() {

    const [target, setTarget] = useState(0);
    var metaPlotUp = defineMetadata({x: data.position_x[target], y:data.position_y[target], title:"Position of " + data.mapping[target], xlabel: "X", ylabel: "Y",legendName:"Position",mode:"markers",type:"scatter"});
    var metaPlotDown = defineMetadata({x:[...Array(data.totalFrames).keys()], y:data.velocity_x[target], title:"X velocity of " + data.mapping[target], xlabel: "Frames", ylabel: "Velocity",legendName:"Velocity",mode:"markers",type:"scatter"});

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
                    justifyContent="space-evenly"
                    alignItems="center"
                    rowSpacing={5}
                    columnSpacing={4}
                    sx={{p:2}}>
                    <Grid item xs={12} md={8} lg={5} 
                    container
                    direction="column"
                    justifyContent="space-evenly"
                    rowSpacing={1}
                    columnSpacing={1}>
                        <Grid item xs={12} md={8} lg={5} >
                            <PlotNuoto metaData={metaPlotUp}/>
                        </Grid>
                        <Grid item xs={12} md={8} lg={5}>
                            <PlotNuoto  metaData={metaPlotDown}/>
                        </Grid>
                    </Grid>
                    <Grid item 
                        container
                        alignItems="center"
                        direction="column"
                        justifyContent="space-evenly" 
                        xs={12} md={8} lg={5}>
                        <Grid><Image targetSelection={targetSelection}/></Grid>
                    </Grid>

                    <Grid item xs={12} md={8} lg={5}>
                        <Video />
                    </Grid>
                
                
                </Grid>
            </Box>
        </ThemeProvider>
    );
}