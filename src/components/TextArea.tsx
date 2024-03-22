import classNames from "classnames";
import { ChangeEvent, TextareaHTMLAttributes } from "react";

export interface TextAreaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
  > {
  name: string;
  value: string;
  label?: string;
  error?: string;
  onChange?: (value: string, event: ChangeEvent<HTMLTextAreaElement>) => void;
  className?: string;
}

export const TextArea = ({
  name,
  value,
  label,
  error = "",
  onChange,
  className,
  ...rest
}: TextAreaProps) => {
  return (
    <div className={"w-full bg-transparent"}>
      <label
        htmlFor={name}
        className="block text-lg font-medium mb-1 text-neutral-400"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange && onChange(e.target.value, e)}
        className={classNames(
          "border-[3px] text-lg w-full px-3 py-1.5 border-neutral-700 bg-transparent rounded-md outline-0 max-h-40 min-h-[130px] h-[30px] resize-y text-neutral-300",

          !!error ? "border border-red-600" : "",
          className
        )}
        {...rest}
      />
    </div>
  );
};
