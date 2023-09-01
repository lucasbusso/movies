import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "material-ui-search-bar";
import { makeStyles } from "@material-ui/core/styles";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";

import { prepareForNewSearch } from "../redux/searchMoviesSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
    flexShrink: 1,
  },
  input: {
    "& input": {
      width: "100%",
    },
  },
}));

// este tipo SearchMoviesProps va en lugar del any
export default function SearchMovies() {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query: urlQuery } = useParams();

  const search = (query: string) => {
    if (query.trim()) {
      dispatch(prepareForNewSearch(query));
      navigate(`/search/${query}`);
    }
  };

  const debouncedSearch = useRef(debounce(search, 500));

  useEffect(() => {
    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, [urlQuery]);

  useEffect(() => {
    debouncedSearch.current(query);
  }, [query]);

  const handleRequestSearch = () => {
    debouncedSearch.current.cancel();
    search(query);
  };

  return (
    <div className={classes.root}>
      <SearchBar
        value={query}
        onChange={setQuery}
        onRequestSearch={handleRequestSearch}
        classes={{
          input: classes.input,
        }}
      />
    </div>
  );
}
