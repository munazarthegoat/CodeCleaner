import { useState } from "react";
import { useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const agentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.string().min(2, "Role must be at least 2 characters"),
  goals: z.string().min(10, "Goals must be at least 10 characters"),
  personality: z.string().min(1, "Please select a personality"),
  autonomyLevel: z.string().min(1, "Please select an autonomy level"),
  dataAccess: z.array(z.string()).nonempty("Select at least one data source"),
  specialInstructions: z.string().optional(),
});

type AgentFormValues = z.infer<typeof agentSchema>;

const personalityOptions = [
  { value: "professional", label: "Professional" },
  { value: "friendly", label: "Friendly" },
  { value: "analytical", label: "Analytical" },
  { value: "creative", label: "Creative" },
  { value: "assertive", label: "Assertive" },
];

const autonomyOptions = [
  { value: "low", label: "Low - Always asks for approval" },
  { value: "medium", label: "Medium - Asks for approval on important decisions" },
  { value: "high", label: "High - Makes most decisions independently" },
];

const dataAccessOptions = [
  { id: "email", label: "Email" },
  { id: "crm", label: "CRM" },
  { id: "calendar", label: "Calendar" },
  { id: "analytics", label: "Analytics" },
  { id: "docs", label: "Documents" },
];

export default function AgentCreate() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  
  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      name: "",
      role: "",
      goals: "",
      personality: "",
      autonomyLevel: "",
      dataAccess: [],
      specialInstructions: "",
    },
  });
  
  const createAgentMutation = useMutation({
    mutationFn: async (data: AgentFormValues) => {
      const response = await apiRequest("POST", "/api/agents", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Agent created successfully",
        description: `${data.name} is now ready to work with you`,
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Failed to create agent",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    },
  });

  const nextStep = () => {
    const fieldsToValidate = step === 1 
      ? ["name", "role", "goals"] 
      : step === 2 
        ? ["personality", "autonomyLevel"]
        : [];
    
    form.trigger(fieldsToValidate as any).then((isValid) => {
      if (isValid) {
        setStep(Math.min(step + 1, totalSteps));
      }
    });
  };

  const prevStep = () => {
    setStep(Math.max(step - 1, 1));
  };

  const onSubmit = (data: AgentFormValues) => {
    createAgentMutation.mutate(data);
  };

  return (
    <>
      <Helmet>
        <title>Create AI Agent - Vetro AI</title>
        <meta name="description" content="Create a new AI agent to join your workforce" />
      </Helmet>
      <Navbar />
      <main className="bg-gray-50 min-h-screen py-10">
        <Container className="max-w-3xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold">Create Your AI Agent</h1>
            <p className="text-gray-600 mt-2">Define your AI agent's role, goals, and personality</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              {Array.from({ length: totalSteps }).map((_, idx) => (
                <div 
                  key={idx}
                  className={`flex-1 h-2 rounded-full ${
                    idx + 1 === step 
                      ? 'bg-primary' 
                      : idx + 1 < step 
                        ? 'bg-primary-300' 
                        : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between text-sm">
              <span className={step >= 1 ? 'text-primary font-medium' : 'text-gray-500'}>Basic Info</span>
              <span className={step >= 2 ? 'text-primary font-medium' : 'text-gray-500'}>Personality</span>
              <span className={step >= 3 ? 'text-primary font-medium' : 'text-gray-500'}>Capabilities</span>
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Agent Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Marketing Assistant" {...field} />
                            </FormControl>
                            <FormDescription>
                              What would you like to call your AI agent?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role</FormLabel>
                            <FormControl>
                              <Input placeholder="Growth Marketing Specialist" {...field} />
                            </FormControl>
                            <FormDescription>
                              Define the specific job role for your agent
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="goals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Goals & Responsibilities</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Analyze marketing data, create content, manage social media campaigns..." 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              What should this agent accomplish? List key goals and responsibilities.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="personality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Personality Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a personality type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {personalityOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose the conversational style for your agent
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="autonomyLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Autonomy Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select an autonomy level" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {autonomyOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              How independently should your agent work?
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="dataAccess"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>Data Access</FormLabel>
                              <FormDescription>
                                Select which data sources your agent should have access to
                              </FormDescription>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              {dataAccessOptions.map((item) => (
                                <FormField
                                  key={item.id}
                                  control={form.control}
                                  name="dataAccess"
                                  render={({ field }) => {
                                    return (
                                      <FormItem
                                        key={item.id}
                                        className="flex flex-row items-start space-x-3 space-y-0 bg-gray-50 p-4 rounded-md"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={field.value?.includes(item.id)}
                                            onCheckedChange={(checked) => {
                                              return checked
                                                ? field.onChange([...field.value, item.id])
                                                : field.onChange(
                                                    field.value?.filter(
                                                      (value) => value !== item.id
                                                    )
                                                  )
                                            }}
                                          />
                                        </FormControl>
                                        <FormLabel className="font-normal text-sm mt-0.5">
                                          {item.label}
                                        </FormLabel>
                                      </FormItem>
                                    )
                                  }}
                                />
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="specialInstructions"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Instructions (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any specific instructions or preferences for your agent..." 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              Additional guidelines or instructions for your agent
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    {step > 1 ? (
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Previous
                      </Button>
                    ) : (
                      <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                        Cancel
                      </Button>
                    )}
                    
                    {step < totalSteps ? (
                      <Button type="button" onClick={nextStep}>
                        Next
                      </Button>
                    ) : (
                      <Button 
                        type="submit" 
                        disabled={createAgentMutation.isPending}
                      >
                        {createAgentMutation.isPending ? "Creating..." : "Create Agent"}
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </Container>
      </main>
      <Footer />
    </>
  );
}
