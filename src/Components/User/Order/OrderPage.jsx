import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Link, useLocation } from 'react-router-dom';
import api from '../../utils/requestAPI';
import "./OrderPage.css";

const OrderPage = () => {
    const [Order, SetOrder] = useState([]);
    const { bookingId } = useParams();
    useEffect (() => {
        const fetchOrder = async () => {
          const url = "https://localhost:7199/Get-Booking-By-BookingiD?bookingid=0a85bccf-1c20-4614-b076-2df8ec72238e";
          try {
            const response = await api.get(url);
            
            console.log('API response:', response.data);
            SetOrder(response.data);
          } catch (error) {
            console.error('Error fetching course data:', error);
          }
        };
    
       
        fetchOrder();
      }, []);

      const handleBooking = async (e) => { 
        e.preventDefault();
        const data = {
            BookingId:Order.id,
          };
        
          try {
            const url = 'https://localhost:7199/Create-New-Order';
            const response = await api.post(url, data);
            console.log(response.data);
            alert('Create Order Success!');
          } catch (error) {
            console.error(error);
            alert('Failed to create booking.');
          }

      };


    const studios = [
        {
          id: 1,
          image: "/0f867cb427035cc0008c7757df861157.jpg",
          price: "From 100$/hr",
          Type: "large",
          title: "Flow Dance",
          address: "123 Main St, Cityville",
         date: "21/10/2024",
         Time:"11:00 - 13:00"
        },
       
       
      ];
return(
  <div id="OrderPage"> 
<div className='container-order'>
   
<div className='infoorder-stu'>
{studios.map((studio) => (
<div className='infoorderstu-item'>
<div className='imageorder-stu'>
    <img src={studio.image} alt=""className='imageorder-con' />
</div>

<div className='stu-infoorder'>
    <div className='inforordercon'>
        <div className='chuavuine'>
            <span className='nameofstu'><strong>Name Studio:</strong> {studio.title}</span>
        </div>
        <div className='chuavuine'>
    <span className='typeofstu'><strong>Type:</strong> {studio.Type}</span>
</div>
<div className='chuavuine'>
    <span className='Addressofstu'><strong>Address:</strong> {studio.address}</span>
</div>

<div className='chuavuine'>
    <span className='Timeofstu'><strong>Time:</strong> {studio.Time}</span>
</div>
<div className='chuavuine'>
    <span className='Dateorderstu'><strong>Date:</strong> {studio.date}</span>
</div>

    </div>

</div>

</div>
 ))}
</div>
<div className='infouser-order'>
<h1 className='custumor-title'>Customer Info</h1>
<div className='chuainfoorder'>


<div className='chuainfovui'>
     
         <span className='phonevui'>Phone:  </span>

   
   
     <span className='kovui'> 0904762203 </span>
   </div>
       

    

<div className='chuainfovui'>
    <span className='customername'>Name: </span>
    
         <span className='kovui'>  Nguyen Van A </span>

   
</div>
<div className='chuainfovui'>
    <span className='Priceorder'>Price for one hour:  </span>
    <span className='kovui'> 1500000  </span>
</div>
<div className='chuainfovui'>
    <span className='quantityhour'>Quantity Hour: </span>
    <span className='kovui'> 2  </span>
</div>

<div className='chuainfovui'>
    <span className='totalpricevui'>Total Payment:  </span>
    <span className='kovui'>  3000000 </span>
</div>



</div>



<form onSubmit={handleBooking} className='buttonorder'>
    <button type="submit" className='ordernut'>Request order </button>
</form>
</div>



</div>
</div>






)
};
export default OrderPage;