import { Clock, Notebook, Swap } from "phosphor-react";
import { dateFormatWithHours } from "../../../functions/dateFormat";

interface ICardProps {
  card: ICard;
}

export const Card = ({ card }: ICardProps) => {
  const availableToStudy = +card.studyAt < Date.now();

  return (
    <div className="mt-3 bg-neutral-800 border-[0.25px] border-neutral-700 rounded-md py-2 px-3">
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
        <div className="sm:flex items-center gap-2 hidden">
          <Swap size={18} />
          <p>Reversed</p>
        </div>
      </div>

      <p className="text-base">{card.front}</p>
      <p className="text-sm text-neutral-400">{card.back}</p>
    </div>
  );
};
