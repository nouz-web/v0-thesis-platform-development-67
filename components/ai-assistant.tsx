"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, User, X, Minimize2, Maximize2 } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

type Message = {
  role: "user" | "assistant"
  content: string
}

export function AIAssistant() {
  const { t, language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        language === "ar"
          ? "مرحبًا! أنا المساعد الذكي لنظام إدارة الغياب. كيف يمكنني مساعدتك اليوم؟"
          : "Hello! I'm the AI assistant for the Absence Management System. How can I help you today?",
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(userMessage, language)
      setMessages((prev) => [...prev, { role: "assistant", content: response }])
      setIsLoading(false)
    }, 1000)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating button when closed */}
      {!isOpen && (
        <Button className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg" onClick={() => setIsOpen(true)}>
          <Bot className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card
          className={`fixed ${
            isMinimized ? "bottom-6 right-6 w-auto h-auto" : "bottom-6 right-6 w-80 sm:w-96 h-[500px]"
          } shadow-lg transition-all duration-200 flex flex-col`}
        >
          <CardHeader className="py-3 px-4 flex flex-row items-center justify-between border-b">
            <CardTitle className="text-sm font-medium flex items-center">
              <Bot className="h-4 w-4 mr-2" />
              {t("aiAssistant.title")}
            </CardTitle>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsMinimized(!isMinimized)}>
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`flex items-start space-x-2 max-w-[80%] ${
                          message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                        }`}
                      >
                        <div
                          className={`p-2 rounded-lg ${
                            message.role === "user" ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-900"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center ${
                            message.role === "user" ? "bg-blue-600" : "bg-slate-200"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="h-3 w-3 text-white" />
                          ) : (
                            <Bot className="h-3 w-3 text-slate-700" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex items-start space-x-2 max-w-[80%]">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center bg-slate-200">
                          <Bot className="h-3 w-3 text-slate-700" />
                        </div>
                        <div className="p-3 rounded-lg bg-slate-100">
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <CardFooter className="p-2 border-t">
                <div className="flex w-full items-center space-x-2">
                  <Input
                    placeholder={t("aiAssistant.inputPlaceholder")}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1"
                  />
                  <Button size="icon" onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </>
  )
}

// Simple response generator based on keywords
function generateResponse(message: string, language: string): string {
  const lowerMessage = message.toLowerCase()

  // Arabic responses
  if (language === "ar") {
    if (lowerMessage.includes("غياب") || lowerMessage.includes("حضور")) {
      return "يمكنك التحقق من سجل الغياب الخاص بك في قسم 'الغيابات' في لوحة التحكم الخاصة بك. إذا كنت تعتقد أن هناك خطأ، يرجى التواصل مع أستاذك أو مسؤول النظام."
    } else if (lowerMessage.includes("تبرير") || lowerMessage.includes("عذر")) {
      return "لتقديم تبرير للغياب، انتقل إلى قسم 'التبريرات' وانقر على 'تقديم تبرير جديد'. ستحتاج إلى تحميل مستند داعم مثل شهادة طبية."
    } else if (lowerMessage.includes("رمز") || lowerMessage.includes("qr")) {
      return "يقوم المعلم بإنشاء رمز QR في بداية كل محاضرة. يمكنك مسح هذا الرمز باستخدام قسم 'مسح رمز QR' في تطبيقك لتسجيل حضورك."
    } else if (lowerMessage.includes("مساعدة") || lowerMessage.includes("كيف")) {
      return "أنا هنا لمساعدتك! يمكنني الإجابة على أسئلتك حول نظام إدارة الغياب، وتسجيل الحضور، وتقديم التبريرات، وغير ذلك الكثير. ما الذي تحتاج مساعدة فيه تحديدًا؟"
    }
    return "شكرًا على سؤالك. هل يمكنك توضيح استفسارك أكثر حتى أتمكن من مساعدتك بشكل أفضل؟"
  }

  // English responses
  if (lowerMessage.includes("absence") || lowerMessage.includes("attendance")) {
    return "You can check your attendance record in the 'Absences' section of your dashboard. If you believe there's an error, please contact your professor or system administrator."
  } else if (lowerMessage.includes("justification") || lowerMessage.includes("excuse")) {
    return "To submit a justification for an absence, go to the 'Justifications' section and click on 'Submit New Justification'. You'll need to upload a supporting document such as a medical certificate."
  } else if (lowerMessage.includes("code") || lowerMessage.includes("qr")) {
    return "The teacher generates a QR code at the beginning of each lecture. You can scan this code using the 'Scan QR Code' section in your app to record your attendance."
  } else if (lowerMessage.includes("help") || lowerMessage.includes("how")) {
    return "I'm here to help! I can answer your questions about the absence management system, recording attendance, submitting justifications, and much more. What specifically do you need help with?"
  }
  return "Thank you for your question. Could you please clarify your inquiry so I can assist you better?"
}
