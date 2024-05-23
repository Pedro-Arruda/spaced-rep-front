import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";

interface IModalDeleteCard {
  fields: any;
  setIsOpenModal: (isOpen: boolean) => void;
  handleDelete: () => void;
}

export const ModalDeleteCard = ({
  handleDelete,
  setIsOpenModal,
}: IModalDeleteCard) => {
  return (
    <Modal
      onClose={() => {
        setIsOpenModal(false);
      }}
      header={
        <div className="flex flex-wrap gap-3  justify-center">
          <p className="text-xl font-semibold">
            Are you sure you want to delete this card?
          </p>
        </div>
      }
    >
      <div className="flex gap-5">
        <Button
          className="w-full py-2"
          onClick={() => setIsOpenModal(false)}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button className="w-full py-2" onClick={() => handleDelete()}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};
