import './App.css';
import { UserContext } from '../../contexts/UserContext';
import { AllMoviesContext } from '../../contexts/AllMoviesContext';
import AppRouter from '../../router/AppRouter';
import { useEffect, useState } from 'react';
import { extractDataFromMovie } from '../../utils/extractDataFromMovie';
import movieApi from '../../utils/MoviesApi';
import authApi from '../../utils/AuthApi';

function App() {
  console.log('Я РОДИЛСЯ');

  // const [currentUser, setCurrentUser] = useState(null);
  // const [moviesListGeneral, setMoviesListGeneral] = useState([]);
  // const [isError, setIsError] = useState(false);
  //
  // useEffect(() => {
  //   console.log('эффект');
  //
  //   const getAllMoviesList = () => {
  //     return movieApi
  //       .getMovies()
  //       .then((movies) => {
  //         // setMoviesListGeneral(moviesListPrepared);
  //         return movies.map((oldData) => extractDataFromMovie(oldData));
  //       })
  //       .catch((err) => {
  //         setIsError(true);
  //         console.log(`Ошибка.....: ${err}`);
  //       });
  //   };
  //   function handleTokenCheck() {
  //     const token = localStorage.getItem('token');
  //     if (token) {
  //       authApi
  //         .checkToken(token)
  //         .then((data) => {
  //           if (data) {
  //             getAllMoviesList().then((moviesListPrepared) => {
  //               setCurrentUser(data);
  //               setMoviesListGeneral(moviesListPrepared);
  //             });
  //           }
  //         })
  //         .catch((err) => console.log(`Ошибка.....: ${err}`));
  //     }
  //   }
  //
  //   handleTokenCheck();
  // }, []);

  return (
    // <UserContext.Provider value={currentUser}>
    //   <AllMoviesContext.Provider value={moviesListGeneral}>
    <div className="App">
      <AppRouter />
    </div>
    /*  </AllMoviesContext.Provider>*/
    /*</UserContext.Provider>*/
  );
}

export default App;
