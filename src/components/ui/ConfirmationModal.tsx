import { Modal } from "antd";

type TConfirmationModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

const ConfirmationModal = ({
  isModalOpen,
  setIsModalOpen,
}: TConfirmationModalProps) => {
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
