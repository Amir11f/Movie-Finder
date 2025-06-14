import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PosterDetails from "./posterDetails";
import PeopleForMovieCardExpend from "./peopleForMovieCardExpend";
import RecommendationMovieCard from "./recommendationMovieCard";
import SimilarMovies from "./similarMovies";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

function Details() {
  const { movieId } = useParams();

  useEffect(() => {
    movieDitails();
    getCredits();
    gerRecommendation();
    getSimilarMovie();
    getIMG();
    getVideo();
  }, [movieId]);

  const [getActor, setGetActor] = useState([]);
  const [getRec, setGetRec] = useState([]);
  const [getSimilar, setGetSimiar] = useState([]);
  const [images, setImages] = useState([]);
  const [trailer, setTrailer] = useState("");
  const [getDT, setGetDT] = useState([]);
  const [activeList, setActiveList] = useState("poster2");

  const movieDitails = async () => {
    const get = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`
    );
    setGetDT(get.data);
    console.log("dt");
  };

  useEffect(() => {
    getCredits();
  }, [getDT]);

  const getCredits = async () => {
    const getapi = await axios.get(
      `https://api.themoviedb.org/3/movie/${getDT?.id}/credits?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`
    );
    console.log("actaor");
    setGetActor(getapi.data);
  };

  const gerRecommendation = async () => {
    const get = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&page=1`
    );
    setGetRec(get.data.results);
  };

  const getSimilarMovie = async () => {
    const get = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&page=1`
    );
    setGetSimiar(get.data.results);
    console.log("similer");
  };

  const getIMG = async () => {
    const get = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&include_image_language=en`
    );
    setImages(get.data);
    console.log(get.data);
  };

  const getVideo = async () => {
    const get = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`
    );
    setTrailer(get.data?.results);
    console.log(get.data?.results);
  };

  const handleListClick = (list) => {
    setActiveList(list);
    return <div className="underline"></div>;
  };

  const Videos = ({ resV }) => {
    return (
      <div className="coverVideo">
        <ReactPlayer
          className="videoClass"
          url={`https://www.youtube.com/watch?v=${resV.key}`}
          controls={true}
          width="640"
          height="360"
          config={{
            file: {
              attributes: {
                codecs:
                  "vp09.00.51.08.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01",
                type: "video/mp4; codecs=vp09.00.51.08.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01",
              },
            },
          }}
        />
      </div>
    );
  };

  const getTrailer =
    trailer?.length > 1 && trailer.filter((tra) => tra.type === "Trailer")[0];
  console.log(getTrailer);

  const Backdrops = ({ resB }) => {
    return (
      <div className="backdropsBox">
        <img
          src={`https://image.tmdb.org/t/p/w342/${
            resB.file_path && resB.file_path
          }`}
          alt=""
          className="imgp"
        />
      </div>
    );
  };

  const Posters = ({ resP }) => {
    return (
      <div className="postersBox">
        <img
          src={`https://image.tmdb.org/t/p/w185/${
            resP.file_path && resP.file_path
          }`}
          alt=""
          className="imgp"
        />
      </div>
    );
  };

  console.log(getRec);

  return (
    <div className="mainDT">
      <PosterDetails getDT={getDT} getTrailer={getTrailer} />
      <div className="under-poster">
        <div className="left-details">
          <div className="orgenization">
            <h2 className="introducer1">Top Billed Cast</h2>
            <div className="actor-part">
              {getActor?.cast?.map((act) => (
                <Link
                  to={`/popular/${act.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  key={act.id}
                >
                  <PeopleForMovieCardExpend actors={act} />
                </Link>
              ))}
            </div>
          </div>
          <div
            className={` ${getRec?.length !== 0 ? "Recommendations" : "none"} `}
          >
            <div
              className={`${getRec?.length !== 0 ? "Recommendation" : "none"}`}
            >
              <p className={`${getRec?.length !== 0 ? "introducer2" : "none"}`}>
                Recommendations
              </p>
            </div>
            <div className="orgenization-recommends">
              {getRec?.map((recommend) => (
                <Link
                  to={`/details/${recommend.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  key={recommend.id}
                >
                  <RecommendationMovieCard recommend={recommend} />
                </Link>
              ))}
            </div>
          </div>
          <div className="media-section">
            <div className="ulOrg">
              <p id="media-title">Media</p>
              <ul className="mediaLists" type>
                <li
                  className={`innerLists ${
                    activeList === "poster2" ? "active" : ""
                  }`}
                  onClick={() => handleListClick("poster2")}
                >
                  Posters
                </li>
                <li
                  className={`innerLists ${
                    activeList === "backdrop" ? "active" : ""
                  }`}
                  onClick={() => handleListClick("backdrop")}
                >
                  Backdrops
                </li>
                <li
                  className={`innerLists ${
                    activeList === "video" ? "active" : ""
                  }`}
                  onClick={() => handleListClick("video")}
                >
                  Videos
                </li>
              </ul>
            </div>
            <div className="videoBoxFather">
              {activeList === "video" &&
                trailer?.length > 1 &&
                trailer.map((res) => <Videos resV={res} key={res.id} />)}
            </div>
            <div className="backdropsBoxFather">
              {activeList === "backdrop" &&
                images.backdrops?.map((res) => (
                  <Backdrops resB={res} key={res.id} />
                ))}
            </div>
            <div className="posterBoxFather">
              {activeList === "poster2" &&
                images.posters?.map((res) => (
                  <Posters resP={res} key={res.id} />
                ))}
            </div>
          </div>
          <div className={`${getSimilar?.length > 1 ? "hr1" : "none"}`}></div>
          <div className={`${getSimilar?.length > 1 ? "similars" : "none"}`}>
            <div className="similar">
              <p
                className={`${getSimilar?.length > 1 ? "introducer2" : "none"}`}
              >
                Similar Movies
              </p>
            </div>
            <div className="orgenization-recommends">
              {getSimilar?.map((simi) => (
                <Link
                  to={`/details/${simi.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  key={simi.id}
                >
                  <SimilarMovies sim={simi} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
