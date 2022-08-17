import React from 'react';
import {Routes, Route} from 'react-router-dom'

import './App.css';
import HomePage from "./pages/HomePage";
import FavouritesPage from "./pages/FavouritesPage";
import Navigation from "./components/Navigation";
import Page404 from "./pages/Page404";



const App: React.FC = () => {
  return (
      <>
          <Navigation />
          <Routes>
              <Route path='/' element={ <HomePage /> }/>
              <Route path='/favourites' element={ <FavouritesPage /> }/>
              <Route path='*' element={ <Page404 /> }/>
          </Routes>
      </>

  );
}

export default App;
