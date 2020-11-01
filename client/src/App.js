import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import fileTheme from "./util/theme";
import jwtDecode from "jwt-decode";
import axios from "axios";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userActions";
// MUI stuff
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
// components
import Navbar from "./components/layout/Navbar";
import AuthRoute from "./util/AuthRoute";
// pages
import home from "./pages/home";
import login from "./pages/login";
import signup from "./pages/signup";
import user from "./pages/user";

axios.defaults.baseURL =
  "https://asia-northeast1-social-kof.cloudfunctions.net/api";

const theme = createMuiTheme(fileTheme);

const token = localStorage.getItem("FBIdToken");
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <AuthRoute path="/login" component={login} />
              <AuthRoute path="/signup" component={signup} />
              <Route exact path="/user/:handle" component={user} />
              <Route
                exact
                path="/user/:handle/scream/:screamId"
                component={user}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
