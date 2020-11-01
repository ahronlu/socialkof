import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import theme from "../../util/theme";
// Actions
import { submitComment } from "../../redux/actions/dataActions";
// MUI stuff
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
  ...theme
});

export default function({ screamId }) {
  const dispatch = useDispatch();
  const UI = useSelector(state => state.UI);
  const user = useSelector(state => state.user);

  const { authenticated } = user;
  const { errors } = UI;
  const classes = useStyles();
  let [body, setBody] = useState("");

  const handleChange = e => setBody(e.target.value);
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(submitComment(screamId, { body }));
    setBody("");
  };

  const commentFormMarkup = authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          multiline
          rows={3}
          className={classes.textField}
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Comment
        </Button>
        <hr className={classes.visibleSeparator} />
      </form>
    </Grid>
  ) : null;
  return commentFormMarkup;
}
