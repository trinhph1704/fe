import React, { useState, useEffect, useCallback } from 'react';
import api from '../../utils/requestAPI';
import "./HomeTro.css";
import { useNavigate } from 'react-router-dom';

const HomeTro = () => {
  const [Studio, Setstudio] = useState([]);
  const navigate = useNavigate();
  useEffect (() => {
    const fetchStudio = async () => {
      const url = "https://localhost:7199/api/Studio/Get-All_Studio";
      try {
        const response = await api.get(url);
        console.log('API response:', response.data);
        const extractedStudio = Array.isArray(response.data) ? response.data : [];
        Setstudio(extractedStudio);
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

   
    fetchStudio();
  }, []);
  const handleCardClick = (id) => {
    navigate(`/StudioInfor/${id}`);
  };
  const studios = [
    {
      id: "stu1",
      image: "public/0f867cb427035cc0008c7757df861157.jpg",
      price: "From 100$/hr",
      title: "Flow Dance",
      address: "123 Main St, Cityville",
      rating: 5.0,
      reviews: 14,
      visitors: 60,
      description: "This lovely dance studio in Dorchester near Neponset Circle is the ideal space for your...",
    },
    {
      id: 2,
      image: "public/ee53ddddc8801eaa90470f5c25934df9.jpg",
      price: "From 150$/hr",
      title: "Harmony Studio",
      address: "456 Park Ave, Townsville",
      rating: 4.8,
      reviews: 20,
      visitors: 75,
      description: "Experience a serene and beautiful studio environment perfect for yoga, dance, or events...",
    },
    {
      id: 3,
      image: "public/0f867cb427035cc0008c7757df861157.jpg",
      price: "From 120$/hr",
      title: "Rhythm Hub",
      address: "789 Broadway, Metropolis",
      rating: 4.9,
      reviews: 18,
      visitors: 90,
      description: "A modern dance studio equipped with top-of-the-line sound systems and spacious flooring...",
    },
  ];
  
  return (
    <div id="HomeTro">
    <div className="homepage-body">
   
          
      <section className="search-section">
      <div className="header-lo">
    <div className="logo-container-lo">
      <img src="public\36650c664e257c37760d0f7a27fe0a8d.jpg" alt="Logo" className="logo-lo" />
    </div>
    <div className="auth-buttons">
      <button className="login-button">Login</button>
      <button className="signup-button">Sign up</button>
    </div>
  </div>
    
        <div className="overlay">
        
          <h1 className="title-hometro">Find a studio Fulfill your vision.</h1>
          <div className="search-bar">
          <div className="image-pop-chua">
             <img className="image-pop" src="public\14474ca10da85ca04d84ae65c1496147-removebg-preview.png"  />
            
            </div>  
            <input className="search-looking" type="text" placeholder="What are you looking for?" />
            <input className="search-where" type="text" placeholder="Where?" />
            <input className="search-When" type="text" placeholder="When?" />
            <button>Search</button>
          </div>
        </div>
      </section>
      <div className="pop-title-contian">    
         <h2 className="popular-title">Popular Studios</h2> </div>
     
      <section className="popular-studios">
        
      <div className="studio-list">
      {studios.map((studio) => (
        <div className="card" key={studio.id}
        onClick={() => handleCardClick(studio.id)}>
          <div className="card-image">
            <img src={studio.image} alt={studio.title} />
            <div className="card-price">{studio.price}</div>
          </div>
          <div className="card-content">
            <h3 className="card-title">{studio.title}</h3>
            <p className="card-address">{studio.address}</p>
            <div className="card-rating">
              <span className="rating-stars">⭐ {studio.rating} ({studio.reviews})</span>
              <span className="rating-reviews">👤 {studio.visitors}</span>
            </div>
            <p className="card-description">
              {studio.description}
              <a href="#"> Show more</a>
            </p>
          </div>
        </div>
      ))}
    </div>
      </section>

      <div className="pop-title-contian">    
      <h2 className="popular-title">Dance Class</h2> </div>
      <section className="dance-class">
        
      <div className="studio-list">
      {studios.map((studio) => (
        <div className="card" key={studio.id}>
          <div className="card-image">
            <img src={studio.image} alt={studio.title} />
            <div className="card-price">{studio.price}</div>
          </div>
          <div className="card-content">
            <h3 className="card-title">{studio.title}</h3>
            <p className="card-address">{studio.address}</p>
            <div className="card-rating">
              <span className="rating-stars">⭐ {studio.rating} ({studio.reviews})</span>
              <span className="rating-reviews">👤 {studio.visitors}</span>
            </div>
            <p className="card-description">
              {studio.description}
              <a href="#"> Show more</a>
            </p>
          </div>
        </div>
      ))}
    </div>
      </section>
    </div>
    </div>
  );
};

// Reusable StudioCard Component
const StudioCard = ({ imageUrl, title, location, price }) => {
  return (
    <div className="studio-card">
       <div className="studio-card">
  
    <img src={imageUrl} alt={title} />
    <div className="studio-chua">
      <h3 className="studio-title">{title}</h3>
      <p className="studio-location">{location}</p>
      <p className="studio-price">{price}</p>
    </div>
  </div>
</div>
  
  );
};

export default HomeTro;
