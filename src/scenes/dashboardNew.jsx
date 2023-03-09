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
import DropDownSelection from "../components/dropdownSelection";
import RadioButtonsMetadata from "../structures/radiobuttonsmetadata";
import DropDownMetadata from "../structures/dropdownmetadata";

const mdTheme = createTheme();

const paperUpHeight = 310;
const paperDownHeight = 330;
const paperWidth = 1400;

// const paperVideoHeigth = 270;
// const imageWidth = 190;
// const paperImageWidth = imageWidth + 16;
// const paperWidth = 1100;
// const paperWidthUp = paperWidth + paperImageWidth + 100;

//color when a button is unselected.
const unSelected = mdTheme.palette.grey[400];

const initialColorOption = C.colorOptions[0];
const initialVectorOption = C.vectorsOptions[0];

const MS_PER_FRAME = 100;

export default function DashboardNew() {
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

  const [video, setVideo] = useState(C.namesVideo[0]);

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

  const positions_x = useMemo(() => {
    return target.map((i) => data.position_x[i]);
  }, [target]);

  const positions_y = useMemo(() => {
    return target.map((i) => data.position_y[i]);
  }, [target]);

  const legendNames = useMemo(() => {
    return target.map((i) => data.mappingInverse[i]);
  }, [target]);

  var colorUp = useMemo(() => {
    return target.map((i) => data.colorMapping[i]);
  }, [target]);

  var velocity = useMemo(() => {
    return target.map((i) => getValue(data.velocity_x[i], data.velocity_y[i]));
  }, [target]);

  var velocity_x = useMemo(() => {
    return target.map((i) => data.velocity_x[i]);
  }, [target]);

  var velocity_y = useMemo(() => {
    return target.map((i) => data.velocity_y[i]);
  }, [target]);

  var acceleration = useMemo(() => {
    return target.map((i) => getValue(data.velocity_x[i], data.velocity_y[i]));
  }, [target]);

  let frames = useMemo(() => {
    return target.map((_) => [...Array(data.totalFrames).keys()]);
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

  var colorBarUp = {};

  if (target.length < 2) {
    if (colorOption === C.colorOptions[1]) {
      colorUp = [velocity[0]];
      colorBarUp["title"] = "Velocity";
      addColorBarAttr(colorBarUp);
      metaPlotUp.setColorBar(colorBarUp);
    } else if (colorOption === C.colorOptions[2]) {
      colorUp = [acceleration[0]];
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
    // color: colorUp,//or target color?
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

  var dropDownMetadataVector = new DropDownMetadata({
    onChange: (event) => {
      setVectorOption(event.target.value);
    },
    values: C.vectorsOptions,
    label: C.vectorsLabel,
    selected: vectorOption,
  });

  var dropDownMetadataColor = new DropDownMetadata({
    onChange: (event) => {
      setColorOption(event.target.value);
    },
    values: C.colorOptions,
    label: C.colorLabel,
    selected: target.length > 1 ? C.colorOptions[0] : colorOption,
  });

  var dropDownMetadataVideo = new DropDownMetadata({
    onChange: (event) => {
      setVideo(event.target.value);
    },
    values: C.namesVideo,
    label: C.videoLabel,
    selected: video,
  });

  const onProgress = (event) => {
    let newValue;
    if (event.target.value === 0) newValue = 1;
    else newValue = parseInt(event.target.value);
    setFrame(newValue);
  };

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
              p: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: paperUpHeight,
              width: paperWidth,
            }}
          >
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Grid item>
                <GraphButtons metaData={buttonsPlotUp} />
              </Grid>

              <Grid container item rowSpacing={3} direction="column">
                <Grid item>
                  <DropDownSelection metaData={dropDownMetadataColor} />
                </Grid>
                <Grid item>
                  <DropDownSelection metaData={dropDownMetadataVector} />
                </Grid>
              </Grid>
            </Grid>

            <PlotNuoto
              metaData={metaPlotUp}
              onDrag={onDrag}
              width={colorOption === C.colorOptions[0] ? 1250 : 1200}
              height={paperUpHeight - 30}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: paperDownHeight,
              width: paperWidth,
            }}
          >
            <GraphButtons metaData={buttonsPlotDown} />
            <PlotNuoto
              metaData={metaPlotDown}
              onDrag={onDrag}
              width={720}
              height={paperDownHeight - 30}
            />
            <Video
              name={video}
              frame={frame}
              onProgressDrag={onProgress}
              onPlay={onPlay}
              totalFrames={data.totalFrames}
              playing={playing}
            />
            <Grid
              container
              direction="column"
              justifyContent="space-between"
              alignItems="flex-end"
              rowSpacing={2}
              style={{ width: "150px" }}
            >
              <Grid item>
                <DropDownSelection metaData={dropDownMetadataVideo} />
              </Grid>
              <Grid item>
                <ImageBody
                  targetSelection={targetSelection}
                  targets={target}
                  fillColorNotChosen={unSelected}
                  imageWidth={120}
                />
              </Grid>
            </Grid>
          </Paper>
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
  colorbar["x"] = -0.12;
  colorbar["nticks"] = 4;
  return colorbar;
}
