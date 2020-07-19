import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import gameDescription from "../assets/gameDescription.json";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 500,
    paddingLeft: "50%", // 16:9
    width: 500,
    height: 500,
    paddingTop: "15%",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransitionsModal({ display_name, steam_appid }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  let gameDescriptionFinal = gameDescription.data;
  const gameDescriptionFinded = gameDescriptionFinal.find(
    (game) => steam_appid === game.steam_appid
  );

  return (
    <div>
      <Button size="small" color="primary" onClick={handleOpen}>
        About the game
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <div>
              <img
                src={`https://steamcdn-a.akamaihd.net/steam/apps/${gameDescriptionFinded.steam_appid}/header.jpg`}
              />
            </div>

            <h2 id="transition-modal-title">{display_name}</h2>
            <p id="transition-modal-description">
              {gameDescriptionFinded.game_description}
            </p>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
