import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Video from "../components/video";
import ImageBody from "../components/image";
import { useState } from "react";
import * as data from "../data/data";
import * as C from "../data/constants";
import PlotNuoto from "../components/plot";
import PlotMetadata from "../structures/plotmetadata";
import ButtonsMetadata from "../structures/buttonsmetadata";
import { Typography } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import GraphButtons from "../components/graphbuttons";
import SettingsRadioButtons from "../components/radiosetting";
import RadioButtonsMetadata from "../structures/radiobuttonsmetadata";

const mdTheme = createTheme();
const paperHeigth = 210;
const paperVideoHeigth = 270;
const imageWidth = 190;

//color when a button is unselected.
const unSelected = mdTheme.palette.grey[400];

const initialColorOption = C.colorOptions[0];
const initialVectorOption = C.vectorsOptions[0];

export default function Dashboard() {
  //selected target (head, shoulder...)
  const [target, setTarget] = useState(0);

  //seconds the video is at
  const [seconds, setSeconds] = useState(1);

  //duration of the video, it's updated once the video is loaded
  const [duration, setDuration] = useState(0);

  //option for lower plot: what are we plotting?
  const [lowerPlottingOption, setLowerPlottingOption] = useState(
    C.lowerPlottingOptions[0]
  );

  //option for upper plot: what color are we using?
  const [colorOption, setColorOption] = useState(initialColorOption);

  //option for upper plot: what vector are we plotting?
  const [vectorOption, setVectorOption] = useState(initialVectorOption);

  //color of the target selected. Gives the color to the graph if target color is selected.
  const [selectionColor, setSelectionColor] = useState(data.colorMapping[0]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log(Video.getTime());
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, []);

  //metadata for upper plot
  var metaPlotUp = new PlotMetadata({
    x: data.position_x[target],
    y: data.position_y[target],
    title: "Position of " + Object.keys(data.mapping)[target],
    xlabel: "X",
    ylabel: "Y",
    legendName: "Position",
    mode: "markers",
    type: "scatter",
    frame: getFrame(seconds, duration),
  });

  var colorUp = selectionColor;

  var colorBarUp = {};

  if (colorOption === C.colorOptions[1]) {
    colorUp = getValue(data.velocity_x[target], data.velocity_y[target]);
    colorBarUp["title"] = "Velocity";
    addColorBarAttr(colorBarUp);
    metaPlotUp.setColorBar(colorBarUp);
  } else if (colorOption === C.colorOptions[2]) {
    colorUp = getValue(data.velocity_x[target], data.velocity_y[target]);
    colorBarUp["title"] = "Acceleration";
    addColorBarAttr(colorBarUp);
    metaPlotUp.setColorBar(colorBarUp);
  }

  metaPlotUp.setColor(colorUp);

  var vector = vectorOption;

  if (vector === C.vectorsOptions[1]) {
    vector = {
      dx: data.velocity_x[target],
      dy: data.velocity_y[target],
    };
  } else if (vector === C.vectorsOptions[2]) {
    vector = {
      dx: data.velocity_x[target],
      dy: data.velocity_y[target],
    };
  }

  metaPlotUp.setVector(vector);

  let toPlot;
  let title;
  let legendName;
  let ylabel;
  switch (lowerPlottingOption) {
    case C.lowerPlottingOptions[0]:
      toPlot = data.position_x[target];
      title = "X position of ";
      legendName = "X position";
      ylabel = "X position";
      break;
    case C.lowerPlottingOptions[1]:
      toPlot = data.position_y[target];
      title = "Y position of";
      legendName = "Y position";
      ylabel = "Y position";
      break;
    case C.lowerPlottingOptions[2]:
      toPlot = getValue(data.velocity_x[target], data.velocity_y[target]);
      title = "Velocity of ";
      legendName = "Velocity";
      ylabel = "Velocity";
      break;
    default:
      toPlot = getValue(data.velocity_x[target], data.velocity_y[target]);
      title = "Acceleration of ";
      legendName = "Acceleration";
      ylabel = "Acceleration";
      break;
  }

  var metaPlotDown = new PlotMetadata({
    x: [...Array(data.totalFrames).keys()],
    y: toPlot,
    title: title + Object.keys(data.mapping)[target],
    xlabel: "Frames",
    ylabel: ylabel,
    legendName: legendName,
    mode: "markers",
    type: "scatter",
    frame: getFrame(seconds, duration),
    color: mdTheme.palette.primary["main"],
    vector: C.vectorsOptions[0],
  });

  var functionsDown = [
    () => {
      setLowerPlottingOption(C.lowerPlottingOptions[0]);
    },
    () => {
      setLowerPlottingOption(C.lowerPlottingOptions[1]);
    },
    () => {
      setLowerPlottingOption(C.lowerPlottingOptions[2]);
    },
    () => {
      setLowerPlottingOption(C.lowerPlottingOptions[3]);
    },
  ];

  var colorsDown = [
    lowerPlottingOption === C.lowerPlottingOptions[0]
      ? mdTheme.palette.primary
      : unSelected,
    lowerPlottingOption === C.lowerPlottingOptions[1]
      ? mdTheme.palette.primary
      : unSelected,
    lowerPlottingOption === C.lowerPlottingOptions[2]
      ? mdTheme.palette.primary
      : unSelected,
    lowerPlottingOption === C.lowerPlottingOptions[3]
      ? mdTheme.palette.primary
      : unSelected,
  ];

  var colorsUp = [mdTheme.palette.primary, unSelected, unSelected];
  var functionsUp = [() => {}, () => {}, () => {}];
  const namesUp = ["Trajectory", "KPI", "Radar"];

  var buttonsPlotDown = new ButtonsMetadata({
    functions: functionsDown,
    names: C.lowerPlottingOptions,
    colors: colorsDown,
  });

  var buttonsPlotUp = new ButtonsMetadata({
    functions: functionsUp,
    names: namesUp,
    colors: colorsUp,
  });

  const onNewColorSelected = (event) => {
    setColorOption(event.target.value);
  };

  const onNewVectorSelected = (event) => {
    setVectorOption(event.target.value);
  };

  var metaRadioSettingsColor = new RadioButtonsMetadata({
    name: C.colorLabel,
    values: C.colorOptions,
    initialValue: colorOption,
    onChange: onNewColorSelected,
  });

  var metaRadioSettingsVectors = new RadioButtonsMetadata({
    name: C.vectorsLabel,
    values: C.vectorsOptions,
    initialValue: vectorOption,
    onChange: onNewVectorSelected,
  });

  var updateFrame = (progress) => setSeconds(progress.playedSeconds);

  var updateDuration = (duration) => setDuration(duration);

  var targetSelection = (id) => {
    const newTarget = data.mapping[id];
    if (newTarget === target) return;
    setTarget(newTarget);
    setSelectionColor(data.colorMapping[newTarget]);
  };

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Grid container rowSpacing={1} columnSpacing={3}>
          <Grid item xs={12} md={12} lg={12}>
            <Paper
              sx={{
                p: 1,
                display: "flex",
                flexDirection: "row",
                height: paperHeigth,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <GraphButtons metaData={buttonsPlotUp} />
              <PlotNuoto metaData={metaPlotUp} />
              <SettingsRadioButtons metaData={metaRadioSettingsColor} />
              <SettingsRadioButtons metaData={metaRadioSettingsVectors} />
            </Paper>
          </Grid>

          <Grid
            item
            container
            xs={12}
            md={12}
            lg={12}
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            rowSpacing={1}
            columnSpacing={1}
          >
            <Grid
              item
              container
              xs={12}
              md={12}
              lg={9}
              direction="column"
              justifyContent="space-between"
              alignItems="center"
              rowSpacing={1}
              columnSpacing={1}
            >
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "row",
                    height: paperHeigth,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <GraphButtons metaData={buttonsPlotDown} />
                  <PlotNuoto metaData={metaPlotDown} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "row",
                    height: paperVideoHeigth,
                    width: 550,
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Video onProg={updateFrame} onDur={updateDuration} />
                  <Typography>
                    {"Frame : " + getFrame(seconds, duration)}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
            <Grid item xs={12} md={12} lg={2.2}>
              <Paper
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "column",
                  width: imageWidth + 16,
                }}
              >
                <ImageBody
                  targetSelection={targetSelection}
                  first={target}
                  fillColorChosen={selectionColor}
                  fillColorNotChosen={unSelected}
                  imageWidth={imageWidth}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function getFrame(seconds, length) {
  return Math.ceil((seconds / length) * data.totalFrames);
}

function getValue(x, y) {
  let result = [];
  for (let i = 0; i < x.length; i++) {
    result.push(Math.sqrt(Math.pow(x[i], 2) + Math.pow(y[i], 2)));
  }
  return result;
}

function addColorBarAttr(colorbar) {
  colorbar["titleside"] = "Top";
  colorbar["x"] = -0.25;
  colorbar["nticks"] = 4;
  return colorbar;
}
