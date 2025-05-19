import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

const pricingPlans = [
  {
    name: "Starter",
    description: "For small teams and early-stage startups",
    price: "$49",
    period: "/month",
    features: [
      "2 AI agents",
      "Basic agent customization",
      "5,000 messages per month",
      "Standard file upload (5GB)",
      "Email support",
    ],
    cta: "Start Free Trial",
    ctaLink: "/register",
    popular: false,
  },
  {
    name: "Business",
    description: "For growing teams and businesses",
    price: "$199",
    period: "/month",
    features: [
      "10 AI agents",
      "Advanced agent customization",
      "50,000 messages per month",
      "Enhanced file upload (20GB)",
      "Multi-team support",
      "Priority email & chat support",
      "Advanced analytics",
    ],
    cta: "Start Free Trial",
    ctaLink: "/register",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large organizations and teams",
    price: "Custom",
    period: "",
    features: [
      "Unlimited AI agents",
      "Custom agent development",
      "Unlimited messages",
      "Unlimited file upload",
      "Dedicated account manager",
      "24/7 premium support",
      "Custom integrations",
    ],
    cta: "Contact Sales",
    ctaLink: "#contact",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="pill" className="inline-flex items-center px-3 py-1 rounded-full mb-6">
            <span className="mr-2 text-primary">💰</span> Pricing Plans
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Scale Your AI Workforce As You Grow</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start with what you need and add more AI agents as your business expands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <motion.div 
              key={index}
              className={`bg-white rounded-xl p-6 shadow-md border-2 ${
                plan.popular 
                  ? "border-primary transform scale-105 z-10 relative" 
                  : "border-transparent transition duration-300 hover:border-primary-200 hover:shadow-xl"
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {plan.popular && (
                <div className="absolute -top-4 inset-x-0 mx-auto bg-primary text-white text-sm font-medium py-1 px-4 rounded-full w-max">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href={plan.ctaLink}>
                <Button 
                  variant={plan.popular ? "default" : "outline"} 
                  className="w-full"
                >
                  {plan.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
