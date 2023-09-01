import { Route, Routes } from "react-router-dom";
import { AppBar, Toolbar, makeStyles } from "@material-ui/core";
// import StarBorderIcon from "@material-ui/icons/StarBorder";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

import MoviesList from "./MoviesList";
import MainMenu from "./MainMenu";
import SearchMovies from "./SearchMovies";

const useStyles = makeStyles({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  main: {
    display: "flex",
    justifyContent: "center",
  },
  content: {
    width: "85%",
  },
});

export default function Layout() {
  const classes = useStyles();

  return (
    <>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Routes>
            <Route path="/favorites" element={<MainMenu />} />
            <Route path="/search/:query | /" element={<SearchMovies />} />
          </Routes>
        </Toolbar>
      </AppBar>
      <MoviesList />
    </>
  );
}
