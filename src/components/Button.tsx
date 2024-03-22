import classNames from "classnames";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const Button = ({ children, className, variant = 'primary', ...rest }: ButtonProps) => {
  return (
    <button
      className={classNames(
        "px-3 text-lg py-1 rounded-md flex justify-center items-center text-center gap-2",
        variant === 'primary' ? 'btn-primary' : 'btn-secondary',
        className)}
      {...rest}>
      {children}
    </button>
  );
}