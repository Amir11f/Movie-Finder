import { CiCircleMore } from 'react-icons/ci'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css'; 
import DetailsT from './TvCardExpend/DetailsT';

export const TvCard = ({tv})=>{
    const navigate1 = useNavigate()

    const img = "https://image.tmdb.org/t/p/w500"

    return(
        <div className="card_box">
            <div className="card">
                <div className="image">
                        <img className='cursor' src={tv.poster_path ? `${img}${tv.poster_path}` : null} alt='' onClick={()=> navigate1(`/DetailsT/${tv.id}`)}/> 
                    <div className="rowSvgScore">
                        <div className="score">
                            <CircularProgressbar id='score' value={tv.vote_average} minValue={0} maxValue={10} text={`${tv.vote_average?.toFixed(1)}`} styles={buildStyles({textSize: '43px',fontWeight: 900, textColor: 'white',pathColor: tv.vote_average < 3 ? '#a22955' : tv.vote_average < 7 ? '#b4bc66' : '#3bc183' , trailColor: tv.vote_average < 3 ? '#541634' : tv.vote_average < 7 ? '#3f3d13' : '#21442b' })} />
                        </div>
                        <div className="svg">
                            <CiCircleMore/>
                        </div>
                    </div>
                </div>
                <div className="amir">
                    <div className="title">
                        {tv.name}
                    </div>
                    <div className="date">
                        {tv.first_air_date}
                    </div>
                </div>
            </div>
        </div>
    )
}