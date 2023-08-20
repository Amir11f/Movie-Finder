import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ReactDOM } from 'react';

export default function ShowResults({res}) {


  function andetc (pra){
    if(window.innerWidth > 1051){
      if (pra.length > 365) {
        return pra.substring(0, 364) + "...";
      }else{
        return pra
      }
    }else{
      if (pra.length > 250) {
        return pra.substring(0, 200) + "...";
      }else{
        return pra
      }
    }
  }

  function andetc1 (pra){
    if (pra.length > 201) {
      return pra.substring(0, 200) + "...";
    }else{
      return pra
    }
  }


  const [ser ,setSer] = useState(window.innerWidth > 1050 && true)


    return(
        <div className='orgr' >
          <div className="left-part-img">
            <Link to={`/details/${res.id}`}>
              <img src={`https://image.tmdb.org/t/p/w500/${res?.poster_path}`} alt="" className='searchImg'/>
            </Link>
          </div>
          <div className="right-part-details">
            <div className="center">
              <p className='searchTitle'>{res?.title && res.title }</p>
              <p className='searchReleaseDate'> {res?.release_date}</p>
              <p className='searchOverview'>{res.overview && andetc(res.overview)}</p>
              <p className='searchOverview-responsive1'>{ser === true && res.overview && andetc1(res.overview)}</p>
            </div>
          </div>
        </div>
      )
}
