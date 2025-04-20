// App.tsx
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './Home';
import Cinema from './pages/Cinema';
import CreateCinema from './pages/CreateCinema';
import CreateMovie from './pages/CreateMovie';
import CreateSession from './pages/CreateSession';
import Movie from './pages/Movie';
import UpdateCinema from './pages/UpdateCinema';
import './styles/global.css';
import UpdateMovie from './pages/UpdateMovie';
import Session from './pages/Session';
import UpdateSession from './pages/UpdateSession';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/cinema/:id"
          element={<UpdateCinema />}
        />

        <Route
          path="/movie/:id"
          element={<UpdateMovie />}
        />

        <Route
          path="/session/:id"
          element={<UpdateSession />}
        />

        <Route
          path="/movies"
          element={<Movie />}
        />


        <Route
          path="/sessions"
          element={<Session />}
        />


        <Route
          path="/cinemas"
          element={<Cinema />}
        />

        <Route
          path="/createMovie"
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
