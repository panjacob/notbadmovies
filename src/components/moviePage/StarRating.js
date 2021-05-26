import {useState} from 'react';
import Star from './Star';
import {v4} from "uuid";

function StarRating(props) {
    const {movieid} = props
    const dbkey = "rating-"+movieid
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0)

    function fillArray(size, funcValue) {
        return [...Array(size)].map(_ => funcValue());
    }

    function averageSum(arr) {
        if (!arr.length) {
            return 0;
        }
        const result = arr.reduce((prev, curr) => prev + curr) / arr.length;
        return Math.round(result * 10) / 10
    }

    const getRatingFromDB = () => {
        let currentComments = localStorage.getItem(dbkey)
        if (currentComments === undefined || currentComments == null) return []
        else return  JSON.parse(currentComments)
    }

    const submit = () => {
        let currentRatings = getRatingFromDB()
        currentRatings.push(rating)
        localStorage.setItem(dbkey, JSON.stringify(currentRatings))
        setRating(0);
    }

    return (
        <div className="StarRating mb-3">
            <div>
                {hoverRating !== 0 ?
                    fillArray(hoverRating, () => 1).concat(fillArray(10 - hoverRating, () => 0)).map((value, index) =>
                        <Star key={v4()} {...{value, index, setRating, setHoverRating}}  />) :
                    fillArray(rating, () => 1).concat(fillArray(10 - rating, () => 0)).map((value, index) =>
                        <Star key={v4()} {...{value, index, setRating, setHoverRating}}  />)
                }
            </div>
            <div>Rating: {averageSum(getRatingFromDB())}</div>
            <button className="btn btn-dark" onClick={ submit }>
                Rate
            </button>
        </div>
    )
}

export default StarRating;