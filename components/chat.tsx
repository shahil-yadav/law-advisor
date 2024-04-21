import { XCircle } from "@tamagui/lucide-icons";
import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { Avatar, Button, H5, Image, Text, XStack, YStack } from "tamagui";
import { TImage, TMessage } from "../types/types";
import { Prompt } from "./prompt";

const Chat = () => {
  const ref = useRef<FlatList<TMessage>>(null);
  const [chats, setChats] = useState<TMessage[]>([]);
  const [image, setImage] = useState<TImage>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ref.current?.scrollToEnd({
      animated: true,
    });
  }, [chats.length]);
  return (
    <>
      <FlatList
        ref={ref}
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <XStack gap="$3" marginVertical="$3">
            <Avatar circular size="$3">
              <Avatar.Image src={item.avatar} />
              <Avatar.Fallback bc="red" />
            </Avatar>
            <YStack flex={1}>
              <H5>{item.user}</H5>
              <Text>{item.payload}</Text>
            </YStack>
          </XStack>
        )}
      />
      <YStack gap="$5">
        {image?.uri && (
          <YStack style={{ position: "relative" }}>
            <Image
              source={{
                uri: image.uri,
                width: 150,
                height: 150,
              }}
            />
            <Button
              icon={XCircle}
              onPress={() => {
                setImage(undefined);
              }}
              scaleIcon={2}
              size="$3.5"
              style={{ position: "absolute" }}
            />
          </YStack>
        )}
        <XStack alignItems="center" gap="$2">
          <Prompt
            chats={chats}
            image={image}
            isLoading={loading}
            setChats={setChats}
            setImage={setImage}
            setIsLoading={setLoading}
            size="$4.5"
          />
        </XStack>
      </YStack>
    </>
  );
};

export default Chat;
