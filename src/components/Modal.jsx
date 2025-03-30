import React, {useState} from 'react';
import styles from '../styles/styles.module.scss'

const Modal = ({setIsOpen}) => {
    const [creditAmount, setCreditAmount] = useState('');
    const [creditTerm, setCreditTerm] = useState(12);
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [paymentType, setPaymentType] = useState('month');
    const [isCalculated, setIsCalculated] = useState(false);
    const [inputError, setInputError] = useState(false)
    const terms = [12, 24, 36, 48];

    const closePopup = () => {
        setIsOpen(false);
    };

    const changeInput = (value) => {
        setInputError(false)
        setCreditAmount(value)
    }
    const calculatePayment = () => {
        if (creditAmount) {
            const monthlyPayment = Math.round(Number(creditAmount) / creditTerm);
            const yearlyPayment = monthlyPayment * 12;

            setMonthlyPayment({
                month: monthlyPayment,
                year: yearlyPayment
            });
            setIsCalculated(true);
        }else{
            setInputError(true)
        }
    };



    return (
        <div className={styles.overlay} onClick={closePopup}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                <button onClick={closePopup} className={styles.closeButton}>
                    ×
                </button>

                <h2 className={styles.title}>Платежи по кредиту</h2>
                <div className={styles.texts}>
                    <p className={styles.text}>Введите сумму кредита и выберите срок, на который вы хотите его оформить. </p>
                    <p className={styles.text}>Мы автоматически рассчитаем для вас ежемесячный платеж, чтобы вы могли лучше спланировать свои финансы. </p>
                </div>

                <h3 className={styles.amount}>Ваша сумма кредита</h3>
                <input
                    type="number"
                    value={creditAmount}
                    onChange={(e) => changeInput(e.target.value)}
                    placeholder="Введите сумму кредита"
                    className={`${styles.input} ${inputError ? styles.input_error : ''}`}/>
                {inputError && <p className={styles.error}>Поле обязательно для заполнения</p>}
                <div className={styles.calculation} onClick={calculatePayment}>
                    Расчитать
                </div>
                <div className={styles.months}>
                    <h3 className={styles.title_months}>Количество месяцев?</h3>
                    <div className={styles.termButtons}>
                        {terms.map(term => (
                            <button
                                key={term}
                                onClick={() => setCreditTerm(term)}
                                className={`${styles.termButton} ${creditTerm === term ? styles.active : ''}`}
                            >
                                {term}
                            </button>
                        ))}
                    </div>
                </div>


                {isCalculated && (
                    <>
                        <h3>Итого платеж по кредиту:</h3>
                        <div className={styles.paymentTypeButtons}>
                            <button onClick={() => setPaymentType('month')} className={`${styles.paymentTypeButton} ${paymentType === 'month' ? styles.active : ''}`}>
                                в месяц
                            </button>
                            <button onClick={() => setPaymentType('year')} className={`${styles.paymentTypeButton} ${paymentType === 'year' ? styles.active : ''}`}>
                                в год
                            </button>
                        </div>

                        <div className={styles.resultBlock}>
                            <p> {paymentType === 'month'
                                ? `${monthlyPayment.month} ₽`
                                : `${monthlyPayment.year} ₽`}</p>
                        </div>
                    </>
                )}
                <button onClick={calculatePayment} className={styles.addButton}>
                    Добавить
                </button>
            </div>
        </div>
    );
};

export default Modal;