import React from "react";
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import styles from './CityImagesCarousel.module.css'
import {useSelector} from "react-redux";

//A carousel from npm. Accepts an array with images from the store

const CityImagesCarousel = () => {
    const images = useSelector(store => store.flights.cityImages)
    return <Carousel offset={12} itemWidth={164} className={styles.carouselContainer} >
            {images.map(image => <img key={image} src={image} alt={`city`}/>)}
    </Carousel>

}
export default CityImagesCarousel