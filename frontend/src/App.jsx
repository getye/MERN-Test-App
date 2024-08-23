
import { SongList } from './components/SongList';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Navbar } from './Navigations/navbar';
import { Home } from './components/home'
import { MusicForm } from './components/register';


function App() {
  return (
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/add' element={<MusicForm/>}/>
          <Route path='/view' element={<SongList/>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
