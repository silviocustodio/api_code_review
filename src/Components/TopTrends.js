import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";
import { Bar } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import CssBaseline from "@material-ui/core/CssBaseline";
import { grey, indigo } from "@material-ui/core/colors";

import Footer from "./Footer";

const styles = (theme) => ({
  chart: {
    display: "none",
  },
  buttonOrderbyPositive: {
    backgroundColor: indigo[500],
    margin: theme.spacing(1),
  },
  buttonOrderbyNegative: {
    backgroundColor: grey[400],
    margin: theme.spacing(1),
  },
});

function TopTrends(props) {
  const { classes } = props;
  const [data, setData] = useState({ data: [] });
  const [repos, setRepos] = useState({ repos: [] });
  const [data2, setData2] = useState({ data2: [] });
  const [query, setQuery] = useState("");
  const [startDate, setStartDate] = useState(new Date("2014/06/24"));
  const [endDate, setEndDate] = useState(new Date("2021/06/23"));
  const [url, setUrl] = useState(
    "https://zpx-codetest.herokuapp.com/api/v1/stats/steam/reviews?offset=0&setSize=10000&ascending=true&returnCount=false&filterByField=date_posted&filterFrom=2014-06-23T23:00:00.000Z&filterTo=2021-06-23T23:00:00.000Z"
  );
  const stateBar = {
    labels: [],
    datasets: [
      {
        label: "Positive",
        backgroundColor: indigo[500],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [],
      },
      {
        label: "Negative",
        backgroundColor: grey[500],
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: [],
      },
    ],
  };
  useEffect(() => {
    const searchStatistic = (a, b) => {
      let arrayDataNameGame = a;
      let arrayReposReview = b;
      let arrayFinalSearch = [];

      for (let j = 0; j < arrayDataNameGame.length; j++) {
        let cont = 0;
        let recommendedPositive = 0;
        let recommendedNegative = 0;
        let hours_played = 0;

        for (let k = 0; k < arrayReposReview.length; k++) {
          if (
            arrayDataNameGame[j].steam_appid === arrayReposReview[k].steam_appid
          ) {
            arrayReposReview[k].recommended === 1
              ? recommendedPositive++
              : recommendedNegative++;

            hours_played =
              parseFloat(hours_played) +
              parseFloat(arrayReposReview[k].hours_played);
            cont++;
          }
        }
        arrayFinalSearch.push({
          display_name: arrayDataNameGame[j].display_name,
          recommendedPositive: recommendedPositive,
          recommendedNegative: recommendedNegative,
          steam_appid: arrayDataNameGame[j].steam_appid,
          hours_played: hours_played.toFixed(2),
        });
      }
      setData2({ data2: arrayFinalSearch });
      return arrayFinalSearch;
    };

    const fetchData = async () => {
      const respGlobal = await axios(
        "https://zpx-codetest.herokuapp.com/api/v1/stats/steam/game?offset=0&ascending=true&returnCount=false"
      );
      const respRepos = await axios(url);
      setData({ data: respGlobal.data.data });
      setRepos({ repos: respRepos.data.data });
      await searchStatistic(respGlobal.data.data, respRepos.data.data);
    };
    fetchData();
  }, [url]);

  function BarGraph() {
    const getPositive = () => {
      let arrayDataPositive;
      arrayDataPositive = data2.data2.sort(function (a, b) {
        return a.recommendedPositive < b.recommendedPositive
          ? 1
          : b.recommendedPositive < a.recommendedPositive
          ? -1
          : 0;
      });
      setData2({ data2: arrayDataPositive });
      return arrayDataPositive;
    };
    const getNegative = () => {
      let arrayDataNegative;
      arrayDataNegative = data2.data2.sort(function (a, b) {
        return a.recommendedNegative < b.recommendedNegative
          ? 1
          : b.recommendedNegative < a.recommendedNegative
          ? -1
          : 0;
      });
      setData2({ data2: arrayDataNegative });

      return arrayDataNegative;
    };
    return (
      <Container className={classes.search} maxWidth="md">
        <Grid container spacing={4} className="grid-fix">
          {data2.data2.map((row) => (
            <Grid
              item
              key={row.id}
              xs={12}
              sm={6}
              md={4}
              className={classes.chart}
            >
              {stateBar.labels.push(row.display_name)}
              {stateBar.datasets[0].data.push(row.recommendedPositive)}
              {stateBar.datasets[1].data.push(row.recommendedNegative)}
            </Grid>
          ))}

          <div className="orderPosition">
            <div className="order-buttons">
              <Fab
                size="small"
                color="primary"
                aria-label="add"
                onClick={getPositive}
                className={classes.buttonOrderbyPositive}
              >
                <AddIcon />
              </Fab>
              <Fab
                size="small"
                aria-label="add"
                onClick={getNegative}
                className={classes.buttonOrderbyNegative}
              >
                <RemoveIcon />
              </Fab>
            </div>
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
            <div>
              <Button
                className="mt-xs-1"
                variant="contained"
                color="primary"
                href="#outlined-buttons"
                onClick={() =>
                  setUrl(
                    `https://zpx-codetest.herokuapp.com/api/v1/stats/steam/reviews?offset=0&setSize=10000&ascending=true&returnCount=false&filterByField=date_posted&filterFrom=${startDate.toISOString()}&filterTo=${endDate.toISOString()}`
                  )
                }
              >
                Search
              </Button>
            </div>
          </div>

          <Bar
            data={stateBar}
            options={{
              title: {
                display: true,
                text: "Reviews Recommendation",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </Grid>
      </Container>
    );
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <BarGraph />
      <Footer />
    </React.Fragment>
  );
}

export default withStyles(styles)(TopTrends);
