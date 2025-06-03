import React, { useState } from "react";
import axios from "axios";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      // OpenAI API call placeholder
      // Replace YOUR_API_KEY with your OpenAI API key
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: question }],
          max_tokens: 500
        },
        {
          headers: {
            Authorization: `Bearer YOUR_API_KEY`,
            "Content-Type": "application/json"
          }
        }
      );
      setAnswer(response.data.choices[0].message.content);
    } catch (error) {
      setAnswer("माफ़ कीजिए, कुछ समस्या हुई है। कृपया बाद में प्रयास करें।");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">AI Teacher</h1>
      <textarea
        rows={4}
        placeholder="अपना सवाल यहाँ लिखें..."
        className="w-full max-w-xl p-3 border rounded mb-4"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "पढ़ा रहा है..." : "पूछें"}
      </button>
      {answer && (
        <div className="mt-6 max-w-xl bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-2">उत्तर:</h2>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
