import { ThreeDots } from 'react-loader-spinner'

import css from './Loader.module.css';

export const Loader = ({ message = '' }) => {
    return (
        <>
            <p className={css.searchResult}>{message}</p>

            <ThreeDots
                wrapperStyle={{ margin: '0 auto' }}
                height="50"
                width="50"
                color="#303f9f"
                ariaLabel="loading"
                />
        </>
    )
}