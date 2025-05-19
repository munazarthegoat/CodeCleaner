import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Users, Briefcase, MessageSquare, RefreshCw, UserPlus, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Create Your First AI Agent",
    description: "Define roles, goals, and KPIs. Your AI agent will be born with a full work profile and key responsibilities.",
    icon: <Users className="h-6 w-6" />,
  },
  {
    title: "Let Them Work Like Real Employees",
    description: "These aren't task bots. They execute tasks, analyze data, ask questions, and think critically for your business.",
    icon: <Briefcase className="h-6 w-6" />,
  },
  {
    title: "Natural Conversations",
    description: "Your agents talk like people — not chatbots. Have natural, contextual conversations about your work.",
    icon: <MessageSquare className="h-6 w-6" />,
  },
  {
    title: "Learning & Feedback Loop",
    description: "Agents log actions, track performance, learn from feedback, and improve with every cycle.",
    icon: <RefreshCw className="h-6 w-6" />,
  },
  {
    title: "Cross-Agent Collaboration",
    description: "Agents work as a team — not solo. They communicate, share insights, and coordinate actions.",
    icon: <UserPlus className="h-6 w-6" />,
  },
  {
    title: "Smart Decision-Making",
    description: "Agents think before they act. They detect problems, suggest strategies, and request approval for big moves.",
    icon: <CheckCircle className="h-6 w-6" />,
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Features() {
  return (
    <section id="features" className="py-20">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="pill" className="inline-flex items-center px-3 py-1 rounded-full mb-6">
            <span className="mr-2 text-primary">⚡</span> Powerful Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Not Just Automation. Actual AI Employees.</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Vetro AI deploys autonomous AI teammates that learn, reason, and evolve — tailored for your domain.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md transition-all duration-300 feature-card"
              variants={item}
            >
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary mb-5">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">
                {feature.description}
              </p>
              <div className="flex items-center text-primary font-medium">
                <span>Learn more</span>
                <ChevronRight className="h-5 w-5 ml-2" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
