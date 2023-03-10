export default class PlotMetadata {
  constructor({
    limits,
    plots,
    title,
    xlabel,
    ylabel,
    legendName,
    mode,
    type,
    frame,
    color,
    colorbar,
    vector,
  }) {
    // this.x = x;
    // this.y = y;
    this.limits = limits;
    this.plots = plots;
    this.title = title;
    this.xlabel = xlabel;
    this.ylabel = ylabel;
    this.legendName = legendName;
    this.ylabel = ylabel;
    this.mode = mode;
    this.type = type;
    this.frame = frame;
    this.color = color;
    this.colorbar = colorbar;
    this.vector = vector;
  }

  setColorBar(colorbar) {
    this.colorbar = colorbar;
  }

  setColor(color) {
    this.color = color;
  }

  setVector(vector) {
    this.vector = vector;
  }

  isEqual(other){
    
  }
}
