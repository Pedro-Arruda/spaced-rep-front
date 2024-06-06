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
import { CurrentCard } from "./CurrentCard";
import { handleSpeak } from "../../functions/handleSpeak";
import { useAuth } from "../../contexts/auth";
import { getAIResponse } from "../../functions/getAIResponse";

export const Study = () => {
  const { auth, updateAuth } = useAuth();
  const { state } = useLocation();
  const [cardsToStudy] = useState<ICard[]>(state.cardsToStudy || []);

  const [generatedExamples] = useState<Record<string, string>>({});

  const [barPercent, setBarPercent] = useState(40);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [currentCard, setCurrentCard] = useState<any>(null);
  const [cardSide, setCardSide] = useState<"front" | "back">("front");

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
    if (cardsToStudy.length > 0) {
      setBarPercent(Math.floor((currentCardIndex / cardsToStudy.length) * 100));
      setCurrentCard(cardsToStudy[currentCardIndex]);
    }
  }, [currentCardIndex, cardsToStudy]);

  const fetchDynamicExamples = async () => {
    const defaultPrompt = `
      Make a sentence for each word received, and also translate the sentence in the context in pt-br between (). 
      Don't ennumarate, just separate each sentence with a - and a '\n' and give only the sentence without the word itself`;

    const dinamicExamplesCards = cardsToStudy.filter(
      (card) => card.dinamic_examples
    );

    if (dinamicExamplesCards.length > 0) {
      const words = dinamicExamplesCards.map((card) => ` -${card.front}`);
      const prompt = words.join("");

      try {
        setIsLoading(true);
        const response: string = await getAIResponse(defaultPrompt + prompt);
        const splitted = response.split("- ");

        for (let i = 0; i < dinamicExamplesCards.length; i++) {
          const front = dinamicExamplesCards[i].front;
          const example = splitted[i + 1];

          generatedExamples[front] = example;
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    fetchDynamicExamples();
  }, []);

  const { items: levelsDifficult } =
    useFetchGet<ILevelsDifficult[]>("/levels-difficulty");

  if (cardsToStudy.length > 0 && currentCardIndex > cardsToStudy.length - 1)
    return <AllCardsStudied />;

  return (
    <>
      <Header />

      {isLoading ? (
        <div className="flex items-center mt-10 flex-col gap-4">
          <div className="loader " />
          <p className="font-semibold text-xl">
            Generating your dynamic examples...
          </p>
        </div>
      ) : (
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
                        generatedExamples={generatedExamples}
                      />
                      <CurrentCard
                        card={currentCard}
                        side="front"
                        onClickSound={handleSpeak}
                        generatedExamples={generatedExamples}
                      />
                    </>
                  )}
                </div>
              </div>

              {levelsDifficult &&
                (cardSide === "front" ? (
                  <ShowAnswerButton setCardSide={handleShowAnswer} />
                ) : (
                  <DifficultButtons
                    handleClick={handleClick}
                    levelsDifficult={levelsDifficult}
                    currentCard={currentCard}
                  />
                ))}
            </>
          )}
        </Container>
      )}
    </>
  );
};
