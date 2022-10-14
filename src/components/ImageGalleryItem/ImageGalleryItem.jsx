import PropTypes from 'prop-types';

import { useState } from 'react';
import { Modal } from '../Modal/Modal';

import css from './ImageGalleryItem.module.css'

export const ImageGalleryItem = ({ largeImageURL, webformatURL, tags }) => {

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = ({ currentTarget, target }) => {
        if (currentTarget === target) {
            setShowModal(false);
        }
    }
    
    const handleCloseModalKeyDown = ({ code }) => {
        if (code === 'Escape') {
            setShowModal(false);
        }
    }

    const handleOpenModal = event => {
        event.preventDefault();
        setShowModal(true);
    }

    return (
        <>
            {showModal && <Modal
                handleCloseModal={handleCloseModal}
                handleCloseModalKeyDown={handleCloseModalKeyDown}
                hrefImage={largeImageURL}
                altImage={tags}
            />}

            <div className={css.ImageGalleryLink} onClick={handleOpenModal}>
                <img className={css.ImageGalleryItemImage} src={webformatURL} alt={tags} loading="lazy" />
            </div>
        </>

    )
}

ImageGalleryItem.protoTypes = {
    largeImageURL: PropTypes.string,
    webformatURL: PropTypes.string,
    tags: PropTypes.string,
};