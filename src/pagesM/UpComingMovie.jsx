import { HiOutlineChevronRight } from 'react-icons/hi'
import { HiOutlineChevronDown } from 'react-icons/hi'
import axios from 'axios'
import Navbar from '../Component/navbarAndDependencies/navbar'
import { MovieCard } from '../Component/MovieCard'
import DoubleRangeSlider from '../Component/DoubleRangeSlider'
import "react-datepicker/dist/react-datepicker.css";
import useMovie from './useMovie'




export default function UpComingMovie() {

    let currentDay = new Date().getDate()
    let currentMonth = new Date().getMonth() + 1

    if (currentDay < 10) {
        currentDay = '0' + currentDay
    }

    if (currentMonth < 10) {
        currentMonth = '0' + currentMonth
    }
    
    const opComingM = async (pageNumber)=>{
        const get = await axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=(your api key)&language=en-US&with_genres=${state.state3}&certification=${state.state7}&primary_release_date.gte=${sliderValues[0]}-01-01&primary_release_date.lte=${sliderValues[1]}-${currentMonth}-${currentDay}&certification_country=US&page=${pageNumber}`);
        return get.data.results
    }

    const [
        state ,
        setOnClickOne, onClickOne , 
        sliderValues,handleSliderChange,handleRemove,handleAdd,handleRemoveCer,handleAddCer,handleFilterChanges
    ] = useMovie(opComingM)

    return(
        <div className='main'>
            <Navbar/>
            <div className="position">
                <div className="body">
                    <div className="left-side">
                        <p className='info'>Up coning Movie</p>
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
                                    <div id="bottom-border2"></div>
                                    <div className="movCertification">
                                        <div className="Certification-title">
                                            <p>Certification</p>
                                        </div>
                                        <div>
                                            {state.state5.map((cer)=>(
                                                <div className='certificate2' onClick={()=>{handleRemoveCer(cer)}}key={cer.id}>
                                                    {cer.certification}
                                                </div>
                                            ))}

                                            {state.state4.map((cer)=>(
                                                <div className='certificate' onClick={()=>{handleAddCer(cer)}}key={cer.id}>
                                                    {cer.certification}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div id="distance"></div>
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
                                {state.state6.length> 0 && state.state6.map((M)=>{
                                        return  <MovieCard movie={M} key={M.id}/>
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