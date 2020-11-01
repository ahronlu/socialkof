import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// dayjs
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
// MUI stuff
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
// Icon
import ChatIcon from "@material-ui/icons/Chat";
// Components
import MyButton from "../../util/MyButton";
import DeleteScream from "./DeleteScream";
import ScreamDialog from "./ScreamDialog";
import LikeButton from "./LikeButton";

const useStyles = makeStyles({
  card: {
    display: "flex",
    marginBottom: 20,
    position: "relative"
  },
  image: {
    minWidth: 200,
    objectFit: "cover"
  },
  content: {
    padding: 25
  }
});

export default function({ scream, openDialog }) {
  const user = useSelector(state => state.user);
  const classes = useStyles();
  dayjs.extend(relativeTime);
  let {
    screamId,
    body,
    userHandle,
    userImage,
    createdAt,
    likeCount,
    commentCount
  } = scream;
  const {
    authenticated,
    credentials: { handle }
  } = user;

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImage}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          component={Link}
          to={`/user/${userHandle}`}
          color="primary"
        >
          {userHandle}
        </Typography>
        {deleteButton}
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).fromNow()}
        </Typography>
        <Typography variant="body1">{body}</Typography>
        <LikeButton screamId={screamId} />
        <span>{likeCount} Likes</span>
        <MyButton tip="Comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentCount} Comments</span>
        <ScreamDialog
          screamId={screamId}
          userHandle={userHandle}
          openDialog={openDialog}
        />
      </CardContent>
    </Card>
  );
}
