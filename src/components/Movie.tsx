import { CircularProgress } from "@material-ui/core";
import { useFetchMovies } from "../hooks/useFetchMovies.hook";

export default function Movie() {
  const { results, loading, handleLoadNewPage } = useFetchMovies();

  return (
    <>
      <main className="grid gap-4 grid-cols-4 mt-[64px]">
        {results.map((result, index) => (
          <div key={result.id}>
            <p>{index}</p>
            <p>{result.original_title}</p>
            <img
              src={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
              height={300}
              width={500}
              alt={result.original_title}
            />
            <p>{result.overview}</p>
          </div>
        ))}
      </main>
      {loading && <CircularProgress />}
      {!loading && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-[24px]"
          onClick={handleLoadNewPage}
        >
          Cargar Más
        </button>
      )}
    </>
  );
}
