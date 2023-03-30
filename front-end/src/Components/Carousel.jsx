import React from "react";
import { Carousel } from "react-responsive-carousel";
import '../carousel.css';

export default ({images}) => (
  <Carousel className="Carousel" axis="horizontal" thumbWidth={70} showThumbs={false}>
    <div>
      <img
        alt=""
        src={images[0]}
      />
    </div>
    <div>
      <img
        alt=""
        src={images[1]}
      />
    </div>
    <div>
      <img
        alt=""
        src={images[2]}
      />
    </div>
    {/* <div>
      <img
        alt=""
        src="https://cdn.shopify.com/s/files/1/0677/1464/6315/products/templateforproducts-07_4ff35fb9-5293-4d2f-ac8e-2157c7abfa1f.jpg?v=1679580399&width=600"
      />
    </div> */}
    
  </Carousel>
);
