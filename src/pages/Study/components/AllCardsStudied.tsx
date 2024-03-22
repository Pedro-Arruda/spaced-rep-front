import { ArrowRight } from "phosphor-react";
import { Button } from "../../../components/Button";
import { Container } from "../../../components/Container";
import { Header } from "../../../components/Header";
import { useNavigate } from "react-router";

export const AllCardsStudied = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />

      <Container classname="flex flex-col justify-between h-[85vh]">
        <div className="bg-container flex flex-col items-center gap-3 p-5 mt-6">
          <div>
            <h1 className="text-center font-bold text-3xl">Congratulations!</h1>
            <p className="text-center mt-2 text-neutral-400">You study all of your cards for now, will be more soon...</p>
          </div>
          <Button className="mt-3 py-3 w-max" onClick={() => navigate('/')}>
            Go back to home
            <ArrowRight />
          </Button>
        </div>
      </Container>
    </>
  );
}