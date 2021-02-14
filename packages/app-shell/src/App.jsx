import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import {
  makeStyles,
  CircularProgress,
  Typography,
  AppBar,
  Container,
  Icon,
  Toolbar,
} from "@material-ui/core";
import routerPaths from "./paths";
import { getUserDetails } from "./auth";

const AdList = React.lazy(() => import("buyerweb/AdList"));
const AdDetails = React.lazy(() => import("buyerweb/AdDetails"));
const Posting = React.lazy(() => import("sellerweb/Posting"));
const SellerAds = React.lazy(() => import("sellerweb/SellerAds"));

const useAppStyles = makeStyles((theme) => ({
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
  post: {
    color: theme.palette.primary.main,
  },
}));

function App() {
  const classes = useAppStyles();
  const user = getUserDetails();

  return (
    <BrowserRouter>
      <AppBar position="static" className={classes.root}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to="/">App Shell</NavLink>
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

      <Container maxWidth="md">
        <Routes>
          <Route
            exact
            path={routerPaths.home}
            element={
              <>
                <NavLink to={routerPaths.posting} className={classes.post}>
                  Post Ad
                </NavLink>
                <React.Suspense fallback={<LoadingShell />}>
                  <h3>Ads from buyer app</h3>
                  <AdList />
                </React.Suspense>
              </>
            }
          />
          <Route
            path={routerPaths.adPage}
            element={
              <React.Suspense fallback={<LoadingShell />}>
                <h3>From buyer app</h3>
                <AdDetails />
              </React.Suspense>
            }
          />
          <Route
            path={routerPaths.posting}
            element={
              <React.Suspense fallback={<LoadingShell />}>
                <h3>From seller app</h3>
                <Posting />
              </React.Suspense>
            }
          />
          <Route
            path={routerPaths.sellerAds}
            element={
              <React.Suspense fallback={<LoadingShell />}>
                <h3>From seller app (but actually from buyer app 😜)</h3>
                <SellerAds />
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
  const classes = useAppStyles();
  return (
    <div className={classes.loader}>
      <CircularProgress />
      <Typography className={classes.text}>Loading...</Typography>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"));
