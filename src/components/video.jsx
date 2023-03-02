import ReactPlayer from "react-player";
import React from "react";

export default function Video({ onProg, onDur, name }) {
  return (
    <ReactPlayer
      url={"video/" + name + ".mp4"}
      controls
      muted
      onProgress={onProg}
      onDuration={onDur}
      progressInterval={1}
      width="400px"
      height="230px"
    />
  );
}

//export default class Video extends React.Component {
//  constructor(props) {
//    super(props);
//    this.onProg = props.onProg;
//    this.onDur = props.onDur;
//    this.name = props.name;
//    this.state = {
//      name: this.name,
//    };
//  }
//  render() {
//    return (
//      <ReactPlayer
//        url={"video/" + this.state.name + ".mp4"}
//        controls
//        muted
//        onProgress={this.onProg}
//        onDuration={this.onDur}
//        progressInterval={1}
//        width="400px"
//        height="230px"
//        ref={(player) => {
//          this.player = player;
//        }}
//      />
//    );
//  }
//}
