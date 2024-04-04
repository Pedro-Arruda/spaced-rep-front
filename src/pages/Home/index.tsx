import { useState } from "react";
import { ModalAddCard } from "./components/ModalAddCard";
import { Header } from "../../components/Header";
import { CardToStudy } from "./components/CardsToStudy";
import { AllCards } from "./components/AllCards";
import { Container } from "../../components/Container";
import { useFetchGet } from "../../hook/useFetchGet";
import { fetchApi } from "../../functions/fetchApi";
import { successToast } from "../../components/Toast";
import { useAuth } from "../../contexts/auth";

interface IFields {
  front: string;
  back: string;
  isReversed: boolean;
  dinamic_examples: boolean;
  anexo: any | null;
}

export const Home = () => {
  const { auth, updateAuth } = useAuth();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const { items: cards, refetch } = useFetchGet<ICard>("/cards");
  let cardsToStudy = cards;

  if (cards && cards.length > 0) {
    cards.filter((card) => Number(card.studyAt) < Date.now());
  }

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
      formData.append("user_id", String(auth?.user.user_id));

      if (fields.anexo && fields.anexo.length > 0)
        formData.append("anexo", fields.anexo[0]);
      await fetchApi("/cards", formData, auth!, updateAuth, "POST");
    }

    const formData = new FormData();
    formData.append("front", fields.front);
    formData.append("back", fields.back);
    formData.append("user_id", String(auth?.user.user_id));
    formData.append("dinamic_examples", String(fields.dinamic_examples));

    if (fields.anexo && fields.anexo.length > 0)
      formData.append("anexo", fields.anexo[0]);

    await fetchApi("/cards", formData, auth!, updateAuth, "POST");

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
