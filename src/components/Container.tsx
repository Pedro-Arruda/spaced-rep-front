import classNames from "classnames";
import { ReactNode } from "react";

interface IContainer {
  classname?: string;
  children: ReactNode;
}

export const Container = ({ classname, children }: IContainer) => {
  return (
    <div
      className={classNames(
        "max-w-[1366px] mx-auto px-7 mb-10 text-xl font-semibold",
        classname
      )}
    >
      {children}
    </div>
  );
};
