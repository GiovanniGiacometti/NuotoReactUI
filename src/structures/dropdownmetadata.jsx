export default class DropDownMetadata {
  constructor({ onChange, values, label, selected }) {
    this.onChange = onChange;
    this.values = values;
    this.label = label;
    this.selected = selected;
  }

  isEqual(other) {
    return this.selected === other.selected;
  }
}
