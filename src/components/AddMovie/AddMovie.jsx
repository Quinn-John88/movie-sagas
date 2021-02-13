import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useState } from "react";

function AddMovie() {
    const [description, setDescription] = useState("")
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [genre, setGenre] = useState([]);
    let movie = useSelector(store => store.genres);
    const dispatch = useDispatch();
    const history = useHistory();

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

    function handleSubmit() {
        event.preventDefault();
        dispatch({
            type:"ADD_MOVIE",
            payload: {
                title: title,
                image: imageUrl,
                description: description,
                genre: genre,
            }
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit} className="addMovieForm">
                <input value={title}required placeholder='Title' onChange={(event) => setTitle(event.target.value)} />
                <input value={imageUrl}required placeholder='Image URL' onChange={(event) => setImageUrl(event.target.value)} />
                <textarea value={description} required placeholder='Description' onChange={(event) => setDescription(event.target.value)} />
                <select
                    required
                    onChange={(event) => setGenre(event)}
                    id="genre"
                    name="genre"
                >
                    <option value="1">Adventure</option>
                    <option value="2">Animated</option>
                    <option value="3">Biographical</option>
                    <option value="4">Comedy</option>
                    <option value="5">Disaster</option>
                    <option value="6">Drama</option>
                    <option value="7">Epic</option>
                    <option value="8">Fantasy</option>
                    <option value="9">Musical</option>
                    <option value="10">Romantic</option>
                    <option value="11">Science Fiction</option>
                    <option value="12">Space-Opera</option>
                    <option value="13">Superhero</option>
                </select>
                <button onClick={(event) => dispatchGenre(event)}>Add Genre</button>
                <button type="submit">Save</button>
                <button onClick={handleReturn}>Cancel</button>
            </form>
        </>
    )
}
export default AddMovie