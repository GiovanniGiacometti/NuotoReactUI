import ReactPlayer from "react-player";

export default function Video({ onProg, onDur }) {
  return (
    <ReactPlayer
      url="video/lq_video_RoI.mp4"
      controls
      muted
      onProgress={onProg}
      onDuration={onDur}
      width="320px"
      height="200px"

      //real = 256*144
    />
  );
}
