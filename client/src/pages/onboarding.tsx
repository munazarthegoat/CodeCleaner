import { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "wouter";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

// Define the different steps in the onboarding process
const STEPS = [
  {
    id: 1,
    title: "Company Information",
    description: "Tell us more about your company",
  },
  {
    id: 2,
    title: "Team Setup",
    description: "Configure your team settings",
  },
  {
    id: 3,
    title: "AI Experience",
    description: "Help us tailor your AI workforce experience",
  },
  {
    id: 4,
    title: "Goals & Objectives",
    description: "Define what you want to achieve with your AI workforce",
  },
];

const industriesOptions = [
  { value: "technology", label: "Technology" },
  { value: "finance", label: "Finance" },
  { value: "healthcare", label: "Healthcare" },
  { value: "education", label: "Education" },
  { value: "retail", label: "Retail" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "services", label: "Services" },
  { value: "other", label: "Other" },
];

const teamSizeOptions = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-500", label: "201-500 employees" },
  { value: "500+", label: "500+ employees" },
];

const aiExperienceOptions = [
  { value: "none", label: "No experience" },
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
  { value: "expert", label: "Expert" },
];

const companyInfoSchema = z.object({
  industry: z.string().min(1, "Please select an industry"),
  companySize: z.string().min(1, "Please select your company size"),
  companyGoals: z.string().min(10, "Please provide some details about your goals"),
});

const teamSetupSchema = z.object({
  teamSize: z.string().min(1, "Please select your team size"),
  teamStructure: z.string().min(1, "Please provide your team structure"),
  teamChallenges: z.string().min(10, "Please describe your team's challenges"),
});

const aiExperienceSchema = z.object({
  aiExperienceLevel: z.string().min(1, "Please select your AI experience level"),
  aiTools: z.string(),
  aiGoals: z.string().min(10, "Please describe your goals with AI"),
});

const objectivesSchema = z.object({
  primaryObjective: z.string().min(10, "Please describe your primary objective"),
  timeframe: z.string().min(1, "Please select a timeframe"),
  successMetrics: z.string().min(10, "Please describe how you'll measure success"),
});

export default function Onboarding() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = STEPS.length;
  
  // Company Info Form
  const companyInfoForm = useForm<z.infer<typeof companyInfoSchema>>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      industry: "",
      companySize: "",
      companyGoals: "",
    },
  });

  // Team Setup Form
  const teamSetupForm = useForm<z.infer<typeof teamSetupSchema>>({
    resolver: zodResolver(teamSetupSchema),
    defaultValues: {
      teamSize: "",
      teamStructure: "",
      teamChallenges: "",
    },
  });

  // AI Experience Form
  const aiExperienceForm = useForm<z.infer<typeof aiExperienceSchema>>({
    resolver: zodResolver(aiExperienceSchema),
    defaultValues: {
      aiExperienceLevel: "",
      aiTools: "",
      aiGoals: "",
    },
  });

  // Objectives Form
  const objectivesForm = useForm<z.infer<typeof objectivesSchema>>({
    resolver: zodResolver(objectivesSchema),
    defaultValues: {
      primaryObjective: "",
      timeframe: "",
      successMetrics: "",
    },
  });

  // Update onboarding progress mutation
  const updateOnboardingMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest("POST", "/api/user/onboarding", data);
      return response.json();
    },
    onSuccess: (data, variables) => {
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      } else {
        // Complete onboarding and redirect to dashboard
        toast({
          title: "Onboarding completed!",
          description: "Your account is now set up and ready to use.",
        });
        navigate("/dashboard");
      }
    },
    onError: (error) => {
      toast({
        title: "Error updating onboarding",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Handle step submission
  const onSubmitStep = (data: any) => {
    updateOnboardingMutation.mutate({
      step: currentStep,
      data: data,
    });
  };

  // Render the current step form
  const renderStepForm = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form {...companyInfoForm}>
            <form onSubmit={companyInfoForm.handleSubmit(onSubmitStep)} className="space-y-6">
              <FormField
                control={companyInfoForm.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your industry" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {industriesOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={companyInfoForm.control}
                name="companySize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your company size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teamSizeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={companyInfoForm.control}
                name="companyGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are your company's main goals?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Describe your goals and challenges"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full"
                disabled={updateOnboardingMutation.isPending}
              >
                {updateOnboardingMutation.isPending ? "Saving..." : "Continue"}
              </Button>
            </form>
          </Form>
        );
      
      case 2:
        return (
          <Form {...teamSetupForm}>
            <form onSubmit={teamSetupForm.handleSubmit(onSubmitStep)} className="space-y-6">
              <FormField
                control={teamSetupForm.control}
                name="teamSize"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Size</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your team size" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {teamSizeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={teamSetupForm.control}
                name="teamStructure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Team Structure</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Describe your team structure (e.g., flat, hierarchical)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={teamSetupForm.control}
                name="teamChallenges"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What challenges does your team face?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Describe your team's biggest challenges"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={updateOnboardingMutation.isPending}
                >
                  {updateOnboardingMutation.isPending ? "Saving..." : "Continue"}
                </Button>
              </div>
            </form>
          </Form>
        );
      
      case 3:
        return (
          <Form {...aiExperienceForm}>
            <form onSubmit={aiExperienceForm.handleSubmit(onSubmitStep)} className="space-y-6">
              <FormField
                control={aiExperienceForm.control}
                name="aiExperienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Experience Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your AI experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {aiExperienceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={aiExperienceForm.control}
                name="aiTools"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Tools Used (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What AI tools have you used before?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={aiExperienceForm.control}
                name="aiGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>What are your goals with AI?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Describe what you hope to achieve with AI"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={updateOnboardingMutation.isPending}
                >
                  {updateOnboardingMutation.isPending ? "Saving..." : "Continue"}
                </Button>
              </div>
            </form>
          </Form>
        );
      
      case 4:
        return (
          <Form {...objectivesForm}>
            <form onSubmit={objectivesForm.handleSubmit(onSubmitStep)} className="space-y-6">
              <FormField
                control={objectivesForm.control}
                name="primaryObjective"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Objective</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What's your main goal with an AI workforce?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={objectivesForm.control}
                name="timeframe"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Implementation Timeframe</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your timeframe" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="immediate">Immediate (0-3 months)</SelectItem>
                        <SelectItem value="short">Short-term (3-6 months)</SelectItem>
                        <SelectItem value="medium">Medium-term (6-12 months)</SelectItem>
                        <SelectItem value="long">Long-term (1+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={objectivesForm.control}
                name="successMetrics"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Success Metrics</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="How will you measure success?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={updateOnboardingMutation.isPending}
                >
                  {updateOnboardingMutation.isPending ? "Completing Setup..." : "Complete Setup"}
                </Button>
              </div>
            </form>
          </Form>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <Helmet>
        <title>Onboarding | Vetro AI</title>
        <meta name="description" content="Complete your Vetro AI onboarding to customize your AI workforce platform experience." />
      </Helmet>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl mx-auto space-y-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome to Vetro AI
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Let's set up your AI workforce platform
            </p>
          </div>
          
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {STEPS.map((step) => (
                <div 
                  key={step.id}
                  className={`text-sm font-medium ${
                    currentStep >= step.id ? "text-blue-600" : "text-gray-500"
                  }`}
                >
                  Step {step.id}
                </div>
              ))}
            </div>
            <Progress value={(currentStep / totalSteps) * 100} className="h-2" />
          </div>
          
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">
                {STEPS[currentStep - 1].title}
              </CardTitle>
              <CardDescription>
                {STEPS[currentStep - 1].description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {renderStepForm()}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}