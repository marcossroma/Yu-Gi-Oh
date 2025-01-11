import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const CardDetails = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`)
      .then((response) => {
        setCard(response.data.data[0]);
      })
      .catch((error) => console.error('Error fetching card details:', error));
  }, [id]);

  if (!card) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="card-details-container">
      <button className="back-button" onClick={() => navigate('/cards')}>
        Back to Cards
      </button>
      <h2 className="card-details-title">{card.name}</h2>
      <img
        className="card-details-image"
        src={card.card_images[0].image_url}
        alt={card.name}
      />
      <div className="card-details-info">
        <p className="card-details-description">
          <strong>Description:</strong> {card.desc}
        </p>
        <div className="card-details-stats">
          {card.type && <p><strong>Type:</strong> {card.type}</p>}
          {card.race && <p><strong>Race:</strong> {card.race}</p>}
          {card.attribute && <p><strong>Attribute:</strong> {card.attribute}</p>}
          {card.atk && <p><strong>Attack:</strong> {card.atk}</p>}
          {card.def && <p><strong>Defense:</strong> {card.def}</p>}
          {card.level && <p><strong>Level:</strong> {card.level}</p>}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
