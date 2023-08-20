import React, {useContext ,useState ,useEffect} from 'react'
import ResultContext from '../contextThings'
import Navbar from '../navbarAndDependencies/navbar'
import ShowResults from './showResults'
import ResultContext2 from '../contextTings2'
import ShowResultsT from './ShowResultsT'

function SearchBoxResultsPage() {

  const [getResult] = useContext(ResultContext)
  const [getTvResult] = useContext(ResultContext2)

  


  // useEffect(()=>{
  //   ResultOrgenize()
  // },[showTvMovie])

  // const checkPerson = (ans)=>{
  //   if(ans.id.length > 6 ) return
  // }
  console.log(getResult.id);

  const [showTvMovie ,setShowTvMovie] =useState(true)
  console.log(showTvMovie)

  useEffect(()=>{
    
  },[setShowTvMovie])

  return (
    <div className='SBRP_main'>
      <Navbar/>
      <div className="changerTM">
        <div className="changBody">
          <p className='changerP' onClick={()=>{setShowTvMovie(true)}}>Movies</p>
          <p className='changerP'onClick={()=>{setShowTvMovie(false)}}>TV shows</p>
        </div>
      </div>
      <FinalResult showTvMovie={showTvMovie}/>  
    </div>
  )

  function FinalResult({showTvMovie}) {
    return (
    <div className='resultPart'>{showTvMovie ? getResult.length > 0 && getResult.map((resM)=> <ShowResults res={resM}/> )
      : getTvResult !== undefined && getTvResult.map((resT)=> <ShowResultsT resT={resT}/>)}
    </div>
    )  
  }
}

export default SearchBoxResultsPage