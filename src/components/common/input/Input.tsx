import styles from './input.module.css';
import { InputProps } from './inputTypes';

export function Input({ id, error, ...rest }: InputProps) {
	return (
		<div className={styles.control}>
			<input id={id} name={id} {...rest} />
			{error && <span className={styles.errorText}>{error}</span>}
		</div>
	);
}
