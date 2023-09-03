import { useEffect, useState } from "react";
import { Movie } from "../interfaces/movie.interface";
import { Routes } from "../routes/routes.model";

const HEADERS = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2M5YjAxZjk5MjU3OTBiYzZiY2QxM2Q0ZDliMDJlZSIsInN1YiI6IjY0ZjBhMTI4NzdkMjNiMDE1MDM5MDk0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N7ces7uEZWKOPsUKp8sdd0yuaodlfQkHf-40U3K_STQ",
};

const fetchData = async () => {
  try {
    const response = await fetch(Routes.GET_MOVIES, {
      headers: HEADERS,
    });
    const data = await response.json();
    const { results } = data;
    return results;
  } catch (error) {
    throw new Error("Error al cargar los datos");
  }
};

export const useFetchMovies = () => {
  const [results, setResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then((newResults) => {
        setResults((prevResults) => [...prevResults, ...newResults]);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  const handleLoadNewPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    return currentPage;
  };

  return { results, loading, handleLoadNewPage };
};
