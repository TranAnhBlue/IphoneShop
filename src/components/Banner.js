import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

const Banner = () => {
  const images = [
    "/images/iphone15.png",
    "/images/laptop.png",
  ];

  const [currentImage, setCurrentImage] = useState(images[0]);

  useEffect(() => {
    // Đổi ảnh mỗi 3 giây
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 3000); 

    return () => clearInterval(interval); 
  }, [images]);

  return (
    <div style={{ position: "relative", width: "100%", height: "400px" }}>
      <img
        src={currentImage}
        alt="Banner"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "opacity 1s ease-in-out",
        }}
      />
      {/* Text Overlay (Optional) */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "white",
          fontSize: "30px",
          fontWeight: "bold",
          textShadow: "2px 2px 10px rgba(0, 0, 0, 0.7)",
        }}
      >
        Chào mừng bạn đến với cửa hàng của chúng tôi!
      </div>
    </div>
  );
};

export default Banner;
