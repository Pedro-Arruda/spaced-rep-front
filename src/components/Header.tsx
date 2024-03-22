export const Header = () => {
  return (
    <div className="py-5 bg-container ">
      <nav className="max-w-[1366px] mx-auto px-7 flex gap-10 text-lg font-bold">
        <a href="/">English</a>
        <ul className="flex gap-5">
          <li>
            <a className="cursor-pointer" href="/">
              Cards
            </a>
          </li>
          <li>
            <a href="/talk-ia">Talk With IA</a>{" "}
          </li>
        </ul>
      </nav>
    </div>
  );
};
