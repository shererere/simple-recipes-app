import React from 'react';
import loader from '../../assets/loader.svg';
import styles from './Loader.module.scss';

const Loader = () => (
  <div className={ styles.loader }>
    <img src={ loader } width={ 128 } alt="loader" />
  </div>
);

export default Loader;
