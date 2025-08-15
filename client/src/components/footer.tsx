import { Link } from "wouter";
import { GraduationCap } from "lucide-react";
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white" size={16} />
              </div>
              <span className="text-xl font-bold">EduFi</span>
            </div>
            <p className="text-slate-400 mb-4">
              Your AI mentor for academic success, built by students, for students.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <FaLinkedin />
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/features" className="hover:text-white transition-colors">AI College Matching</Link></li>
              <li><Link href="/scholarships" className="hover:text-white transition-colors">Scholarship Discovery</Link></li>
              <li><Link href="/eduswipe" className="hover:text-white transition-colors">EduSwipe</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Progress Tracking</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Multilingual Support</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Study Guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Career Advice</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-400">
          <p>Built with ❤️ by the EduFi Team • © 2024 EduFi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
