export default class RadioButtonsMetadata {
  constructor({ name, values, initialValue, onChange }) {
    this.name = name;
    this.values = values;
    this.initialValue = initialValue;
    this.onChange = onChange;
  }

  isEqual(other) {
    return this.initialValue === other.initialValue;
  }
}
