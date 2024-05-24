import { useState } from "react";
import { Container } from "../../components/Container";
import { Header } from "../../components/Header";
import { ChatMessage } from "./components/ChatMessage";
import { TalkingTopic } from "./components/TalkingTopic";
import { defaultTopics } from "../../utils/defaultIATopics";
import { Translator } from "./components/Translator";
import { startAIChat } from "../../functions/startAIChat";

export const TalkWithIA = () => {
  const [messages, setMessages] = useState<IChatMessage[]>([]);
  const [inputUser, setInputUser] = useState<string>("");

  const handleClickTopic = async (IAPrompt: string) => {
    setMessages([{ role: "system", parts: "", isLoading: true }]);

    const response = await startAIChat(messages, IAPrompt);

    messages.pop();

    setMessages([{ role: "system", parts: response }]);
  };

  const handleOnKeyUp = async (key: string, content: string) => {
    if (key === "Enter") {
      messages.push({ role: "user", parts: content });
      setInputUser("");

      messages.push({ role: "system", isLoading: true, parts: "" });
      const response = await startAIChat(messages, content);
      messages.pop();

      setMessages([...messages, { role: "system", parts: response }]);
    }
  };

  return (
    <>
      <Header />
      <Container classname="flex flex-col justify-between h-[85vh]">
        <div className="my-6 md:flex flex-wrap gap-5 text-lg hidden">
          {defaultTopics.map((topic, i) => (
            <TalkingTopic
              key={i}
              topic={topic}
              handleClickTopic={(prompt) => handleClickTopic(prompt)}
            />
          ))}
        </div>

        <div className="flex-1 flex relative justify-between gap-10  mt-3 py-3 overflow-y-auto">
          <div className="flex flex-col gap-5">
            {messages.map(({ parts, role, isLoading }, i) => (
              <ChatMessage
                role={role}
                parts={parts}
                key={i}
                isLoading={isLoading}
              />
            ))}
          </div>

          <Translator />
        </div>

        <div className="flex mt-3 lg:w-4/6">
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
