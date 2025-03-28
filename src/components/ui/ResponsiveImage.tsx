import React from 'react';

interface ResponsiveImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
        loading="lazy"
        style={{
          aspectRatio: '16/9',
          maxWidth: '1920px',
          maxHeight: '1080px'
        }}
      />
    </div>
  );
};

export default ResponsiveImage;