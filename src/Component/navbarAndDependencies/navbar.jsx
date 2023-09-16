import { memo, useReducer, useState,useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { RiCloseLine } from 'react-icons/ri'
import { Link } from 'react-router-dom';
import SearchBoxN from './searchBoxN';
import {HiOutlineMenu} from 'react-icons/hi'
import {IoIosPerson} from 'react-icons/io'

function Navbar() {

    const [state , dispatch ] = useReducer(reducer , {
        ini1 : false,
        ini2 : false,
        ini3 : false,
        ini4 : false,
        ini5 : false,
        ini6 : false,
    })

    function reducer(state , action){
        switch(action.type){
            case 'state1':
                return {ini1 : !state.ini1}
            case 'state2':
                return {ini2 : !state.ini2}
            case 'state3':
                return {ini3 : !state.ini3}
            case 'state4':
                return {ini4 : !state.ini4}
            case 'state5':
                return {ini5 : !state.ini5}
            case 'state6':
                return {ini6 : !state.ini6}
            default:
                return state
        }
    }
    console.log(state)

    const [show, setShow] = useState(false);

    useEffect(()=>{
        function scrollEventThrottle(fn) { 
            let last_known_scroll_position = 0;
            let ticking = false;
            window.addEventListener("scroll", function () {
              let previous_known_scroll_position = last_known_scroll_position;
              last_known_scroll_position = window.scrollY;
              if (!ticking) {
                window.requestAnimationFrame(function () {
                  fn(last_known_scroll_position, previous_known_scroll_position);
                  ticking = false;
                });
                ticking = true;
              }
            });
          }

          console.log('reading')
          
          // ## function invocation
          scrollEventThrottle((scrollPos, previousScrollPos) => {
              if (previousScrollPos > scrollPos) {
                setShow(show)
              } else {
                setShow(!show)
              }
          });
    },[])

  return (
    <div className={`makeIt ${show? 'scrDown': 'scrUp'}`}>
        <div className='navbar' >
            <div className="lable">
                <h1>
                    <span id="ami1">A</span>
                    <span id="ami2">Z</span>
                    <span id="ami3">P</span>
                    <span id="ami4">M</span>
                </h1>
                <div className="shape"></div>
            </div>
            <div className="option1">
                <div className="divid1" onMouseEnter={()=>{dispatch({type : 'state1' })}} onMouseLeave={()=>{dispatch({type : 'state1' })}}>
                    <div className="menu"><p id='menu-p'>Movies</p> </div>
                    <div className={`under1 ${state.ini1? 'active' : 'inactive'}`} >
                        <Link to={'../pagesM/popularMovie'} className='under-p'id='selected1'>Populer</Link>
                        <Link to={'../../pagesM/NowPlayingMovie'} className='under-p'>Now playing</Link>
                        <Link to={'../../pagesM/UpComingMovie'} className='under-p'>Up coming</Link>
                        <Link to={'../../pagesM/TopRatingMovie'} className='under-p' id='selected2'>Top rated</Link>
                    </div>
                </div>
                <div className="divid2" onMouseEnter={()=>{dispatch({type : 'state2' })}} onMouseLeave={()=>{dispatch({type : 'state2' })}}>
                    <div className="menu"><p id='menu-p'>TVshows</p> </div>
                    <div className={`under2 ${state.ini2? 'active1' : 'inactive1'}`} >
                        <Link to={'../../pagesT/PopularTv'} className='under-p'id='selected1'>Populer</Link>
                        <Link to={'../../pagesT/AiringTodayTv'} className='under-p'>Airing today</Link>
                        <Link to={'../../pagesT/OnTheAirTv'} className='under-p'>On TV</Link>
                        <Link to={'../../pagesT/TopRatedTv'} className='under-p' id='selected2'>Top rated</Link>
                    </div>
                </div>
                <div className="divid3" onMouseEnter={()=>{dispatch({type : 'state3' })}} onMouseLeave={()=>{dispatch({type : 'state3' })}}>
                    <div className="menu"><p id='menu-p'>People</p></div>
                    <div className={`under3 ${state.ini3? 'active2' : 'inactive2'}`} >
                        <Link to={'/Popular'} className='under-p make'id='selected1' >Populer people</Link>
                    </div>
                </div>
                <div className="divid4">
                    <div className="menu"><p id='menu-p'>More</p></div>
                    <div className="under4"></div>
                </div>
            </div>
            <div className="option1-hide">
                <div className="theMenuIcon">
                    <HiOutlineMenu className='icon-menu2' onClick={()=>{dispatch({type : 'state5' })}}/>
                </div>
                <div className={`navbarOptionsBox ${ state.ini5 ? 'open' : 'close'}`}>
                    <div className="navbarOption">
                        <div className={` ${state.ini1 ? 'divid1' : null}`} onClick={()=>{dispatch({type : 'state1' })}} >
                            <div className="menu"><p id='menu-p-hide'>Movies</p> </div>
                            <div className={`under1 ${state.ini1? 'active' : 'inactive'}`} >
                                <Link to={'../pagesM/popularMovie'} className='under-p1'id='selected1'>Populer</Link>
                                <Link to={'../../pagesM/NowPlayingMovie'} className='under-p1'>Now playing</Link>
                                <Link to={'../../pagesM/UpComingMovie'} className='under-p1'>Up coming</Link>
                                <Link to={'../../pagesM/TopRatingMovie'} className='under-p1' id='selected2'>Top rated</Link>
                            </div>
                        </div>
                        <div className={` ${state.ini2 ? 'divid2' : null} `} onClick={()=>{dispatch({type : 'state2' })}} >
                            <div className="menu"><p id='menu-p-hide'>TVshows</p> </div>
                            <div className={`under2 ${state.ini2? 'active1' : 'inactive1'}`} >
                                <Link to={'../../pagesT/PopularTv'} className='under-p2'id='selected1'>Populer</Link>
                                <Link to={'../../pagesT/AiringTodayTv'} className='under-p2'>Airing today</Link>
                                <Link to={'../../pagesT/OnTheAirTv'} className='under-p2'>On TV</Link>
                                <Link to={'../../pagesT/TopRatedTv'} className='under-p2' id='selected2'>Top rated</Link>
                            </div>
                        </div>
                        <div className={` ${state.ini3 ? 'divid3' : null}`} onClick={()=>{dispatch({type : 'state3' })}} >
                            <div className="menu"><p id='menu-p-hide'>People</p></div>
                            <div className={`under3 ${state.ini3? 'active2' : 'inactive2'}`} >
                                <Link to={'/Popular'} className='under-p3 make'id='selected1' >Populer people</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="option2">
                <div id='nav-end'>
                    <IoIosPerson className='user-icon'/>
                    <div className="changeSearch">
                        <div id="search">
                            <FaSearch id='second-icon' onClick={()=>{dispatch({type : 'state6' }) , pulledData.focus()}} className={`${state.ini6? 'hide' : 'show'}`} />
                        </div>
                        <div id="search1"> 
                            <RiCloseLine id='second-hide-icon'onClick={()=>{dispatch({type : 'state6' })}} className={`${state.ini6? 'show' : 'hide'}`}/> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SearchBoxN searchBox={state.ini6} func={pulledData} />
    </div>
  )
}

const pulledData = (data)=>{
    return data
}


export default memo(Navbar)

