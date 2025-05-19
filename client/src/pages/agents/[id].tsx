import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, FileText, Settings, BarChart, ArrowLeft, Edit, Trash2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

export default function AgentDetail() {
  const [, params] = useRoute("/agents/:id");
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const agentId = params?.id;

  // Fetch agent data
  const { data: agent, isLoading, error } = useQuery({
    queryKey: [`/api/agents/${agentId}`],
    enabled: !!agentId,
    // For demo purposes, provide mock data
    queryFn: async () => {
      // This would normally be from the API
      return {
        id: agentId,
        name: "Marketing Agent",
        role: "Growth Marketing Specialist",
        status: "online",
        createdAt: new Date().toISOString(),
        personality: "Professional",
        autonomyLevel: "Medium - Asks for approval on important decisions",
        dataAccess: ["email", "analytics", "docs"],
        goalsAndResponsibilities: "Analyze marketing data, create content, manage social media campaigns, track performance metrics, and suggest optimization strategies.",
        successRate: 92,
        tasksCompleted: 187,
        tasksInProgress: 3,
        avatar: ""
      };
    }
  });

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Could not load agent details. Please try again.",
        variant: "destructive",
      });
      navigate("/dashboard");
    }
  }, [error, navigate, toast]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading Agent Details</h2>
          <p className="text-gray-500">Please wait...</p>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Agent Not Found</h2>
          <p className="text-gray-500 mb-4">The agent you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{agent.name} - Vetro AI</title>
        <meta name="description" content={`Manage and interact with your ${agent.role} AI agent`} />
      </Helmet>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-10">
        <Container>
          <div className="mb-8">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/dashboard")}
              className="mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
            </Button>

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={agent.avatar} />
                  <AvatarFallback className="bg-primary text-white text-xl">
                    {agent.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold">{agent.name}</h1>
                    <Badge variant={agent.status === "online" ? "default" : "outline"}>
                      {agent.status === "online" ? "Online" : "Offline"}
                    </Badge>
                  </div>
                  <p className="text-gray-600">{agent.role}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex items-center gap-2">
                  <Edit className="h-4 w-4" /> Edit
                </Button>
                <Button variant="outline" className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" /> Delete
                </Button>
                <Button className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" /> Chat
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="tasks">Tasks</TabsTrigger>
                  <TabsTrigger value="chats">Chats</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card>
                    <CardHeader>
                      <CardTitle>Agent Overview</CardTitle>
                      <CardDescription>
                        Basic information and performance metrics
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-2">Goals and Responsibilities</h3>
                        <p className="text-gray-600">{agent.goalsAndResponsibilities}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-primary">{agent.successRate}%</div>
                              <div className="text-sm text-gray-500 mt-1">Success Rate</div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-primary">{agent.tasksCompleted}</div>
                              <div className="text-sm text-gray-500 mt-1">Tasks Completed</div>
                            </div>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="pt-6">
                            <div className="text-center">
                              <div className="text-3xl font-bold text-primary">{agent.tasksInProgress}</div>
                              <div className="text-sm text-gray-500 mt-1">Tasks In Progress</div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="tasks">
                  <Card>
                    <CardHeader>
                      <CardTitle>Tasks</CardTitle>
                      <CardDescription>
                        Manage tasks assigned to this agent
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">No active tasks to display.</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline">Assign New Task</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="chats">
                  <Card>
                    <CardHeader>
                      <CardTitle>Conversations</CardTitle>
                      <CardDescription>
                        Recent conversations with this agent
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">No recent conversations to display.</p>
                    </CardContent>
                    <CardFooter>
                      <Button>Start New Conversation</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="analytics">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performance Analytics</CardTitle>
                      <CardDescription>
                        Detailed metrics and performance data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-500">Performance data will be displayed here as your agent completes more tasks.</p>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Agent Properties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Personality</h3>
                    <p>{agent.personality}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Autonomy Level</h3>
                    <p>{agent.autonomyLevel}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Created</h3>
                    <p>{new Date(agent.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Data Access</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {agent.dataAccess.map((access) => (
                        <Badge key={access} variant="outline">{access}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full flex justify-start" variant="outline">
                    <MessageSquare className="mr-2 h-4 w-4" /> Message Agent
                  </Button>
                  <Button className="w-full flex justify-start" variant="outline">
                    <FileText className="mr-2 h-4 w-4" /> View Work History
                  </Button>
                  <Button className="w-full flex justify-start" variant="outline">
                    <BarChart className="mr-2 h-4 w-4" /> Performance Report
                  </Button>
                  <Button className="w-full flex justify-start" variant="outline">
                    <Settings className="mr-2 h-4 w-4" /> Agent Settings
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
