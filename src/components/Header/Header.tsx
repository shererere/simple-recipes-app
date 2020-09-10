import React from 'react';
import { useHistory } from 'react-router';
import styles from './Header.module.scss';

const Header = () => {
    const history = useHistory();

    return (
        <div className={ styles.wrapper }>
            <h1 className={ styles.header } onClick={ () => history.push('/') }>
                Recipes
            </h1>
            <p className={ styles.description } >
                Best food you'll ever find
            </p>
        </div>
    );
};

export default Header;