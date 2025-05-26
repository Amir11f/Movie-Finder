import { HiOutlineChevronRight } from 'react-icons/hi'
import { HiOutlineChevronDown } from 'react-icons/hi'
import axios from 'axios'
import Navbar from '../Component/navbarAndDependencies/navbar'
import DoubleRangeSlider from '../Component/DoubleRangeSlider'
import "react-datepicker/dist/react-datepicker.css";
import useTv from './useTv'
import  {TvCard}  from '../Component/TvCard'




export default function TopRatedTv() {

    let currentDay = new Date().getDate()
    let currentMonth = new Date().getMonth() + 1

    if (currentDay < 10) {
        currentDay = '0' + currentDay
    }

    if (currentMonth < 10) {
        currentMonth = '0' + currentMonth
    }
    
    const topRatedTv = async (pageNumber)=>{
        const get = await axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=1b6ccfb407b0626e097c87368fba764e&language=en-USvote_count.gte=1000&country&vote_average.gte=6&with_genres=${state.state3}&primary_release_date.gte=${sliderValues[0]}-01-01&primary_release_date.lte=${sliderValues[1]}-${currentMonth}-${currentDay}&page=${pageNumber}&vote_count.gte=500&vote_average.gte=0`);
        return get.data.results
    }

    const [
        state ,
        setOnClickOne, onClickOne , 
        sliderValues,handleSliderChange,handleRemove,handleAdd,handleFilterChanges
    ] = useTv(topRatedTv)

    return(
        <div className='main'>
            <Navbar/>
            <div className="position">
                <div className="body">
                    <div className="left-side">
                        <p className='info'>Popular Movie</p>
                        <div className="filterBox">
                            <div className="pragraph">
                                <div className="topType"></div>
                                <div onClick={()=>{setOnClickOne(!onClickOne) }} className={`firstShow ${onClickOne? 'noOpenLa' : 'openLa'}`}>
                                    <h3>Filters</h3>
                                    <HiOutlineChevronRight className='cerculate'/>
                                </div>
                                <div className={`secondShow ${onClickOne? 'openLa' : 'noOpenLa'}`}>
                                    <div id="same" onClick={()=>{setOnClickOne(!onClickOne) }}>
                                        <h3>Filters</h3>
                                        <HiOutlineChevronDown className='cerculate1'/>
                                    </div>
                                    <div className="movDate">
                                        <p id='Air-date'>Air Date</p>
                                        <DoubleRangeSlider values={sliderValues} onChange={handleSliderChange} />
                                        <div id="bottom-border"></div>
                                    </div>
                                    <div className="movGenres">
                                        <div className="denres-title">
                                            <p>Genres</p>
                                        </div>
                                        {state.state2 !== undefined  && state.state2.map((gen)=>(
                                            <div  
                                            // style={genStyles}   important
                                            className='genBringClass2' onClick={()=>{handleRemove(gen)}}key={gen.id}>
                                                {gen.name}
                                            </div>
                                        ))}
                                        {state.state1.map((gen)=>(
                                            <div  
                                            // style={genStyles}   important
                                            className='genBringClass' onClick={()=>{handleAdd(gen)}}key={gen.id}>
                                                {gen.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="searchBTN" onClick={handleFilterChanges}>
                                    <p id='search-click'>Search</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className='app'>
                            <div className='container'>
                                {state.state6.length> 0 && state.state6.map((T )=>{
                                        return  <TvCard tv={T} key={T.id}/>
                                })}
                                {/* {isLoading && <Spinner />} */}
                            </div>        
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}  