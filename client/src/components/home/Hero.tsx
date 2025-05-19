import { Link } from "wouter";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="hero-gradient relative overflow-hidden pt-16 md:pt-20 lg:pt-28">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="pill" className="mb-6 inline-flex items-center px-3 py-1 rounded-full">
              <span className="mr-2 text-primary">✦</span> The future of work is here
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-6">
              Your AI Workforce Platform
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-xl">
              The first-ever AI operating system — where smart agents think, collaborate, and take action to grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href="/register">
                <Button size="lg" className="inline-flex items-center gap-2">
                  Start Free Trial
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <Check className="h-5 w-5 text-primary mr-2" />
                14-day free trial
              </div>
            </div>
          </motion.div>
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Dashboard mockup */}
            <div className="bg-white rounded-xl shadow-xl p-6 animate-float">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">Marketing Assistant</h3>
                    <p className="text-xs text-gray-500">Active</p>
                  </div>
                </div>
                <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Online</div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">I've analyzed our social media performance for the past week. Engagement is up 24% on LinkedIn but down 7% on Twitter.</p>
                </div>
                <div className="bg-primary-50 p-3 rounded-lg ml-6">
                  <p className="text-sm text-gray-700">What actions would you recommend to improve our Twitter performance?</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">Based on the data, I recommend:</p>
                  <ul className="text-sm text-gray-700 list-disc pl-5 mt-2">
                    <li>Increase posting frequency from 2x to 4x daily</li>
                    <li>Add more visual content (images increased engagement by 38%)</li>
                    <li>Participate in trending conversations in our niche</li>
                  </ul>
                  <p className="text-sm text-gray-700 mt-2">Would you like me to draft a new content calendar?</p>
                </div>
              </div>
              <div className="flex">
                <input 
                  type="text" 
                  placeholder="Type your message..." 
                  className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" 
                />
                <button className="bg-primary text-white px-4 py-2 rounded-r-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div 
              className="absolute top-10 -right-10 w-20 h-20 bg-primary-100 rounded-xl flex items-center justify-center text-primary"
              animate={{ 
                y: [0, -10, 0],
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </motion.div>
            <motion.div 
              className="absolute -bottom-5 -left-5 w-16 h-16 bg-pink-100 rounded-xl flex items-center justify-center text-pink-500"
              animate={{ 
                y: [0, 10, 0],
              }}
              transition={{ 
                duration: 3.5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
