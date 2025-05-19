import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

// Validation schema for app connection
const connectAppSchema = z.object({
  appName: z.string().min(2, "App name must be at least 2 characters"),
  appUrl: z.string().url("Please enter a valid URL"),
  appType: z.string().min(1, "Please select an app type"),
  capabilities: z.array(z.string()).min(1, "Select at least one capability"),
  webhook: z.boolean().optional(),
});

type ConnectAppFormValues = z.infer<typeof connectAppSchema>;

interface ConnectAppModalProps {
  onSuccess?: () => void;
}

export default function ConnectAppModal({ onSuccess }: ConnectAppModalProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ConnectAppFormValues>({
    resolver: zodResolver(connectAppSchema),
    defaultValues: {
      appName: "",
      appUrl: "",
      appType: "",
      capabilities: [],
      webhook: false,
    },
  });
  
  const connectAppMutation = useMutation({
    mutationFn: async (data: ConnectAppFormValues) => {
      const response = await apiRequest("POST", "/api/ai/connection/setup", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "App connected successfully",
        description: `${form.getValues().appName} has been connected to Vetro AI.`,
      });
      setOpen(false);
      form.reset();
      if (onSuccess) onSuccess();
    },
    onError: (error) => {
      toast({
        title: "Failed to connect app",
        description: error.message || "There was an error connecting your app. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: ConnectAppFormValues) => {
    connectAppMutation.mutate(data);
  };
  
  const appTypes = [
    { value: "crm", label: "CRM System" },
    { value: "chat", label: "Chat Platform" },
    { value: "project", label: "Project Management" },
    { value: "analytics", label: "Analytics Tool" },
    { value: "email", label: "Email Platform" },
    { value: "custom", label: "Custom Application" },
  ];
  
  const allCapabilities = [
    { id: "data-sync", label: "Data Synchronization" },
    { id: "automation", label: "Workflow Automation" },
    { id: "notifications", label: "Notifications" },
    { id: "reporting", label: "Reporting & Analytics" },
    { id: "ai-responses", label: "AI-Generated Responses" },
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="gap-2">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="w-4 h-4"
          >
            <path d="M12 6v12"></path>
            <path d="M6 12h12"></path>
          </svg>
          Connect Your App
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect External Application</DialogTitle>
          <DialogDescription>
            Integrate your existing tools and applications with Vetro AI to enhance your workflow
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="appName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My CRM App" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="appUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://your-app.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    The base URL of your application
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="appType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select app type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="capabilities"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Capabilities</FormLabel>
                    <FormDescription>
                      Select the capabilities you want to enable
                    </FormDescription>
                  </div>
                  <div className="space-y-3">
                    {allCapabilities.map((capability) => (
                      <FormField
                        key={capability.id}
                        control={form.control}
                        name="capabilities"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={capability.id}
                              className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(capability.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, capability.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== capability.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  {capability.label}
                                </FormLabel>
                              </div>
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
              name="webhook"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Enable webhook notifications
                    </FormLabel>
                    <FormDescription>
                      Send real-time notifications to your app via webhooks
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button
                type="submit"
                disabled={connectAppMutation.isPending}
              >
                {connectAppMutation.isPending ? "Connecting..." : "Connect Application"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}