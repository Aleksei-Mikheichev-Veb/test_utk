import React from 'react';
import styles from '../styles/styles.module.scss'


const Button = ({setIsOpen}) => {
    const openPopup = () => {
        setIsOpen(true);
    };
    return (
        <button onClick={openPopup} className={styles.mainButton}>
            Расчет платежей
        </button>
    );
};

export default Button;