import { useState } from "react";
import { ModalAddCard } from "./components/ModalAddCard";
import { Header } from "../../components/Header";
import { CardToStudy } from "./components/CardsToStudy";
import { AllCards } from "./components/AllCards";
import { Container } from "../../components/Container";
import { fetchApi } from "../../functions/fetchApi";
import { successToast } from "../../components/Toast";
import { useAuth } from "../../contexts/auth";
import { useFetchGet } from "../../hook/useFetchGet";
import { ModalEditCard } from "./components/ModalEditCard";
import { ModalDeleteCard } from "./components/ModalDeleteCard";

interface IFields {
  front: string;
  back: string;
  isReversed: boolean;
  dinamic_examples: boolean;
  anexo: any | null;
}

export const Home = () => {
  const { auth, updateAuth } = useAuth();

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  const [cardId, setCardId] = useState<ICard["card_id"]>();

  let { items: cards, refetch } = useFetchGet<ICard[]>("/cards");
  if (!cards) cards = [];

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

      await fetchApi("/cards", formData, auth!, updateAuth);
    }

    const formData = new FormData();
    formData.append("front", fields.front);
    formData.append("back", fields.back);
    formData.append("user_id", String(auth?.user.user_id));
    formData.append("dinamic_examples", String(fields.dinamic_examples));

    if (fields.anexo && fields.anexo.length > 0)
      formData.append("anexo", fields.anexo[0]);

    await fetchApi("/cards", formData, auth!, updateAuth);

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

  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append("front", fields.front);
    formData.append("back", fields.back);
    formData.append("user_id", String(auth?.user.user_id));
    formData.append("dinamic_examples", String(fields.dinamic_examples));

    if (fields.anexo && fields.anexo.length > 0)
      formData.append("anexo", fields.anexo[0]);

    await fetchApi(
      `/cards/${cardId}`,
      fields,
      auth!,
      updateAuth,
      "PATCH",
      "application/json"
    );

    setFields({
      front: "",
      back: "",
      anexo: null,
      isReversed: fields.isReversed,
      dinamic_examples: fields.dinamic_examples,
    });

    successToast("Card edited successfully!");

    refetch();
  };

  const handleDeleteSubmit = async () => {
    const formData = new FormData();

    if (fields.anexo && fields.anexo.length > 0)
      formData.append("anexo", fields.anexo[0]);

    const url = new URL(`/cards/${cardId}`, import.meta.env.APP_API_URL);

    await fetch(url, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${auth?.accessToken}`,
      },
    });
    successToast("Card deleted successfully!");
    setIsOpenDeleteModal(false);

    refetch();
  };

  const handleEdit = (cardId: ICard["card_id"]) => {
    setIsOpenEditModal(true);
    setCardId(cardId);
  };

  const handleDelete = (cardId: ICard["card_id"]) => {
    setIsOpenDeleteModal(true);
    setCardId(cardId);
  };

  return (
    <>
      {isOpenAddModal && (
        <ModalAddCard
          fields={fields}
          setFields={setFields}
          handleSubmit={handleSubmit}
          setIsOpenModal={setIsOpenAddModal}
        />
      )}

      {isOpenEditModal && (
        <ModalEditCard
          fields={fields}
          setFields={setFields}
          handleSubmit={handleEditSubmit}
          setIsOpenModal={setIsOpenEditModal}
          cardId={cardId}
        />
      )}

      {isOpenDeleteModal && (
        <ModalDeleteCard
          fields={fields}
          handleDelete={handleDeleteSubmit}
          setIsOpenModal={setIsOpenDeleteModal}
        />
      )}

      <Header />

      <Container>
        <CardToStudy
          cardsToStudy={cards.filter((card) => +card.studyAt < Date.now())}
          setIsOpenModal={setIsOpenAddModal}
        />

        <AllCards cards={cards} onEdit={handleEdit} onDelete={handleDelete} />
      </Container>
    </>
  );
};
