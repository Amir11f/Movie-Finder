import React from 'react'
import noimg from '../../assets/noimg.jpg'
import { useNavigate } from 'react-router-dom'

function SimilarMovies({sim}) {

    // const navigate2 = useNavigate()

    // const setAndReload = ()=>{
    //     navigate2(`/details/${sim.id}`)
    //     //  window.location.reload()
    // }

  return (
        <div className='mainRec'>
        <div className="">
            <img src={sim.backdrop_path ? `https://image.tmdb.org/t/p/w500/${sim.backdrop_path}` : noimg} alt="" className='recImdStyle'/>
        </div>
        <div className="rec-ditails">
            <div className="rec-movie-name">
            <p>{sim.name}</p>
            </div>
            <div className="rec-score">
            <p>{sim.vote_average.toFixed(1)+'%'}</p>
            </div>
        </div>
        </div>
    )
}

export default SimilarMovies