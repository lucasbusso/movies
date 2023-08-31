import { useFetchMovies } from "../hooks/useFetchMovies.hook";
import { Routes } from "../routes/routes.model";

export default function Movie() {
  const { results } = useFetchMovies(Routes.GET_MOVIES);

  return (
    <>
      {results.map((result) =>
        result.success ? (
          <div>{result.status_message}</div>
        ) : (
          <div key={result.id}>
            <p>{result.original_title}</p>
            <img
              src={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
              height={300}
              width={500}
            />
            <p>{result.overview}</p>
          </div>
        )
      )}
    </>
  );
}
