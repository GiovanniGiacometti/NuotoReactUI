import { Button, ButtonGroup } from "@mui/material";
import { memo } from "react";

function GB({ metaData }) {
  return (
    <ButtonGroup
      variant="contained"
      aria-label="vertical contained button group"
      orientation={metaData.orientation}
      sx={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
    >
      {metaData.functions.map((f, i) => (
        <Button
          key={i + metaData.names[i]}
          onClick={f}
          size={"small"}
          sx={{ backgroundColor: metaData.colors[i] , fontSize: "9px" }}
        >
          {metaData.names[i]}
        </Button>
      ))}
    </ButtonGroup>
  );
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps.metaData.isEqual(nextProps.metaData);
}

const GraphButtons = memo(GB, arePropsEqual);
export default GraphButtons;
