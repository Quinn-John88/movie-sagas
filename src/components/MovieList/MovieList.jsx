import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const history = useHistory();

    const handleClick = (id) => {
        dispatch({type: 'FETCH_DETAILS', payload: id});
        history.push('/details')
    }
    const useStyles = makeStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 140,
            backgroundColor: "black",
        },
    });
    const classes = useStyles();

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <>
                            <Paper style={{backgroundColor:'navy'}} className="moviePaper" elevation={3}>
                                <Card className="movieCard" style={{backgroundColor:'lightgray', color:'black'}}>
                                    <CardActionArea>
                                        <CardMedia
                                            
                                            className={classes.media}
                                            image={movie.poster}
                                            title={movie.title}
                                            onClick={() => handleClick(movie)}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {movie.title}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Click to learn more.
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Paper>
                        </>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;