import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import QuizPage from "./Quiz";

export default function QuizContainer() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="This is a fullscreen modal"
        fullScreen
        radius={0}
        transitionProps={{ transition: "fade", duration: 200 }}
      >
        <QuizPage />
      </Modal>

      <Button onClick={open}>Open Modal</Button>
    </>
  );
}
