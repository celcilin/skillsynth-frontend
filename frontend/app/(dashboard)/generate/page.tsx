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
  AlertCircle,
} from "lucide-react";
import { courseAPI } from "@/utils/api";
import Link from "next/link";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function GeneratePage() {
  // State Management
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [hasCourse, setHasCourse] = useState(false);
  const [isCheckingCourse, setIsCheckingCourse] = useState(true);
  const [courseCheckError, setCourseCheckError] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Suggestion prompts
  const suggestions = [
    "Create a roadmap for becoming a Full Stack Developer",
    "What skills do I need for Machine Learning?",
    "Help me transition from frontend to backend",
    "Show me a roadmap for DevOps Engineer",
  ];

  // Check if user already has a course on mount
  useEffect(() => {
    checkExistingCourse();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  // Check if user already has a course
  const checkExistingCourse = async () => {
    try {
      setIsCheckingCourse(true);
      setCourseCheckError(false);
      const courses = await courseAPI.getMyCourses();
      setHasCourse(courses && courses.length > 0);
    } catch (error) {
      console.error("Error checking existing courses:", error);
      setCourseCheckError(true);
      setHasCourse(false);
    } finally {
      setIsCheckingCourse(false);
    }
  };

  // Create course via API
  const createCourse = async (userInput: string) => {
    try {
      const courseData = JSON.stringify({ data: userInput });
      const result = await courseAPI.createCourse(courseData);
      console.log("Course created successfully:", result);
      return result;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent submission if user already has a course
    if (hasCourse) {
      alert(
        "You already have a course. Each user can only create one roadmap."
      );
      return;
    }

    if (!input.trim() || isLoading) return;

    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = input.trim();
    setInput("");
    setIsLoading(true);

    try {
      // Create the course
      await createCourse(userInput);

      // Add success message
      const successMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Great! I've created your personalized roadmap. You can now view it in the Roadmap section. Remember, this is your one and only roadmap - make the most of it!",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, successMessage]);

      // Update state to prevent further course creation
      setHasCourse(true);
    } catch (error) {
      console.error("Error creating course:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I apologize, but there was an error creating your roadmap. Please try again or contact support if the issue persists.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Clear chat messages
  const clearChat = () => {
    setMessages([]);
  };

  // Copy message to clipboard
  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Loading state while checking for existing courses
  if (isCheckingCourse) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-purple-400 mx-auto mb-4" />
          <p className="text-[#888888]">Checking your courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header Section */}
        <header className="mb-8">
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
                  {hasCourse
                    ? "You have created your roadmap"
                    : "Chat with AI to create your personalized learning path"}
                </p>
              </div>
            </div>
            {messages.length > 0 && !hasCourse && (
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

          {/* Warning - User Already Has Course */}
          {hasCourse && (
            <Card className="border-yellow-500/30 bg-yellow-500/5">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-yellow-500 mb-1">
                    Course Limit Reached
                  </h3>
                  <p className="text-xs text-yellow-500/80">
                    You have already created your roadmap. Each user can only
                    create one roadmap. Visit your Roadmap page to view and
                    continue your learning journey.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Error - Course Check Failed */}
          {courseCheckError && (
            <Card className="border-red-500/30 bg-red-500/5">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-red-500 mb-1">
                    Connection Error
                  </h3>
                  <p className="text-xs text-red-500/80">
                    Unable to verify your course status. Please refresh the page
                    or try again later.
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </header>

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

                    {hasCourse ? (
                      // User Already Has Course
                      <>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Your Roadmap is Ready!
                        </h3>
                        <p className="text-[#888888] max-w-md mb-6">
                          You have already created your personalized learning
                          roadmap. Visit the Roadmap page to continue your
                          journey.
                        </p>
                        <Link href="/roadmap">
                          <Button className="bg-white text-black hover:bg-white/90 font-semibold">
                            View My Roadmap
                            <Send className="w-4 h-4 ml-2" />
                          </Button>
                        </Link>
                      </>
                    ) : (
                      // User Can Create Course
                      <>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          Start a Conversation
                        </h3>
                        <p className="text-[#888888] max-w-md mb-6">
                          Ask me anything about career roadmaps, learning paths,
                          or get personalized guidance for your journey.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              onClick={() => setInput(suggestion)}
                              disabled={hasCourse}
                              className="text-left p-3 rounded-lg bg-[#1F1F1F] border border-[#2A2A2A] hover:border-[#3A3A3A] hover:bg-[#252525] transition-all text-sm text-[#CCCCCC] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {suggestion}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  // Messages Display
                  <>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-4 ${
                          message.role === "user" ? "justify-end" : ""
                        }`}
                      >
                        {/* Assistant Avatar */}
                        {message.role === "assistant" && (
                          <Avatar className="h-8 w-8 border-2 border-[#2A2A2A] flex-shrink-0">
                            <AvatarFallback className="bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                              <Bot className="h-4 w-4 text-purple-400" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        {/* Message Content */}
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

                          {/* Message Footer */}
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
                                title="Copy to clipboard"
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

                        {/* User Avatar */}
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
                                Creating your roadmap...
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Scroll Anchor */}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Input Area */}
          <Card className="border-[#2A2A2A] bg-gradient-to-br from-[#161616] to-[#0F0F0F] shadow-2xl shadow-black/40">
            <CardContent className="p-4">
              {!hasCourse ? (
                // Show Input Form
                <>
                  <p className="text-xs text-[#666666] mb-3 text-center">
                    You can create one roadmap per account. Make it count!
                  </p>
                  <form
                    onSubmit={handleSubmit}
                    className="flex gap-3 items-end"
                  >
                    <div className="flex-1">
                      <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask me anything about career roadmaps... (Press Enter to send, Shift+Enter for new line)"
                        className="min-h-[60px] max-h-[200px] resize-none border-[#2A2A2A] bg-[#1F1F1F] text-white placeholder:text-[#666666] focus:border-[#3A3A3A] focus:ring-0"
                        disabled={isLoading || courseCheckError}
                        rows={2}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={!input.trim() || isLoading || courseCheckError}
                      className="h-[60px] px-6 bg-white text-black hover:bg-white/90 font-semibold transition-all shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/60 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                    </Button>
                  </form>
                  <p className="text-xs text-[#666666] mt-3 text-center">
                    AI can make mistakes. Consider checking important
                    information.
                  </p>
                </>
              ) : (
                // Show View Roadmap Button
                <>
                  <Link
                    href="/roadmap"
                    className="flex items-center justify-center w-full rounded-md py-3 px-6 bg-white text-black hover:bg-white/90 font-semibold transition-all shadow-lg shadow-black/40 hover:shadow-xl hover:shadow-black/60"
                  >
                    View Your Roadmap
                    <Send className="w-4 h-4 ml-2" />
                  </Link>
                  <p className="text-xs text-[#666666] mt-3 text-center">
                    Your roadmap has been created. Visit the Roadmap page to
                    continue learning.
                  </p>
                </>
              )}
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
