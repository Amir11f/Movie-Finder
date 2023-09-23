import { useContext } from 'react'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import { useState } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import ResultContext from '../contextThings'
import ResultContext2 from '../contextTings2'
import { memo } from 'react'



function SearchBoxN( props) {


    const [getSearch ,setGetSearch] = useState('')
    const [getResult , setGetResult] = useContext(ResultContext)

    const searchMovie = async ()=>{
        const get = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&query=${getSearch}&page=1&include_adult=false`)
        setGetResult(get.data.results)
        console.log(get)
    }

    const [getTvResult , setgetTvResult] = useContext(ResultContext2)
    const searchTv = async ()=>{
        const get = await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-US&page=1&query=${getSearch}&include_adult=false`)
        setgetTvResult(get.data.results)
        console.log(get)
    }


    console.log(getSearch);      // should be remove
    console.log(getResult)
    console.log(getTvResult)
    console.log('this page is rendering n............................')

    const onClickOperation = ()=>{
        searchMovie()
        searchTv()
    }

    const navigate = useNavigate()

    function keydownfunction(e){
        if( e.key === 'Enter' ){
            searchMovie()
            searchTv()
            navigate('/searchBoxResultsPage')
        }
    }

  return (
    <div className={`type ${props.searchBox? 'openSearch' : 'closeSearch'}`} >
            <div className="inType">
                <div className="inTypeInput">
                    <input placeholder='search for a movie, tv show'className='input1' type='text' onChange={(e)=>{setGetSearch(e.target.value)}} value={getSearch} onKeyDown={keydownfunction} />
                </div>
                <div className="inTypeIcon">
                    <Link to={'/searchBoxResultsPage'} ><FaSearch className='inTypeIcon1' onClick={onClickOperation}/></Link>
                </div>
            </div>
        </div>
  )
}

export default memo(SearchBoxN)