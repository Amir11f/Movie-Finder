import axios from "axios"
import { useState ,useEffect } from "react"
import React from "react"
import { useParams } from "react-router-dom"
import PosterDetails from "./posterDetails"
import PeopleForMovieCardExpend from "./peopleForMovieCardExpend"
import RecommendationMovieCard from "./recommendationMovieCard"
import SimilarMovies from "./similarMovies"
import ReactPlayer from 'react-player';
import { Link } from "react-router-dom"

function Details() {

    const {movieId} = useParams()

    useEffect(()=>{
        movieDitails()
        gerRecommendation()
        getSimilarMovie()
    },[])

    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);
      movieDitails();
      getCredits();
      gerRecommendation();
      getSimilarMovie();
      getIMG();
      getVideo();
    }, [movieId]);

    const [getDT ,setGetDT] = useState([])
    const movieDitails = async()=>{
        const get = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`)
        setGetDT(get.data)
        console.log(get.data)
        setLoading(false);
    }
    
    useEffect(()=>{
      getCredits()
    },[getDT])

    // useEffect(()=>{
    //   window.scrollTo(0, 0);
    // },[])

    const [getActor ,setGetActor] = useState([])
    const getCredits = async ()=>{
      const getapi = await axios.get(`https://api.themoviedb.org/3/movie/${getDT?.id}/credits?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`)
      console.log(getapi.data)
      setGetActor(getapi.data)
    }

    const[getRec ,setGetRec] = useState()
    const gerRecommendation = async ()=>{
      const get = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&page=1`)
      setGetRec(get.data.results)
    }

    const [getSimilar ,setGetSimiar] = useState([])
    const getSimilarMovie = async ()=>{
      const get = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&page=1`)
      setGetSimiar(get.data.results)
      console.log(get)
    }

    const [images ,setImages] = useState([])
    const getIMG = async ()=>{
      const get = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&include_image_language=en`)
      setImages(get.data)
      console.log(get.data);
    }

    const [trailer, setTrailer] = useState("")
    const getVideo = async ()=>{
      const get = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`)
      setTrailer(get.data?.results)
      console.log(get.data?.results)
    }

    useEffect(()=>{
      getIMG()
      getVideo()
    },[])

    const [activeList, setActiveList] = useState("video");

    const handleListClick = (list) => {
      setActiveList(list);
      return <div className="underline"></div>
    };

    const Videos = ({resV}) => {
      return (
        <div className="coverVideo">
          <ReactPlayer className="videoClass"
          url={`https://www.youtube.com/watch?v=${resV.key}`}
          controls={true}
          width="640"
          height="360"
          config={{
            file: {
              attributes: {
                codecs: "vp09.00.51.08.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01",
                type: "video/mp4; codecs=vp09.00.51.08.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01.01",
              }
            },
          }}
        />
        </div>
      )
    }

    const getTrailer = trailer?.length > 1 && trailer.filter((tra)=>(tra.type === "Trailer"))[0]
    console.log(getTrailer)

    const Backdrops = ({resB}) => {
      return (
        <div className="backdropsBox">
          <img src={`https://image.tmdb.org/t/p/w500/${resB.file_path && resB.file_path}`} alt="" className="imgp"/>
        </div>
      )
    }

    const Posters = ({resP}) => {
      return (
        <div className="postersBox">
          <img src={`https://image.tmdb.org/t/p/w500/${resP.file_path && resP.file_path}`} alt="" className="imgp"/>
        </div>
      )
    }

    console.log(getRec)

  return (
    <div className="mainDT">
      <PosterDetails getDT={getDT} getTrailer={getTrailer}/>
      <div className="under-poster">
        <div className="left-details">
          <div className="orgenization">
            <h2 className="introducer1">Top Billed Cast</h2>
            <div className="actor-part">
              {getActor?.cast?.map((act)=>(
                <Link to={`/popular/${act.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <PeopleForMovieCardExpend actors={act}/>
                </Link>
              ))}
            </div>
          </div>
          <div className={` ${getRec?.length !== 0 ? 'Recommendations' : 'none'} `}>
            <div className={`${getRec?.length !== 0 ?"Recommendation" : "none"}`}>
              <p className={`${getRec?.length !== 0 ?"introducer2" : 'none'}`}>Recommendations</p>
            </div>
            <div className="orgenization-recommends">
              {getRec?.map((recommend)=>(
              <Link to={`/details/${recommend.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <RecommendationMovieCard recommend={recommend}/>
              </Link>
              ))}
            </div>
          </div>
          <div className="media-section" >
          <div className="ulOrg">
            <p id="media-title">Media</p>
            <ul className="mediaLists">
              <li className="innerLists" onClick={() => handleListClick("video")}>Videos</li>
              <li className="innerLists" onClick={() => handleListClick("backdrop")}>Backdrops</li>
              <li className="innerLists" onClick={() => handleListClick("poster2")}>Posters</li>
            </ul>
          </div>
            <div className="videoBoxFather">
              {activeList === "video" && trailer?.length > 1 && trailer.map((res)=> <Videos resV={res}/>)}
            </div>
            <div className="backdropsBoxFather">
              {activeList === "backdrop" && images.backdrops?.map((res)=><Backdrops resB={res}/>)}
            </div>
            <div className="posterBoxFather">
              {activeList === "poster2" && images.posters?.map((res)=><Posters resP={res}/>)}
            </div>
          </div>
          <div className={`${getSimilar?.length > 1 ? "hr1" : "none"}`}></div>
          <div className={`${getSimilar?.length > 1 ? "similars" : "none"}`}>
            <div className="similar">
              <p className={`${getSimilar?.length > 1 ? "introducer2" : "none"}`}>Similar Movies</p>
            </div>
            <div className="orgenization-recommends">
              {getSimilar?.map((simi)=>(
                <Link to={`/details/${simi.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <SimilarMovies sim={simi} />
                </Link>              
              ))}
            </div>
          </div>
        </div>
        <div className="right-details"></div>
      </div>
    </div>
  )
}

export default Details   