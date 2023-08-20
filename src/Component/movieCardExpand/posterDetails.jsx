import React, { useState } from 'react'
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ReactPlayer from 'react-player';
import {FaPlay} from 'react-icons/fa'

function PosterDetails({getDT ,getTrailer}) {
  
  function formatMovieLength() {   // we can put function in our return
    const hours = Math.floor(getDT.runtime / 60);
    const remainingMinutes = getDT.runtime % 60;
    return `${hours}h ${remainingMinutes}m`;
  }

  const tarikh = Math.floor(getDT.vote_average) // we can put const in  our return 

  const getVideo = async ()=>{
    const get = await axios.get(`https://api.themoviedb.org/3/movie/713704/videos?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US`)
    console.log(get)
  }
  getVideo()
  const fullDate = getDT && getDT.release_date ? getDT.release_date : '';
  const year = fullDate.substr(0, 4)

  const [showT ,setShowT] = useState('hide')

  const IndependentTrailer = ()=>{
   return (
    <div className="showTrailer">
      <ReactPlayer className="videoClass2"
          url={`https://www.youtube.com/watch?v=${getTrailer.key}`}
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

    const mapC = getDT?.production_countries?.map((f)=>( f.name)).reduce((acc , cur)=>acc +' , '+ cur)


    const mapG = getDT.genres?.map((g)=> g.name).reduce((acc ,cur)=> acc+', '+cur)
    
  
  return (
      <div className='detail-main'>
          {showT === 'show' ? <div className="parent-color-trailer" onClick={()=> setShowT('hide')}>
            <IndependentTrailer />
          </div> : null}
        <div className='poster' style={{backgroundImage:`url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${getDT.backdrop_path})`}}></div>
          <div className="collect">
            <div className="left-poster">
              <img className='poster-img' src={`https://www.themoviedb.org/t/p/original${getDT.poster_path}`} alt="" />
            </div>
            <div className="right-poster">
              <div className="orgenize-top">
                <div className="right-poster-row1">
                  <p className='original_title'>{getDT.original_title}</p>
                  <p className='release_date1'>{year}</p>
                </div>
                <div className="right-poster-row2">
                  <p className='release_date2'>{getDT.release_date}</p>
                  <p className='genres_poster'>{mapG}</p>
                  <p className='runtime'>{formatMovieLength()}</p>
                </div>
                <div className="right-poster-row3-orgenize">
                  <div className="right-poster-row3">
                    {/* <p className='vote_average'>{getDT.vote_average?.toFixed(1)}</p> */}
                    <CircularProgressbar className='vote_average' value={getDT.vote_average} minValue={0} maxValue={10} text={`${getDT.vote_average?.toFixed(1)}`} styles={buildStyles({textSize: '37px', textColor: 'white',pathColor: getDT.vote_average < 3 ? '#a22955' : getDT.vote_average < 7 ? '#b4bc66' : '#3bc183' , trailColor: getDT.vote_average < 3 ? '#541634' : getDT.vote_average < 7 ? '#3f3d13' : '#21442b', bottomPadding : "3rem" })} />
                  </div>
                  <p className='userScoreP'>User <br/> Score</p>
                  <div className="right-poster-row3-frount">
                    <div className="movie-trailer" onClick={()=> setShowT('show')}>
                      <FaPlay className='I_faplay'/>
                      <p className='trailerPra'>Trailer</p>
                    </div>
                  </div>
                </div>
                <div className="right-poster-row4">
                  <p className='tagline'>{getDT.tagline}</p>
                </div>
                <div className="right-poster-row5">
                  <p className='overview1'>Overview</p>
                  <p className='overview2'>{getDT.overview}</p>
                </div>
                <div className="right-poster-row6">
                  <div className='country'>
                     <p className='country_title'>Production Countries :</p>
                     <p className='countries'>{mapC}</p>
                  </div>
                </div>
                <div className="right-poster-row7">
                  <div className="status-situation">
                    <p className="status_title">Status :</p>
                    <p className='status'> {getDT.status}</p>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default PosterDetails
