import classNames from "classnames";
import { SpeakerHigh } from "phosphor-react";

interface ICurrentCard {
  card: any;
  side: "front" | "back";
  onClickSound: (text: string) => void;
}

export const CurrentCard = ({ card, side, onClickSound }: ICurrentCard) => {
  return (
    <div
      className={classNames(
        "bg-container p-5 flex flex-col gap-5",
        side === "back" ? "flip-card-back" : "flip-card-front"
      )}
    >
      <div className="flex">
        <p className="font-bold text-2xl flex-1">{card[side]}</p>
        <SpeakerHigh
          size={32}
          className="cursor-pointer"
          onClick={() => onClickSound(card[side])}
        />
      </div>

      {side === "back" && card.imageUrl && (
        <div className="flex justify-center h-4/5">
          <img src={card.imageUrl} />
        </div>
      )}

      {card.generate_example && side === "back" && (
        <div className="flex flex-col items-center h-4/5">
          <p>{card.generate_example.split("(")[0]}</p>
          <p className="text-neutral-400">
            {card.generate_example
              .split("(")[1]
              .replace(")", "")
              .replaceAll("*", "")}
          </p>
        </div>
      )}
    </div>
  );
};
