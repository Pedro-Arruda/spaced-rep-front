import { User } from "phosphor-react";
import logoApp from "../assets/SpacedRep.png";
import { useAuth } from "../contexts/auth";

export const Header = () => {
  const { auth } = useAuth();

  const userName = auth?.user.username;

  return (
    <div className="py-5 bg-container ">
      <nav className="max-w-[1366px] mx-auto px-7 flex items-center justify-between gap-5 text-lg font-bold">
        {/* <a href="/">English</a> */}
        <a href="/">
          <img src={logoApp} alt="" width={170} />
        </a>
        {/* <ul className="flex gap-3">
          <li>
            <a className="cursor-pointer" href="/">
              Cards
            </a>
          </li>
          <li>
            <a href="/talk-ia">Talk With IA</a>{" "}
          </li>
        </ul> */}
        <p className="flex items-center gap-2">
          Hi, {userName} <User weight="bold" />
        </p>
      </nav>
    </div>
  );
};
