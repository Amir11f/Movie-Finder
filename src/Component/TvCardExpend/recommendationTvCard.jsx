import React, { useEffect } from 'react'
import noimg from '../../assets/noimg.jpg'
import { Navigate, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import Details from '../movieCardExpand/details'

function RecommendationMovieCard({recommend}) {

  // let navigate1 = useNavigate()

  // const reloader = ()=>{
  //   navigate1(`/details/${recommend.id}`)
  //   // window.location.reload(false)
  // }

  // useEffect(()=>{
    
  // },[])

  return (
    <div className='mainRec'>
      <div className="">
        <img src={recommend.backdrop_path ? `https://image.tmdb.org/t/p/w500/${recommend.backdrop_path}` : noimg} alt="" className='recImdStyle' />
      </div>
      <div className="rec-ditails">
        <div className="rec-movie-name">
          <p className='recTitle'>{recommend.name}</p>
        </div>
        <div className="rec-score">
          <p>{recommend.vote_average.toFixed(1)+'%'}</p>
        </div>
      </div>
    </div>
  )
}

export default RecommendationMovieCard