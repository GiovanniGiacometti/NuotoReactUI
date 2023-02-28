import ReactPlayer from "react-player";

export default function Video({ onProg, onDur }) {
  return (
    <ReactPlayer
      url="video/lq_video_RoI.mp4"
      controls
      muted
      onProgress={onProg}
      onDuration={onDur}
      progressInterval={10}
      width="400px"
      height="230px"

      //real = 256*144
    />
  );
}
