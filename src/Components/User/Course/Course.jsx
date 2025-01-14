import React, { useState,useEffect } from 'react';
// import { StudioHeader } from './StudioHeader';
import './Course.css';
import api from '../../utils/requestAPI';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const galleryImages = [
  { id: 1, src: "https://img.lovepik.com/photo/40173/1392.jpg_wh860.jpg", alt: "Studio view 1" },
  { id: 2, src: "https://dkstudio.vn/wp-content/uploads/2023/03/Hinh-anh-phong-tap-DK-Dance-Studio-Quan-7-TPHCM-5.jpg", alt: "Studio view 2" },
  { id: 3, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3i2Ylb2oFnMqxcp0MTQSMICMe-4MaYx9UtA&s", alt: "Studio view 3" },
  { id: 4, src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFlzQ_S9_5KL2qQxspsPEKp-EO6Gj_u-4uWFwpKPr0-Ou3VP6UJYRayFzfnFFBe-OdupY&usqp=CAU", alt: "Studio view 4" }
];

const reviews = [
  {
    id: 1,
    avatar: "https://www.elle.vn/app/uploads/2022/08/15/491817/co-gai-moc-mac-trong-hinh-nen-dien-thoai-scaled.jpg",
    name: "Mr Trịnh",
    date: "Mar 12 2020",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 2,
    avatar: "https://www.elle.vn/app/uploads/2022/08/15/491817/co-gai-moc-mac-trong-hinh-nen-dien-thoai-scaled.jpg",
    name: "J97",
    date: "Mar 12 2020",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  {
    id: 3,
    avatar: "https://www.elle.vn/app/uploads/2022/08/15/491817/co-gai-moc-mac-trong-hinh-nen-dien-thoai-scaled.jpg",
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
  const [role, setRole] = useState([]);
  const navigate = useNavigate();
  const { auth } = useAuth();
    const { studioId } = useParams();

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
  async function fetchData() {
    try {
      // Gọi API đồng thời để lấy dữ liệu
      const [accounts, classes, studios] = await fetchAllData();

      // Lọc dữ liệu
      const roleAccounts = filterAccountsByRole(accounts, "3");
      const classAccounts = filterAccountsByClass(roleAccounts, classes);
      const studiosOfUser = filterStudiosByClasses(classAccounts, studios);

      if (studiosOfUser.length > 0) {
        const firstStudio = studiosOfUser[0];
        const userClasses = filterClassesByStudio(firstStudio.id, classes);

        if (userClasses.length > 0) {
          const firstClass = userClasses[0];
          const classDetails = await fetchClassDetails(firstClass.id);
          const studioDetails = await fetchStudioDetails(classDetails.studioId);
          const userDetails = await fetchAccountDetails(studioDetails.accountId);

          // Lưu kết quả vào state
          setRole(classAccounts);
          setStudios(studiosOfUser);
          setClass(userClasses);
          setClassId(classDetails);
          setUser(userDetails);
        }
      }
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu:", error);
    }
  }

  fetchData();

  // Tách logic thành các hàm con
  async function fetchAllData() {
    const [responseAccount, responseClass, responseStudio] = await Promise.all([
      api.get("/api/Account/Get-All"),
      api.get("/Get-All-ClassDance"),
      api.get("/api/Studio/Get-All_Studio"),
    ]);
    return [
      responseAccount.data.$values || [],
      responseClass.data.$values || [],
      responseStudio.data.$values || [],
    ];
  }

  function filterAccountsByRole(accounts, roleId) {
    return accounts.filter((account) => account.roleId === roleId);
  }

  function filterAccountsByClass(accounts, classes) {
    return classes.filter((classDance) =>
      accounts.some((account) => account.id === classDance.accountId)
    );
  }

  function filterStudiosByClasses(classes, studios) {
    return studios.filter((studio) =>
      classes.some((classDance) => classDance.studioId === studio.id)
    );
  }

  function filterClassesByStudio(studioId, classes) {
    return classes.filter((classDance) => classDance.studioId === studioId);
  }

  async function fetchClassDetails(classId) {
    const response = await api.get(`/Get-ClassDance-By-Id?classId=${classId}`);
    if (response.status === 200 && response.data) {
      return response.data;
    }
    throw new Error("Không thể lấy thông tin lớp học.");
  }

  async function fetchStudioDetails(studioId) {
    const response = await api.get(`/api/Studio/Get-Studio-By-Id?id=${studioId}`);
    if (response.status === 200 && response.data) {
      return response.data;
    }
    throw new Error("Không thể lấy thông tin studio.");
  }

  async function fetchAccountDetails(accountId) {
    const response = await api.get(`/api/Account/get-by-id?accountId=${accountId}`);
    if (response.status === 200 && response.data) {
      return response.data;
    }
    throw new Error("Không thể lấy thông tin tài khoản.");
  }
}, []);
// Chạy 1 lần khi component mount

// useEffect để theo dõi khi user thay đổi
// useEffect(() => {
//   if (user && user.length > 0) {
//     console.log("USER OF STUDIO:", user);
//   } else {
//     console.log("No user found or user is empty");
//   }
// }, [user]);



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
    `/Add-New-Booking-ClassDance`,
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
        `/Create-New-Order?BookingId=${classBooking.id}`
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
        `/create-payment-link/${orderId.id}/checkout`
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
                src="https://chiemtaimobile.vn/images/companies/1/%E1%BA%A2nh%20Blog/avatar-facebook-dep/Anh-dai-dien-ngau-chat-cho-con-trai-hut-thuoc.jpg?1704788544123"
                alt="Host Valentino Jr"
                className="hostAvatar"
                loading="lazy"
                width={76}
                height={76}
              />
              <div className="hostDetails">
                {/* <span className="listedBy">Listed By:</span> */}
                <h2 className="hostName">{user?.userName}</h2>
                {/* <span className="priceRange">For: $ 1000 - $ 5000</span> */}
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
                      <span>Hình Ảnh</span>
                      {/* <span>Photos</span> */}
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
              <p className="teacherName">Nguyễn Việt Anh</p>
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
  
              <h2 className="sectionTitle">Thông Tin Lớp Học</h2>
              <p className="description">
                {ClassId.description}
              </p>
            </section>

            <section className="reviewsSection" aria-labelledby="reviewsTitle">
              <div className="reviewsHeader">
                <h2 id="reviewsTitle" className="reviewsTitle">Đánh Giá</h2>
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
                Xem thêm đánh giá
              </button>
            </section>
          </div>

          <div className="rightColumnCover">
          <div className="priceContainer">
      <div className="priceHeader">
        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b924c4810595165877c0ee0cb66d62f8fcf049b8e44824705f472789c1e5d0ea?placeholderIfAbsent=true&apiKey=c05fb6b607a34c3cab6bc37bd3664ed7"
          className="priceIcon"
          alt="Price icon"
        /> */}
        <div>Khóa Học </div>
        {/* {ClassId.className} */}
      </div>
      
      <div className="feeContainer">
        <div className="courseFee">Chi Phí Khóa Học</div>
        {/* <div className="priceTag">$500</div> */}
        <div className="priceTag">{ClassId.pricing} VND</div>
      </div>
      
      <div className="detailsContainer">
        <div className="leftColumn">
          <div>{ClassId.timeStart}A-{ClassId.timeEnd}A</div>
          <div className="skillLevel">Trình Độ</div>
          <div className="classDay">Ngày Học</div>
          <div className="danceStyle">Phong Cách</div>
        </div>
        <div className="rightColumn">
          <div className="rightInner">
            <div className="startDate">{ClassId.dateStart}</div>
            <div className="basic">Cơ Bản</div>
          </div>
          <div className="schedule">Thứ Hai - Thứ Sáu</div>
          <div className="hiphop">Hiphop</div>
        </div>
      </div>
      
      <button 
        className="bookingButton"
        onClick={handlePayment} 
        tabIndex={0}
        aria-label="Book this dance class"
      
      >
        Mua Khóa Học
      </button>
    </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};
