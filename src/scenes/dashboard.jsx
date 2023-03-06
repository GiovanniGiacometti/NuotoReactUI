import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Video from "../components/video";
import ImageBody from "../components/image";
import { useState, useEffect, useRef, useMemo } from "react";
import * as data from "../data/data";
import * as C from "../data/constants";
import PlotNuoto from "../components/plot";
import PlotMetadata from "../structures/plotmetadata";
import ButtonsMetadata from "../structures/buttonsmetadata";
import { createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import GraphButtons from "../components/graphbuttons";
import SettingsRadioButtons from "../components/radiosetting";
import RadioButtonsMetadata from "../structures/radiobuttonsmetadata";

const mdTheme = createTheme();
const paperHeigth = 210;
const paperVideoHeigth = 270;
const imageWidth = 190;
const paperImageWidth = imageWidth + 16;
const paperWidth = 1100;
const paperWidthUp = paperWidth + paperImageWidth + 100;

//color when a button is unselected.
const unSelected = mdTheme.palette.grey[400];

const initialColorOption = C.colorOptions[0];
const initialVectorOption = C.vectorsOptions[0];

const MS_PER_FRAME = 100;

export default function Dashboard() {
  //selected target (head, shoulder...)
  const [target, setTarget] = useState([0]);

  const [frame, setFrame] = useState(1);

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
          setFrame(0);
          return;
        }
        setFrame(frame + 1);
      }
    }, MS_PER_FRAME);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [frame, playing]);

  const [video, setVideo] = useState(C.namesVideo[0]);

  const positions_x = useMemo(() => {
    return target.map((i) => data.position_x[i]);
  }, [target]);

  const positions_y = useMemo(() => {
    return target.map((i) => data.position_y[i]);
  }, [target]);

  const legendNames = useMemo(() => {
    return target.map((i) => data.mappingInverse[i]);
  }, [target]);

  var metaPlotUp = new PlotMetadata({
    x: positions_x,
    y: positions_y,
    title: "Position",
    xlabel: "X [m]",
    ylabel: "Y [m]",
    legendName: legendNames,
    mode: "markers",
    type: "scatter",
    frame: frame,
  });

  var colorUp = useMemo(() => {
    return target.map((i) => data.colorMapping[i]);
  }, [target]);

  var velocity = useMemo(() => {
    return [getValue(data.velocity_x[target[0]], data.velocity_y[target[0]])];
  }, [target]);

  var velocity_x = useMemo(() => {
    return target.map((i) => data.velocity_x[i]);
  }, [target]);

  var velocity_y = useMemo(() => {
    return target.map((i) => data.velocity_y[i]);
  }, [target]);

  var acceleration = useMemo(() => {
    console.log(target, target[0]);
    return [getValue(data.velocity_x[target[0]], data.velocity_y[target[0]])];
  }, [target]);

  let frames = useMemo(() => {
    return target.map((_) => [...Array(data.totalFrames).keys()]);
  }, [target]);

  var colorBarUp = {};

  if (target.length < 2) {
    if (colorOption === C.colorOptions[1]) {
      colorUp = velocity;
      colorBarUp["title"] = "Velocity";
      addColorBarAttr(colorBarUp);
      metaPlotUp.setColorBar(colorBarUp);
    } else if (colorOption === C.colorOptions[2]) {
      colorUp = acceleration;
      colorBarUp["title"] = "Acceleration";
      addColorBarAttr(colorBarUp);
      metaPlotUp.setColorBar(colorBarUp);
    }
  }

  metaPlotUp.setColor(colorUp);

  var vector = vectorOption;

  if (vector === C.vectorsOptions[1]) {
    vector = {
      dx: velocity_x,
      dy: velocity_y,
    };
  } else if (vector === C.vectorsOptions[2]) {
    vector = {
      dx: velocity_x,
      dy: velocity_y,
    };
  }

  metaPlotUp.setVector(vector);
  let toPlot;
  let title;
  let ylabel;
  switch (lowerPlottingOption) {
    case C.lowerPlottingOptions[0]:
      toPlot = positions_x;
      title = "X position";
      ylabel = "X position [m]";
      break;
    case C.lowerPlottingOptions[1]:
      toPlot = positions_y;
      title = "Y position";
      ylabel = "Y Position [m]";
      break;
    case C.lowerPlottingOptions[2]:
      toPlot = velocity;
      title = "Velocity";
      ylabel = "Velocity [m/s]";
      break;
    default:
      toPlot = acceleration;
      title = "Acceleration";
      ylabel = "Acceleration [m^2/s]";
      break;
  }

  var metaPlotDown = new PlotMetadata({
    x: frames,
    y: toPlot,
    title: title,
    xlabel: "Frames",
    ylabel: ylabel,
    legendName: legendNames,
    mode: "markers",
    type: "scatter",
    frame: frame,
    color: colorUp,
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
      ? mdTheme.palette.primary.light
      : unSelected,
    lowerPlottingOption === C.lowerPlottingOptions[1]
      ? mdTheme.palette.primary.light
      : unSelected,
    lowerPlottingOption === C.lowerPlottingOptions[2]
      ? mdTheme.palette.primary.light
      : unSelected,
    lowerPlottingOption === C.lowerPlottingOptions[3]
      ? mdTheme.palette.primary.light
      : unSelected,
  ];

  var colorsUp = [mdTheme.palette.primary.light, unSelected, unSelected];
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
    video === C.namesVideo[0] ? mdTheme.palette.primary.light : unSelected,
    video === C.namesVideo[1] ? mdTheme.palette.primary.light : unSelected,
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
    if (target.length === 1) setColorOption(event.target.value);
  };

  const onNewVectorSelected = (event) => {
    setVectorOption(event.target.value);
  };

  var metaRadioSettingsColor = new RadioButtonsMetadata({
    name: C.colorLabel,
    values: C.colorOptions,
    initialValue: target.length > 1 ? C.colorOptions[0] : colorOption,
    onChange: onNewColorSelected,
  });

  var metaRadioSettingsVectors = new RadioButtonsMetadata({
    name: C.vectorsLabel,
    values: C.vectorsOptions,
    initialValue: vectorOption,
    onChange: onNewVectorSelected,
  });

  var targetSelection = (id) => {
    const selectedTarget = data.mapping[id];
    if (target.includes(selectedTarget)) {
      let newTargets = target.filter((item) => item !== selectedTarget);
      setTarget(newTargets);
      if (newTargets.length === 1) {
        setColorOption(C.colorOptions[0]);
      }
      return;
    }
    setTarget([...target, selectedTarget]);
  };

  const onPlay = () => {
    setPlaying(!playing);
  };

  var onDrag = (area) => {};

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: mdTheme.palette.grey[100],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Grid
        container
        rowSpacing={1}
        sx={{
          margin: "0 auto",
          mt: 6,
          width: "90vw",
        }}
      >
        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              pl: 1,
              pr: 1,
              display: "flex",
              flexDirection: "row",
              height: paperHeigth,
              width: paperWidthUp,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <GraphButtons metaData={buttonsPlotUp} />
            <PlotNuoto metaData={metaPlotUp} onDrag={onDrag} width={1000} />
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
        >
          <Grid
            item
            container
            xs={12}
            md={12}
            lg={"auto"}
            direction="column"
            justifyContent="space-between"
            alignItems="center"
            rowSpacing={1}
            columnSpacing={1}
            sx={{
              width: paperWidth,
            }}
          >
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "row",
                  height: paperHeigth,
                  width: paperWidth,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <GraphButtons metaData={buttonsPlotDown} />
                <PlotNuoto
                  metaData={metaPlotDown}
                  onDrag={onDrag}
                  width={960}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={12} lg={12}>
              <Paper
                sx={{
                  p: 1,
                  display: "flex",
                  flexDirection: "row",
                  height: paperVideoHeigth,
                  width: paperWidth,
                  justifyContent: "space-evenly",
                  alignItems: "center",
                }}
              >
                <GraphButtons metaData={buttonsPlotVideo} />

                <Video
                  name={video}
                  frame={frame}
                  onProgressDrag={(event) => {
                    let newValue;
                    if (event.target.value === 0) newValue = 1;
                    else newValue = parseInt(event.target.value);
                    setFrame(newValue);
                  }}
                  onPlay={onPlay}
                  totalFrames={data.totalFrames}
                  playing={playing}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid item xs={12} md={12} lg={1.59}>
            <Paper
              sx={{
                p: 1,
                width: paperImageWidth,
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
