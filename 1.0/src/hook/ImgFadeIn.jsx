import { useEffect, useState } from 'react';

function useImgFadeIn(imageSrc) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    const image = new Image();
    image.src = imageSrc;

    const handleImageLoad = () => {
      setIsImageLoaded(true);
    };

    image.addEventListener('load', handleImageLoad);

    return () => {
      image.removeEventListener('load', handleImageLoad);
    };
  }, [imageSrc]);

  return isImageLoaded;
}

export default useImgFadeIn;
