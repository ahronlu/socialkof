import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getScreams } from "../redux/actions/dataActions";

// MUI stuff
import Grid from "@material-ui/core/Grid";

// components
import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import ScreamSkeleton from "../util/ScreamSkeleton";

export default function() {
  const dispatch = useDispatch();
  let data = useSelector(state => state.data);
  const { screams, loading } = data;

  useEffect(() => {
    const getAllScreams = () => {
      dispatch(getScreams());
    };

    getAllScreams();
  }, [dispatch]);

  return (
    <Grid container spacing={4}>
      <Grid item sm={8} xs={12}>
        {!loading ? (
          screams.map(scream => (
            <Scream key={scream.screamId} scream={scream} />
          ))
        ) : (
          <ScreamSkeleton />
        )}
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
}
