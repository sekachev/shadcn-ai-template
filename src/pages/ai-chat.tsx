"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
} from "@/components/ai-elements/conversation";
import { Message } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputBody,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputSubmit,
} from "@/components/ai-elements/prompt-input";
import {
  ModelSelectorLogo,
} from "@/components/ai-elements/model-selector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Settings2Icon, Trash2Icon, Loader2Icon, ChevronDownIcon, BotIcon, UserIcon } from "lucide-react";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

interface OpenRouterModel {
  id: string;
  name: string;
  description?: string;
}

export default function AIChat() {
  const [apiKey, setApiKey] = useState("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [models, setModels] = useState<OpenRouterModel[]>([]);
  const [isLoadingModels, setIsLoadingModels] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"submitted" | "streaming" | undefined>(undefined);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [isLoadingChat, setIsLoadingChat] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("openrouter-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const fetchModels = useCallback(async (key: string) => {
    setIsLoadingModels(true);
    try {
      const response = await fetch("https://openrouter.ai/api/v1/models", {
        headers: {
          Authorization: `Bearer ${key}`,
        },
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch models");
      }
      
      const data = await response.json();
      const freeModels = data.data
        ?.filter((model: { id: string }) => model.id.endsWith(":free"))
        .map((model: { id: string; name?: string; description?: string }) => ({
          id: model.id,
          name: model.name || model.id,
        }))
        .slice(0, 20);
      
      setModels(freeModels || []);
      if (freeModels?.length > 0 && !selectedModel) {
        setSelectedModel(freeModels[0].id);
      }
    } catch (error) {
      console.error("Failed to fetch models:", error);
    } finally {
      setIsLoadingModels(false);
    }
  }, [selectedModel]);

  useEffect(() => {
    if (apiKey) {
      fetchModels(apiKey);
    }
  }, [apiKey, fetchModels]);

  const handleApiKeySave = useCallback((key: string) => {
    setApiKey(key);
    localStorage.setItem("openrouter-api-key", key);
    setShowApiKeyInput(false);
    fetchModels(key);
  }, [fetchModels]);

  const handleClearApiKey = useCallback(() => {
    setApiKey("");
    setModels([]);
    setSelectedModel("");
    localStorage.removeItem("openrouter-api-key");
  }, []);

  const handleModelSelect = useCallback((modelId: string) => {
    setSelectedModel(modelId);
  }, []);

  const handleSubmit = useCallback(
    async (message: PromptInputMessage) => {
      if (!apiKey.trim()) {
        setShowApiKeyInput(true);
        return;
      }

      if (!message.text.trim()) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: message.text,
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoadingChat(true);
      setStatus("submitted");

      const assistantMessageId = crypto.randomUUID();
      let assistantContent = "";

      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
        },
      ]);

      try {
        abortControllerRef.current = new AbortController();

        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${apiKey}`,
              "HTTP-Referer": "http://localhost:5174",
              "X-Title": "AI Chat Demo",
            },
            body: JSON.stringify({
              model: selectedModel,
              messages: [
                ...messages.map((m) => ({
                  role: m.role,
                  content: m.content,
                })),
                { role: "user", content: userMessage.content },
              ],
              stream: true,
            }),
            signal: abortControllerRef.current.signal,
          }
        );

        if (!response.ok) {
          let errorMessage = `HTTP ${response.status}`;
          try {
            const error = await response.json();
            errorMessage = error.error?.message || error.message || errorMessage;
          } catch {}
          throw new Error(errorMessage);
        }

        setStatus("streaming");
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();

        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");

            for (const line of lines) {
              if (line.startsWith("data: ")) {
                const data = line.slice(6);
                if (data === "[DONE]") continue;

                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content;
                  if (content) {
                    assistantContent += content;
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === assistantMessageId
                          ? { ...m, content: assistantContent }
                          : m
                      )
                    );
                  }
                } catch {
                  continue;
                }
              }
            }
          }
        }
      } catch (error) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error";
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMessageId
              ? {
                  ...m,
                  content: `Error: ${errorMessage}`,
                }
              : m
          )
        );
      } finally {
        setStatus(undefined);
        setIsLoadingChat(false);
        abortControllerRef.current = null;
      }
    },
    [apiKey, input, messages, selectedModel]
  );

  const handleStop = useCallback(() => {
    abortControllerRef.current?.abort();
    setStatus(undefined);
    setIsLoadingChat(false);
  }, []);

  const handleClearChat = useCallback(() => {
    setMessages([]);
  }, []);

  const currentModelName =
    models.find((m) => m.id === selectedModel)?.name || selectedModel || "Select Model";

  return (
    <div className="flex flex-col h-[calc(100vh-60px)]">
      <div className="flex items-center justify-between px-4 py-2.5 border-b bg-muted/30 shrink-0">
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8">
                <ModelSelectorLogo provider="openrouter" className="w-4 h-4 mr-1.5" />
                {isLoadingModels ? (
                  <Loader2Icon className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <span className="max-w-[180px] truncate">
                      {currentModelName || "Select Model"}
                    </span>
                    <ChevronDownIcon className="w-3.5 h-3.5 ml-1" />
                  </>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72 max-h-96 overflow-y-auto">
              {models.length === 0 && !isLoadingModels && (
                <div className="px-3 py-2 text-sm text-muted-foreground">
                  Add API key to load models
                </div>
              )}
              {isLoadingModels ? (
                <div className="px-3 py-2 text-sm text-muted-foreground flex items-center gap-2">
                  <Loader2Icon className="w-4 h-4 animate-spin" />
                  Loading models...
                </div>
              ) : (
                models.map((model) => (
                  <DropdownMenuItem
                    key={model.id}
                    onSelect={() => handleModelSelect(model.id)}
                    className="flex items-start gap-2 cursor-pointer py-2"
                  >
                    <ModelSelectorLogo provider="openrouter" className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="truncate text-sm font-medium">{model.name}</span>
                      <span className="text-xs text-muted-foreground truncate">{model.id}</span>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex items-center gap-1.5">
          {apiKey ? (
            <>
              <Badge variant="outline" className="gap-1.5 h-6 text-green-600 border-green-200 bg-green-50">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                Ready
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                className="h-8"
                onClick={() => setShowApiKeyInput(true)}
              >
                <Settings2Icon className="w-4 h-4 mr-1.5" />
                Settings
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => setShowApiKeyInput(true)}
            >
              <Settings2Icon className="w-4 h-4 mr-1.5" />
              Add API Key
            </Button>
          )}
          {messages.length > 0 && (
            <Button variant="ghost" size="sm" className="h-8" onClick={handleClearChat}>
              <Trash2Icon className="w-4 h-4 mr-1.5" />
              Clear
            </Button>
          )}
        </div>
      </div>

      <Conversation className="flex-1">
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              icon={
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <BotIcon className="w-8 h-8 text-primary" />
                </div>
              }
              title="Start a conversation"
              description="Select a free model and send a message to begin"
            />
          ) : (
            messages.map((message) => (
              <Message key={message.id} from={message.role}>
                <div
                  className={cn(
                    "flex gap-3",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div
                    className={cn(
                      "shrink-0 w-7 h-7 rounded-full flex items-center justify-center",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary/10 text-primary"
                    )}
                  >
                    {message.role === "user" ? (
                      <UserIcon className="w-4 h-4" />
                    ) : (
                      <BotIcon className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[75%] rounded-2xl px-4 py-2.5",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    {message.role === "user" ? (
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                    ) : message.content ? (
                      <div className="text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown
                          components={{
                            p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                            pre: ({ children }) => (
                              <pre className="bg-muted-foreground/10 rounded-lg p-3 overflow-x-auto mb-3">
                                {children}
                              </pre>
                            ),
                            code: ({ className, children }) => {
                              const isInline = !className;
                              return isInline ? (
                                <code className="bg-muted-foreground/10 rounded px-1 py-0.5 text-sm font-mono">
                                  {children}
                                </code>
                              ) : (
                                <code className={className}>{children}</code>
                              );
                            },
                            ul: ({ children }) => <ul className="list-disc list-inside mb-3">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-inside mb-3">{children}</ol>,
                            li: ({ children }) => <li className="mb-1">{children}</li>,
                            blockquote: ({ children }) => (
                              <blockquote className="border-l-2 border-primary/30 pl-3 italic mb-3">
                                {children}
                              </blockquote>
                            ),
                            a: ({ href, children }) => (
                              <a href={href} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                                {children}
                              </a>
                            ),
                            h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                            hr: () => <hr className="my-3 border-t border-muted-foreground/20" />,
                            strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                          }}
                        >
                          {message.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Loader2Icon className="w-3.5 h-3.5 animate-spin" />
                        Generating...
                      </span>
                    )}
                  </div>
                </div>
              </Message>
            ))
          )}
        </ConversationContent>
      </Conversation>

      <div className="border-t p-4 shrink-0">
        <div className="max-w-3xl mx-auto">
          <PromptInput onSubmit={handleSubmit}>
            <PromptInputBody>
              <PromptInputTextarea
                placeholder="Message a model..."
                value={input}
                onChange={(e) => setInput(e.currentTarget.value)}
                className="min-h-[48px] max-h-[200px] resize-none"
              />
            </PromptInputBody>
            <PromptInputFooter className="pt-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {isLoadingChat && (
                  <span className="flex items-center gap-1">
                    <Loader2Icon className="w-3 h-3 animate-spin" />
                    {status === "streaming" ? "Generating..." : "Loading..."}
                  </span>
                )}
              </div>
              <PromptInputSubmit
                status={status}
                disabled={!input.trim() || status !== undefined}
                onClick={(e) => {
                  if (status !== undefined) {
                    e.preventDefault();
                    handleStop();
                  }
                }}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>

      {showApiKeyInput && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-xl p-6 w-full max-w-md mx-4 shadow-xl">
            <h2 className="text-lg font-semibold mb-2">OpenRouter API Key</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Get your API key from{" "}
              <a
                href="https://openrouter.ai/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                openrouter.ai/keys
              </a>
              . Make sure to enable training data usage in privacy settings.
            </p>
            <div className="space-y-4">
              <div>
                <Label htmlFor="api-key" className="text-sm font-medium">API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="sk-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.currentTarget.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end gap-2">
                {apiKey && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleClearApiKey}
                  >
                    Clear Key
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowApiKeyInput(false)}
                >
                  Cancel
                </Button>
                <Button size="sm" onClick={() => handleApiKeySave(apiKey)}>
                  Save
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
