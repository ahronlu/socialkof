import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import NoImage from "../images/no-img.png";
import theme from "../util/theme";

// MUI stuff
import Paper from "@material-ui/core/Paper";

// Icons
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

const useStyles = makeStyles(muiTheme => ({
  ...theme,
  handle: {
    height: 20,
    backgroundColor: muiTheme.palette.primary.main,
    width: 60,
    margin: "0 auto 7px"
  },
  fullline: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "100%",
    marginBottom: 10
  },
  halfline: {
    height: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: "50%",
    marginBottom: 10
  }
}));

export default function() {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImage} alt="Profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle} />
          <hr />
          <div className={classes.fullline} />
          <div className={classes.fullline} />
          <hr />
          <LocationOnIcon color="primary" /> <span>Location</span>
          <hr />
          <LinkIcon color="primary" /> https://website.com
          <hr />
          <CalendarTodayIcon color="primary" /> Joined date
        </div>
      </div>
    </Paper>
  );
}
