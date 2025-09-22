// src/pages/RestaurantList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';
import './RestaurantList.css'; 

const RestaurantList = ({ searchTerm }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // --- CORREÇÃO APLICADA AQUI ---
    // Acessa a variável de ambiente usando a sintaxe correta do Vite.
    const apiUrl = import.meta.env.VITE_API_URL;

    // Define o caminho específico (endpoint) para buscar restaurantes
    const endpoint = '/api/restaurantes/'; 

    // Faz a chamada de API para a URL correta
    axios.get(`${apiUrl}${endpoint}`)
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar restaurantes!', error);
      });
  }, []); 

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