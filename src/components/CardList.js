import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Search from './Search';

const CardList = () => {
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 50;

  useEffect(() => {
    axios.get('https://db.ygoprodeck.com/api/v7/cardinfo.php')
      .then(response => {
        setCards(response.data.data);
        setFilteredCards(response.data.data);
      })
      .catch(error => console.error('Error fetching cards:', error));
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = cards.filter(card => card.name.toLowerCase().startsWith(searchTerm.toLowerCase()));
    setFilteredCards(filtered);
    setCurrentPage(1);
  };

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const nextPage = () => {
    if (indexOfLastCard < filteredCards.length) {
      setCurrentPage(currentPage + 1);
      scrollToTop();
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      scrollToTop();
    }
  };

  return (
    <div className="card-list-container">
      <h2 className="card-list-title">Yu-Gi-Oh! Cards</h2>
      <div className="filters">
        <Search onSearch={handleSearch} />
      </div>
      <div className="card-list">
        {currentCards.map(card => (
          <div key={card.id} className="card">
            <Link to={`/card/${card.id}`}>
              <img src={card.card_images[0]?.image_url} alt={card.name} loading="lazy" className="card-image" />
              <h3 className="card-name">{card.name}</h3>
            </Link>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1} className="pagination-button">Previous</button>
        <button onClick={nextPage} disabled={indexOfLastCard >= filteredCards.length} className="pagination-button">Next</button>
      </div>
    </div>
  );
};

export default CardList;
