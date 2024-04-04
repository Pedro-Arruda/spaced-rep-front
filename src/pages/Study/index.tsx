import { useEffect, useState } from "react";
import { useFetchGet } from "../../hook/useFetchGet";
import { Header } from "../../components/Header";
import { Container } from "../../components/Container";
import classNames from "classnames";
import { ShowAnswerButton } from "./components/ShowAnswerButton";
import { DifficultButtons } from "./components/DifficultButtons";
import { fetchApi } from "../../functions/fetchApi";
import { AllCardsStudied } from "./components/AllCardsStudied";
import { useLocation } from "react-router";
import { getChatGPTResponse } from "../../functions/getChatGPTResponse";
import { CurrentCard } from "./CurrentCard";
import { handleSpeak } from "../../functions/handleSpeak";
import { useAuth } from "../../contexts/auth";

export const Study = () => {
  const { auth, updateAuth } = useAuth();
  const { state } = useLocation();
  const [cardsToStudy, setCardsToStudy] = useState<any[]>(state.cardsToStudy);
  const [barPercent, setBarPercent] = useState(40);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState<any>(
    cardsToStudy[currentCardIndex]
  );
  const [cardSide, setCardSide] = useState<"front" | "back">("front");
  const [dinamicExamples, setDinamicExamples] = useState<string[]>([]);
  const { items: levelsDifficult } =
    useFetchGet<ILevelsDifficult>("/levels-difficulty");

  const handleClick = (studyAt: number, level: number) => {
    const url = `/cards/${currentCard["card_id"]}`;
    studyAt = Date.now() + studyAt;

    const body: any = {
      studyAt: String(studyAt),
    };

    const condition = currentCard["level_difficulty_id"] === 1 && level === -1;

    if (level !== 0 && !condition) {
      body["level_difficulty_id"] = currentCard["level_difficulty_id"] + level;
    }

    fetchApi(url, body, auth!, updateAuth, "PATCH", "application/json");

    setCardSide("front");
    setCurrentCardIndex(currentCardIndex + 1);
  };

  const handleShowAnswer = () => {
    setCardSide("back");
  };

  useEffect(() => {
    if (cardsToStudy) {
      setBarPercent(Math.floor((currentCardIndex / cardsToStudy.length) * 100));
    }
    setCurrentCard(cardsToStudy[currentCardIndex]);
  }, [currentCardIndex, cardsToStudy]);

  useEffect(() => {
    const defaultPrompt =
      "Make a sentence for each word received. Enumarate each sentence";

    const fetchData = async () => {
      const reverseExamplesCards = cardsToStudy.filter(
        (card) => card.dinamic_examples
      );
      if (reverseExamplesCards && reverseExamplesCards.length > 0) {
        const words = reverseExamplesCards.map((card) => ` -${card.front}`);
        const prompt = words.join("");
        const response = await getChatGPTResponse([
          { role: "user", content: defaultPrompt + prompt },
        ]);
        setDinamicExamples(
          response
            .split(/\d+\./)
            .filter((example: string) => example.trim() !== "")
        );
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const reverseExamplesCards = cardsToStudy.filter(
      (card) => card.dinamic_examples
    );
    const noReverseExamplesCards = cardsToStudy.filter(
      (card) => !card.dinamic_examples
    );
    const cardsWithExamples: ICard[] = reverseExamplesCards.map(
      (card, index) => ({
        ...card,
        ...(dinamicExamples &&
          dinamicExamples.length > 0 && {
            generate_example: dinamicExamples[index].replace("\n", "").trim(),
          }),
      })
    );
    setCardsToStudy([...cardsWithExamples, ...noReverseExamplesCards]);
  }, [dinamicExamples]);

  if (currentCardIndex > cardsToStudy.length - 1) {
    return <AllCardsStudied />;
  }

  return (
    <>
      <Header />

      <Container classname="flex flex-col justify-between h-[85vh]">
        {cardsToStudy && cardsToStudy.length > 0 && (
          <>
            <div className="bg-container p-5 mt-6 flex justify-between items-center gap-5">
              <p>Cards</p>
              <div className="flex-1 relative h-5">
                <div className="bg-neutral-600 absolute top-[2px] h-5 w-full rounded-md" />
                <div
                  className={`bg-green-500 absolute top-[2px] h-5  rounded-md wid-${barPercent}`}
                />
              </div>
              <p>
                {currentCardIndex} / {cardsToStudy.length}
              </p>
            </div>

            <div className="flex-1 w-full mt-6">
              <div
                className={classNames(
                  "relative h-full w-full flip-card flip-card-inner",
                  cardSide === "back" && "rotate"
                )}
              >
                {currentCard && (
                  <>
                    <CurrentCard
                      card={currentCard}
                      side="back"
                      onClickSound={handleSpeak}
                    />
                    <CurrentCard
                      card={currentCard}
                      side="front"
                      onClickSound={handleSpeak}
                    />
                  </>
                )}
              </div>
            </div>

            {cardSide === "front" ? (
              <ShowAnswerButton setCardSide={handleShowAnswer} />
            ) : (
              <DifficultButtons
                handleClick={handleClick}
                levelsDifficult={levelsDifficult}
                currentCard={currentCard}
              />
            )}
          </>
        )}
      </Container>
    </>
  );
};
