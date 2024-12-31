import React, { useState,useEffect } from 'react';
// import { StudioHeader } from './StudioHeader';
import './Course.css';
import api from '../../utils/requestAPI';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';


const galleryImages = [
  { id: 1, src: "https://img.lovepik.com/photo/40173/1392.jpg_wh860.jpg", alt: "Studio view 1" },
  { id: 2, src: "https://dkstudio.vn/wp-content/uploads/2023/03/Hinh-anh-phong-tap-DK-Dance-Studio-Quan-7-TPHCM-5.jpg", alt: "Studio view 2" },
  { id: 3, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3i2Ylb2oFnMqxcp0MTQSMICMe-4MaYx9UtA&s", alt: "Studio view 3" },
  { id: 4, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFlzQ_S9_5KL2qQxspsPEKp-EO6Gj_u-4uWFwpKPr0-Ou3VP6UJYRayFzfnFFBe-OdupY&usqp=CAU", alt: "Studio view 4" }
];

const reviews = [
  {
    id: 1,
    avatar: "/public/duc.jpg",
    name: "Mr Trịnh",
    date: "Mar 12 2020",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 2,
    avatar: "/public/duc.jpg",
    name: "J97",
    date: "Mar 12 2020",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 3,
    avatar: "/public/duc.jpg",
    name: "Trịnh Trần Phương Tuấn",
    date: "Mar 12 2020",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }
];

export const Course = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [user, setUser] = useState(null);
  const [studio, setStudios] = useState([]);
  const [Class, setClass] = useState([]);
  const [ClassId, setClassId] = useState('');
  const [classBooking, setclassBooking] = useState([]);
  const [orderId, setOrderId] = useState('');
  const navigate = useNavigate();
  const { auth } = useAuth();

  const handleImageSelect = (index) => {
    setSelectedImage(index);
  };

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleImageSelect(index);
    }
  };

  // const handleBooking = () => {
  //   if (!selectedDate || !selectedTime) {
  //     alert('Please select both date and time');
  //     return;
  //   }
  // };
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Tháng được đánh số từ 0-11, nên cần +1
    const day = String(today.getDate()).padStart(2, '0'); // Đảm bảo có đủ 2 chữ số
    return `${year}-${month}-${day}`;
};

  useEffect(() => {
    async function fetchUserData() {
        try {
            // Kiểm tra `auth` và `auth.user` trước khi tiếp tục
            if (auth && auth.user) {
                const userid = auth.user.id;
                console.log(auth.user);

                // Đảm bảo `userid` có giá trị trước khi gọi API
                if (!userid) {
                    console.error("User ID is undefined!");
                    return;
                }

                const url = `https://localhost:7199/api/Account/get-by-id?accountId=${userid}`;
                const response = await api.get(url);
                if (response.status === 200 && response.data) {
                  setUser(response.data);
              }else{
                console.log("Setuser have something wrong")
              }
                const responseStudio = await api.get("https://localhost:7199/api/Studio/Get-All_Studio");
          const allStuido = responseStudio.data.$values;
          const userStudios = allStuido.filter(order => order.accountId === auth.user.id);
          setStudios(userStudios);
          if (userStudios.length > 0) {
            const studioId1 = userStudios[0].id;
            const responseClass = await api.get("https://localhost:7199/Get-All-ClassDance");
            const allClass = responseClass.data.$values || [];
            const userClass = allClass.filter(order => order.studioId === studioId1);
            setClass(userClass);

            if (userClass.length > 0) {
                const classId = userClass[0].id;
                const responseClassId = await api.get(`https://localhost:7199/Get-ClassDance-By-Id?classId=${classId}`);
                if (responseClassId.status === 200 && responseClassId.data) {
                    setClassId(responseClassId.data);
                }
            }
            // console.log("Fetched User ID:", userid);
            //     console.log("Fetched User Data:", response.data);
            //     console.log("Fetched User Studio:", studio[0].id);
            //     console.log("Fetched User Studio:", allStuido);
            //     console.log("Fetched User Class:", Class[0].id);
            //     console.log("Fetched User Class:", allClass);
            //     console.log("âsasasas:",  ClassId[0].id);
        }
    } else {
        console.warn("auth or auth.user is undefined");
    }
        } catch (error) {
            console.error("Error fetching user data:", error);
            // console.log("Fetched User Class:", Class[0].id);
        }
    }

    // Chỉ gọi fetchUserData khi `auth` có giá trị
    if (auth) {
        fetchUserData();
    }
}, [auth]);

