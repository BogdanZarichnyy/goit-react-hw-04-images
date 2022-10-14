import { useState } from 'react';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Pixabay } from '../api/pixabay';

import { setPagesApi } from '../utils/setPages';

const pixabayAPI = new Pixabay();

export const App = () => {

    const [images, setImages] = useState([]);
    const [pages, setPages] = useState(null);
    const [itemsResidual, setItemsResidual] = useState(null);
    const [showButtonLoadImages, setIShowButtonLoadImages] = useState(false);
    const [isLoad, setIsLoad] = useState(false);

    const handleSubmit = async event => {
        event.preventDefault();
        
        setImages([]);
        setPages(null);
        setItemsResidual(null);
        setIShowButtonLoadImages(false);
        setIsLoad(true);

        pixabayAPI.searchQuery = event.target.elements.searchQuery.value.trim();
        pixabayAPI.page = 1;
        pixabayAPI.per_page = 40;

        try {
            const { hits, totalHits } = await pixabayAPI.getContentByInputData();

            if (hits.length === 0) {
                return;
            }
            
            const residual = totalHits % pixabayAPI.per_page;

            setImages([...hits]);
            setPages(setPagesApi(residual, totalHits, pixabayAPI.per_page));
            setItemsResidual(residual);
            setIShowButtonLoadImages(true);
            setIsLoad(false);
        }
        catch (error) {
            console.log(error);
            setIsLoad(false);
        }
    }

    const handleLoadMoreImages = async () => {

        setIsLoad(true);

        try {
            pixabayAPI.page += 1;
        
            if (pixabayAPI.page === pages) {
                setIShowButtonLoadImages(false);
                pixabayAPI.per_page = itemsResidual;
            }

            const { hits } = await pixabayAPI.getContentByInputData();

            if (hits.length === 0) {
                return;
            }

            setImages([...images, ...hits]);
            setIsLoad(false);
        }
        catch (error) {
            console.log(error);
            setIsLoad(false);
        }
    }

    return (
        <div className="App">

            <Searchbar handleSubmit={handleSubmit} />

            <ImageGallery colections={images} />
            
            {isLoad && <Loader />}

            {showButtonLoadImages && <Button loadMoreImages={handleLoadMoreImages} />}
            
        </div>
    )
}