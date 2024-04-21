export type TMessage = {
  id: string;
  avatar: string;
  user: "You" | "Ai";
  payload: string;
};

export type TImage = {
  mimeType: string;
  data64: string;
  uri: string;
};
