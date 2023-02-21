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

const initialColorOption = C.colorOptions[0];

const initialVectorOption = C.vectorsOptions[0];

const imageWidth = 190;

export default function Dashboard() {
  const [target, setTarget] = useState(0);
  const [seconds, setSeconds] = useState(1);
  const [duration, setDuration] = useState(0);
  const [plotVelocity, setPlotVelocity] = useState(true);
  const [plotX, setPlotX] = useState(true);
  const [colorOption, setColorOption] = useState(initialColorOption);
  const [vectorOption, setVectorOption] = useState(initialVectorOption);
  const [selectionColor, setSelectionColor] = useState(data.colorMapping[0]);

  const unSelected = mdTheme.palette.grey[400];

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

  var toPlot = data.velocity_x[target];
  var title = "X velocity of ";

  if (plotVelocity && !plotX) {
    toPlot = data.velocity_y[target];
    title = "Y velocity of ";
  } else if (!plotVelocity && plotX) {
    toPlot = data.acceleration_x[target];
    title = "X acceleration of ";
  } else if (!plotVelocity && !plotX) {
    toPlot = data.acceleration_y[target];
    title = "Y acceleration of ";
  }

  var metaPlotDown = new PlotMetadata({
    x: [...Array(data.totalFrames).keys()],
    y: toPlot,
    title: title + Object.keys(data.mapping)[target],
    xlabel: "Frames",
    ylabel: (plotVelocity ? "Velocity" : "Acceleration") + (plotX ? " X" : "Y"),
    legendName:
      (plotVelocity ? "Velocity" : "Acceleration") + (plotX ? " X" : "Y"),
    mode: "markers",
    type: "scatter",
    frame: getFrame(seconds, duration),
    color: mdTheme.palette.primary["main"],
    vector: C.vectorsOptions[0],
  });

  var functionsDown1 = [
    () => {
      setPlotX(true);
    },
    () => {
      setPlotX(false);
    },
  ];

  var functionsDown2 = [
    () => {
      setPlotVelocity(true);
    },
    () => {
      setPlotVelocity(false);
    },
  ];

  var colorsDown1 = [
    plotX ? mdTheme.palette.primary : unSelected,
    plotX ? unSelected : mdTheme.palette.primary,
  ];

  var colorsDown2 = [
    plotVelocity ? mdTheme.palette.primary : unSelected,
    plotVelocity ? unSelected : mdTheme.palette.primary,
  ];

  const namesDown1 = ["X-Frames", "Y-Frames"];
  const namesDown2 = ["Velocity", "Acceleration"];

  var colorsUp = [mdTheme.palette.primary, unSelected, unSelected];
  var functionsUp = [() => {}, () => {}, () => {}];
  const namesUp = ["Trajectory", "KPI", "Radar"];

  var buttonsPlotDown1 = new ButtonsMetadata({
    functions: functionsDown1,
    names: namesDown1,
    colors: colorsDown1,
  });

  var buttonsPlotDown2 = new ButtonsMetadata({
    functions: functionsDown2,
    names: namesDown2,
    colors: colorsDown2,
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
                  }}
                >
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Grid item>
                      <GraphButtons metaData={buttonsPlotDown1} />
                    </Grid>
                    <Grid item>
                      <GraphButtons metaData={buttonsPlotDown2} />
                    </Grid>
                  </Grid>

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
                  width: imageWidth + 16
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
