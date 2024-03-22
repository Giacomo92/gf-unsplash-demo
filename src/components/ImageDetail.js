import React, { useState, useEffect } from 'react';


const UnsplashImage = ({ image }) => {
  return (
    <img src={image.urls.regular} alt="Immagine da Unsplash" />
  );
};

export default UnsplashImage;
