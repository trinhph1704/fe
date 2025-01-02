import React from 'react';
import './Header.css';

export default function Header (){
  return (
    <div id='Header'>
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
          
        /></a>
        <nav className="navigation" aria-label="Main navigation">
          <button className="navItem">Nav 1</button>
          <button className="navItem">Nav 2</button> 
          <button className="navItem">Nav 3</button>
        </nav>
      </div>
      <div className="actionGroup">
        <button 
          className="downloadApp"
          aria-label="Download mobile app"
        >
          Download Mobile App
        </button>
        <div className="hostGroup">
          <button 
            className="hostButton"
            aria-label="Become a host"
          >
            Become A Host
          </button>
          <div className="imageContainer">
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5df20729ee94e58904c9f308479cb5c731926066ec9735296b6160062a8c308b?placeholderIfAbsent=true&apiKey=c05fb6b607a34c3cab6bc37bd3664ed7"
        className="contentImage"
        alt="Content display"
      />
    </div>
        </div>
      </div>
    </div>
    </div>
  );
};