import { Check, Plus, Swap, TextAa, X } from "phosphor-react";
import { Modal } from "../../../components/Modal";
import { Button } from "../../../components/Button";
import { TextArea } from "../../../components/TextArea";
import ToggleSwitch from "../../../components/Toggle";

interface IModalAddCard {
  fields: any;
  setFields: (fields: any) => void;
  setIsOpenModal: (isOpen: boolean) => void;
  handleSubmit: () => void;
}

export const ModalAddCard = ({
  fields,
  handleSubmit,
  setIsOpenModal,
  setFields,
}: IModalAddCard) => {
  console.log(fields.anexo);

  return (
    <Modal
      onClose={() => setIsOpenModal(false)}
      header={
        <div className="flex flex-wrap gap-3  justify-between">
          <p>
            <X
              size={24}
              onClick={() => setIsOpenModal(false)}
              className="cursor-pointer"
            />
          </p>
          <p className="text-xl font-semibold">Add card</p>
          <Button
            onClick={() => handleSubmit()}
            className="w-full sm:max-w-max"
          >
            Confirm
            <Check size={22} weight="bold" />
          </Button>
        </div>
      }
    >
      <form>
        <div className="flex flex-col gap-3">
          <TextArea
            name="front"
            value={fields.front}
            label="Front side"
            placeholder="Enter text here"
            onChange={(value) => setFields({ ...fields, front: value })}
          />
          <TextArea
            name="back"
            value={fields.back}
            label="Back side"
            placeholder="Enter text here"
            onChange={(value) => setFields({ ...fields, back: value })}
          />

          <label
            htmlFor="file"
            className="px-3 text-lg cursor-pointer rounded-md flex justify-center items-center text-center gap-2 btn-secondary py-2"
          >
            {fields.anexo ? fields.anexo[0].name : "Add image"}

            <input
              type="file"
              name="file"
              id="file"
              className="hidden"
              onChange={(e) => setFields({ ...fields, anexo: e.target.files })}
            />
            <Plus />
          </label>
        </div>

        <div className="mt-5 font-semibold flex flex-col gap-3">
          <div className="flex items-center justify-between  gap-2">
            <div className="flex items-center gap-2">
              <Swap size={22} />
              Reverse cards
            </div>
            <ToggleSwitch
              isChecked={fields.isReversed}
              handleToggle={() =>
                setFields({ ...fields, isReversed: !fields.isReversed })
              }
            />
          </div>

          <div className="flex gap-2 justify-between items-center">
            <div className="flex items-center gap-2">
              <TextAa size={22} />
              Dinamic examples
            </div>
            <ToggleSwitch
              isChecked={fields.dinamic_examples}
              handleToggle={() =>
                setFields({
                  ...fields,
                  dinamic_examples: !fields.dinamic_examples,
                })
              }
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};
