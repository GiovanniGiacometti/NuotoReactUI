import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export default function ListItems({ metaData }) {
  return metaData.functions.map((f, i) => (
    <ListItemButton onClick={f} key={metaData.names[i]}>
      <ListItemIcon sx={{color: metaData.colors[i]}}>{metaData.icon[i]}</ListItemIcon>
      <ListItemText primary={metaData.names[i]} />
    </ListItemButton>
  ));
}
