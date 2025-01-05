import React, { useState } from 'react';
import './signup.css'; // Thêm style CSS nếu cần thiết
// import P35 from '../../../public/Product/35.png';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login form submission
    console.log({ email, password, rememberMe });
  };

  return (
    <div id="Signup" >
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
          <h3>Chào Mừng Bạn Đến Với Colordanhub</h3>
          <p>Bạn Đã Có Tài Khoản Rồi? <a href="/login">Đăng Nhập Ngay</a></p>
          <form onSubmit={handleSubmit}>
          <div className="input-group">
              <label htmlFor="loginPassword">Họ Tên</label>
              <input
                type="password"
                id="loginPassword"
                required
                placeholder="Nhập Họ Tên Của Bạn"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label htmlFor="emailAddress">Tên Đăng Nhập</label>
              <input
                type="email"
                id="emailAddress"
                required
                placeholder="Nhập Tài Khoản"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-group">
              <label htmlFor="loginPassword">Mật Khẩu</label>
              <input
                type="password"
                id="loginPassword"
                required
                placeholder="Nhập Mật Khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            
            {/* <div className="remember-me">
              <input
                type="checkbox"
                id="remember-me"
                name="remember"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="remember-me">Keep me signed in</label>
            </div> */}
            <button type="submit">Đăng Ký</button>
          </form>
          <div className='mutee'>
          <hr className="flex-grow-1" />
  <span className="muted">hoặc đăng nhập với</span>
  <hr className="flex-grow-1" />
  </div>
          <div className="social-login">
            <button className="facebook-btn">Facebook</button>
            <button className="google-btn">Google</button>
            <button className="twitter-btn">Twitter</button>
          </div>
          {/* <p>Need to find <a href="forgot-password-5.html">your password</a>?</p> */}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Signup;
