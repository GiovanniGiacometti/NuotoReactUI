export default class PlotMetadata {
  constructor({ x, y, title, xlabel, ylabel, legendName, mode, type, frame }) {
    this.x = x;
    this.y = y;
    this.title = title;
    this.xlabel = xlabel;
    this.ylabel = ylabel;
    this.legendName = legendName;
    this.ylabel = ylabel;
    this.mode = mode;
    this.type = type;
    this.frame = frame;
  }
}
