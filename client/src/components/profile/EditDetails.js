import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../util/theme";
// Actions
import { editUserDetails } from "../../redux/actions/userActions";
// MUI stuff
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
// Icons
import EditIcon from "@material-ui/icons/Edit";
// Components
import MyButton from "../../util/MyButton";

const useStyles = makeStyles({
  ...theme,
  button: { float: "right" }
});

export default function() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    bio: "",
    website: "",
    location: ""
  });

  const { credentials } = user;

  const classes = useStyles();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = e => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    const editedUserDetails = { ...userDetails };
    dispatch(editUserDetails(editedUserDetails));
    handleClose();
  };

  useEffect(() => {
    const mapUserDetailsToState = credentials => {
      const { bio, website, location } = credentials;
      setUserDetails({
        bio: bio ? bio : "",
        website: website ? website : "",
        location: location ? location : ""
      });
    };
    mapUserDetailsToState(credentials);
  }, [credentials]);

  return (
    <Fragment>
      <MyButton
        tip="Edit details"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={userDetails.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              type="text"
              label="Website"
              placeholder="Your persional/professional website"
              className={classes.textField}
              value={userDetails.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              type="text"
              label="Location"
              placeholder="Where you live?"
              className={classes.textField}
              value={userDetails.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
