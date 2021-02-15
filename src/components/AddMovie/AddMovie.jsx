import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useState, useEffect } from "react";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';


function AddMovie() {
    let [newMovie, setNewMovie] = useState({
        title: "",
        poster: "",
        description: "",
        genre_id: "",
    })

    let genre = useSelector(store => store.allGenres)

    const dispatch = useDispatch();

    const history = useHistory();

    useEffect(() => {
        dispatch({ type: "FETCH_GENRES" })
    }, []);

    function handleReturn() {
        history.push('/')
    }

    const handleSubmit = event => {
        event.preventDefault();
        dispatch({
            type: "ADD_MOVIE",
            payload: newMovie
        })
        history.push('/')
    }
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            }, formControl: {
                margin: theme.spacing(1),
                minWidth: 120,
            },
            selectEmpty: {
                marginTop: theme.spacing(2),
            },
            inputs: {
                margin:'50px',
            }
        },
    }));

    const classes = useStyles();

    return (
        <>
            <form onSubmit={handleSubmit} className={classes.root}>
                <TextField className={classes.inputs} onChange={(event) => setNewMovie({ ...newMovie, title: event.target.value })} required value={newMovie.title} placeholder='Title' id='outlined-basic' variant='outlined' />
                <TextField className={classes.inputs} required value={newMovie.poster} placeholder='Image URL' onChange={(event) => setNewMovie({ ...newMovie, poster: event.target.value })} id='outlined-basic' variant='outlined' />                
                <TextField
                    className={classes.inputs}
                    required
                    id="standard-multiline-flexible"
                    placeholder='Description'
                    multiline
                    rowsMax={4}
                    value={newMovie.description}
                    onChange={(event) => setNewMovie({ ...newMovie, description: event.target.value })}
                    id='outlined-basic'
                    variant='outlined'
                />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Genre</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={newMovie.genre_id}
                        onChange={(event) => setNewMovie({ ...newMovie, genre_id: event.target.value })}
                        label="Genre"
                    >
                        {genre.map((genre) => <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>)}
                    </Select>
                </FormControl>
                <Button className="buttonControl" type="submit" variant="contained" color="primary">Save</Button>
                <Button className="buttonControl" onClick={handleReturn} variant="contained" color="secondary">Cancel</Button>
            </form>

        </>
    )
}
export default AddMovie