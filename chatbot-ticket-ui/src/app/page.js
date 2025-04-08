"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Ticket, Home } from "lucide-react";
import Image from "next/image";

export default function ChatbotTicketSystem() {
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDesc, setTicketDesc] = useState("");
  const [tickets, setTickets] = useState([]);

  const handleSend = () => {
    if (chatInput.trim()) {
      setChatHistory([...chatHistory, { from: "user", text: chatInput }]);
      if (chatInput.toLowerCase().includes("issue")) {
        setChatHistory(prev => [...prev, { from: "bot", text: "Can you provide the subject and description to raise a ticket?" }]);
      } else {
        setChatHistory(prev => [...prev, { from: "bot", text: "I'm here to help you create a support ticket." }]);
      }
      setChatInput("");
    }
  };

  const handleTicketSubmit = () => {
    if (ticketSubject && ticketDesc) {
      setTickets([...tickets, { subject: ticketSubject, description: ticketDesc }]);
      setTicketSubject("");
      setTicketDesc("");
      alert("Ticket raised successfully!");
    }
  };

  return (
  <div className="p-6 bg-gradient-to-br from-green-50 to-white min-h-screen font-sans bg-no-repeat bg-top bg-contain"
  style={{ backgroundImage: 'url("/fis-logo.png")' }}
  >
      <div className="max-w-6xl mx-auto text-center mb-6">
        <h1 className="text-3xl font-bold mt-2 text-green-900">FIS Support Portal</h1>
        <p className="text-green-700">Your one-stop solution for IT Support and Ticket Management</p>
      </div>

      <Tabs defaultValue="home" className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-6">
        <TabsList className="flex justify-around bg-green-200 rounded-xl mb-6 p-2">
          <TabsTrigger value="home" className="flex items-center gap-2"><Home className="w-4 h-4" /> Home</TabsTrigger>
          <TabsTrigger value="chatbot" className="flex items-center gap-2"><Bot className="w-4 h-4" /> Raise a Ticket</TabsTrigger>
          <TabsTrigger value="tickets" className="flex items-center gap-2"><Ticket className="w-4 h-4" /> View My Tickets</TabsTrigger>
        </TabsList>

        <TabsContent value="home">
          <Card className="bg-gradient-to-r from-green-100 via-white to-green-100">
            <CardContent className="p-6 text-lg flex flex-col md:flex-row items-center gap-6">
              <Image src="/support-home.png" alt="Support" width={300} height={300} className="rounded-xl shadow-md" />
              <div>
                👋 Welcome to the <strong>FIS Support Portal</strong>! Use the chatbot to create support tickets or view your submitted tickets.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chatbot">
          <div className="space-y-4">
            <div className="h-64 overflow-y-auto bg-gray-100 p-4 rounded-lg border border-green-200">
              {chatHistory.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.from === "user" ? "text-right" : "text-left"}`}>
                  <span className={`inline-block px-3 py-2 rounded-lg shadow-md ${msg.from === "user" ? "bg-green-100" : "bg-green-200"}`}>{msg.text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Type your issue..."
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                className="flex-1 border-green-300"
              />
              <Button onClick={handleSend} className="bg-green-500 hover:bg-green-600 text-white">Send</Button>
            </div>

            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold mb-2 text-green-800">Create a Ticket</h3>
              <Input
                placeholder="Ticket Subject"
                value={ticketSubject}
                onChange={e => setTicketSubject(e.target.value)}
                className="mb-2 border-green-300"
              />
              <Textarea
                placeholder="Describe your issue..."
                value={ticketDesc}
                onChange={e => setTicketDesc(e.target.value)}
                className="mb-2 border-green-300"
              />
              <Button onClick={handleTicketSubmit} className="bg-green-600 hover:bg-green-700 text-white">Submit Ticket</Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tickets">
          <div className="space-y-4">
            {tickets.length === 0 ? (
              <p className="text-gray-600">No tickets raised yet.</p>
            ) : (
              tickets.map((ticket, index) => (
                <Card key={index} className="border-l-4 border-green-400">
                  <CardContent className="p-4">
                    <p className="font-semibold text-green-800">{ticket.subject}</p>
                    <p className="text-gray-700">{ticket.description}</p>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
