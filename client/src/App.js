import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./hoc/auth";
// pages for this product
import LandingPage from "./components/views/LandingPage/LandingPage.js";
import LoginPage from "./components/views/LoginPage/LoginPage.js";
import RegisterPage from "./components/views/RegisterPage/RegisterPage.js";
import NavBar from "./components/views/NavBar/NavBar";
import Footer from "./components/views/Footer/Footer";
import MovieDetail from "./components/views/MovieDetail/MovieDetail";
import FavoritePage from "./components/views/FavoritePage/FavoritePage";
import SearchMoviePage from "./components/views/SearchPage/SearchMovie";
import ReviewSubmitPage from "./components/views/ReviewPage/ReviewSubmit";
import ReviewShowPage from "./components/views/ReviewPage/ReviewShow";
import ReviewDetailPage from "./components/views/ReviewPage/ReviewDetail";
import ReviewEditPage from "./components/views/ReviewPage/ReviewEdit";

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch basename={"/"}>
          <Route exact path="/" component={Auth(LandingPage, null)} />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/movie/:movieId"
            component={Auth(MovieDetail, null)}
          />
          <Route exact path="/favorites" component={Auth(FavoritePage, true)} />
          <Route exact path="/search" component={Auth(SearchMoviePage, null)} />
          <Route
            exact
            path="/:userName/reviews/write"
            component={Auth(ReviewSubmitPage, true)}
          />
          <Route exact path="/reviews" component={Auth(ReviewShowPage, true)} />
          <Route
            exact
            path="/:userNickname/reviews/:reviewId"
            component={Auth(ReviewDetailPage, true)}
          />
          <Route
            exact
            path="/review/edit/:userNickname/:reviewId"
            component={Auth(ReviewEditPage, true)}
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
