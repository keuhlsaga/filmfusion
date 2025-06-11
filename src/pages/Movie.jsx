import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/header/Header";
import { apiFetch, OPTIONS } from "../utils/utils";
import Footer from "../components/footer/Footer";
import Loading from "../components/loading/Loading";
import MediaDetails from "../components/mediaDetails/MediaDetails";
import PageNotFound from "./PageNotFound";

const Movie = () => {
  const [loading, setLoading] = useState(false);
  const [error404, setError404] = useState(false);
  const [details, setDetails] = useState({
    details: null,
    credits: null,
    videos: null,
    people: {
      director: null,
      writers: [],
      cast: [],
    },
  });
  const id = useParams()?.id;

  useEffect(() => {
    if (id) {
      setLoading(true);

      (async () => {
        try {
          const movieData = await apiFetch(
            `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
            OPTIONS
          );
          /* setDetails((prev) => ({
            ...prev,
            details: movieData,
          })); */

          const promises = [
            apiFetch(
              `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
              OPTIONS
            ),
            apiFetch(
              `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
              OPTIONS
            ),
            apiFetch(
              `https://api.themoviedb.org/3/movie/${id}/release_dates`,
              OPTIONS
            ),
          ];

          const [credits, videos, releaseDates] = await Promise.all(promises);
          console.log(movieData, credits, videos);
          setDetails((prev) => {
            return {
              ...prev,
              details: Object.assign(movieData, {
                release_dates: releaseDates.results,
              }),
              credits: credits,
              videos: videos.results,
              people: {
                director: credits.crew.find((crew) => crew.job === "Director")
                  ?.name,
                writers: [
                  ...new Set(
                    credits.crew
                      .filter((crew) => crew.department === "Writing")
                      .map((writer) => writer.name)
                  ),
                ],
              },
            };
          });
        } catch (error) {
          setError404(true);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error404) {
    return <PageNotFound />;
  }

  return (
    <>
      <Header />
      <main>
        {!id ? (
          <aside className="sidebar">
            <input type="text" name="" id="" />
          </aside>
        ) : (
          details.details && (
            <MediaDetails
              details={details.details}
              credits={details.credits}
              videos={details.videos}
              people={details.people}
            />
          )
        )}
      </main>
      <Footer />
    </>
  );
};

export default Movie;
