import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
function MovieDetails() {
    const history = useHistory()
    const store = useSelector(store => store);
    return(
        <div>
            <h2>{store.details.title}</h2>
            <img src={store.details.poster}/>
            <h2>Genre</h2>
            {store.genres.map((genre,i)=>{
                return(
                <p key ={i}>{genre.name}</p>
                )
            })}
            <h2>Description</h2>
            <p>{store.details.description}</p>
            <button onClick={() => history.push('/')}>Back To List</button>
           
        </div>

    )
}
export default MovieDetails