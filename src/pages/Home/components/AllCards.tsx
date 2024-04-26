import { List } from "phosphor-react";
import { Card } from "./Card";

interface IAllCards {
  cards: ICard[];
  onEdit: (cardId: ICard["card_id"]) => void;
  onDelete: (cardId: ICard["card_id"]) => void;
}

export const AllCards = ({ cards, onEdit, onDelete }: IAllCards) => {
  return (
    <div className="bg-container mt-5 p-5 rounded-md">
      <div className="flex items-center gap-3">
        <List size={24} />
        All cards ( {cards.length} )
      </div>

      {cards.length > 0 &&
        cards
          .sort((a, b) => (a.studyAt > b.studyAt ? 0 : -1))
          .map((card) => (
            <Card
              card={card}
              key={card.studyAt}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
    </div>
  );
};
