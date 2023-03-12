import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { memo } from "react";

function DDS({ metaData }) {
  return (
    <FormControl>
      <InputLabel
        id={metaData.selected}
        htmlFor={metaData.selected}
        style={{ fontSize: "11px", fontWeight:"bold" }}
      >
        {metaData.label}
      </InputLabel>
      <Select
        labelId={metaData.selected}
        value={metaData.selected}
        onChange={metaData.onChange}
        autoWidth
        label={metaData.label}
        style={{ fontSize: "11px" }}
      >
        {metaData.values.map((l, i) => (
          <MenuItem key={l + i} value={l}>
            {l}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps.metaData.isEqual(nextProps.metaData);
}

const DropDownSelection = memo(DDS, arePropsEqual);
export default DropDownSelection;
