// App.tsx
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import Cinema from './pages/Cinema';
import CreateCinema from './pages/CreateCinema';
import CreateMovie from './pages/CreateMovie';
import CreateSession from './pages/CreateSession';
import Movie from './pages/Movie';
import UpdateTask from './pages/UpdateTask';
import './styles/global.css';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/updateTask/:id"
          element={<UpdateTask />}
        />
        <Route
          path="/movies"
          element={<Movie />}
        />

        <Route
          path="/cinemas"
          element={<Cinema />}
        />

        <Route
          path="/createMovies"
          element={<CreateMovie />}
        />

        <Route
          path="/createCinema"
          element={<CreateCinema />}
        />


        <Route
          path="/createSession"
          element={<CreateSession />}
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
