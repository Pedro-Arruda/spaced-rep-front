import { Button } from "../../../components/Button";

interface IShowAnswerButton {
  setCardSide: (side: 'back' | 'front') => void
}

export const ShowAnswerButton = ({ setCardSide }: IShowAnswerButton) => {
  return (
    <div className="flex justify-center w-full mt-6">
      <Button variant="secondary" className="py-4 px-16" onClick={() => setCardSide('front')}>
        Show answer
      </Button>
    </div>
  );
}