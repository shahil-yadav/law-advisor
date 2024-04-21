import { SendHorizontal } from "@tamagui/lucide-icons";
import { useState } from "react";
import "react-native-get-random-values";
import type { SizeTokens } from "tamagui";
import { Button, Spinner } from "tamagui";
import { v4 as uuidv4 } from "uuid";
import { aiAvatarUrl, userAvatarUrl } from "../constants/defaultConstants";
import useImageTextGenAi from "../lib/generative-ai/useImageTextGenAi";
import useTextGenAi from "../lib/generative-ai/useTextGenAi";
import { TImage, TMessage } from "../types/types";
import CustomTextArea from "./customTextArea";

export function Prompt(props: {
  image?: TImage;
  isLoading: boolean;
  chats: TMessage[];
  setChats: React.Dispatch<React.SetStateAction<TMessage[]>>;
  setImage: React.Dispatch<React.SetStateAction<TImage | undefined>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  size: SizeTokens;
}) {
  const [text, setText] = useState("");
  async function handlePress() {
    if (!text) return;
    try {
      props.setIsLoading(true);
      const { image } = props;
      const userInput: TMessage = {
        id: uuidv4(),
        avatar: userAvatarUrl,
        payload: text,
        user: "You",
      };
      let aiOutput: TMessage = {
        avatar: aiAvatarUrl,
        id: uuidv4(),
        payload: "Ai is not responding",
        user: "Ai",
      };
      if (image) {
        aiOutput = {
          ...aiOutput,
          payload: await useImageTextGenAi(image.data64, image.mimeType, text),
        };
      } else if (text) {
        aiOutput = {
          ...aiOutput,
          payload: await useTextGenAi(text),
        };
      }
      props.setChats((prevChats) => [...prevChats, userInput, aiOutput]);
    } catch (error) {
      console.error(error);
    } finally {
      setText("");
      props.setImage(undefined);
      props.setIsLoading(false);
    }
  }
  return (
    <>
      <CustomTextArea
        image={props.image}
        setImage={props.setImage}
        setText={setText}
        size={props.size}
        text={text}
      />
      {props.isLoading === false ? (
        <Button
          alignSelf="flex-end"
          icon={SendHorizontal}
          onPress={handlePress}
          size={props.size}
        />
      ) : (
        <Spinner size="small" />
      )}
    </>
  );
}
