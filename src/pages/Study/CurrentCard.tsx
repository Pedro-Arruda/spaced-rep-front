import classNames from "classnames";
import { SpeakerHigh } from "phosphor-react";

interface ICardToShow extends ICard {
  generate_example?: string;
}

interface ICurrentCard {
  card: ICardToShow;
  side: "front" | "back";
  onClickSound: (text: string) => void;
  generatedExamples: Record<string, string>;
}

export const CurrentCard = ({
  card,
  side,
  onClickSound,
  generatedExamples,
}: ICurrentCard) => {
  let example = "";
  let translation = "";

  if (card.dinamic_examples && card.front in generatedExamples) {
    example = generatedExamples[card["front"]].split("(")[0];
    translation = generatedExamples[card["front"]]
      .split("(")[1]
      .replace(")", "");
  }

  console.log(generatedExamples);

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

      {example && translation && side === "back" && (
        <div className="flex flex-col items-center h-4/5">
          <p>{example}</p>
          <p className="text-neutral-400">{translation}</p>
        </div>
      )}
    </div>
  );
};
