import { useEffect, useState } from "react";
import { Movie } from "../interfaces/movie.interface";

export const useFetchMovies = (url: string) => {
  const [results, setResults] = useState<Movie[]>([]);
  // const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async (url: string) => {
      try {
        const response = await fetch(url, {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4N2M5YjAxZjk5MjU3OTBiYzZiY2QxM2Q0ZDliMDJlZSIsInN1YiI6IjY0ZjBhMTI4NzdkMjNiMDE1MDM5MDk0MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N7ces7uEZWKOPsUKp8sdd0yuaodlfQkHf-40U3K_STQ",
          },
        });
        const json = await response.json();
        setResults(json.results);
      } catch (error: any) {
        throw new Error(error);
      }
    };
    fetchData(url);
  }, [url]);

  return { results };
};
