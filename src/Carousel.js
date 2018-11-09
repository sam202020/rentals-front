import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default class Carousel extends React.Component {
  render() {
    const { pictures } = this.props;
    const renderPictures = pictures.map(picture => (
      
        <img src={picture} style={{maxHeight: '100%'}}/>
      
    ));
    const settings = {
      dots: true,
      lazyLoad: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 1
    };
    return <Slider {...settings}>{renderPictures}</Slider>;
  }
}
