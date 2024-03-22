export const ChatMessage = ({ content, role, isLoading }: IChatMessage) => {
  const systemAvatar =
    "https://freepnglogo.com/images/all_img/1690998192chatgpt-logo-png.png";
  const userAvatar = "https://cdn-icons-png.flaticon.com/128/4566/4566795.png";

  return (
    <div
      className={`flex text-lg 
    ${role === "user" && " justify-end"}`}
    >
      <div
        className={`flex  gap-4 items-center ${
          role === "user" && "flex-row-reverse"
        }`}
      >
        <img
          src={role === "system" ? systemAvatar : userAvatar}
          className="w-10 rounded-md"
        />
        {role === "system" && isLoading ? (
          <div className="loader ml-7" />
        ) : (
          <p>{content}</p>
        )}
      </div>
    </div>
  );
};
