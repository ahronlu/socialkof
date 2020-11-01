import React, { useState, Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import theme from "../../util/theme";
// dayjs
import dayjs from "dayjs";
// Actions
import { getScream, clearErrors } from "../../redux/actions/dataActions";
// MUI stuff
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
// Components
import MyButton from "../../util/MyButton";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

const useStyles = makeStyles({
  ...theme,
  btnClose: {
    position: "absolute",
    left: "90%",
    top: "1%"
  },
  dialogContent: {
    padding: 20
  },
  profileImage: {
    maxWidth: 300,
    height: 200,
    borderRadius: "50%",
    objectFit: "cover"
  },
  expandButton: {
    position: "absolute",
    left: "90%"
  },
  spinnerDiv: {
    textAlign: "center",
    margin: "10px auto"
  }
});

export default function({ screamId, userHandle, openDialog }) {
  const dispatch = useDispatch();
  const data = useSelector(state => state.data);
  const UI = useSelector(state => state.UI);
  let [open, setOpen] = useState(false);
  let [path, setPath] = useState({
    oldPath: "",
    newPath: ""
  });

  let { loading } = UI;
  let {
    scream: { body, createdAt, userImage, likeCount, commentCount, comments }
  } = data;
  const classes = useStyles();

  const handleOpen = () => {
    window.history.pushState(null, null, path.newPath);
    setOpen(true);
    dispatch(getScream(screamId));
  };

  const handleClose = () => {
    if (window.location.pathname === `/user/${userHandle}/scream/${screamId}`) {
      window.history.pushState(null, null, `/user/${userHandle}`);
    } else {
      window.history.pushState(null, null, path.oldPath);
    }

    dispatch(clearErrors());
    setOpen(false);
  };

  useEffect(() => {
    setPath({
      ...path,
      oldPath: window.location.pathname,
      newPath: `/user/${userHandle}/scream/${screamId}`
    });
    if (openDialog) {
      handleOpen();
    }
  }, [screamId]);

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={150} thickness={2} />
    </div>
  ) : (
    <Grid container>
      <Grid item sm={5}>
        <img src={userImage} alt="profile" className={classes.profileImage} />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/user/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="Comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} Comments</span>
      </Grid>
      <hr className={classes.invisibleSeparator} />
      <CommentForm screamId={screamId} />
      <Comments comments={comments} />
    </Grid>
  );

  return (
    <Fragment>
      <MyButton
        tip="Expand Scream"
        onClick={handleOpen}
        btnClassName={classes.expandButton}
      >
        <UnfoldMoreIcon color="primary" />
      </MyButton>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        className={classes.dialog}
      >
        <MyButton
          tip="Close"
          onClick={handleClose}
          btnClassName={classes.btnClose}
        >
          <CloseIcon color="secondary" />
        </MyButton>
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
