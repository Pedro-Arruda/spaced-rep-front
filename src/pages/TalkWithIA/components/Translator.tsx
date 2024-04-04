import { Swap } from "phosphor-react";
import { fetchApi } from "../../../functions/fetchApi";
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/auth";

export const Translator = () => {
  const { auth, updateAuth } = useAuth();

  const [fields, setFields] = useState({
    originalText: "",
    translatedText: "",
    originalLanguage: "en",
    translatedLanguage: "pt",
  });

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (fields.originalText !== "") {
        const response = fetchApi(
          "/translation",
          { text: fields.originalText, language: fields.translatedLanguage },
          auth!,
          updateAuth,
          "POST",
          "application/json"
        );

        const data: any = (await response).data;
        setFields({ ...fields, translatedText: data.translation });
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [fields.originalText, 500]);

  return (
    <div className="lg:flex flex-col justify-center hidden items-center gap-3 bg-neutral-900 h-max pt-2 pb-5 px-5 rounded-md border-[1px] border-neutral-700">
      <p className="text-lg">Translator</p>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3">
          <select
            className="px-2 py-1.5 w-full text-base rounded-md bg-neutral-800 border-[1px] border-neutral-700"
            value={fields.originalLanguage}
          >
            <option value="pt">Portuguese</option>
            <option value="en">English</option>
          </select>
          <textarea
            rows={5}
            placeholder="Type your word"
            onChange={(e) =>
              setFields({ ...fields, originalText: e.target.value })
            }
            className="w-80 rounded-md py-1 px-3 outline-none text-base resize-none bg-neutral-800 border-[1px] border-neutral-700"
          />
        </div>
        <div className="flex justify-center">
          <Swap
            className="mt-1.5 rotate-90 cursor-pointer"
            size={26}
            onClick={() =>
              setFields({
                originalLanguage: fields.translatedLanguage,
                translatedLanguage: fields.originalLanguage,
                originalText: fields.translatedText,
                translatedText: fields.originalText,
              })
            }
          />
        </div>
        <div className="flex flex-col gap-3">
          <select
            className="px-2 py-1.5 w-full text-base rounded-md bg-neutral-800 border-[1px] border-neutral-700"
            value={fields.translatedLanguage}
          >
            <option value="en">English</option>
            <option value="pt">Portuguese</option>
          </select>
          <textarea
            rows={5}
            onChange={(e) =>
              setFields({ ...fields, translatedText: e.target.value })
            }
            value={fields.translatedText}
            placeholder="Translation"
            className="rounded-md py-1 px-3 outline-none text-base resize-none bg-neutral-800 border-[1px] border-neutral-700"
          />
        </div>
      </div>
    </div>
  );
};
