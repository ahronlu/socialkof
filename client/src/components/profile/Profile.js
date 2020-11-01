import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import theme from "../../util/theme";
// dayjs
import dayjs from "dayjs";
// Actions
import { logoutUser, uploadImage } from "../../redux/actions/userActions";
// MUI stuff
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
// Icon
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import ProfileSkeleton from "../../util/ProfileSkeleton";
// Components
import MyButton from "../../util/MyButton";
import EditDetails from "./EditDetails";

const useStyles = makeStyles({
  ...theme
});

export default function() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(state => state.user);
  const {
    credentials: { handle, createdAt, imageUrl, bio, website, location },
    loading,
    authenticated
  } = user;

  const handleImageChange = e => {
    const image = e.target.files[0];
    // send to server
    const formData = new FormData();
    formData.append("image", image, image.name);
    dispatch(uploadImage(formData));
  };
  const handleEditImage = e => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  const handleLogout = () => {
    dispatch(logoutUser());
  };

  let profileMarkup = !loading ? (
    authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
            <input
              type="file"
              id="imageInput"
              hidden={true}
              onChange={handleImageChange}
            />
            <MyButton
              tip="Edit profile picture"
              onClick={handleEditImage}
              btnClassName="button"
            >
              <EditIcon color="primary" />
            </MyButton>
          </div>
          <hr />
          <div className="profile-details">
            <MuiLink
              component={Link}
              to={`/users/${handle}`}
              color="primary"
              variant="h5"
            >
              @{handle}
            </MuiLink>
            <hr />
            {bio && <Typography variant="body2">{bio}</Typography>}
            <hr />
            {location && (
              <Fragment>
                <LocationOn color="primary" />
                <span>{location}</span>
                <hr />
              </Fragment>
            )}
            {website && (
              <Fragment>
                <LinkIcon color="primary" />
                <a href={website} target="_blank" rel="noopener noreferrer">
                  {" "}
                  {website}
                </a>
                <hr />
              </Fragment>
            )}
            <CalendarToday color="primary" />{" "}
            <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
          </div>
          <MyButton tip="Log out" onClick={handleLogout}>
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails />
        </div>
      </Paper>
    ) : (
      <Paper className={classes.paper}>
        <Typography variant="body2" align="center">
          No profile found, please login again
        </Typography>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/login"
          >
            Login
          </Button>
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/signup"
          >
            Signup
          </Button>
        </div>
      </Paper>
    )
  ) : (
    <ProfileSkeleton />
  );
  return profileMarkup;
}
