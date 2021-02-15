import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();
// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}
//movie description
const details = (state = [], action) =>{
    if (action.type === "SET_DETAILS"){
        return action.payload
    }
    return state
}
// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

const allGenres = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_GENRES':
            return action.payload;
        default:
            return state;
    }
}

function* fetchDetails(action) {
    try{
        const selectedMovie = action.payload
        yield put({type:"SET_DETAILS", payload: selectedMovie})
    } catch{
        console.log('error fetching details')
    }
}

function* fetchAllGenre() {
    try {
        const allGenres = yield axios.get('/api/genre');
        yield put({ type: 'SET_ALL_GENRES', payload: allGenres.data })
    } catch {
        console.log('get genre error');
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }
}

function* postMovie(action) {
    try {
        console.log(action.payload);
        yield axios.post('/api/movie', action.payload);
        yield put({ type: 'FETCH_MOVIES' })
    } catch {
        console.log('add movie error')
    }
}

//root saga generator
function* rootSaga() {
    yield takeEvery('FETCH_DETAILS', fetchDetails)
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('ADD_MOVIE', postMovie);
    yield takeEvery('FETCH_GENRES', fetchAllGenre)
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
        allGenres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
