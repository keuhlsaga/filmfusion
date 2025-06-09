import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/header/Header";
import { OPTIONS } from "../utils/utils";
import Footer from "../components/footer/Footer";
import Loading from "../components/loading/Loading";
import MediaDetails from "../components/mediaDetails/MediaDetails";

const Movie = () => {
  const [loading, setLoading] = useState(true);
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
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, OPTIONS)
      .then((res) => res.json())
      .then((data) =>
        setDetails((prev) => {
          return {
            ...prev,
            details: data,
          };
        })
      )
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
      OPTIONS
    )
      .then((res) => res.json())
      .then((data) =>
        setDetails((prev) => {
          return {
            ...prev,
            credits: data,
            people: {
              director: data.crew.find((crew) => crew.job === "Director")?.name,
              writers: [
                ...new Set(
                  data.crew
                    .filter((crew) => crew.department === "Writing")
                    .map((writer) => writer.name)
                ),
              ],
            },
          };
        })
      )
      .catch((err) => console.error(err));

    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      OPTIONS
    )
      .then((res) => res.json())
      .then((data) =>
        setDetails((prev) => {
          return {
            ...prev,
            videos: data,
          };
        })
      )
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (details.details && details.credits && details.videos) {
      setLoading(false);
    }
  }, [details]);

  if (loading) {
    return <Loading />;
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
          <MediaDetails
            details={details.details}
            credits={details.credits}
            videos={details.videos}
            people={details.people}
          />
        )}
      </main>
      <Footer />
    </>
  );
};

export default Movie;
