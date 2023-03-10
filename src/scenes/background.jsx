import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { useState } from "react";
import { Typography } from "@mui/material";
import { styled, ThemeProvider, createTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItems from "../components/listItems";
import Dashboard from "./dashboard";
import DashboardNew from "./dashboardNew";
import ListItemMetadata from "../structures/listitemmetadata";
import DashboardIcon from "@mui/icons-material/Dashboard";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

const mdTheme = createTheme();
const drawerWidth = 200;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const names = ["DASHBOARD1", "DASHBOARDNEW", "COMPARE"];
const icons = [<DashboardIcon />, <DashboardIcon />, <CompareArrowsIcon />];
const colorInit = [
  mdTheme.palette.primary.light,
  mdTheme.palette.grey[400],
  mdTheme.palette.grey[400],
];

export default function Background() {
  const [open, setOpen] = useState(false);
  const [option, setOption] = useState(names[0]);
  const [colors, setColors] = useState(colorInit);

  var functions = [
    () => {
      setOption(names[0]);
      setColors(colorInit);
    },
    () => {
      setOption(names[1]);
      setColors([
        mdTheme.palette.grey[400],
        mdTheme.palette.primary.light,
        mdTheme.palette.grey[400],
      ]);
    },
    () => {
      setOption(names[2]);
      setColors([
        mdTheme.palette.grey[400],
        mdTheme.palette.grey[400],
        mdTheme.palette.primary.light,
      ]);
    },
  ];

  let listItemMetadata = new ListItemMetadata({
    functions: functions,
    names: names,
    icons: icons,
    colors: colors,
  });

  const toggleDrawer = () => {
    setOpen(!open);
  };

  let ret;
  if (option === names[0]) ret = <DashboardNew />;
  if (option === names[1]) ret = <DashboardNew />;
  if (option === names[2]) ret = <></>;

  return (
    <ThemeProvider theme={mdTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar position="absolute" open={open}>
          <Toolbar
            variant="dense"
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            variant="dense"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItems metaData={listItemMetadata} />
          </List>
        </Drawer>
        {ret}
      </Box>
    </ThemeProvider>
  );
}
