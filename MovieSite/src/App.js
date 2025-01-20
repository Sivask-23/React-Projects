import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import MainLayout from './Components/MainLayout';
import MainPage from './Components/MainPage';
import AllMovies from './Components/Movies/AllMovies';
import AllSeries from './Components/TvShows/AllSeries';
import SingleMovie from './Components/Movies/SingleMovie';
import SingleSeries from './Components/TvShows/SingleSeries';
import AllSeasons from './Components/TvShows/AllSeasons';
import AllEpisodes from './Components/TvShows/AllEpisodes';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'element={<MainLayout/>}>
          <Route index element={<MainPage/>}/>
          <Route path='movies/:Movietype' element={<AllMovies/>}/>
          <Route path='tvshows/:tvtype' element={<AllSeries/>}/>
          <Route path='movie/:movid' element={<SingleMovie/>}/>
          <Route path='tvshow/:tvid' element={<SingleSeries/>}/>
          <Route path='tvshow/:tvid/allseasons' element={<AllSeasons/>}/>
          <Route path='tvshow/:tvid/season/:snum' element={<AllEpisodes />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
