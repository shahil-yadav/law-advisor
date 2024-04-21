import { YStack } from "tamagui";
import Chat from "../../components/chat";

export default function Index() {
  return (
    <YStack flex={1} justifyContent="flex-end" padding="$4">
      <Chat />
    </YStack>
  );
}
