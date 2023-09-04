import { useEffect, useState } from "react";
import { Movie } from "../interfaces/movie.interface";
import { Routes } from "../routes/routes.model";

const HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2M5YjAxZjk5MjU3OTBiYzZiY2QxM2Q0ZDliMDJlZSIsInN1YiI6IjY0ZjBhMTI4NzdkMjNiMDE1MDM5MDk0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N7ces7uEZWKOPsUKp8sdd0yuaodlfQkHf-40U3K_STQ",
};

export const useFetchMovies = () => {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [effect, setEffect] = useState(false);

  async function fetchData(page: number) {
    const response = await fetch(`${Routes.GET_MOVIES}?page=${page}`, {
      headers: HEADERS,
    });
    const data = await response.json();
    const { results } = data;
    setResults(results);
    setLoading(false);
    return results;
  }

  function handleLoadNewPage() {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  useEffect(() => {
    setEffect(true);
    console.log("effect 1 ");
    setLoading(true);
    fetchData(currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!effect) return;
    console.log("effect 2");
    fetchData(currentPage).then((newResults) => {
      setResults((prevResults) => [...prevResults, ...newResults]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return { results, loading, handleLoadNewPage };
};
