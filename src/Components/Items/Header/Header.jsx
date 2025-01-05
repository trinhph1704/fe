import React, { useState } from 'react';
import './Header.css';
import useAuth from '../../../hooks/useAuth';
import { Link } from 'react-router-dom';

export default function Header() {
  const { auth, setAuth } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    setAuth({ user: null }); // Clear user data
    localStorage.clear()
    setDropdownVisible(false); // Hide dropdown after logout
  };

  return (
    <div id="Header">
      <div className="mainHeader">
        <div className="navGroup">
          <a href="/home">
            <img
              loading="lazy"
              src="https://ava-grp-talk.zadn.vn/a/1/9/8/4/360/36650c664e257c37760d0f7a27fe0a8d.jpg"
              className="logo"
              alt="Studio logo"
              width={62}
              height={62}
            />
          </a>
          <nav className="navigation" aria-label="Main navigation">
            <button className="navItem">TRANG CHỦ</button>
            <button className="navItem">LỚP NHẢY</button>
            <button className="navItem">TIN TỨC</button>
            <button className="navItem">LIÊN HỆ</button>
          </nav>
        </div>

        <div className="actionGroup">
          <button className="downloadApp" aria-label="Download mobile app">
            Tải Về Phiên Bản App
          </button>
          <div className="hostGroup">
            <button className="hostButton" aria-label="Become a host">
              Trở Thành Chủ Studio
            </button>
            <div>
              {auth?.user ? (
                <div className="imageContainer">
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/5df20729ee94e58904c9f308479cb5c731926066ec9735296b6160062a8c308b?placeholderIfAbsent=true&apiKey=c05fb6b607a34c3cab6bc37bd3664ed7"
                    className="contentImage"
                    alt="User profile"
                    onClick={() => setDropdownVisible(!dropdownVisible)}
                    style={{ cursor: 'pointer' }}
                  />

                  {dropdownVisible && (
                    <div
                      className="dropdownMenu"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        background: 'white',
                        border: '1px solid #ccc',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        padding: '10px',
                        zIndex: 1000,
                      }}
                    >
                      <button
                        onClick={handleLogout}
                        style={{
                          background: 'none',
                          border: 'none',
                          padding: '10px',
                          cursor: 'pointer',
                          fontSize: '16px',
                          color: '#333',
                        }}
                      >
                        Log Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="auth-buttons">
                  <button className="login-button">
                  <Link to="/Login" >Login</Link>
                  </button>
                  <button className="signup-button">
                  <Link to="/Signup">Sign up</Link>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
