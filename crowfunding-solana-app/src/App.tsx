import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from './assets/css/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Explore from './pages/Explore';
import Project from './pages/Project';
import Landing from './pages/Landing';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header/>
        <main>
          <Routes>
            <Route path="/" element={< Landing />} />
            <Route path="/explore" element={< Explore />} />
            <Route path="/sponsoring" element={< Explore />} />
            <Route path="/:id" element={< Project />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
