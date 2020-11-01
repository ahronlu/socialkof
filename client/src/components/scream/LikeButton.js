import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Actions
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";
// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
// Components
import MyButton from "../../util/MyButton";

export default function({ screamId }) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { likes, authenticated } = user;

  const like = () => dispatch(likeScream(screamId));
  const unlike = () => dispatch(unlikeScream(screamId));

  const likedScream =
    likes.filter(like => like.screamId === screamId).length > 0;

  return authenticated ? (
    likedScream ? (
      <MyButton tip="Undo like" onClick={unlike}>
        <FavoriteIcon color="primary" />
      </MyButton>
    ) : (
      <MyButton tip="Like" onClick={like}>
        <FavoriteBorderIcon color="primary" />
      </MyButton>
    )
  ) : (
    <Link to="/login">
      <MyButton tip="Like">
        <FavoriteBorderIcon color="primary" />
      </MyButton>
    </Link>
  );
}
