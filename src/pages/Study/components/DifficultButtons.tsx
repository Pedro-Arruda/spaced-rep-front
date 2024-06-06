interface IDifficultButtons {
  handleClick: (studyAt: number, level: number) => void;
  levelsDifficult: ILevelsDifficult[];
  currentCard: ICard;
}

export const DifficultButtons = ({
  handleClick,
  levelsDifficult,
  currentCard,
}: IDifficultButtons) => {
  const currentDifficults = levelsDifficult.find(
    (level) => level.level_id === currentCard.level_difficulty_id
  );

  const convertTimeToMilisseconds = (time: string) => {
    const value = Number(time.slice(0, -1));

    switch (time.slice(-1)) {
      case "s":
        return value * 1000;
      case "m":
        return value * 60 * 1000;
      case "h":
        return value * 60 * 60 * 1000;
      case "d":
        return value * 24 * 60 * 60 * 1000;
      default:
        return 0;
    }
  };

  return (
    <div className="bg-container py-4 px-5 mt-6 w-full lg:w-2/4 mx-auto flex lg:justify-between flex-wrap gap-3">
      <button
        className="px-11 text-xs sm:text-base py-1 w-full lg:w-max rounded-md bg-red-500"
        onClick={() => handleClick(convertTimeToMilisseconds("1m"), 0)}
      >
        <p>Again</p>
        <p>1m</p>
      </button>

      <button
        className="px-11 text-xs sm:text-base py-2 w-full lg:w-max rounded-md bg-orange-500"
        onClick={() =>
          handleClick(
            convertTimeToMilisseconds(currentDifficults?.hard || "0"),
            -1
          )
        }
      >
        <p>Hard</p>
        <p>{currentDifficults?.hard || "5m"}</p>
      </button>

      <button
        className="px-11 text-xs sm:text-base py-2 w-full lg:w-max rounded-md bg-blue-500"
        onClick={() =>
          handleClick(
            convertTimeToMilisseconds(currentDifficults?.regular || "0"),
            0
          )
        }
      >
        <p>Regular</p>
        <p>{currentDifficults?.regular || "30m"}</p>
      </button>

      <button
        className="px-11 text-xs sm:text-base py-2 w-full lg:w-max rounded-md bg-green-500"
        onClick={() =>
          handleClick(
            convertTimeToMilisseconds(currentDifficults?.easy || "0"),
            +1
          )
        }
      >
        <p>Easy</p>
        <p>{currentDifficults?.easy || "2h"}</p>
      </button>
    </div>
  );
};
