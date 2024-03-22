import { Note, Plus } from "phosphor-react";
import { Button } from "../../../components/Button";
import { useNavigate } from "react-router";

interface ICardToStudy {
  setIsOpenModal: (isOpenModal: boolean) => void;
  cardsToStudy: ICard[];
}

export const CardToStudy = ({ cardsToStudy, setIsOpenModal }: ICardToStudy) => {
  const navigate = useNavigate();

  return (
    <div className="bg-container mt-5 p-5 rounded-md">
      <div className=" flex justify-between">
        <div className="flex items-center gap-3">
          <Note size={24} />
          Cards to Study ( {cardsToStudy.length} )
        </div>
        <Button onClick={() => setIsOpenModal(true)}>
          <p>Add card</p> <Plus weight="bold" />
        </Button>
      </div>

      <Button
        variant="secondary"
        className="mt-5 py-3 w-full"
        onClick={() => navigate("/study", { state: { cardsToStudy } })}
      >
        Study!
      </Button>
    </div>
  );
};
