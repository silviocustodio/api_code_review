import React from "react";

import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      Silvio Custodio {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },

  footer: {
    paddingTop: 70,
    marginTop: "auto",
    paddingBottom: 10,
  },
});

class Footer extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <footer className={classes.footer}>
          <Typography variant="h6" align="center" gutterBottom>
            Silvio Custodio
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            <GitHubIcon className={classes.icon} />
            <Link
              color="inherit"
              href=" https://github.com/silviocustodio"
              target="_blank"
            >
              https://github.com/silviocustodio
            </Link>
          </Typography>
          <Copyright />
        </footer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Footer);
