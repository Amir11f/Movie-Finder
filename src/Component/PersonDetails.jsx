import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaInstagram, FaFacebook, FaTiktok, FaTwitter, FaYoutube } from 'react-icons/fa'
import Spinner from './Spinner'

function PersonDetails() {
  const [peopleDetails, setPeopleDetails] = useState([])
  const [loading, setLoading] = useState(true)
  const [bioText, setBioText] = useState('')
  const { personId } = useParams()
  const [knownFor, setKnownFor] = useState([])

  const img = 'https://image.tmdb.org/t/p/original/';
  const moviePosterPreMade = 'https://www.themoviedb.org/t/p/w150_and_h225_bestv2/'
  const detailsUrl = `https://api.themoviedb.org/3/person/${personId}?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&append_to_response=external_ids`
  const getMovies = `https://api.themoviedb.org/3/discover/movie?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_people=${personId}`

  // const fetchData = async () => {
  //   const response = await axios.get(`${detailsUrl}`)
  //   console.log(response.data)
  //   setPeopleDetails(response.data)
  // }  <better version below>

  useEffect(()=>{
    axios.get(`${detailsUrl}`)
    .then(response => {
      setPeopleDetails(response.data)
      setBioText(response.data.biography)
    })
    .catch(error => {
      console.error(error)
    })
    
    axios.get(`${getMovies}`)
    .then(movies => {
      setKnownFor(movies.data.results)
      console.log(movies.data.results)
    })
    .catch(error =>{
      console.error(error)
    })
    setLoading(false)
  }, [])  // on reload stuff

  const paragraphs = bioText.split('\n') // Spliting the bio paragraph

  const genderTypes = {
    0: 'Not specified',
    1: 'Female',
    2: 'Male',
  } // changing gender types to string values

  const socialMedia = {
    'facebook_id': <FaFacebook style={{color: 'rgb(38, 38, 38)', width: '31px' , height: '31px'}}/>,
    'twitter_id': <FaTwitter style={{color: 'rgb(38, 38, 38)', width: '31px' , height: '31px'}}/>,
    'youtube_id': <FaYoutube style={{color: 'rgb(38, 38, 38)', width: '31px' , height: '31px'}}/>,
    'instagram_id': <FaInstagram style={{color: 'rgb(38, 38, 38)', width: '31px' , height: '31px'}}/>
  } // ready icons

  if (!peopleDetails || !peopleDetails.external_ids) {
    return null;
  } // fixes the error Uncought type bla bla bla

  const external_ids = peopleDetails.external_ids // storing the object in a variable
  // console.log(external_ids)
  
  const birthdate = peopleDetails.birthday // storing date in a variable
  const deathdate = peopleDetails.deathday
  
  function calculateAge(birthdate) {       // Calculate Age if person is alive
    if (!birthdate) {
      return 0; // or some default value to fix the error uncought type bla bla bla
    }
    const [year, month, day] = birthdate.split('-');
    const today = new Date();
    const birth = new Date(year, month - 1, day);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  function calculateAgeOnDeath(birthdate, deathdate) {  // Calculate age if person is dead
    const birthYear = new Date(birthdate).getFullYear();
    const deathYear = new Date(deathdate).getFullYear();
    const deathAge = deathYear - birthYear;
  
    const birthMonth = new Date(birthdate).getMonth();
    const deathMonth = new Date(deathdate).getMonth();
    if (deathMonth < birthMonth || (deathMonth === birthMonth && new Date(deathdate).getDate() < new Date(birthdate).getDate())) {
      return deathAge - 1;
    } // extra work, tha main is the above
  
    return deathAge;
  }
  
  const age = calculateAge(birthdate)
  const deathAge = calculateAgeOnDeath(birthdate, deathdate)

  return (
    <div className="contentWrapper">

      <div className="greyColumn">
        <img className='detailsPageImg' src={`${img}${peopleDetails.profile_path}`} alt="" />
        
        <div className="socialMediaContainer">
          {Object.entries(external_ids).map(([key, value]) => {   // the method is converting each object key with it's value into separated arrays
            if (value !== null && value !== '') {  // checking the value not to be null or empty string then we use switch case
             switch (key) {
              case 'facebook_id':
                return(
                  <a href={`https://www.facebook.com/${value}/`} target='_blank'>{socialMedia.facebook_id}</a>
                )
              case 'twitter_id':
                return(
                  <a href={`https://twitter.com/${value}`} target='_blank'>{socialMedia.twitter_id}</a>
                )
              case 'instagram_id':
                return(
                  <a href={`https://www.instagram.com/${value}/`} target='_blank'>{socialMedia.instagram_id}</a>
                )
              case 'youtube_id':
                return(
                  <a href={`https://www.youtube.com/${value}`} target='_blank'>{socialMedia.youtube_id}</a>
                )
             }
            }
              return null;
          })}
        </div>
        
        <div className="personalFacts">

          <h5 className='personalInfo'>Personal Info</h5>

          <p className='facts'>
            <strong>Known For</strong>
            {peopleDetails.known_for_department}
          </p>

          <p className='facts'>
            <strong>Known Credits</strong>
            71
          </p>

          <p className='facts'>
            <strong>Gender</strong>
            {genderTypes[peopleDetails.gender]}
          </p>



          {peopleDetails.deathday === null || peopleDetails.deathday === "" ?
          <p className='facts'>
          <strong>Birthday</strong>
          {`${peopleDetails.birthday}${" ("}${age}${" years old) "}`}
          </p>
          : 
          <div className='deathBirthDate'>
            <div className='innerDate'>
              <strong>Birthday</strong>
              {peopleDetails.birthday}
            </div>
            <div className='innerDate'>
              <strong>Deathday</strong>
              {`${peopleDetails.deathday}${" ("}${deathAge}${" years old) "}`}
            </div>
          </div> }

          <p className='facts'>
            <strong>Place of Birth</strong>
            {/* {peopleDetails.place_of_birth} */}
            {peopleDetails.place_of_birth === null || peopleDetails.place_of_birth === "" ? <p>-</p> : peopleDetails.place_of_birth}
          </p>
          
          <p className='facts'>
            <strong>Also Known As</strong>
            {peopleDetails.also_known_as?.map((names, index)=>(
              <span key={index} id='span'>{names}</span>
            ))}
          </p>

        </div>
      </div>

      <div className="whiteColumn">
        <h2 className='titleName'> {peopleDetails.name} </h2>
        <h5 className='biographyTitle'>Biography</h5>
        <p className="biographyParagraph">{paragraphs.slice(0,1)}</p>
        <p className="biographyParagraphTwo">{paragraphs.slice(1)}</p>
        {bioText === null || bioText === "" ? <p className='nullCondition'>We have no biography for this person</p> : null }
        {console.log(bioText)}
        <div className="knownForSection">
          <h5 className='knownForTitle'>Movies</h5>
          <div className="knownForScroller row">
            {knownFor?.map((movies)=>(
              <ul className='knownForMoviesList'>
                <Link to={`/details/${movies.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <li className='innerListMovies'>
                    <img src={`${moviePosterPreMade}${movies.poster_path}`} alt="img" className='knownForImg' />
                    <h5 className='movieItemTitle'>{movies.title}</h5>
                </li>
                </Link>
              </ul>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default PersonDetails