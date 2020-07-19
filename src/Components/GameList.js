import React from "react";
import api from "../api";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";

import Footer from "./Footer";

import Modal from "./Modal";
import Loader from "../assets/loading_no_text_bullet_purple.gif";

const styles = (theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },

  loaderPosition: {
    marginTop: 5,
    width: "90%",
    marginLeft: 40,
    right: 0,
  },
});

class GameList extends React.Component {
  state = {
    games: [],
  };

  async componentDidMount() {
    this.setState({ loading: true }, () => {
      api
        .get("game?offset=0&setSize=10&ascending=true&returnCount=false")
        .then((res) => {
          console.log(res);

          this.setState({
            loading: false,
            games: res.data.data,
          });
        });
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <React.Fragment>
          <searchGameDescription />

          <main>
            <Container className={classes.cardGrid} maxWidth="md">
              {this.state.loading ? (
                <div>
                  <img src={Loader} className={classes.loaderPosition} />
                </div>
              ) : (
                <Grid container spacing={4}>
                  {this.state.games.map((card) => (
                    <Grid item key={card.id} xs={12} sm={6} md={4}>
                      <Card className={classes.card}>
                        <CardMedia
                          className={classes.cardMedia}
                          image={`https://steamcdn-a.akamaihd.net/steam/apps/${card.steam_appid}/header.jpg`}
                          title="Image title"
                        />
                        <CardContent className={classes.cardContent}>
                          <Typography gutterBottom variant="h5" component="h2">
                            {card.display_name}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Modal
                            display_name={card.display_name}
                            steam_appid={card.steam_appid}
                          />
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Container>
          </main>
          <Footer />
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(styles)(GameList);
