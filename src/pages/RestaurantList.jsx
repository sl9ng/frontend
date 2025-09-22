// src/pages/RestaurantList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';
import './RestaurantList.css'; 

const RestaurantList = ({ searchTerm }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get('postgresql://uaieats_db_user:44Ar1iwBb1VPM92OiIMVj69hdqRx1OQj@dpg-d38j7v3uibrs739sfijg-a/uaieats_db')
      .then(response => setRestaurants(response.data))
      .catch(error => console.error('Erro ao buscar restaurantes!', error));
  }, []);

  // Filtra os restaurantes de acordo com o termo digitado
  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="main-content">
      <h1 className="page-title">Restaurantes</h1>
      <div className="restaurant-list-container">
        {filteredRestaurants.length > 0 ? (
          filteredRestaurants.map(restaurant => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))
        ) : (
          <p>Nenhum restaurante encontrado.</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantList;
