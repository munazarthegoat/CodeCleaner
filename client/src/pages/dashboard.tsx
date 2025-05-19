import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, MessageSquare, BarChart, Settings, Zap, Users, Briefcase, ArrowRight, Layers, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import ConnectAppModal from "@/components/dashboard/ConnectAppModal";

// Placeholder data for agents - this would come from the API
const agentsData = [
  {
    id: 1,
    name: "Marketing Agent",
    role: "Marketing Assistant",
    status: "online",
    lastActive: "5 minutes ago",
    avatar: "",
    tasks: 3,
    messages: 12
  },
  {
    id: 2,
    name: "Support Agent",
    role: "Customer Support Rep",
    status: "online",
    lastActive: "Just now",
    avatar: "",
    tasks: 5,
    messages: 24
  },
  {
    id: 3,
    name: "Data Agent",
    role: "Data Analyst",
    status: "offline",
    lastActive: "3 hours ago",
    avatar: "",
    tasks: 1,
    messages: 8
  }
];

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  
  // Check if user is authenticated
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['/api/auth/me'],
    retry: false,
  });
  
  useEffect(() => {
    if (error) {
      toast({
        title: "Authentication required",
        description: "Please log in to access the dashboard",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [error, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading Dashboard</h2>
          <p className="text-gray-500">Please wait...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Vetro AI</title>
        <meta name="description" content="Manage your AI agents and view analytics" />
      </Helmet>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-10">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Your AI Workforce</h1>
              <p className="text-gray-600 mt-1">Manage your AI agents and track their performance</p>
            </div>
            <div className="flex gap-3">
              <ConnectAppModal onSuccess={() => {
                toast({
                  title: "App connection successful",
                  description: "Your external application is now connected to Vetro AI."
                });
              }} />
              <Link href="/agents/create">
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Create New Agent
                </Button>
              </Link>
            </div>
          </div>

          <Tabs defaultValue="agents" className="space-y-6">
            <TabsList className="grid grid-cols-4 md:w-[400px]">
              <TabsTrigger value="agents">Agents</TabsTrigger>
              <TabsTrigger value="conversations">Conversations</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="agents" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agentsData.map((agent) => (
                  <Card key={agent.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={agent.avatar} />
                            <AvatarFallback className="bg-primary text-white">
                              {agent.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{agent.name}</CardTitle>
                            <CardDescription>{agent.role}</CardDescription>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          agent.status === 'online' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {agent.status}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm text-gray-500 mb-4">
                        Last active: {agent.lastActive}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                          <Briefcase className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{agent.tasks} active tasks</span>
                        </div>
                        <div className="flex items-center gap-2 bg-gray-50 p-2 rounded">
                          <MessageSquare className="h-4 w-4 text-gray-500" />
                          <span className="text-sm">{agent.messages} messages</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Link href={`/agents/${agent.id}`}>
                        <Button variant="outline" size="sm">View Details</Button>
                      </Link>
                      <Link href={`/agents/${agent.id}/chat`}>
                        <Button size="sm">Chat</Button>
                      </Link>
                    </CardFooter>
                  </Card>
                ))}

                {/* Create new agent card */}
                <Link href="/agents/create" className="block h-full">
                  <Card className="border-dashed h-full flex flex-col justify-center items-center py-8 hover:bg-gray-50 transition-colors cursor-pointer">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-primary mb-4">
                      <Plus className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-medium mb-2">Create New Agent</h3>
                    <p className="text-gray-500 text-center max-w-xs">
                      Add a new AI agent to your workforce
                    </p>
                  </Card>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="conversations">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Conversations</CardTitle>
                  <CardDescription>
                    Your recent interactions with AI agents
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">No conversations to show yet. Start chatting with your agents!</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>
                    Monitor your AI workforce productivity
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Analytics will appear here as your AI agents complete tasks.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>
                    Manage your preferences and account details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">Settings options will be available soon.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Container>
      </main>
      <Footer />
    </>
  );
}
