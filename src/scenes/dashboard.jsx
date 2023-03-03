import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Video from "../components/video";
import ImageBody from "../components/image";
import { useState, useEffect, useRef } from "react";
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
import ProgressBar from "../components/progressbar";
import RadioButtonsMetadata from "../structures/radiobuttonsmetadata";
import { Button } from "@mui/material";

const mdTheme = createTheme();
const paperHeigth = 210;
const paperVideoHeigth = 270;
const imageWidth = 190;

//color when a button is unselected.
const unSelected = mdTheme.palette.grey[400];

const initialColorOption = C.colorOptions[0];
const initialVectorOption = C.vectorsOptions[0];

const MS_PER_FRAME = 30;

export default function Dashboard() {
  //selected target (head, shoulder...)
  const [target, setTarget] = useState([0]);

  const [frame, setFrame] = useState(0);

  const [playing, setPlaying] = useState(false);

  //option for lower plot: what are we plotting?
  const [lowerPlottingOption, setLowerPlottingOption] = useState(
    C.lowerPlottingOptions[0]
  );

  //option for upper plot: what color are we using?
  const [colorOption, setColorOption] = useState(initialColorOption);

  //option for upper plot: what vector are we plotting?
  const [vectorOption, setVectorOption] = useState(initialVectorOption);

  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      if (playing) {
        if (frame > data.totalFrames) {
          setPlaying(false);
          return;
        }
        setFrame(frame + 1);
      }
    }, 10);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [frame, playing]);

  const [video, setVideo] = useState(C.namesVideo[0]);
  var metaPlotUp = new PlotMetadata({
    x: target.map((i) => data.position_x[i]),
    y: target.map((i) => data.position_y[i]),
    title: "Position",
    xlabel: "X [m]",
    ylabel: "Y [m]",
    legendName: target.map((i) => data.mappingInverse[i]),
    mode: "markers",
    type: "scatter",
    frame: frame,
  });

  var colorUp = target.map((i) => data.colorMapping[i]);

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
      dx: target.map((i) => data.velocity_x[i]),
      dy: target.map((i) => data.velocity_y[i]),
    };
  } else if (vector === C.vectorsOptions[2]) {
    vector = {
      dx: target.map((i) => data.velocity_x[i]),
      dy: target.map((i) => data.velocity_y[i]),
    };
  }

  metaPlotUp.setVector(vector);

  let toPlot;
  let title;
  let ylabel;
  switch (lowerPlottingOption) {
    case C.lowerPlottingOptions[0]:
      toPlot = target.map((i) => data.position_x[i]);
      title = "X position";
      ylabel = "X position [m]";
      break;
    case C.lowerPlottingOptions[1]:
      toPlot = target.map((i) => data.position_y[i]);
      title = "Y position";
      ylabel = "Y Position [m]";
      break;
    case C.lowerPlottingOptions[2]:
      toPlot = target.map((i) =>
        getValue(data.velocity_x[i], data.velocity_y[i])
      );
      title = "Velocity";
      ylabel = "Velocity [m/s]";
      break;
    default:
      toPlot = target.map((i) =>
        getValue(data.velocity_x[i], data.velocity_y[i])
      );
      title = "Acceleration";
      ylabel = "Acceleration [m^2/s]";
      break;
  }

  var metaPlotDown = new PlotMetadata({
    x: target.map((_) => [...Array(data.totalFrames).keys()]),
    y: toPlot,
    title: title,
    xlabel: "Frames",
    ylabel: ylabel,
    legendName: target.map((item, _) => data.mappingInverse[item]),
    mode: "markers",
    type: "scatter",
    frame: frame,
    color: target.map((i) => data.colorMapping[i]),
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

  var buttonsPlotUp = new ButtonsMetadata({
    functions: functionsUp,
    names: namesUp,
    colors: colorsUp,
  });

  var buttonsPlotDown = new ButtonsMetadata({
    functions: functionsDown,
    names: C.lowerPlottingOptions,
    colors: colorsDown,
  });

  var colorsVideo = [
    video === C.namesVideo[0] ? mdTheme.palette.primary : unSelected,
    video === C.namesVideo[1] ? mdTheme.palette.primary : unSelected,
    unSelected,
  ];

  var functionsVideo = [
    () => {
      setVideo(C.namesVideo[0]);
    },
    () => {
      setVideo(C.namesVideo[1]);
    },
    () => {},
  ];

  var buttonsPlotVideo = new ButtonsMetadata({
    functions: functionsVideo,
    names: C.namesVideo,
    colors: colorsVideo,
  });

  const onNewColorSelected = (event) => {
    if (target.length > 1) return;
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
  var updateDuration = (duration) => {};

  var targetSelection = (id) => {
    const selectedTarget = data.mapping[id];
    if (target.includes(selectedTarget)) {
      setTarget(target.filter((item) => item !== selectedTarget));
      return;
    }
    setTarget([...target, selectedTarget]);
  };

  const onPlay = () => {
    setPlaying(true);
  };

  const onPause = () => {
    setPlaying(false);
  };
  var onDrag = (area) => {};

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
              <PlotNuoto metaData={metaPlotUp} onDrag={onDrag} />
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
                    width: 890,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <GraphButtons metaData={buttonsPlotDown} />
                  <PlotNuoto metaData={metaPlotDown} onDrag={onDrag} />
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "row",
                    height: paperVideoHeigth,
                    width: 890,
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <GraphButtons metaData={buttonsPlotVideo} />

                  <Video
                    onDur={updateDuration}
                    name={video}
                    frame={frame}
                    onProgressDrag={(event) => {
                      setFrame(parseInt(event.target.value));
                    }}
                    onPlay={onPlay}
                    onPause={onPause}
                    totalFrames={data.totalFrames}
                  ></Video>

                  <Typography>{"Frame : " + frame}</Typography>
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
                  targets={target}
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
