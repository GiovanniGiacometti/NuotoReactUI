import React, { useRef } from "react";
import ReactPlayer from "react-player";
import ProgressBar from "./progressbar";
import Grid from "@mui/material/Grid";
import { Pause, PlayArrow } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";

const frameTime = 1 / 30;
const width = "400";
const height = "230";

export default function Video({
  name,
  frame,
  onPlay,
  totalFrames,
  onProgressDrag,
  playing,
  widthIn,
}) {
  const videoRef = useRef(null);
  const goTo = () => {
    if (videoRef.current === null) return;
    videoRef.current.getInternalPlayer().currentTime = frame * frameTime;
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{ position: "relative", top: "30px", width: width + "px" }}
      >
        <ReactPlayer
          ref={videoRef}
          onReady={goTo()}
          url={require("../videos/" + name + ".mp4")}
          muted
          width={parseInt(widthIn) + "px"}
          height={
            (parseInt(widthIn) * parseInt(height)) / parseInt(width) + "px"
          }
        ></ReactPlayer>
        <Grid
          container
          direction="row"
          item
          xs={12}
          md={12}
          lg={12}
          justifyContent="center"
          alignItems="center"
          width={parseInt(widthIn) + "px"}
          style={{
            position: "relative",
            top: "-60px",
          }}
        >
          <Grid item xs={9} md={9} lg={9}>
            <IconButton onClick={onPlay}>
              {playing && <Pause />}
              {!playing && <PlayArrow />}
            </IconButton>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <Typography align="center">{"Frame : " + frame}</Typography>
          </Grid>
        </Grid>
        <ProgressBar
          max={totalFrames}
          onProgressDrag={onProgressDrag}
          frame={frame}
          style={{
            position: "relative",
            top: "-62px",
            width: parseInt(widthIn),
          }}
        />
      </Grid>
    </>
  );
}
