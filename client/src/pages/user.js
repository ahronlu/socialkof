import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
// Actions
import { getUserData } from "../redux/actions/dataActions";
// MUI stuff
import Grid from "@material-ui/core/Grid";
// Components
import Scream from "../components/scream/Scream";
import ScreamSekeleton from "../util/ScreamSkeleton";
import StaticProfile from "../components/profile/StaticProfile";
import ProfileSkeleton from "../util/ProfileSkeleton";

export default function ({ match }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data);

  let { screams, loading } = data;
  let [profile, setProfile] = useState({});
  const { handle, screamId } = match.params;

  useEffect(() => {
    dispatch(getUserData(handle));
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setProfile({ ...res.data.user });
      })
      .catch((err) => console.log(err));
  }, [handle, dispatch, screamId]);

  const screamsMarkup = loading ? (
    <ScreamSekeleton />
  ) : screams && screams.length === 0 ? (
    <p>No screams from this user</p>
  ) : !screamId ? (
    screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
  ) : (
    screams.map((scream) => (
      <Scream key={scream.screamId} scream={scream} openDialog={true} />
    ))
  );
  return (
    <Grid container spacing={10}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile ? <StaticProfile profile={profile} /> : <ProfileSkeleton />}
      </Grid>
    </Grid>
  );
}
