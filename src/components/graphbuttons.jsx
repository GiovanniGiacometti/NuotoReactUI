import { Button, ButtonGroup } from "@mui/material";

export default function GraphButtons({metaData}) {
  return (
    <ButtonGroup
      variant="contained"
      aria-label="vertical contained button group"
      orientation="vertical"
      sx={{ backgroundColor: "rgba(0, 0, 0, 0)"}}
    >
      {metaData.functions.map((f, i) => (
        <Button key={i + metaData.names[i]} onClick={f} size={"small"} sx={{backgroundColor:metaData.colors[i]}}>
          {metaData.names[i]}
        </Button>
      ))}
    </ButtonGroup>
  );
}
