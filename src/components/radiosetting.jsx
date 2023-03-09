import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { memo } from "react";
import { Typography } from "@mui/material";

function SRB({ metaData }) {
  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group" sx={{ fontSize: 13 }}>
        {metaData.name}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="row-radio-buttons-group"
        value={metaData.initialValue}
        onChange={metaData.onChange}
        size="small"
      >
        {metaData.values.map((l, i) => (
          <FormControlLabel
            key={i + l}
            value={l}
            control={<Radio size="small"  />}
            label={<Typography fontSize={12}>{l}</Typography>}
            sx={{ fontSize: "3px" }}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps.metaData.isEqual(nextProps.metaData);
}

const SettingsRadioButtons = memo(SRB, arePropsEqual);
export default SettingsRadioButtons;
