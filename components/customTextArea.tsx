import { Image as ImageIcon } from "@tamagui/lucide-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
} from "react-native";
import { Button, SizeTokens, TextArea, XStack } from "tamagui";
import { TImage } from "../types/types";

const CustomTextArea = (props: {
  image?: TImage;
  text: string;
  size: SizeTokens;
  setImage: React.Dispatch<React.SetStateAction<TImage | undefined>>;
  setText: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [height, setHeight] = useState<SizeTokens | number>(props.size);
  function handleTextInputSize(
    event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>
  ) {
    const inputHeight = event.nativeEvent.contentSize.height;
    setHeight(() => Math.min(inputHeight, 150));
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      base64: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      if (
        result.assets[0].base64 &&
        result.assets[0].mimeType &&
        result.assets[0].uri
      ) {
        props.setImage({
          data64: result.assets[0].base64,
          mimeType: result.assets[0].mimeType,
          uri: result.assets[0].uri,
        });
      }
    }
  };

  return (
    <XStack flex={1} alignItems="center" gap="$2">
      <TextArea
        value={props.text}
        flex={1}
        height={height}
        minHeight={props.size}
        onContentSizeChange={handleTextInputSize}
        onChangeText={props.setText}
        placeholder="Enter your details..."
        textAlignVertical="top"
      />
      {props.image === undefined && (
        <Button icon={ImageIcon} size={props.size} onPress={pickImage} />
      )}
    </XStack>
  );
};

export default CustomTextArea;
