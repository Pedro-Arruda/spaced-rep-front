export async function getChatGPTResponse(messages: IChatMessage[]) {
  const apiKey = import.meta.env.APP_AI_API_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  const formattedMessages = messages.filter(
    (message) => !("isLoading" in message)
  );

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-0125",
        messages: formattedMessages,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `Erro ao chamar a API do ChatGPT: ${response.status} - ${response.statusText}`
      );
    }

    const responseData = await response.json();
    return responseData.choices[0].message.content;
  } catch (error) {
    throw error;
  }
}
