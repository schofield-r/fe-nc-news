import React from 'react';
import './App.css';
import Header from './components/Header'
import NavBar from './components/NavBar'
import {Router} from '@reach/router'
import Articles from './components/Articles'
import Homepage from './components/Homepage'
import SingleArticle from './components/SingleArticle'
import ErrorMessages from './components/ErrorMessages';


function App() {
  return (
    <main className="App">
      <Header/>
      <NavBar/>
      <Router>
        <Homepage path='/'/>
        <Articles path='/articles/topics/:topic'/>
        <Articles path='/articles'/>
        <SingleArticle path='/articles/:article_id'/>
        <ErrorMessages default path='/' err={{msg:'somethings wrong...',status:500}}/>
      </Router>
    </main>
  );
}

export default App;
