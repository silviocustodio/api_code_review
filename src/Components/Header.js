import React from "react";
// import axios from 'axios';
import api from "../api";

import AppBar from "@material-ui/core/AppBar";
import GamesIcon from "@material-ui/icons/Games";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
});

class Header extends React.Component {
 

  render() {
    const { classes } = this.props;
    return (
        <React.Fragment>
          <CssBaseline />
          <AppBar position="relative">
            <Toolbar>
              <GamesIcon className={classes.icon} />
              <Typography variant="h6" color="inherit" noWrap>
                API Games 
              </Typography>
            </Toolbar>
          </AppBar>
        </React.Fragment>
    );
  }
}

export default withStyles(styles)(Header);
