"use client";
import { useChat } from "ai/react";
import { MessageComponent } from "@/components/analyst/message";
import { FileText, PlayIcon, PlusIcon, X } from "lucide-react";
import { extractCodeFromText } from "@/lib/code";
//import Logo from "@/components/logo";
import { useEffect, useState } from "react";
import modelsList from "@/lib/models.json";
import { LLMModelConfig } from "@/lib/model";
import { LLMPicker } from "@/components/analyst/llm-picker";
import { LLMSettings } from "@/components/analyst/llm-settings";
import { useLocalStorage } from "usehooks-ts";
import { preProcessFile } from "@/lib/preprocess";
//import Image from "next/image";
const Home =()=> {
  const [files, setFiles] = useState<File[]>([]);
  const filesData = files.map(async (file) => {
    return {
      name: file.name,
      contentType: file.type,
      content: await preProcessFile(file),
    };
  });

  const exampleMessages = [
    "Person's age born in 2001 as line",
    "Analyze letters in word strawberry",
    "Plot a chart of the last 10 years of the S&P 500",
    "Calculate the average of the first 100 numbers",
    "Analyze P vs V graph and find the slope",
    "Analyzing Runs of Virat Kohli since 2020",
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [languageModel, setLanguageModel] = useLocalStorage<LLMModelConfig>(
    "languageModel",
    {
      model: "accounts/fireworks/models/llama-v3p1-70b-instruct",
    }
  );

  const currentModel = modelsList.models.find(
    (model) => model.id === languageModel.model
  );

  function handleLanguageModelChange(e: LLMModelConfig) {
    setLanguageModel({ ...languageModel, ...e });
  }

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    setInput,
  } = useChat({
    // Fake tool call
    onFinish: async (message) => {
      const code = extractCodeFromText(message.content);
      if (code) {
        const res = await fetch("/api/sandbox", {
          method: "POST",
          body: JSON.stringify({ code, files: await Promise.all(filesData) }),
        });

        const result = await res.json();

        // add tool call result to the last message
        message.toolInvocations = [
          {
            state: "result",
            toolCallId: message.id,
            toolName: "runCode",
            args: code,
            result,
          },
        ];
        setMessages((prev) => {
          // replace last message with the new message
          return [...prev.slice(0, -1), message];
        });
      }

      setIsLoading(false);
    },
  });

  useEffect(() => {
    const messagesElement = document.getElementById("messages");
    if (messagesElement) {
      messagesElement.scrollTop = messagesElement.scrollHeight;
    }
  }, [messages]);

  function handleFileInput(e: React.ChangeEvent<HTMLInputElement>) {
    setFiles((prev) => [...prev, ...Array.from(e.target.files || [])]);
  }

  function handleFileRemove(file: File) {
    setFiles((prev) => prev.filter((f) => f !== file));
  }

  async function customSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!currentModel) throw Error("No model is selected.");
    setIsLoading(true);
    handleSubmit(e, {
      data: {
        files: await Promise.all(filesData),
        model: currentModel,
        config: languageModel,
      },
    });
  }

  return (
    <div className="flex flex-col bg-black min-h-screen max-h-screen">
      
      <div className="flex-1 overflow-y-auto pt-14" id="messages">
        {messages.map((m) => (
          <MessageComponent key={m.id} message={m} />
        ))}
      </div>

      <div className="mb-4 mx-4">
        <div className="mx-auto w-full max-w-2xl flex flex-col gap-2">
          <div className="flex gap-2 overflow-x-auto">
            {files.map((file) => (
              <div
                key={file.name}
                className="flex items-center gap-2 p-1.5 border rounded-lg bg-slate-100 text-white"
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleFileRemove(file)}
                  className="cursor-pointer"
                  disabled={isLoading}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          {messages.length === 0 && files.length === 0 && (
            <div className="flex gap-2 overflow-x-auto">
              {exampleMessages.map((msg) => (
                <button
                  key={msg}
                  className="flex items-center gap-2 p-1.5 border rounded-lg text-white"
                  onClick={() => setInput(msg)}
                >
                  <span className="text-sm truncate">{msg}</span>
                </button>
              ))}
            </div>
          )}
          <div className="flex gap-2 justify-between items-end">
            <div className="flex gap-2">
              <LLMPicker
                models={modelsList.models}
                languageModel={languageModel}
                onLanguageModelChange={handleLanguageModelChange}
              />
              <LLMSettings
                apiKeyConfigurable={!process.env.NEXT_PUBLIC_NO_API_KEY_INPUT}
                baseURLConfigurable={!process.env.NEXT_PUBLIC_NO_BASE_URL_INPUT}
                languageModel={languageModel}
                onLanguageModelChange={handleLanguageModelChange}
              />
            </div>
            {isLoading && (
              <span className="text-xs text-violet-500">Loading…</span>
            )}
          </div>
          <form
            onSubmit={customSubmit}
            className="flex border p-1 border-1.5 border-violet-500 rounded-xl overflow-hidden shadow-md"
          >
            <input
              type="file"
              id="multimodal"
              name="multimodal"
              accept=".txt,.csv,.json,.md,.py"
              multiple={true}
              className="hidden"
              onChange={handleFileInput}
            />
            <button
              type="button"
              className="border border-violet-500 p-1.5 rounded-lg hover:bg-violet-500 text-violet-500 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("multimodal")?.click();
              }}
            >
              <PlusIcon className="w-5 h-5" />
            </button>
            <input
              autoFocus
              required
              className="w-full px-2 outline-none "
              value={input}
              placeholder="Enter your prompt..."
              onChange={handleInputChange}
            />
            <button
              type="submit"
              className="bg-violet-700 text-white p-1.5 rounded-lg hover:bg-white hover:text-violet-700"
            >
              <PlayIcon className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Home;