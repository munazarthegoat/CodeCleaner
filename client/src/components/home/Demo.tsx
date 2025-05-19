import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Check, MoreVertical, Send } from "lucide-react";
import { motion } from "framer-motion";

export default function Demo() {
  return (
    <section id="demo" className="py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="pill" className="inline-flex items-center px-3 py-1 rounded-full mb-6">
              <span className="mr-2 text-primary">💬</span> Team Chat
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Real-Time AI Communication</h2>
            <p className="text-xl text-gray-600 mb-6">
              Like Slack — but for you + your AI teammates. Chat one-on-one or create group chats with multiple agents.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mt-1">
                  <Check className="h-4 w-4" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900">1-on-1 chat with agents</h4>
                  <p className="text-gray-600">Have direct conversations with your AI teammates about specific tasks and projects.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mt-1">
                  <Check className="h-4 w-4" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900">Group chats with multiple agents</h4>
                  <p className="text-gray-600">Create team channels where multiple agents collaborate on complex projects.</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-500 mt-1">
                  <Check className="h-4 w-4" />
                </div>
                <div className="ml-3">
                  <h4 className="font-medium text-gray-900">Real-time updates and alerts</h4>
                  <p className="text-gray-600">Get notified when agents complete tasks or need your input on important decisions.</p>
                </div>
              </li>
            </ul>
            <div>
              <Link href="/register">
                <Button size="lg" className="inline-flex items-center gap-2">
                  Try Team Chat
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Team Chat Interface Mockup */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="bg-gray-100 p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-xl font-bold">#marketing-team</div>
                    <div className="text-gray-500 text-sm">3 members</div>
                  </div>
                  <div>
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-4 h-96 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {/* Message 1 */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-900">You</div>
                        <div className="text-gray-500 text-xs ml-2">10:24 AM</div>
                      </div>
                      <div className="mt-1 text-gray-700">
                        Morning team! We need to prepare for the product launch next week. @MarketingAgent can you start drafting social posts?
                      </div>
                    </div>
                  </div>
                  
                  {/* Message 2 */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-900">Marketing Agent</div>
                        <div className="text-gray-500 text-xs ml-2">10:26 AM</div>
                      </div>
                      <div className="mt-1 text-gray-700">
                        Good morning! Absolutely, I'll start working on social posts for the launch. Should I focus on any specific features or benefits?
                      </div>
                    </div>
                  </div>
                  
                  {/* Message 3 */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-900">You</div>
                        <div className="text-gray-500 text-xs ml-2">10:29 AM</div>
                      </div>
                      <div className="mt-1 text-gray-700">
                        Focus on the AI collaboration features and the new dashboard. @DataAnalysisAgent can you pull the beta user feedback to share with Marketing Agent?
                      </div>
                    </div>
                  </div>
                  
                  {/* Message 4 */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-900">Data Analysis Agent</div>
                        <div className="text-gray-500 text-xs ml-2">10:31 AM</div>
                      </div>
                      <div className="mt-1 text-gray-700">
                        On it! Accessing beta feedback now. I'll compile the top themes and sentiment analysis in a report for you both.
                      </div>
                    </div>
                  </div>
                  
                  {/* Message 5 */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <div className="font-medium text-gray-900">Data Analysis Agent</div>
                        <div className="text-gray-500 text-xs ml-2">10:36 AM</div>
                      </div>
                      <div className="mt-1 text-gray-700">
                        Analysis complete! 87% of beta users highlighted the collaboration features as "game-changing." The dashboard received an average rating of 4.6/5. Sending full report now.
                      </div>
                      <div className="mt-2 bg-gray-100 p-2 rounded-md text-sm flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <span>Beta_User_Feedback_Report.pdf</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex items-center">
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                  />
                  <button className="bg-primary text-white p-2 rounded-r-lg">
                    <Send className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
