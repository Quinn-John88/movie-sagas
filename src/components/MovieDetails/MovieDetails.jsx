import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

function MovieDetails(props) {

    let movie = useSelector(store => store.movieDetails);
    const history = useHistory();
    const handleClick = () => {
        history.push('/');
    }

    return (
        <>
            <h1>Movie Details</h1>
            <table>
                <tbody>
                    <tr>
                        <td>Movie Title:</td>
                        <td>{movie.title}</td>
                    </tr>
                    <tr>
                        <td>Movie Description:</td>
                        <td>{movie.description}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <h3>Click here to return To list</h3>
            <button onClick={handleClick}>Return</button>
        </>
    )
}
export default MovieDetails;