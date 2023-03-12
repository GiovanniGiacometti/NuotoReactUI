import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Typography } from "@mui/material";

export default function ListItems({ metaData }) {
  return metaData.functions.map((f, i) => (
    <ListItemButton
      onClick={f}
      key={metaData.names[i]}
      sx={{ display: "flex", justifyContent: "flex-start" }}
    >
      <ListItemIcon
        sx={{
          color: metaData.colors[i],
          width:"50"
        }}
      >
        {metaData.icon[i]}
      </ListItemIcon>
      <ListItemText
        disableTypography
        primary={<Typography fontSize={"12px"}>{metaData.names[i]}</Typography>}
      />
    </ListItemButton>
  ));
}
