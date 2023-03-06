export default class ButtonsMetadata {
  constructor({ functions, names, colors }) {
    this.functions = functions;
    this.names = names;
    this.colors = colors;
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
