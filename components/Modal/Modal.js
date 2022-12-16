import React, { useEffect, useState, useRef } from 'react';
import styles from './Modal.module.css';
import cn from 'classnames';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

const Modal = ({ errorMessage, setErrorStatus }) => {

	const checkError = (e) => {
		switch (e) {
			case 'С таким адресом электронной почты зарегистрировано несколько аккаунтов!':
				return 'This email address is already in use!';
				break;
			case 'Вы указали e-mail в неверном формате!':
				return 'Please, enter correct email.';
				break;
			case 'Недопустимая валюта':
				return 'Invalid currency.';
				break;
			case 'Ошибка.':
				return 'Error. Try to register later.';
				break;
			case 'Минимум 6 символов, обязан содержать цифры и латинский буквы.':
				return 'Minimum 6 symbols. Must contain only Latin characters and digits!';
				break;
			default: 'Error. Try to register later.';
		}

		if (e.includes('Извините, регистрация игроков из указанной страны')) {
			return 'Sorry, registration from specified country (India) is suspended.'
		}

		return 'Error. Try to register later.'
	}

	const ref = useRef();
	useOnClickOutside(ref, () => setErrorStatus(false));

	useEffect(() => {
		const timeOut = setTimeout(() => {
			setErrorStatus(false)
		}, 3000)

		document.addEventListener('keydown', function (e) {
			if (e.code === 'Escape') {
				setErrorStatus(false)
			}
		});

		return () => clearTimeout(timeOut);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (

		<div className={styles.modalWrapper}>
			<div className={styles.modal} ref={ref}>
				{checkError(errorMessage)}

				<button className={styles.close} onClick={() => setErrorStatus(false)}>
					<span className={styles.line1} />
					<span className={styles.line2} />
				</button>
			</div>
		</div>

	);
}

export default Modal;
