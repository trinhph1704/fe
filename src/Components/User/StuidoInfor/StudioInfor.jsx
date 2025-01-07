import React, { useState,useCallback,useEffect } from "react";
import "./StudioInfor.css";
import { toast, ToastContainer } from 'react-toastify';
import api from '../components/utils/requestAPI';
import { CiDollar } from "react-icons/ci";
import { useParams,useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import { MdLightMode } from "react-icons/md";
import { MdCleaningServices } from "react-icons/md";
import { FaWifi } from "react-icons/fa6";
import { FaRegNewspaper } from "react-icons/fa";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
const StudioInfor = () => {
  const [selectedImage, setSelectedImage] = useState(null); 
  const [isGroupOpened, setIsGroupOpened] = useState(false); 
  const [studio, setstudio] = useState([]);
  const [stardate, setstardate] = useState(dayjs());
  const [checkin, setcheckin] = useState(dayjs());
  const [checkout, setcheckout] = useState(dayjs());
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState([]);

  const fetchStudio = useCallback(async () => {
    try {
      const response = await api.get(
        `https://cldhbe.azurewebsites.net/api/Studio/Get-Studio-By-Id?id=${id}`
      );
  
      console.log("API response:", response.data);
      const data = response.data;
  
      setstudio(data); // Lưu thông tin studio
  
      // Trích xuất danh sách ảnh
      const studioImages = [
        data.image?.imageUrl1 && { src: data.image.imageUrl1, name: "Hình 1" },
        data.image?.imageUrl2 && { src: data.image.imageUrl2, name: "Hình 2" },
        data.image?.imageUrl3 && { src: data.image.imageUrl3, name: "Hình 3" },
        data.image?.imageUrl4 && { src: data.image.imageUrl4, name: "Hình 4" },
        {src:"/ee53ddddc8801eaa90470f5c25934df9.jpg", name:"Hình 5"},
        {src:"/ee53ddddc8801eaa90470f5c25934df9.jpg", name:"Hình 6"},
        {src:"/ee53ddddc8801eaa90470f5c25934df9.jpg", name:"Hình 7"},
        {src:"/ee53ddddc8801eaa90470f5c25934df9.jpg", name:"Hình 8"},
      ].filter(Boolean); 
  
      setImages(studioImages); // Cập nhật images
    } catch (error) {
      toast.error("Error fetching studio!");
    }
  }, [id]);
  
  useEffect(() => {
    fetchStudio();
  }, [fetchStudio]);

  // const images = [
   
  //   { src: "/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 2" },
  //   { src: "/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 3" },
  //   { src: "/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 4" },
  //   { src: "/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 5" },
  //   { src: "/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 5" },
  //   { src: "/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 5" },
  //   { src: "/ee53ddddc8801eaa90470f5c25934df9.jpg", name: "Hình 5" },
  // ];
  const dancerMasters = [
    { img: "/ec46334718d4ee1a37ca49cd652a194d.jpg",name: "Alice Johnson", specialty: "Hip Hop" },
    {img: "/0f84d7257569027cfba8ab80b5f2af88.jpg", name: "Bob Smith", specialty: "Ballet" },
    { img: "/92075231ccb6efb21748b2e7f2d9cdbd.jpg",name: "Charlie Brown", specialty: "Contemporary" },
    { img: "/7ba53e7463b4afd2c728f9beb59b65ac.jpg",name: "Diana Prince", specialty: "Jazz" },
  ];
  const Reviewer = [

{ img: "/ec46334718d4ee1a37ca49cd652a194d.jpg", date:"12/10/2024", name:"Mr Vinh", cmt:"Studio tuyệt vời với những tiện nghi tuyệt vời!"    },
{ img: "/0f84d7257569027cfba8ab80b5f2af88.jpg", date:"13/10/2024", name:"Meo Meo", cmt:"Dịch vụ tuyệt vời"    },
{ img: "/92075231ccb6efb21748b2e7f2d9cdbd.jpg", date:"14/10/2024", name:"Trịnh Trần Phương Tuấn", cmt:"Quá vừa ý với trải nghiệm thật tốt"    },





  ];
  const closeModal = () => {
    setSelectedImage(null);
  };
 
  const handleDateChange = (newDate) => {
    setstardate(newDate); // Cập nhật giá trị stardate
  };
  
  const handleBooking = async (e) => { 
    e.preventDefault();
    const url = 'https://cldhbe.azurewebsites.net/Add-New-Booking';
    const data = {
      accountId:"AC3ba67",
      studioId:id,
      bookingDate:stardate,
      checkIn:checkin,
      checkOut:checkout,
      



    };
    try {
      const response = await api.post(url, data);
      console.log(response.data);
      alert('Create Booking Success!');
      navigate(`/order/${response.data.id}`);
    } catch (error) {
      console.error(error);
      
    }
  };


  return (
    <div id="StudioInfor">
    <div className="studio-page">
    
      <div className="image-gallery">
        <div className="image-main">
          <img
            src={studio.imageStudio}
            alt=""
            className="main-img"
            onClick={() => setSelectedImage(studio.imageStudio)}
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
    
      <div className="image-with-overlay">
        <img
         src={images[5]?.src} 
         
          className="gallery-img"
        />
       
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

        <h1 className="studio-name">{studio.studioName}</h1>
        <h1 className="studio-adress">{studio.studioAddress}</h1>
        <hr  width="100%" align="left" />
        <h2 className="studio-title">Giảng viên</h2>
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
        <hr  width="100%" align="left" top="10px"/>

          </div>

        </div>
       
        <div className="booking-section">
         
             
        <h3 className="price-title">
  <CiDollar className="dollar" />
  <span className="price-text">Giá</span>
</h3>
         
       
          <div className="price-details">
            <span className="price">{studio.pricing}VND/Giờ</span>
            <span className="discount">10% off</span>
          </div>
          <form className="booking-form" onSubmit={handleBooking}>
            <div>

<h3 className="dateandtime">Ngày và Giờ</h3>

            </div>
            <div className="start-Date">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer  components={['DatePicker']}>
        <DatePicker value={stardate} onChange={(e)=>setstardate(e.target.value)} label="Ngày bắt đầu" />
      </DemoContainer>
    </LocalizationProvider>
    </div>
           
<div className="timechua">  
<LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer    components={['TimePicker']}>
        <TimePicker className="starttime" value={checkin} onChange={(e)=> setcheckin(e.target.value)} label="Thời gian bắt đầu" />
      </DemoContainer>
    </LocalizationProvider>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer  components={['TimePicker']}>
        <TimePicker id="time" className="endtime" value={checkout} onChange={(e)=> setcheckout(e.target.value)} label="Thời gian kết thúc" />
      </DemoContainer>
    </LocalizationProvider>

            {/* <input type="time" id="time" className="starttime" value={checkin} onChange={(e)=> setcheckin(e.target.value)} />
            <input type="time" id="time" className="endtime" value={checkout} onChange={(e)=> setcheckout(e.target.value)} /> */}
  </div>
           <div className="btn-booking">
             <button type="submit" className="booking-button" >
             Đặt Ngay
            </button>
           </div>
           
          </form>
        </div>
      
      </div>

      {/* Danh sách tiện ích */}
      <div className="amenities-section">
  <h2 className="amen-title">Tiện nghi được cung cấp</h2>
  <ul className="amenities-list">
    <li className="type-amen">
      <MdLightMode />
      <span className="phukien">Ánh sáng</span>
    </li>
    <li className="type-amen">
    <MdCleaningServices />
      <span className="phukien">Không gian</span>
    </li>
    <li className="type-amen">
    <FaWifi />
      <span className="phukien">Wifi</span>
    </li>
    <li className="type-amen">
    <FaRegNewspaper />
      <span className="phukien">Quy định</span>
    </li>
  </ul>
</div>
      <hr  width="60%" align="left" top="10px"/>

     <div className="review-chua">
      <div className="review-vui">
       
        <h2 className="review-title">Đánh giá</h2>
        <h2 className="rate-review">(3)</h2>
     
      </div>
     
      <div className="reviews-section">
      {Reviewer.map((review,index)=>(
            
         
        <div className="review">
          <div>
             <img src={review.img} alt="" className="hinh-reviewer" />
            
          </div>
        <div>
        <strong>{review.name}</strong>
        <p>{review.cmt}</p>
        <p className="reviewdate">
                  ({review.date})
                </p>
        </div>
       
        {index < review.length - 1 && <hr className="review-divider" width="60%" />}
        </div>
        
        
       
     
         ))}
        
      
      
      </div></div>
    </div>
    </div>
  );
};

export default StudioInfor;
    