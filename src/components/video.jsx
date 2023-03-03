import React, { useRef } from "react";
import ReactPlayer from "react-player";
import VideoPlayer from "react-video-player-extended";
import { Button } from "@mui/material";
import ProgressBar from "./progressbar";
import Grid from "@mui/material/Grid";
import { Pause, PlayArrow } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

const frameTime = 1 / 30;
const width = "400";
const height = "230";

export default function Video({
  onDur,
  name,
  frame,
  onPlay,
  onPause,
  totalFrames,
  onProgressDrag,
}) {
  const videoRef = useRef(null);

  // const [playing, setPlaying] = useState(false);

  const goTo = () => {
    if (videoRef.current === null) return;
    videoRef.current.getInternalPlayer().currentTime = frame * frameTime;
  };

  // const draw = () => {
  //   console.log("draw");

  //   videoRef.current.getInternalPlayer().currentTime = Math.min(
  //     videoRef.current.getDuration(),
  //     videoRef.current.getInternalPlayer().currentTime + frameTime
  //   );

  //   const video = videoRef.current.getInternalPlayer();
  //   const canvas = canvasRef.current;
  //   const ctx = canvas.getContext("2d");

  //   ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  //   if (playing) {
  //     sleep(4);
  //     requestAnimationFrame(draw);
  //   }
  // };

  return (
    //<VideoPlayer
    //  ref={videoRef}
    //  onReady={goTo()}
    //  url={require("../videos/" + name + ".mp4")}
    //  muted
    //  onDuration={onDur}
    //  width="430px"
    //  height="260px"
    //  controls={["Time", "Progress"]}
    ///>
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <ReactPlayer
          ref={videoRef}
          onReady={goTo()}
          url={require("../videos/" + name + ".mp4")}
          muted
          onDuration={onDur}
          width={width + "px"}
          height={height + "px"}
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
          style={{ position: "relative", top: "-60px" }}
        >
          <IconButton onClick={onPlay} color="#000f">
            <PlayArrow />
          </IconButton>
          <IconButton onClick={onPause}>
            <Pause />
          </IconButton>
        </Grid>
        <ProgressBar
          max={totalFrames}
          onProgressDrag={onProgressDrag}
          frame={frame}
          style={{ position: "relative", top: "-60px", width: parseInt(width) }}
        />
      </Grid>
    </>
  );
}

//export default class Video extends React.Component {
//  constructor(props) {
//    super(props);
//    this.onProg = props.onProg;
////    this.onDur = props.onDur;
////    this.name = props.name;
////    this.state = {
////      name: this.name,
////    };
////  }
////  render() {
////    return (
////      <ReactPlayer
////        url={"video/" + this.state.name + ".mp4"}
////        controls
////        muted
////        onProgress={this.onProg}
////        onDuration={this.onDur}
////        progressInterval={1}
////        width="400px"
////        height="230px"
////        ref={(player) => {
//          this.player = player;
//        }}
//      />
//    );
//  }
//}
