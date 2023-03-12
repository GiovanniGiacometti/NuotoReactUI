export default class ButtonsMetadata {
  constructor({ functions, names, colors, orientation }) {
    this.functions = functions;
    this.names = names;
    this.colors = colors;
    this.orientation = orientation;
  }

  isEqual(other) {
    for (let i = 0; i < this.colors.length; i++) {
      if (this.colors[i] !== other.colors[i]) {
        return false;
      }
    }
    return true;
  }
}
