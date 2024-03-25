import React, {useEffect, useState} from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";
import Heart from "react-heart";
import ImageWithSkeleton from "./ImageWithSkeleton";

const ImageGallery = ({isFavorite, images}) => {
  const [animationClass, setAnimationClass] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (image) => {
    let updatedFavorites;
    if (favorites.some(favorite => favorite.id === image.id)) {
      updatedFavorites = favorites.filter(favorite => favorite.id !== image.id);
    } else {
      updatedFavorites = [...favorites, image];
    }
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setAnimationClass('pulse');
    setTimeout(() => {
      setAnimationClass('');
    }, 300);
    if(isFavorite){
      window.location.reload();
    }
  };

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{350: 1, 750: 2, 900: 3}}
    >
    <Masonry
      columnsCount={4} gutter="10px">
      {images.map((image, i) => (
        <div key={i} style={{ position: 'relative', display: 'inline-block' }}>
          <a href={"/immagini/" + image.slug} style={{ display: 'block' }}>
            <ImageWithSkeleton
              srcSet={`
        ${image.urls.raw}&w=400 400w,
        ${image.urls.raw}&w=800 800w,
        ${image.urls.raw}&w=1200 1200w
      `}
              sizes={`(max-width: 400px) 400px,
              (max-width: 800px) 800px,
              1200px`}
              key={i}
              src={image.urls.small}
              alt={image.alt_description}
             image={image}/>
          </a>
          <div
            style={{
              position: 'absolute',
              top: 10,
              right: 10,
              width: '2rem',
              height: '2rem',
            }}
          >
            <Heart
              isActive={favorites.some(favorite => favorite.id === image.id)}
              onClick={() => toggleFavorite(image)}
              className={animationClass}
              style={{
              transition: 'opacity 0.3s ease',
            }} />
          </div>
        </div>

            ))}
          </Masonry>
    </ResponsiveMasonry>
          );
          };

          export default ImageGallery;
