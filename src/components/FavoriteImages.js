// src/components/ImageSearch.js
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ImageGallery from './ImageGallery';
import {Button} from "react-bootstrap";

const ImageSearch = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalFavorites, setTotalFavorites] = useState(0);

  const fetchFavoriteImages = async () => {
    const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
    setTotalFavorites(favoriteIds.length);
    const nextImages = favoriteIds.slice(currentIndex, currentIndex + 10);
    try {
      const imageDetails = await Promise.all(nextImages.map(image =>
        axios.get(`${process.env.UNSPLASH_BASE_URL}photos/${image.id}`, {
          headers: {
            Authorization: `Client-ID ${process.env.GATSBY_UNSPLASH_ACCESS_KEY}`,
          },
        }).then(res => res.data)
      ));

      setImages(prevImages => [...prevImages, ...imageDetails]);
      setCurrentIndex(currentIndex + 10);
    } catch (error) {
      console.error("Errore nel recuperare le immagini preferite", error);
    }
  };

  useEffect(() => {
    fetchFavoriteImages();
  }, []);

  return (
    <div>
      <ImageGallery isFavorite={true} images={images} />

      {currentIndex < totalFavorites && (
        <div className="d-flex mt-5 justify-content-center">
          <Button variant="primary" onClick={fetchFavoriteImages}>Carica altre immagini</Button>
        </div>
      )}
    </div>
  );
};

export default ImageSearch;
