import React, { useState , useEffect} from "react";
import "./StudioInfor.css";
import { CiDollar } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import api from '../../utils/requestAPI';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
const StudioInfor = () => {
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isGroupOpened, setIsGroupOpened] = useState(false); 
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [booking, setBooking] = useState('');
    const [orderId, setOrderId] = useState('');
  const [endTime, setEndTime] = useState('');
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { id } = useParams();

  const images = [
    { src: "/public/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 1" },
    { src: "/public/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 2" },
    { src: "/public/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 3" },
    { src: "/public/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 4" },
    { src: "/public/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 5" },
    { src: "/public/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 5" },
    { src: "/public/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 5" },
    { src: "/public/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 5" },
  ];
  const dancerMasters = [
    { img: "/public/ec46334718d4ee1a37ca49cd652a194d.jpg",name: "Alice Johnson", specialty: "Hip Hop" },
    {img: "/public/0f84d7257569027cfba8ab80b5f2af88.jpg", name: "Bob Smith", specialty: "Ballet" },
    { img: "/public/92075231ccb6efb21748b2e7f2d9cdbd.jpg",name: "Charlie Brown", specialty: "Contemporary" },
    { img: "/public/7ba53e7463b4afd2c728f9beb59b65ac.jpg",name: "Diana Prince", specialty: "Jazz" },
  ];
  const Reviewer = [

{ img: "/public/ec46334718d4ee1a37ca49cd652a194d.jpg", date:"12/10/2024", name:"Mr Vinh", cmt:"Great studio with amazing amenities!"    },
{ img: "/public/0f84d7257569027cfba8ab80b5f2af88.jpg", date:"13/10/2024", name:"Meo Meo", cmt:"Excellent location and service."    },
{ img: "/public/92075231ccb6efb21748b2e7f2d9cdbd.jpg", date:"14/10/2024", name:"Trịnh Trần Phương Tuấn", cmt:"Wonderful experience. Highly recommend!"    },





  ];
  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!date || !startTime || !endTime) {
      alert('Please fill in all the fields');
      return;
    }
  
    const bookingData = {
      accountId: auth.user.id,
      studioId: id,
      bookingDate: date,
      checkIn: startTime,
      checkOut: endTime,
      totalPrice: "500",
    };
  
    try {
      // Tạo Booking mới
      const createClassPayment = await api.post(
        `https://localhost:7199/Add-New-Booking`,
        bookingData
      );
  
      if (createClassPayment.status === 200 && createClassPayment.data && createClassPayment.data.id) {
        const BookingId = createClassPayment.data.id;
        console.log("Booking created successfully, ID:", BookingId);
        setBooking({ id: BookingId }); // Đảm bảo lưu dưới dạng object với `id`
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      console.log(bookingData )
    }
    
  };
  useEffect(() => {
    // Theo dõi sự thay đổi của `classBooking`
    const createOrderAndPayment = async () => {
      if (booking && booking.id) {
        try {
          // Tạo Order mới
          const createOrder = await api.post(
            `https://localhost:7199/Create-New-Order?BookingId=${booking.id}`
          );
  
          if (createOrder.status === 200 && createOrder.data && createOrder.data.id) {
            const orderId = createOrder.data.id;
            console.log("Order created successfully, ID:", orderId);
            setOrderId({ id: orderId }); // Đảm bảo lưu dưới dạng object với `id`
          } else {
            console.error("Order creation failed or response is missing 'id'.", createOrder);
          }
        } catch (error) {
          console.error("Error creating order:", error);
        }
      }
    };
  
    createOrderAndPayment();
  }, [booking]);

  useEffect(() => {
    if (orderId) {
      navigate(`/order/${orderId}`); // Điều hướng khi `orderId` đã có
    }
  }, [orderId, navigate]);
  
  return (
    <div id="StudioInfor">
    <div className="studio-page">
    
      <div className="image-gallery">
        <div className="image-main">
          <img
            src={images[0].src}
            alt={images[0].name}
            className="main-img"
            onClick={() => setSelectedImage(images[0].src)}
          />
         
        </div>

  
        <div className="image-thumbnails">
          {images.slice(1, -2).map((img, index) => (
            <div key={index} className="image-item">
              <img
                src={img.src}
                alt={img.name}
                className="gallery-img"
                onClick={() => setSelectedImage(img.src)}
              />
              
            </div>
          ))}

      
<div className="grouped-images" onClick={() => setIsGroupOpened(!isGroupOpened)}>
  {!isGroupOpened ? (
    <div className="grouped-images-placeholder">
      {/* Hiển thị hình số 5 */}
      <div className="image-with-overlay">
        <img
          src={images[6].src} // Hình số 5 (index 4)
          alt={images[6].name}
          className="gallery-img"
        />
        {/* Chữ +2 more nằm trên hình */}
        <div className="overlay-text">
          +{images.length - 6} more
        </div>
      </div>
    </div>
  ) : (
    <div className="grouped-images-expanded">
      {images.slice(-2).map((img, index) => (
        <div key={index} className="image-item">
          <img
            src={img.src}
            alt={img.name}
            className="gallery-img"
            onClick={() => setSelectedImage(img.src)}
          />
        </div>
      ))}
    </div>
  )}
</div>

        </div>
      </div>

     
      {selectedImage && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            <img src={selectedImage} alt="Selected" className="modal-image" />
          </div>
        </div>
      )}

     
      <div className="studio-info">
        <div className="info-title">

        <h1 className="studio-name">F-Stop Photography Studio Rentals
        Photography/Video Rental Space For Professional Centrally Located In Tampa</h1>
        <h1 className="studio-adress">Readville,
        Boston, MA</h1>

        <h2 className="studio-title">Dancing Master</h2>
          <div className="dance-master-chua">

          <ul className="dancer-masters-list">
          {dancerMasters.map((dancer, index) => (
            <li key={index} className="dancer-master-item">
              <img src={dancer.img} alt="" className="hinh-dancer" />
              <p className="info-dancer">
                <strong>{dancer.name}</strong> - {dancer.specialty}
              </p>
            </li>
          ))}
        </ul>

          </div>

        </div>
       
        <div className="booking-section">
         
             
        <h3 className="price-title">
  <CiDollar className="dollar" />
  <span className="price-text">Price</span>
