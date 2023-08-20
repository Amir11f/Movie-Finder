import { CiCircleMore } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; 

export const MovieCard = ({movie})=>{
    const navigate = useNavigate()

    const img = "https://image.tmdb.org/t/p/w500"

    return(
        <div className="card_box">
            <div className="card">
                <div className="image">
                        <img className='cursor' src={movie.poster_path ? `${img}${movie.poster_path}` : null} alt='' onClick={()=> navigate(`/details/${movie.id}`)}/> 
                    <div className="rowSvgScore">
                        <div className="score">
                            <CircularProgressbar id='score' value={movie.vote_average} minValue={0} maxValue={10} text={`${movie.vote_average?.toFixed(1)}`} styles={buildStyles({textSize: '43px',fontWeight: 900, textColor: 'white',pathColor: movie.vote_average < 3 ? '#a22955' : movie.vote_average < 7 ? '#b4bc66' : '#3bc183' , trailColor: movie.vote_average < 3 ? '#541634' : movie.vote_average < 7 ? '#3f3d13' : '#21442b' })} />
                        </div>
                        <div className="svg">
                            <CiCircleMore/>
                        </div>
                    </div>
                </div>
                <div className="amir">
                    <div className="title">
                        {movie.title}
                    </div>
                    <div className="date">
                        {movie.release_date}
                    </div>
                </div>
            </div>
        </div>
    )
}