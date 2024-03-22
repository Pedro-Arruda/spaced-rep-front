import { useState } from "react";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { ChatMessage } from "./components/ChatMessage";
import { TalkingTopic } from "./components/TalkingTopic";
import { getChatGPTResponse } from "../../functions/getChatGPTResponse";
import { defaultTopics } from "../../utils/defaultIATopics";
import { Translator } from "./components/Translator";

export const TalkWithIA = () => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [inputUser, setInputUser] = useState<string>("");

  const handleClickTopic = async (IAPrompt: string) => {
    setMessages([{ role: "system", content: "", isLoading: true }]);

    const response = await getChatGPTResponse([
      { role: "user", content: IAPrompt },
    ]);

    messages.pop();

    setMessages([{ role: "system", content: response }]);
  };

  const handleOnKeyUp = async (key: string, content: string) => {
    if (key === "Enter") {
      messages.push({ role: "user", content });
      setInputUser("");

      messages.push({ role: "system", isLoading: true, content: "" });
      const response = await getChatGPTResponse(messages);
      messages.pop();

      setMessages([...messages, { role: "system", content: response }]);
    }
  };

  return (
    <>
      <Header />
      <Container classname="flex flex-col justify-between h-[85vh]">
        <div className="my-6 flex flex-wrap gap-7 text-lg">
          {defaultTopics.map((topic) => (
            <TalkingTopic
              topic={topic}
              handleClickTopic={(prompt) => handleClickTopic(prompt)}
            />
          ))}
        </div>

        <div className="flex-1 flex relative justify-between gap-10  mt-3 py-3 px-5 overflow-y-auto">
          <div className="flex flex-col gap-5">
            {messages.map(({ content, role, isLoading }, i) => (
              <ChatMessage
                role={role}
                content={content}
                key={i}
                isLoading={isLoading}
              />
            ))}
          </div>

          <Translator />
        </div>

        <div className="flex mt-3 w-4/6">
          <input
            placeholder="Type your answer..."
            className="rounded-md py-3 px-5 w-full outline-none bg-neutral-800"
            value={inputUser}
            onChange={(e) => setInputUser(e.target.value)}
            onKeyUp={(e) => handleOnKeyUp(e.key, inputUser)}
          />
        </div>
      </Container>
    </>
  );
};
