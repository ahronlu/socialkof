import React, { Fragment, useState } from "react";
import { useDispatch } from "react-redux";
import theme from "../../util/theme";
// Actions
import { deleteScream } from "../../redux/actions/dataActions";
// MUI stuff
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
// Icons
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
// Components
import MyButton from "../../util/MyButton";

const useStyles = makeStyles({
  ...theme,
  deleteButton: {
    position: "absolute",
    left: "90%",
    top: "10%"
  }
});

export default function({ screamId }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  let [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    dispatch(deleteScream(screamId));
    setOpen(false);
  };
  return (
    <Fragment>
      <MyButton
        tip="Delete Scream"
        onClick={handleOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutlineIcon color="secondary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Are you sure you want to delete this scream?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="secondary"
            className={classes.submitButton}
          >
            Delete Scream
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
