import { useState } from "react";
import { ModalAddCard } from "./components/ModalAddCard";
import { Header } from "../../components/Header";
import { CardToStudy } from "./components/CardsToStudy";
import { AllCards } from "./components/AllCards";
import { Container } from "../../components/Container";
import { useFetchGet } from "../../hook/useFetchGet";
import { fetchApi } from "../../functions/fetchApi";
import { successToast } from "../../components/Toast";

interface IFields {
  front: string;
  back: string;
  isReversed: boolean;
  dinamic_examples: boolean;
  anexo: any | null;
}

export const Home = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { items: cards, refetch } = useFetchGet<ICard>("/cards");
  const cardsToStudy = cards.filter(
    (card) => Number(card.studyAt) < Date.now()
  );

  const [fields, setFields] = useState<IFields>({
    front: "",
    back: "",
    anexo: null,
    isReversed: false,
    dinamic_examples: false,
  });

  const handleSubmit = async () => {
    if (fields.isReversed) {
      const formData = new FormData();
      formData.append("front", fields.back);
      formData.append("back", fields.front);

      if (fields.anexo && fields.anexo.length > 0)
        formData.append("anexo", fields.anexo[0]);
      await fetchApi("/cards", formData, "POST");
    }

    const formData = new FormData();
    formData.append("front", fields.front);
    formData.append("back", fields.back);
    formData.append("dinamic_examples", String(fields.dinamic_examples));

    if (fields.anexo && fields.anexo.length > 0)
      formData.append("anexo", fields.anexo[0]);

    await fetchApi("/cards", formData, "POST");

    setFields({
      front: "",
      back: "",
      anexo: null,
      isReversed: fields.isReversed,
      dinamic_examples: fields.dinamic_examples,
    });
    successToast("Card added successfully!");

    refetch();
  };

  return (
    <>
      {isOpenModal && (
        <ModalAddCard
          fields={fields}
          setFields={setFields}
          handleSubmit={handleSubmit}
          setIsOpenModal={setIsOpenModal}
        />
      )}

      <Header />

      <Container>
        <CardToStudy
          cardsToStudy={cardsToStudy}
          setIsOpenModal={setIsOpenModal}
        />

        <AllCards cards={cards} />
      </Container>
    </>
  );
};
