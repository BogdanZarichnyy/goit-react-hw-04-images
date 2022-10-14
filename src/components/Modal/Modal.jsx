import PropTypes from 'prop-types';

import { useEffect } from 'react';
import ReactDOM from 'react-dom';

import css from './Modal.module.css';

export const Modal = ({ handleCloseModal, handleCloseModalKeyDown, hrefImage, altImage }) => {

    useEffect(() => {
        window.addEventListener('keydown', handleCloseModalKeyDown);

        return () => {
            window.removeEventListener('keydown', handleCloseModalKeyDown);
        }
    }, [handleCloseModalKeyDown]);

    return ReactDOM.createPortal(
        <div className={css.backdrop} onClick={handleCloseModal} onKeyDown={handleCloseModalKeyDown}>
            <div className={css.modal}>
                <img className={css.image} src={hrefImage} alt={altImage} />
            </div>
        </div>,
        document.body
    );
}

Modal.protoTypes = {
    handleCloseModalKeyDown: PropTypes.func,
    handleCloseModal: PropTypes.func,
    hrefImage: PropTypes.string,
    altImage: PropTypes.string,
};