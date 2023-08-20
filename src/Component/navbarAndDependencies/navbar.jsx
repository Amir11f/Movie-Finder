import React from 'react'
import { useState ,useEffect ,useRef} from 'react'
import { FaSearch } from 'react-icons/fa'
import { RiCloseLine } from 'react-icons/ri'
import { Link } from 'react-router-dom';
import SearchBoxN from './searchBoxN';
import {HiOutlineMenu} from 'react-icons/hi'
import {IoIosPerson} from 'react-icons/io'

export default function Navbar() {
    const[open , setOpen] = useState(false)
    const[open1 , setOpen1] = useState(false)
    const[open2 , setOpen2] = useState(false)
    const [openMenu , setOpenMenu] = useState(false)
     
    const[searchBox , setSearchBox] = useState(false)
    // scroll
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
          
          // ## function invocation
          scrollEventThrottle((scrollPos, previousScrollPos) => {
              if (previousScrollPos > scrollPos) {
                setShow(show)
              } else {
                setShow(!show)
              }
          });
    },[])
    // scroll
    

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
                <div className="divid1" onMouseEnter={()=>{setOpen(true)}} onMouseLeave={()=>{setOpen(false)}}>
                    <div className="menu"><p id='menu-p'>Movies</p> </div>
                    <div className={`under1 ${open? 'active' : 'inactive'}`} >
                        <Link to={'../pagesM/popularMovie'} className='under-p'id='selected1'>Populer</Link>
                        <Link to={'../../pagesM/NowPlayingMovie'} className='under-p'>Now playing</Link>
                        <Link to={'../../pagesM/UpComingMovie'} className='under-p'>Up coming</Link>
                        <Link to={'../../pagesM/TopRatingMovie'} className='under-p' id='selected2'>Top rated</Link>
                    </div>
                </div>
                <div className="divid2" onMouseEnter={()=>{setOpen1(true)}} onMouseLeave={()=>{setOpen1(false)}}>
                    <div className="menu"><p id='menu-p'>TVshows</p> </div>
                    <div className={`under2 ${open1? 'active1' : 'inactive1'}`} >
                        <Link to={'../../pagesT/PopularTv'} className='under-p'id='selected1'>Populer</Link>
                        <Link to={'../../pagesT/AiringTodayTv'} className='under-p'>Airing today</Link>
                        <Link to={'../../pagesT/OnTheAirTv'} className='under-p'>On TV</Link>
                        <Link to={'../../pagesT/TopRatedTv'} className='under-p' id='selected2'>Top rated</Link>
                    </div>
                </div>
                <div className="divid3" onMouseEnter={()=>{setOpen2(true)}} onMouseLeave={()=>{setOpen2(false)}}>
                    <div className="menu"><p id='menu-p'>People</p></div>
                    <div className={`under3 ${open2? 'active2' : 'inactive2'}`} >
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
                    <HiOutlineMenu className='icon-menu2' onClick={(()=>setOpenMenu(!openMenu))}/>
                </div>
                <div className={`navbarOptionsBox ${ openMenu ? 'open' : 'close'}`}>
                    <div className="navbarOption">
                        <div className={` ${open ? 'divid1' : null}`} onClick={()=>{setOpen(!open)}} >
                            <div className="menu"><p id='menu-p-hide'>Movies</p> </div>
                            <div className={`under1 ${open? 'active' : 'inactive'}`} >
                                <Link to={'../pagesM/popularMovie'} className='under-p1'id='selected1'>Populer</Link>
                                <Link to={'../../pagesM/NowPlayingMovie'} className='under-p1'>Now playing</Link>
                                <Link to={'../../pagesM/UpComingMovie'} className='under-p1'>Up coming</Link>
                                <Link to={'../../pagesM/TopRatingMovie'} className='under-p1' id='selected2'>Top rated</Link>
                            </div>
                        </div>
                        <div className={` ${open1 ? 'divid2' : null} `} onClick={()=>{setOpen1(!open1)}} >
                            <div className="menu"><p id='menu-p-hide'>TVshows</p> </div>
                            <div className={`under2 ${open1? 'active1' : 'inactive1'}`} >
                                <Link to={'../../pagesT/PopularTv'} className='under-p2'id='selected1'>Populer</Link>
                                <Link to={'../../pagesT/AiringTodayTv'} className='under-p2'>Airing today</Link>
                                <Link to={'../../pagesT/OnTheAirTv'} className='under-p2'>On TV</Link>
                                <Link to={'../../pagesT/TopRatedTv'} className='under-p2' id='selected2'>Top rated</Link>
                            </div>
                        </div>
                        <div className={` ${open2 ? 'divid3' : null}`} onClick={()=>{setOpen2(!open2)}} >
                            <div className="menu"><p id='menu-p-hide'>People</p></div>
                            <div className={`under3 ${open2? 'active2' : 'inactive2'}`} >
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
                            <FaSearch id='second-icon' onClick={()=>{setSearchBox(true)}} className={`${searchBox === true ? 'hide' : 'show'}`}/>
                        </div>
                        <div id="search1"> 
                            <RiCloseLine id='second-hide-icon'onClick={()=>{setSearchBox(false)}} className={`${searchBox === false? 'hide' : 'show'}`}/> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <SearchBoxN searchBox={searchBox} setSearchBox={setSearchBox} />
    </div>
  )
}
