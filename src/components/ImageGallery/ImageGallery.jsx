// import React from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css'

export const ImageGallery = ({ colections }) => {
    return (
        <ul className={css.ImageGallery}>
            {colections.map(image => (
                <li className={css.ImageGalleryItem} key={image.webformatURL} >
                    <ImageGalleryItem largeImageURL={image.largeImageURL} webformatURL={image.webformatURL} tags={image.tags} /> 
                </li>
            ))}
        </ul>
    )
}

ImageGallery.protoTypes = {
    handleShowModal:PropTypes.func,
    colections: PropTypes.arrayOf(PropTypes.shape),
};