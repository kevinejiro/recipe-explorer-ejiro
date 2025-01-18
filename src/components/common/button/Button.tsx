import styles from "./button.module.css";
import { ButtonProps } from "./buttonTypes"

const Button = ({ variant = 'text', className = '', children, ...rest }: ButtonProps) => {
  return (
    <button
      className={`${className} ${styles[variant]} ${styles.button}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
