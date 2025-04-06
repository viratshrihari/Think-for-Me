document.getElementById("ask").addEventListener("click", async () => {
  const question = document.getElementById("question").value.trim();
  const output = document.getElementById("output");

  if (!question) {
    output.textContent = "Please type a question first.";
    return;
  }

  output.textContent = "Thinking...";

  try {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer sk-MLdIp3L3R2rCOHADPNhJud347cZdckCIVUTpbYLy85VZ0ck7hV6Oio4YoQiDqcX6WiU-WUH-U2T3BlbkFJbpLFRr0CjeXdnFmvazIabMnexYyGdbfzYCIX95PE8SUQ88egKWEl7u2KEY3FJaZkYx5brrcSQA " // Replace with your actual key
      },
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 100,
        temperature: 0.7
      })
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      output.textContent = data.choices[0].text.trim();
    } else {
      output.textContent = "No response received.";
    }
  } catch (error) {
    console.error("Error:", error);
    output.textContent = "Something went wrong.";
  }
});
