import React, { useState, useEffect, Fragment } from "react";
import api from "../api";
import axios from "axios";

import Footer from "./Footer";
import Loader from "../assets/loading_no_text_bullet_purple.gif";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import clsx from "clsx";

import Button from "@material-ui/core/Button";
import Pagination from "@material-ui/lab/Pagination";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import CardHeader from "@material-ui/core/CardHeader";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import { deepPurple, green, grey } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const styles = (theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },

  footer: {
    padding: theme.spacing(6),
  },
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
    width: "100%",
    padding: theme.spacing(1),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
    display: "block",
    width: 1000,
    height: 200,
  },
  image: {
    width: 90,
    height: 90,
  },
  img: {
    margin: "auto",
    display: "flex",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  links: {
    color: "inherit",
    textDecoration: "inherit",
  },
  bigAvatar: {
    margin: 10,
    width: 120,
    height: 120,
  },
  searchBar: {
    margin: " auto",
    maxWidth: 800,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: deepPurple[500],
  },
  loaderPosition: {
    margin: "auto",
    left: 0,
    right: 0,
  },
  searchPosition: {
    
  },
  containeDataPickerPosition: {
    display: "flex"

  },
  dataPickerPosition: {
    display: "flex",
    marginLeft: 400,
    marginTop: -42,
    width: "100%",
    paddingTop: 10,
  },
  dataPickerIcon: {
    marginTop: -25,
    marginLeft: 5,
    paddingTop: 0,
  },
  thumbIconTrue: {
    color: green[200],
  },
  thumbIconFalse: {
    color: grey[400],
  },
  pagination: {
    paddingTop: 20,
  },
  fabIcon: {
    width: 40,
    height: 40
  },

});

class AllReviews extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRowSize: 20,
    };
  }
  state = {
    games: [],
  };

  onChange = (event, index, selectedRowSize) => {
    this.setState({ selectedRowSize });
  };

  async componentDidMount() {
    this.setState({ loading: true }, () => {
      api
        .get("reviews?offset=0&setSize=10&ascending=true&returnCount=false")
        .then((res) => {
          console.log(res);

          this.setState({
            loading: false,
            games: res.data.data,
            expanded: false,
            setExpanded: false,
          });
        });
    });
  }

  render() {
    const { classes } = this.props;
    const { selectedRowSize } = this.state;
    function Expand() {
      const [expanded, setExpanded] = useState(false);

      const handleExpandClick = (i) => {
        setExpanded(expanded === i ? -1 : i);
      };

      const [data, setData] = useState({ data: [] });
      const [query, setQuery] = useState("");
      const [startDate, setStartDate] = useState(new Date("2014/06/24"));
      const [endDate, setEndDate] = useState(new Date("2015/06/24"));
      const [url, setUrl] = useState(
        "https://zpx-codetest.herokuapp.com/api/v1/stats/steam/reviews?offset=0&setSize=10000&ascending=true&returnCount=false"
      );
      const [isLoading, setIsLoading] = useState(false);
      const [currentPage, setCurrentPage] = useState(1);
      const [postsPerPage] = useState(12);

      useEffect(() => {
        const fetchData = async () => {
          setIsLoading(true);
          const result = await axios(url);

          result.data.data.sort((a, b) =>
            a.date_posted < b.date_posted ? 1 : -1
          );

          setData(result.data);

          setIsLoading(false);
        };

        fetchData();
      }, [url]);

      const indexOfLastPost = currentPage * postsPerPage;
      const indexOfFirsPost = indexOfLastPost - postsPerPage;
      const currentPosts = data.data.slice(indexOfFirsPost, indexOfLastPost);

      return (
        <Container maxWidth="md">
          <div className="top-row">
            <div className="search-input">
              <Fragment className={classes.loaderPosition}>
                <div className="search-input-container">
                  <TextField
                    id="standard-basic"
                    label="Search"
                    placeholder=" eg.: good, bad"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                  />
                  <Fab color="primary" aria-label="add" className={classes.fabIcon}>
                    <SearchIcon
                      onClick={() =>
                        setUrl(
                          `https://zpx-codetest.herokuapp.com/api/v1/stats/steam/reviews?offset=0&setSize=10000&ascending=true&returnCount=false&filterByField=review_text&filterValue=${query}`
                        )
                      }
                    />
                  </Fab>
                  
                </div>
              </Fragment>
            </div>
            <div className="orderPosition">
                    <DatePicker
                      className="date-button"
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                    />

                    <DatePicker
                      className="date-button"
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                    />
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          setUrl(
                            `https://zpx-codetest.herokuapp.com/api/v1/stats/steam/reviews?offset=0&setSize=10&ascending=true&returnCount=false&filterByField=date_posted&filterFrom=${startDate.toISOString()}&filterTo=${endDate.toISOString()}`
                          )
                        }
                      >
                        Search
                      </Button>
                  </div>
          </div>
          {isLoading ? (
            <div>
              <img
                src={Loader}
                className={classes.loaderPosition}
                alt="loader"
              />
            </div>
          ) : (
            <Grid container spacing={3}>
              {currentPosts.map((card, i) => (
                <Grid item key={card.id} xs={12} sm={6} md={4}>
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          {card.user_name.slice(0, 2)}
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          {card.recommended ? (
                            <ThumbUpIcon className={classes.thumbIconTrue} />
                          ) : (
                            <ThumbDownIcon className={classes.thumbIconFalse} />
                          )}
                        </IconButton>
                      }
                      title={card.user_name}
                      subheader={new Date(card.date_posted).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "2-digit",
                        }
                      )}
                    />
                    <CardMedia
                      className={classes.media}
                      image={`https://steamcdn-a.akamaihd.net/steam/apps/${card.steam_appid}/header.jpg`}
                      title="Image"
                    />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <b>Language: </b>
                        {card.lang_key.charAt(0).toUpperCase() +
                          card.lang_key.slice(1)}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <b>Hours Played: </b> {card.hours_played.toFixed(2)}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <Typography paragraph>Comment:</Typography>

                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        variant="contained"
                        disableRipple
                        onClick={() => handleExpandClick(i)}
                        aria-expanded={expanded === i}
                        aria-label="Show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    </CardActions>
                    <Collapse
                      in={expanded === i}
                      timeout="number"
                      unmountOnExit
                    >
                      <CardContent>
                        <Typography paragraph>
                          {card.review_text.replace(/<\/?[^>]+(>|$)/g, " ")}
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
          <Pagination
            className={classes.pagination}
            count={Math.ceil(data.data.length / postsPerPage)}
            color="primary"
            onChange={(e, p) => setCurrentPage(p)}
          />
        </Container>
      );
    }

    return (
      <div>
        <React.Fragment>
          <CssBaseline />
          <Container className={classes.search} maxWidth="md">
            <Expand />
            <Footer />
          </Container>
        </React.Fragment>
      </div>
    );
  }
}

export default withStyles(styles)(AllReviews);
