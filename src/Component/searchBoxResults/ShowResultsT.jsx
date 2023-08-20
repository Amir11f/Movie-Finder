import React from 'react'
import { Link } from 'react-router-dom';

export default function ShowResultsT({resT}) {

  function andetc (pra){
    if (pra.length > 365) {
      return pra.substring(0, 364) + "...";
    }else{
      return pra
    }
  }
  

  console.log(resT)

    return(
        <div className='orgr' >
          <div className="left-part-img">
            <Link to={`/detailsT/${resT.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${resT?.poster_path}`} alt="" className='searchImg'/>
            </Link>
          </div>
          <div className="right-part-details">
            <div className="center">
              <p className='searchTitle'>{resT?.name && resT.name }</p>
              <p className='searchReleaseDate'> {resT?.first_air_date}</p>
              <p className='searchOverview'>{resT?.overview && andetc(resT.overview)}</p>
            </div>
          </div>
        </div>
      )
}
