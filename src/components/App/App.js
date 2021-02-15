import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { useHistory } from 'react-router';
import './App.css';
import MovieList from '../MovieList/MovieList'
import MovieDetails from '../MovieDetails/MovieDetails'
import AddMovie from '../AddMovie/AddMovie'
import { makeStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';


function App() {

  const history = useHistory();
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      marginRight: 175,
    },
  }));

  const classes = useStyles();

  return (
      <div className="App">
        <Router>
          <AppBar position='static'>
            <Toolbar className='ToolBar'>
              <MenuItem><Link className="menuLink" color="inherit" variant="body2" to="/addmovie">Add Movie</Link></MenuItem>
              <MenuItem><Link className="menuLink" color="inherit" variant="body2" to="/">Home</Link></MenuItem>
              <Typography variant='h4' className={classes.title}>Movie Sagas</Typography>
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path="/" exact component={MovieList} />
            <Route path='/details' component={MovieDetails} />
            <Route path='/addmovie' component={AddMovie} />
          </Switch>
        </Router>
      </div>
  );
}

export default App;