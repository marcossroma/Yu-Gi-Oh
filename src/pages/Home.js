import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Yu-Gi-Oh! Card Finder</h1>
      <p className="home-description">
        Search and browse through thousands of Yu-Gi-Oh!
      </p>
      <Link to="/cards">
        <button className="home-button">Browse Cards</button>
      </Link>
    </div>
  );
};

export default Home;
