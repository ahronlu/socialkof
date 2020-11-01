import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../util/theme";
// Actions
import { postScream, clearErrors } from "../../redux/actions/dataActions";
// MUI stuff
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// Icons
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";
// Components
import MyButton from "../../util/MyButton";

const useStyles = makeStyles({
  ...theme,
  closeButton: {
    position: "absolute",
    left: "90%",
    top: 0
  },
  submitButton: {
    ...theme.button,
    margin: "10px auto",
    float: "right"
  }
});

export default function() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const UI = useSelector(state => state.UI);

  let [body, setBody] = useState("");
  let [open, setOpen] = useState(false);
  const { loading, success, errors } = UI;

  const handleChange = e => setBody(e.target.value);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setBody("");
    dispatch(clearErrors());
  };

  useEffect(() => {
    if (success) {
      handleClose();
    }
  }, [success]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(postScream({ body }));
  };

  return (
    <Fragment>
      <MyButton tip="Post a scream!" onClick={handleOpen}>
        <AddIcon />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          btnClassName={classes.closeButton}
        >
          <CloseIcon color="secondary" />
        </MyButton>
        <DialogTitle>Some title</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="Scream!"
              placeholder="Scream at your fellow apes"
              className={classes.textField}
              error={errors.body ? true : false}
              helperText={errors.body}
              multiline
              rows={3}
              value={body}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={loading}
            >
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
              )}
              Post Scream
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
