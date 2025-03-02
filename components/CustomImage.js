import { useState, useEffect } from 'react';

const CustomImage = ({ src, alt, ...rest }) => {
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    const handleError = (e) => {
        e.currentTarget.onerror = null; // Prevent infinite loop
        e.currentTarget.src = '/logo/default_logo.png';
    };

    return (
        <img
            src={imgSrc || '/logo/default_logo.png'}
            alt={alt}
            onError={handleError}
            {...rest}
        />
    );
};

export default CustomImage;