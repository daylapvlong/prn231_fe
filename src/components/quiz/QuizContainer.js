import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import QuizPage from "./Quiz";

export default function QuizContainer() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <QuizPage />
    </>
  );
}
