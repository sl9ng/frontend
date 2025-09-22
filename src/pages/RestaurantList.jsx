// src/pages/RestaurantList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RestaurantCard from '../components/RestaurantCard';
import './RestaurantList.css'; 

const RestaurantList = ({ searchTerm }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // 1. Pega a URL base do backend da variável de ambiente que configuramos no Render
    const apiUrl = process.env.REACT_APP_API_URL;

    // 2. Define o caminho específico (endpoint) para buscar restaurantes
    //    (Verifique se este é o caminho correto no seu arquivo urls.py do Django)
    const endpoint = '/api/restaurantes/'; 

    // 3. Faz a chamada de API para a URL correta (ex: https://seu-backend.onrender.com/api/restaurantes/)
    axios.get(`${apiUrl}${endpoint}`)
      .then(response => {
        setRestaurants(response.data);
      })
      .catch(error => {
        // Esta mensagem aparecerá no console do navegador se algo der errado
        console.error('Erro ao buscar restaurantes!', error);
      });
  }, []); // O array vazio [] garante que esta lógica roda apenas uma vez, quando o componente é montado.

  // Filtra os restaurantes de acordo com o termo digitado na busca
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