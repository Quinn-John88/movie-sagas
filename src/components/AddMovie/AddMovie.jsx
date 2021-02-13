import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useState} from "react";

function AddMovie() {
    let movie = useSelector(store => store.genres);
    const [genre, setGenre] = useState({ genre: "" });
    const history = useHistory();
    const dispatch = useDispatch();

    function handleChange(event) {
        setGenre({ genre: event.target.value });
    }

    function handleReturn() {
        history.push('/')
    }

    function dispatchGenre(event, id) {
        dispatch({
            type: "SET_GENRES",
            payload: [genre, id],
        });
        setGenre({ genre: "" });
    }

    return (
        <>
            <form>
                <input placeholder='Title' />
                <input placeholder='Image URL' />
                <textarea placeholder='Description' />
                <select
                    onChange={(event) => handleChange(event)}
                    id="genre"
                    name="genre"
                >
                    <option value={movie.genres}>Adventure</option>
                    <option value={movie.genres}>Animated</option>
                    <option value={movie.genres}>Biographical</option>
                    <option value={movie.genres}>Comedy</option>
                    <option value={movie.genres}>Disaster</option>
                    <option value={movie.genres}>Drama</option>
                    <option value={movie.genres}>Epic</option>
                    <option value={movie.genres}>Fantasy</option>
                    <option value={movie.genres}>Musical</option>
                    <option value={movie.genres}>Romantic</option>
                    <option value={movie.genres}>Science Fiction</option>
                    <option value={movie.genres}>Space-Opera</option>
                    <option value={movie.genres}>Superhero</option>
                </select>
                <button onClick={(event) => dispatchGenre(event, id)}>Save</button>
                <button onClick={handleReturn}>Cancel</button>
            </form>
        </>
    )
}

export default AddMovie;