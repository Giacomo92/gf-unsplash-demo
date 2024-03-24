import React, {useState} from 'react';

const ImageWithSkeleton = ({ src, alt, srcSet, sizes }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
      {!isLoaded && (
        <div
          className="skeleton"
          style={{
          backgroundColor: '#ccc',
          width: '100%',
          paddingTop: '56.25%',
          position: 'absolute',
          top: 0,
          left: 0,
        }}>
        </div>
      )}
      <img
        className="mb-0 w-100 h-auto"
        src={src}
        alt={alt}
        srcSet={srcSet}
        sizes={sizes}
        style={{ width: '100%', height: 'auto', display: isLoaded ? 'block' : 'none' }}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default ImageWithSkeleton;
