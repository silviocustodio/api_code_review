import React from "react";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  links: {
    color: "inherit",
    textDecoration: "inherit",
  },
});

class SubHeader extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              GAMES REVIEW
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            ></Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="outlined" color="primary" disableElevation>
                    <Link className={classes.links} to="/">
                      Home
                    </Link>
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    <Link className={classes.links} to="/allreviews">
                      {" "}
                      All Reviews
                    </Link>
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary">
                    <Link className={classes.links} to="/toptrends">
                      {" "}
                      Top Trends
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SubHeader);
