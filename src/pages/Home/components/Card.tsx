import {
  Clock,
  DotsThreeVertical,
  Notebook,
  Pencil,
  Swap,
  Trash,
} from "phosphor-react";
import { dateFormatWithHours } from "../../../functions/dateFormat";
import { useEffect, useState } from "react";

interface ICardProps {
  card: ICard;
  onEdit: (cardId: ICard["card_id"]) => void;
  onDelete: (cardId: ICard["card_id"]) => void;
}

export const Card = ({ card, onEdit, onDelete }: ICardProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const availableToStudy = +card.studyAt < Date.now();

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleOutsideClick = () => {
    setIsOpenModal(false);
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      setIsOpenModal(false);
    });
  }, []);

  return (
    <div
      className="mt-3 bg-neutral-800 border-[0.25px] border-neutral-700 rounded-md py-2 px-3"
      onClick={handleOutsideClick}
    >
      <div className="flex items-center gap-2 justify-between text-base text-neutral-400 font-bold">
        <div className="flex gap-2 items-center">
          {availableToStudy ? (
            <Notebook size={18} />
          ) : (
            <Clock weight="bold" size={18} />
          )}
          {availableToStudy
            ? "Ready to study!"
            : `Study at ${dateFormatWithHours(
                new Date(+card.studyAt).toString()
              )}`}
        </div>
        <div>
          <div className="sm:flex items-center gap-2 hidden">
            <Swap size={18} />
            <p>Reversed</p>
            <DotsThreeVertical
              size={24}
              weight="bold"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setIsOpenModal(!isOpenModal);
              }}
            />
          </div>
          {isOpenModal && (
            <div
              className="bg-neutral-700 border-2 border-neutral-600 w-[150px] mt-2 absolute rounded-md"
              onClick={handleModalClick}
            >
              <div
                className="flex gap-2 items-center cursor-pointer hover:bg-neutral-600 px-2 py-1"
                onClick={() => {
                  setIsOpenModal(false);
                  onEdit(card.card_id);
                }}
              >
                <Pencil />
                <p>Edit </p>
              </div>

              <div
                className="flex gap-2 items-center cursor-pointer hover:bg-neutral-600 px-2 py-1"
                onClick={() => {
                  setIsOpenModal(false);
                  onDelete(card.card_id);
                }}
              >
                <Trash />
                <p>Delete </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="text-base">{card.front}</p>
      <p className="text-sm text-neutral-400">{card.back}</p>
    </div>
  );
};
