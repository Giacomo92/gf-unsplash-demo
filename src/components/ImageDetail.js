import React from 'react';
import ImageWithSkeleton from "./ImageWithSkeleton";


const ImageDetail = ({ image }) => {
  return (
    <ImageWithSkeleton
      srcSet={`
        ${image.urls.raw}&w=400 400w,
        ${image.urls.raw}&w=800 800w,
        ${image.urls.raw}&w=1200 1200w
      `}
      sizes={`(max-width: 400px) 400px,
              (max-width: 800px) 800px,
              1200px`}
      src={image.urls.regular}
      alt={image.alt_description}
      image={image}/>
  );
};

export default ImageDetail;
