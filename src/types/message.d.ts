interface IChatMessage {
  parts: string;
  role: "system" | "user";
  isLoading?: boolean;
}
