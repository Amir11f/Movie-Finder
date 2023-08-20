import React from 'react'
import nullImage from '../../assets/1.png'

const defaultImg = nullImage

function andetc (pra){
  if (pra.length > 25) {
    return pra.substring(0, 24) + "...";
  }else{
    return pra
  }
}

function PeopleForMovieCardExpend({actors}) {
  return (
    <div className='expend-actors'>
        <img src={actors.profile_path ? `https://image.tmdb.org/t/p/w500/${actors.profile_path}` : defaultImg } alt={actors.name} className='ex-img-actor' />
        <div className="realName">
          <p className='realName-p1'>{actors.name}</p>
          <p className='realName-p2'>{actors.character && andetc(actors.character)}</p>
        </div>
    </div>
  )
}

export default PeopleForMovieCardExpend