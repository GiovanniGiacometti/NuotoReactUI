export default function ProgressBar({ max, onProgressDrag, frame, style }) {
  return (
    <input
      className="seekbar"
      type="range"
      min="0"
      max={max}
      value={frame}
      onChange={onProgressDrag}
      onInput={onProgressDrag}
      style={style}
    ></input>
  );
}