const handlePayment = async () => {
  try {
    // Thông tin truyền vào POST
    const data_userArtwok = {
      accountId: auth.user.id,
      classDanceId: ClassId.id,
      bookingDate: getTodayDate(),
      checkIn: "String",
      checkOut: "String",
      totalPrice: "500",
    };

    // Tạo Booking mới
    const createClassPayment = await api.post(
      `https://localhost:7199/Add-New-Booking-ClassDance`,
      data_userArtwok
    );

    if (createClassPayment.status === 200 && createClassPayment.data && createClassPayment.data.id) {
      const cBookingId = createClassPayment.data.id;
      console.log("cBooking created successfully, ID:", cBookingId);
      setclassBooking({ id: cBookingId }); // Đảm bảo lưu dưới dạng object với `id`
    } else {
      console.error("cBooking creation failed or response is missing 'id'.", createClassPayment);
    }
  } catch (error) {
    console.error("Error creating booking:", error);
  }
};

useEffect(() => {
  // Theo dõi sự thay đổi của `classBooking`
  const createOrderAndPayment = async () => {
    if (classBooking && classBooking.id) {
      try {
        // Tạo Order mới
        const createOrder = await api.post(
          `https://localhost:7199/Create-New-Order?BookingId=${classBooking.id}`
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
}, [classBooking]);

useEffect(() => {
  // Theo dõi sự thay đổi của `orderId`
  const createPaymentLink = async () => {
    if (orderId && orderId.id) {
      try {
        // Tạo đường dẫn PayOS
        const responsePayOs = await api.post(
          `https://localhost:7199/create-payment-link/${orderId.id}/checkout`
        );

        if (responsePayOs.status === 200 && responsePayOs.data && responsePayOs.data.checkoutUrl) {
          const checkoutUrl = responsePayOs.data.checkoutUrl;
          console.log("Checkout URL:", checkoutUrl);
          window.open(checkoutUrl, "_blank"); // Mở trong tab mới
        } else {
          console.error(
            "Payment link creation failed or response is missing 'checkoutUrl'.",
            responsePayOs
          );
        }
      } catch (error) {
        console.error("Error creating payment link:", error);
      }
    }
  };

  createPaymentLink();
}, [orderId]);


  return (
    <div id="Course">
    <div className="pageContainer">
      {/* <StudioHeader /> */}
      
      <div className="mainContent">
        <section className="galleryContainer" aria-label="Studio gallery">
          <div className="mainImageContainer">
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="mainImage"
              loading="lazy"
            />
            {/* <div className="priceOverlay">
              <span className="price">From 100$/hr</span>
            </div> */}
            <div className="hostInfo">
              <img
                src="\public\duc.jpg"
                alt="Host Valentino Jr"
                className="hostAvatar"
                loading="lazy"
                width={76}
                height={76}
              />
              <div className="hostDetails">
                <span className="listedBy">Listed By:</span>
                <h2 className="hostName">{user?.userName}</h2>
                <span className="priceRange">For: $ 1000 - $ 5000</span>
              </div>
            </div>
          </div>

          <div className="thumbnailGrid" role="list">
            {galleryImages.map((image, index) => (
              <div 
                key={image.id}
                className={`thumbnail ${selectedImage === index ? 'selected' : ''}`}
                role="listitem"
                tabIndex={0}
                onClick={() => handleImageSelect(index)}
                onKeyDown={(e) => handleKeyPress(e, index)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className="thumbnailImage"
                />
                {index === 3 && (
                  <div className="moreOverlay">
                    <span className="moreCount">+2</span>
                    <div className="moreText">
                      <span>More</span>
                      <span>Photos</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        
        <div className="contentGrid">
          <div className="leftColumn">
            <section className="classInfo">
            <div className="titleHeader">
            <div className="titleContainer">
              <h1 className="className">{ClassId.className}</h1>
              <p className="teacherName">Teacher name</p>
              </div>
              <div className="actionButtons">
  <button className="actionIcon" tabIndex="0">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/11ec6460177dcabcb2bed7c443e2c9330b46ad24af935eb07fe2d8c5f552402b?placeholderIfAbsent=true&apiKey=c05fb6b607a34c3cab6bc37bd3664ed7"
      alt="Action button"
      className="actionIcon"
    />
    <span className="visually-hidden">Perform action</span>
  </button>
  <button className="shareIcon" tabIndex="0">
    <img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/07371e2ba2b94190780c47c86259b57d63466e5fc5d5c16bf302e31d95ffac3f?placeholderIfAbsent=true&apiKey=c05fb6b607a34c3cab6bc37bd3664ed7"
      alt="Share button"
      className="shareIcon"
    />
    <span className="visually-hidden">Share</span>
  </button>
</div>
</div>
  
              <h2 className="sectionTitle">Course Description</h2>
              <p className="description">
                {ClassId.description}
              </p>
            </section>

            <section className="reviewsSection" aria-labelledby="reviewsTitle">
              <div className="reviewsHeader">
                <h2 id="reviewsTitle" className="reviewsTitle">Reviews</h2>
                <div className="rating">
                  <img
                    src="\public\star.png"
                    alt=""
                    className="starIcon"
                    width={50}
                    height={50}
                    aria-hidden="true"
                  />
                  <span className="ratingScore" aria-label="Rating 5.0 out of 5">5.0</span>
                </div>
              </div>

              <div className="reviewsList">
                {reviews.map((review) => (
                  <article key={review.id} className="reviewCard">
                    <div className="reviewerInfo">
                      <img
                        src={review.avatar}
                        alt={`${review.name}'s profile`}
                        className="reviewerAvatar"
                        width={70}
                        height={70}
                        loading="lazy"
                      />
                      <div className="reviewerDetails">
                        <h3 className="reviewerName">{review.name}</h3>
                        <time className="reviewDate" dateTime="2020-03-12">
                          {review.date}
                        </time>
                      </div>
                    </div>
                    <p className="reviewText">{review.text}</p>
                  </article>
                ))}
              </div>

              <button 
                className="showAllButton"
                aria-label="Show all 100 reviews"
              >
                Show All 100 Reviews
              </button>
            </section>
          </div>

          <div className="rightColumnCover">
          <div className="priceContainer">
      <div className="priceHeader">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b924c4810595165877c0ee0cb66d62f8fcf049b8e44824705f472789c1e5d0ea?placeholderIfAbsent=true&apiKey=c05fb6b607a34c3cab6bc37bd3664ed7"
          className="priceIcon"
          alt="Price icon"
        />
        <div>Price</div>
      </div>
      
      <div className="feeContainer">
        <div className="courseFee">Course Fee</div>
        {/* <div className="priceTag">$500</div> */}
        <div className="priceTag">${ClassId.pricing}</div>
      </div>
      
      <div className="detailsContainer">
        <div className="leftColumn">
          <div>{ClassId.timeStart}A-{ClassId.timeEnd}A</div>
          <div className="skillLevel">skill level</div>
          <div className="classDay">class day</div>
          <div className="danceStyle">Style</div>
        </div>
        <div className="rightColumn">
          <div className="rightInner">
            <div className="startDate">{ClassId.dateStart}</div>
            <div className="basic">Basic</div>
          </div>
          <div className="schedule">Monday-Friday</div>
          <div className="hiphop">Hiphop</div>
        </div>
      </div>
      
      <button 
        className="bookingButton"
        onClick={handlePayment} 
        tabIndex={0}
        aria-label="Book this dance class"
      
      >
        BUYING
      </button>
    </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
