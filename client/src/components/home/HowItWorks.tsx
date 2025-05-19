import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="pill" className="inline-flex items-center px-3 py-1 rounded-full mb-6">
            <span className="mr-2 text-primary">🧩</span> Step by Step
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Create Your AI Workforce In Minutes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Set up your first AI agent and watch it become a valuable member of your team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-white rounded-xl p-6 shadow-md h-full">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">1</div>
              <h3 className="text-xl font-semibold mb-4 mt-2">Set the Role</h3>
              <p className="text-gray-600 mb-4">
                Define what kind of teammate you need. Customer support? Marketing analyst? Sales assistant? You decide.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 font-medium">Examples</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Customer Support Rep
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    SEO Marketing Analyst
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    B2B Sales Assistant
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="bg-white rounded-xl p-6 shadow-md h-full">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">2</div>
              <h3 className="text-xl font-semibold mb-4 mt-2">AI Agent Creation</h3>
              <p className="text-gray-600 mb-4">
                Vetro auto-generates a complete work profile with responsibilities, required data, and learning style.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 font-medium">Auto-generates</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Full work profile
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Key responsibilities
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    Reasoning style & tone
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-xl p-6 shadow-md h-full">
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">3</div>
              <h3 className="text-xl font-semibold mb-4 mt-2">Start Collaborating</h3>
              <p className="text-gray-600 mb-4">
                Begin chatting with your AI agent. Assign tasks, ask questions, and provide feedback to help them improve.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 font-medium">Conversation examples</p>
                <ul className="mt-2 space-y-2">
                  <li className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    "What's on our agenda this week?"
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    "Can you analyze these metrics?"
                  </li>
                  <li className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                    "Here's feedback on your last report"
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
