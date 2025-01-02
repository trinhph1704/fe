import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'; // Import Navigate từ react-router-dom
import HomePage from './pages/HomePage/HomePage';
import Login from './pages/Login/Login';
import ListItemPage from './pages/UserPage/ListItemPage/ListItemPage';
import ItemDetails from './Components/User/ItemDetails/ItemDetails';
import NotFound from './pages/NotFound/NotFound';
import ProfilePage from './pages/UserPage/ProfilePage/ProfilePage';
import CartPage from './pages/UserPage/CartPage/CartPage';
import SucessPage from './pages/SucessPage/SucessPage';
import Signup from './pages/SignUp/SignUp';
import CoursePage from './pages/CoursePage/CoursePage';
import StudioPage from './pages/StudioPage/StudioPage';
import StudioInforPage from './pages/StudioInforPage/StudioInforPage';
import OrderPage1 from './pages/UserPage/OrderPage/OrderPage1';
import StudioBookingManagerPage from './pages/UserPage/StudioBookingManagerPage/StudioBookingManagerPage';
import EditStudioPage from './pages/UserPage/EditStudioPage/EditStudioPage';
import AdminManagerPage from './pages/AdminManagerPage/AdminManagerPage';
import RevenuePage1 from './pages/UserPage/RevenuePage/RevenuePage1';
import UpdateuserPage1 from './pages/UserPage/UpdateuserPage1/UpdateuserPage1';
import CheckoutError from './Components/Checkout/Checkout-error/CheckoutError';
import ErrorPage from './pages/ErrorPage/ErrorPage';

function App() {
  return (
    <>
      <Routes>
        {/* Route mặc định chuyển hướng tới trang Login */}
        <Route path="/" element={<Navigate to="/Login" />} /> {/* Trang mặc định */}

        {/* Trang Login */}
        <Route path="/Login" element={<Login />} />

        <Route path="/Signup" element={<Signup />} />

        {/* Trang Home */}
        <Route path="/Home" element={<HomePage />} />

        <Route path="/Course/:studioId" element={<CoursePage />} />

        {/* Trang danh sách sản phẩm */}
        <Route path="/Product" element={<ListItemPage />} />

        {/* Trang chi tiết sản phẩm */}
        <Route path="/Product/Details/:title" element={<ItemDetails />} />

        {/* Trang NotFound cho mọi route không xác định */}
        <Route path="*" element={<NotFound />} />

        {/* Trang thông tin người dùng */}
        <Route path="/Profile" element={<ProfilePage />} />

        {/* Trang Giỏ Hàng */}
        <Route path="/Cart" element={<CartPage />} />

        {/* Trang Admin */}
        

        {/* Trang checkSucess */}
        <Route path="/hometro" element={<SucessPage />} />

        <Route path="/Studio" element={<StudioPage />} />

        <Route path="/StudioInfor/:id" element={<StudioInforPage />} />

        
<Route path="/order/:orderId" element={<OrderPage1 />} />
<Route path="/bookingmanager" element={<StudioBookingManagerPage />} />
<Route path="/editstu" element={<EditStudioPage />} />
<Route path="/adminmanager" element={<AdminManagerPage />} />
<Route path="/revenue" element={<RevenuePage1 />} />
<Route path="/updateuser" element={<UpdateuserPage1 />} />
<Route path="/checkcancel" element={<ErrorPage />} />
{/* <Route path="/hometro" element={<HomeTro />} /> */}
      </Routes>
    </>
  );
}

export default App;
