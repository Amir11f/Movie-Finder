import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ReactPlayer from "react-player";
import { FaPlay } from "react-icons/fa";

function PosterDetails({ getDTT, getTrailer }) {
  const fullDate = getDTT && getDTT.first_air_date ? getDTT.first_air_date : "";
  const year = fullDate.substr(0, 4);

  const [showT, setShowT] = useState("hide");

  const [isMobile, setIsMobile] = useState(window.innerWidth); // you can adjust the threshold
  console.log(isMobile);

  useEffect(() => {
    setIsMobile(window.innerWidth);
  }, []);

  function trimOverview(overview) {
    if (overview && isMobile > 740) return overview.slice(0, 580) + " ...";
    if (overview && overview.length > 240) {
      return overview.slice(0, 240) + " ...";
    }
    return overview || "";
  }

  const IndependentTrailer = () => {
    return (
      <div className="showTrailer">
        <ReactPlayer
          className="videoClass2"
          url={`https://www.youtube.com/watch?v=${getTrailer.key}`}
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

  return (
    <div className="detail-main">
      {showT === "show" ? (
        <div className="parent-color-trailer" onClick={() => setShowT("hide")}>
          <IndependentTrailer />
        </div>
      ) : null}
      <div
        className="posterT"
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/w780/${getDTT?.backdrop_path})`,
        }}
      ></div>
      <div className="collect">
        <div className="left-posterT">
          <img
            className="poster-img"
            src={`https://www.themoviedb.org/t/p/w500${getDTT?.poster_path}`}
            alt=""
          />
        </div>
        <div className="right-poster">
          <div className="orgenize-top">
            <div className="right-poster-row1">
              <p className="original_title">{getDTT?.name}</p>
              <p className="release_date1">{year}</p>
            </div>
            <div className="right-poster-row2">
              <p className="release_date2">{getDTT.first_air_date}</p>
              <p className="genres_poster">
                {getDTT?.genres
                  ?.map((g) => g.name)
                  .reduce((acc, cur) => acc + ", " + cur)}
              </p>
              <p className="runtime">
                {getDTT.episode_run_time?.length > 0 &&
                  getDTT.episode_run_time + "m"}
              </p>
            </div>
            <div className="right-poster-row3-orgenize">
              <div className="right-poster-row3">
                {/* <p className='vote_average'>{getDTT.vote_average?.toFixed(1)}</p> */}
                <CircularProgressbar
                  className="vote_average"
                  value={getDTT.vote_average}
                  minValue={0}
                  maxValue={10}
                  text={`${getDTT?.vote_average?.toFixed(1)}`}
                  styles={buildStyles({
                    textSize: "37px",
                    textColor: "white",
                    pathColor:
                      getDTT.vote_average < 3
                        ? "#a22955"
                        : getDTT.vote_average < 7
                        ? "#b4bc66"
                        : "#3bc183",
                    trailColor:
                      getDTT.vote_average < 3
                        ? "#541634"
                        : getDTT.vote_average < 7
                        ? "#3f3d13"
                        : "#21442b",
                    bottomPadding: "3rem",
                  })}
                />
              </div>
              <p className="userScoreP">
                User <br /> Score
              </p>
              <div className="right-poster-row3-frount">
                <div className="movie-trailer" onClick={() => setShowT("show")}>
                  <FaPlay className="I_faplay" />
                  <p className="trailerPra">Trailer</p>
                </div>
              </div>
            </div>
            <div className="right-poster-row4">
              <p className="tagline">{getDTT.tagline}</p>
            </div>
            <div className="right-poster-row5">
              <p className="overview1">
                {getDTT.overview === "" ? null : "Overview"}
              </p>
              <p className="overview2">
                {getDTT.overview === "" ? null : trimOverview(getDTT.overview)}
              </p>
            </div>
            <div className="last-this-orgenize">
              <div className="left-orgenize">
                <div className="right-poster-row6">
                  <div className="country">
                    <p className="country_title">production countries :</p>
                    <p className="countries">
                      {getDTT.production_countries
                        ?.map((f) => f.name)
                        .reduce((acc, cur) => acc + " , " + cur)}
                    </p>
                  </div>
                </div>
                <div className="right-poster-row7">
                  <div className="status-situation">
                    <p className="status_title">Status :</p>
                    <p className="status"> {getDTT.status}</p>
                  </div>
                </div>
              </div>
              <div className="right-orgenize">
                <div className="seasonNumbers">
                  <p className="status_title">Number of seasons :</p>
                  <p className="status"> {getDTT.number_of_seasons}</p>
                </div>
                <div className="number_of_episodes">
                  <p className="status_title">Number of episodes :</p>
                  <p className="status"> {getDTT.number_of_episodes}</p>
                </div>
              </div>
            </div>
            <div className="right-poster-row8">
              <div className="last-airDate">
                <p className="status_title">Last air date :</p>
                <p className="status">{getDTT?.last_air_date}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PosterDetails;
