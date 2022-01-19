import { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./components/Header/Header";
import Container from "./components/Container/Container";
import Download from "./components/Download/Download";

const HomeView = lazy(() =>
  import("./components/HomeView/HomeView" /* webpackChunkName: "HomePage" */)
);
const MoviesPage = lazy(() =>
  import(
    "./components/MoviesPage/MoviesPage" /* webpackChunkName: "MoviePage" */
  )
);
const MovieDetailsPage = lazy(() =>
  import(
    "./components/MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: "MovieDetailsPage" */
  )
);

function App() {
  return (
    <>
      <Header />
      <Container>
        <Suspense fallback={<Download message={"Downloading..."} />}>
          <Switch>
            <Route path="/" exact>
              <HomeView />
            </Route>

            <Route path="/movies" exact>
              <MoviesPage />
            </Route>

            <Route path="/movies/:movieId">
              <MovieDetailsPage />
            </Route>

            <Route>
              <Redirect to="/" />
            </Route>
          </Switch>
        </Suspense>
      </Container>
    </>
  );
}

export default App;
