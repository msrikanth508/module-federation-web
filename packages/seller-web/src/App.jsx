import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { getUserDetails } from "appshell/auth";
import appRouterPaths from "appshell/appRouterPaths";
import {
  makeStyles,
  CircularProgress,
  Typography,
  AppBar,
  Container,
  Toolbar,
  Icon,
} from "@material-ui/core";

import Posting from "./Posting";
const SellerAds = React.lazy(() => import("./SellerAds"));
const AdDetails = React.lazy(() => import("./AdDetails"));

const useStyles = makeStyles(() => ({
  title: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 8,
    textAlign: "center",
    flexGrow: 1,
    "& > a": {
      color: "inherit",
      textDecoration: "none",
    },
  },
  user: {
    textAlign: "right",
    paddingLeft: 6,
  },
  loader: {
    textAlign: "center",
  },
  root: {
    marginBottom: 24,
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();
  const user = getUserDetails();

  return (
    <BrowserRouter>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              <NavLink to="/">Seller Web App</NavLink>
            </Typography>
            {user && (
              <>
                <Icon>
                  <svg
                    fill="#fff"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"></path>
                  </svg>
                </Icon>
                <Typography className={classes.user}>{user.name}</Typography>
              </>
            )}
          </Toolbar>
        </AppBar>
      </div>

      <Container maxWidth="md">
        <Routes>
          <Route exact path={appRouterPaths.home} element={<Posting />} />
          <Route
            exact
            path={appRouterPaths.sellerAds}
            element={
              <React.Suspense fallback={<LoadingShell />}>
                <h3>Loading from buyer app</h3>
                <SellerAds />
              </React.Suspense>
            }
          />
          <Route
            path={appRouterPaths.adPage}
            element={
              <React.Suspense fallback={<LoadingShell />}>
                <h3>Loading from buyer app</h3>
                <AdDetails />
              </React.Suspense>
            }
          />
          <Route>
            <h2>Oops!</h2>
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

function LoadingShell() {
  const classes = useStyles();
  return (
    <div className={classes.loader}>
      <CircularProgress />
      <Typography className={classes.text}>Loading...</Typography>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
