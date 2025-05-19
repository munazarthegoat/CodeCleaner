import { Container } from "@/components/ui/container";
import { Link } from "wouter";
import { Facebook, Twitter, Github, Dribbble } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary-400 text-2xl">⬡</span>
              <span className="font-bold text-xl">Vetro AI</span>
            </div>
            <p className="text-gray-400 mb-4">
              The first-ever AI employee operating system — where smart agents think, collaborate, and take action.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Dribbble className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-400 hover:text-white">Features</a></li>
              <li><a href="#agents" className="text-gray-400 hover:text-white">AI Agents</a></li>
              <li><a href="#pricing" className="text-gray-400 hover:text-white">Pricing</a></li>
              <li><a href="#enterprise" className="text-gray-400 hover:text-white">Enterprise</a></li>
              <li><a href="#roadmap" className="text-gray-400 hover:text-white">Roadmap</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#blog" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#docs" className="text-gray-400 hover:text-white">Documentation</a></li>
              <li><a href="#guides" className="text-gray-400 hover:text-white">Guides</a></li>
              <li><a href="#api" className="text-gray-400 hover:text-white">API</a></li>
              <li><a href="#community" className="text-gray-400 hover:text-white">Community</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="#careers" className="text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="#privacy" className="text-gray-400 hover:text-white">Privacy</a></li>
              <li><a href="#terms" className="text-gray-400 hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Vetro AI. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <Link href="#privacy" className="text-gray-400 hover:text-white text-sm mr-4">Privacy Policy</Link>
            <Link href="#terms" className="text-gray-400 hover:text-white text-sm">Terms of Service</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
