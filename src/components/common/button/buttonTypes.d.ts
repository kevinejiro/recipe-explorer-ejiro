type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text' | 'gray' | 'page';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  className?: string;
  children: React.ReactNode;
}