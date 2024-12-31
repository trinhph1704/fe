import React, { useEffect, useState } from 'react';
import './login.css'; // Thêm style CSS nếu cần thiết
// import P35 from '../../../public/Product/35.png';
import api from '../../Components/utils/requestAPI';
import useAuth from '../../hooks/useAuth';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [authen, setAuthen] = useState('');
  const { setAuth } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://localhost:7199/api/Account/log-in';
    const data = {
      email: email,
      password: password
    };

    try {
        console.log(data);
        const response = await api.post(url, data);
        console.log(response.data)
        localStorage.setItem('Authen', JSON.stringify(response.data));
        setAuthen(response.data)
    } catch (error) {
        console.error(error);
        setLoginError('Tên đăng nhập hoặc mật khẩu không chính xác'); 
        window.alert('Tên đăng nhập hoặc mật khẩu không chính xác'); 
    }
}

useEffect(() => {
  const authData = localStorage.getItem('Authen');
  if (authData) {
      try {
          // const decodedAuth = JSON.parse(authData);
          const decodedToken = jwtDecode(authData);
          const currentTime = Date.now() / 1000;
          if (decodedToken.exp > currentTime) {
              setAuthen(authData);
          }
      } catch (error) {
          console.error(error);
      }
  }
}, []);

useEffect(() => {
  async function fetchUserData() {
      try {
          var decode = jwtDecode(authen);
          var userid = decode.AccountID;
          const url = `https://localhost:7199/api/Account/get-by-id?accountId=${userid}`;
          // const paymentUrl = `/api/Payment/get-payment?OrderId=${cartItems[0]?.orderId}`;
          const headers = {
              'accept': '*/*',
              'Content-Type': 'application/json-patch+json'
          };
          // const data = {
          //   accountId: userid
          // };
          const response = await api.get(url);
          var user = response.data;
          setAuth({ user, authen });
          if (user.roleId === '1') {
              console.log('ys');
              navigate('/Home');
          }
          if (user.roleId === '2') {
              navigate('/admin-page');
          } 
          if (user.roleId === '4') {
              navigate('/content');
          }
          if (user.roleId === '3') {
              navigate('/staff-page');
              window.alert('Đăng nhập thành công');
          }
      } catch (error) {
          console.error(error);
          console.log(decode);
          console.log(userid);
          console.log(user);
          // console.log(respone);
          localStorage.removeItem('Authen'); // Xóa thông tin đăng nhập khi có lỗi xảy ra
      }
  }
  if (authen) {
      fetchUserData();
  }
}, [authen, navigate]);

  return (
    <div id="Login" >
    <div className="login-container">
      {/* Hero Section */}
      <div className="hero-wrap">
        <div className="hero-content">
          <div className="container">
            <div className="row">
              <div className="col">
                <div className="logo">
                  <a href="index.html" title="Oxyy">
                    {/* <img src={P35} alt="Oxyy" /> */}
                  </a>
                </div>
                {/* <h1>We are glad to see you again!</h1>
                <p>Log In with QR Code</p> */}
                {/* <img src="images/qr-code.jpg" className="qr-code" alt="QR code" /> */}
                {/* <p className="description">Scan this with your camera or our mobile app to login instantly.</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Form Section */}
      <div className="login-form">
        <div className="container">
          <h3>Welcome, Colordanhub</h3>
          <p>New to Colordanhub? <a href="/Signup">Create an Account</a></p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="emailAddress">Username or Email Address</label>
              <input
                type="text"
                id="emailAddress"
                required
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="loginPassword">Password</label>
              <input
                type="password"
                id="loginPassword"
                required
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember-me"
                name="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me">Keep me signed in</label>
            </div>
            <button type="submit">Sign In </button>
          </form>
          <div className='mutee'>
          <hr className="flex-grow-1" />
  <span className="muted">Or sign in with</span>
  <hr className="flex-grow-1" />
  </div>
          <div className="social-login">
            <button className="facebook-btn">Facebook</button>
            <button className="google-btn">Google</button>
            <button className="twitter-btn">Twitter</button>
          </div>
          <p>Need to find <a href="forgot-password-5.html">your password</a>?</p>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Login;
