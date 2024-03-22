import React from 'react';
import Masonry from "react-responsive-masonry";

const ImageGallery = ({ images }) => {
  return (
  <Masonry columnsCount={4} gutter="10px">
      {images.map((image, i) => (
        <a href={"images/" + image.slug}>
          <img
            key={i}
            src={image.urls.small}
            style={{width: "100%", display: "block"}}
           alt={image.alt_description}/>
        </a>
      ))}
    </Masonry>
  );
};

export default ImageGallery;
