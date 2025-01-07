import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../components/utils/requestAPI"; 
import "./SearchPage.css";

const SearchPage = () => {
  const [location, setLocation] = useState(""); // State lưu giá trị location
  const [studios, setStudios] = useState([]); // State lưu danh sách studio
  const navigate = useNavigate();
  const locationQuery = new URLSearchParams(useLocation().search).get("location"); // Lấy giá trị query `location`

  
  const fetchStudio = useCallback(async () => {
    if (location) {
      try {
        const response = await api.get(
          `https://cldhbe.azurewebsites.net/api/Studio/Get-All-Studio-By-Address?address=${encodeURIComponent(
            location
          )}`
        );
        console.log("API response:", response.data);
        
        setStudios(response.data?.$values || []);
      } catch (error) {
        console.error("Error fetching studio:", error);
        toast.error("Không thể lấy danh sách studio!"); 
      }
    }
  }, [location]);

  
  useEffect(() => {
    if (locationQuery) {
      setLocation(locationQuery);
    }
  }, [locationQuery]);

  
  useEffect(() => {
    fetchStudio();
  }, [fetchStudio]);
  const handleCardClick = (id) => {
    navigate(`/studio/${id}`);
  };

  return (
    <div className="search-page">
      <h1 className="ketqua-search">Kết quả tìm kiếm</h1>
      <div className="studio-listt" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
        {studios.length === 0 ? (
          <p>Không tìm thấy studio nào phù hợp!</p>
        ) : (
          studios.map((studio) => (
            <div key={studio.id} className="studio-cardd"  onClick={() => handleCardClick(studio.id)} >
              <div className="studio-image4">
                <img src={studio.imageStudio} alt={studio.studioName} className="image-search" />
              </div>
              <div className="studio-info4">
                <div className="chua-studio-name4">
<span className="studio-name4">{studio.studioName}</span>
                </div>
                
                <div className="chua-studio-address4">
                    <span className="studio-address4">{studio.studioAddress}</span>
                </div>
                
                <div className="studio-details4">
                  <span>⭐ {studio.ratingId} ({studio.reviews || 0} reviews)</span>
                  <span>👤 {studio.maxGuests || "N/A"} guests</span>
                </div>
                <p className="studio-description4">
                  {studio.studioDescription ? studio.studioDescription.join(", ") : "No features available"}
                </p>
                <p className="studio-price4">From {studio.pricing || "N/A"} /hr</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchPage;
