interface IChatMessage {
  content: string;
  role: "system" | "user";
  isLoading?: boolean;
}
