import {FaStar} from 'react-icons/fa';

function Star({index, value, rating, setRating, setHoverRating}) {
    return (<FaStar size={"2em"} color={value ? "orange" : "#aaa"}
                    onMouseEnter={() => setHoverRating(index + 1)}
                    onMouseLeave={()=> setHoverRating(0)}
                    onMouseDown={() => setRating(index + 1)}/>)
}

export default Star;