// app/generate/page.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Send,
  Sparkles,
  User,
  Bot,
  Loader2,
  Trash2,
  Copy,
  Check,
} from "lucide-react";
import { Breadcrumb } from "@/components/Breadcrumb";
import { courseAPI } from "@/utils/api";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function GeneratePage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isentrolled, setisentrolled] = useState(false);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchEntrolled = async () => {
      try {
        setIsLoading(true);
        const courses = await courseAPI.getMyCourses();

        // Check if current course is in enrolled courses
        // Assuming you have courseId from props or params
        const enrolled = courses.some((course) => course.id);
        setisentrolled(enrolled);
      } catch (error) {
        console.error("Error fetching enrollment:", error);
        setisentrolled(false);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEntrolled();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    handleCreateCourse(JSON.stringify({ data: userMessage.content }));

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (Replace with actual API call)
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `This is a simulated AI response to: "${userMessage.content}". In production, this would be replaced with your actual AI API call (OpenAI, Anthropic, etc.).`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleCreateCourse = async (aiResponse: any) => {
    setIsLoading(true);
    console.log("hcc", aiResponse);
    try {
      const course = await courseAPI.createCourse(aiResponse);
      console.log("Course created:", course);
      alert("Course created successfully!");
    } catch (err: any) {
      console.error("Error:", err);
      alert(err.response?.data?.error || err || "Failed to create course");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* <Breadcrumb
        items={[{ label: "Home", href: "/" }, { label: "AI Generator" }]}
      /> */}

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                <Sparkles className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">
                  AI Roadmap Generator
                </h1>
                <p className="text-[#888888] text-sm">
                  Chat with AI to create your personalized learning path
                </p>
              </div>
            </div>
            {messages.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearChat}
                className="border-[#2A2A2A] bg-[#161616] text-[#CCCCCC] hover:bg-[#1F1F1F] hover:text-white hover:border-[#3A3A3A]"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Chat
              </Button>
            )}
          </div>
        </div>

        {/* Chat Container */}
        <div className="relative">
          {/* Messages Area */}
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-2xl shadow-black/40 mb-4">
            <CardContent className="p-6">
              <div className="space-y-6 min-h-[500px] max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#2A2A2A] scrollbar-track-transparent">
                {messages.length === 0 ? (
                  // Empty State
                  <div className="flex flex-col items-center justify-center h-[500px] text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 mb-6">
                      <Sparkles className="h-10 w-10 text-purple-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      Start a Conversation
                    </h3>
                    <p className="text-[#888888] max-w-md mb-6">
                      Ask me anything about career roadmaps, learning paths, or
                      get personalized guidance for your journey.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                      {[
                        "Create a roadmap for becoming a Full Stack Developer",
                        "What skills do I need for Machine Learning?",
                        "Help me transition from frontend to backend",
                        "Show me a roadmap for DevOps Engineer",
                      ].map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => setInput(suggestion)}
                          className="text-left p-3 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A] hover:border-[#3A3A3A] hover:bg-[#252525] transition-all text-sm text-[#CCCCCC]"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  // Messages
                  <>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-4 ${
                          message.role === "user" ? "justify-end" : ""
                        }`}
                      >
                        {message.role === "assistant" && (
                          <Avatar className="h-8 w-8 border-2 border-[#2A2A2A] flex-shrink-0">
                            <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                              <Bot className="h-4 w-4 text-purple-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div
                          className={`flex-1 max-w-[80%] ${
                            message.role === "user" ? "flex justify-end" : ""
                          }`}
                        >
                          <div
                            className={`rounded-2xl p-4 ${
                              message.role === "user"
                                ? "bg-white text-black"
                                : "bg-[#1F1F1F] text-[#CCCCCC] border border-[#2A2A2A]"
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                              {message.content}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 mt-2 px-2">
                            <span className="text-xs text-[#666666]">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                            {message.role === "assistant" && (
                              <button
                                onClick={() =>
                                  copyToClipboard(message.content, message.id)
                                }
                                className="text-[#666666] hover:text-[#CCCCCC] transition-colors"
                              >
                                {copiedId === message.id ? (
                                  <Check className="w-3 h-3" />
                                ) : (
                                  <Copy className="w-3 h-3" />
                                )}
                              </button>
                            )}
                          </div>
                        </div>

                        {message.role === "user" && (
                          <Avatar className="h-8 w-8 border-2 border-[#2A2A2A] flex-shrink-0">
                            <AvatarFallback className="bg-gradient-to-br from-white/10 to-white/5">
                              <User className="h-4 w-4 text-white" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    ))}

                    {/* Loading Indicator */}
                    {isLoading && (
                      <div className="flex gap-4">
                        <Avatar className="h-8 w-8 border-2 border-[#2A2A2A]">
                          <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                            <Bot className="h-4 w-4 text-purple-400" />
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="rounded-2xl p-4 bg-[#1F1F1F] border border-[#2A2A2A] inline-block">
                            <div className="flex items-center gap-2">
                              <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                              <span className="text-sm text-[#888888]">
                                AI is thinking...
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Input Area */}
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-2xl shadow-black/40">
            <CardContent className="p-4">
              <p className="text-xs text-[#666666] mb-3 text-center">
                Here Currently User Can Create Only 1 Roadmap.
              </p>
              {!isentrolled ? (
                <form onSubmit={handleSubmit} className="flex gap-3 items-end">
                  <div className="flex-1">
                    <Textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything about career roadmaps... (Press Enter to send, Shift+Enter for new line)"
                      className="min-h-[60px] max-h-[200px] resize-none border-[#2A2A2A] bg-[#1F1F1F] text-white placeholder:text-[#666666] focus:border-[#3A3A3A] focus:ring-0"
                      disabled={!isentrolled ? isLoading : isentrolled}
                      rows={2}
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={
                      !isentrolled ? !input.trim() || isLoading : isentrolled
                    }
                    className="h-[60px] px-6 bg-white text-black hover:bg-white/90 font-semibold transition-all shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/60 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </Button>
                </form>
              ) : (
                <a
                  type="submit"
                  href={"/roadmap"}
                  className="flex justify-center w-[80%] rounded-md py-2 place-self-center px-6 bg-white text-black hover:bg-white/90 font-semibold transition-all shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/60 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  1 Course Per User Check Your Entrolled Course
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 place-self-center ms-2" />
                  )}
                </a>
              )}
              <p className="text-xs text-[#666666] mt-3 text-center">
                AI can make mistakes. Consider checking important information.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F]">
            <CardContent className="p-4 text-center">
              <Sparkles className="w-6 h-6 text-purple-400 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-white mb-1">
                Personalized
              </h3>
              <p className="text-xs text-[#888888]">
                Get roadmaps tailored to your goals
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F]">
            <CardContent className="p-4 text-center">
              <Bot className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-white mb-1">
                AI-Powered
              </h3>
              <p className="text-xs text-[#888888]">
                Intelligent recommendations
              </p>
            </CardContent>
          </Card>
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F]">
            <CardContent className="p-4 text-center">
              <Check className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <h3 className="text-sm font-semibold text-white mb-1">
                Actionable
              </h3>
              <p className="text-xs text-[#888888]">Step-by-step guidance</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