</h3>
         
       
          <div className="price-details">
            <span className="price">$50/hour</span>
            <span className="discount">10% off</span>
          </div>
          <form className="booking-form" onSubmit={handleSubmit}>
      <div>
        <h3 className="dateandtime">Date and Time</h3>
      </div>
      <div className="start-Date">
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="timechua">
        <input
          type="time"
          id="start-time"
          className="starttime"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="time"
          id="end-time"
          className="endtime"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <div className="btn-booking">
        <button type="submit" className="booking-button">
          Book Now
        </button>
      </div>
    </form>
        </div>
      
      </div>

      {/* Danh sách tiện ích */}
      <div className="amenities-section">
        <h2 className="amen-title">Offered Amenities</h2>
        <ul className="amenities-list">
          <li className="type-amen">Type 01</li>
          <li className="type-amen">Type 02</li>
          <li className="type-amen">Type 03</li>
          <li className="type-amen">Type 04</li>
        </ul>
      </div>

     <div className="review-chua">
      <div className="review-vui">
       
        <h2 className="review-title">Reviews</h2>
        <h2 className="rate-review">5</h2>
     <FaStar className="star-review" />
      </div>
     
      <div className="reviews-section">
      {Reviewer.map((review,index)=>(
            
         
        <div className="review">
         <img src={review.img} alt="" className="hinh-reviewer" />
          <p>
            <strong>{review.name}</strong> ({review.date})
          </p>
          <p>{review.cmt}</p>
        </div>
         ))}
      
        
      </div></div>
    </div>
    </div>
  );
};

export default StudioInfor;
