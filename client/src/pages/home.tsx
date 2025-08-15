import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { useLanguage } from "@/hooks/use-language";
import { 
  Brain, 
  Users, 
  Award, 
  TrendingUp, 
  Star, 
  Lightbulb, 
  University,
  Route,
  SearchIcon,
  Shield,
  Filter,
  Bot,
  MessageCircle,
  Mic,
  Heart
} from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left animate-slide-up">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                {t('hero.title').split('let AI guide you')[0]}
                <span className="text-yellow-300">let AI guide you</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                {t('hero.subtitle')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/auth">
                  <Button size="lg" className="bg-white text-sky-blue hover:bg-gray-50 shadow-lg text-lg px-8 py-4">
                    {t('hero.cta1')}
                  </Button>
                </Link>
                <Link href="/features">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-blue text-lg px-8 py-4"
                  >
                    {t('hero.cta2')}
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Hero Illustration */}
            <div className="relative animate-fade-in">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 animate-float">
                <div className="grid grid-cols-2 gap-4">
                  <Card className="bg-white/20 border-white/30">
                    <CardContent className="p-4 text-center">
                      <Brain className="text-yellow-300 mx-auto mb-2" size={24} />
                      <p className="text-white text-sm font-medium">AI Recommendations</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/20 border-white/30">
                    <CardContent className="p-4 text-center">
                      <Users className="text-green-300 mx-auto mb-2" size={24} />
                      <p className="text-white text-sm font-medium">Team Matching</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/20 border-white/30">
                    <CardContent className="p-4 text-center">
                      <Award className="text-orange-300 mx-auto mb-2" size={24} />
                      <p className="text-white text-sm font-medium">Scholarships</p>
                    </CardContent>
                  </Card>
                  <Card className="bg-white/20 border-white/30">
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="text-purple-300 mx-auto mb-2" size={24} />
                      <p className="text-white text-sm font-medium">Progress Tracking</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-float" style={{animationDelay: '-2s'}}>
                <Star className="text-white" size={20} />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center animate-float" style={{animationDelay: '-4s'}}>
                <Lightbulb className="text-white" size={16} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <Card className="bg-gradient-to-br from-sky-50 to-blue-50 border-none card-hover">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-sky-blue rounded-xl flex items-center justify-center mb-4">
                  <University className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Smart College Matching</h3>
                <p className="text-slate-600 mb-4">Get personalized college recommendations based on your budget, rank, and career goals.</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-green rounded-full mr-3"></div>
                    Budget-aware suggestions
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-green rounded-full mr-3"></div>
                    Rank-based filtering
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-green rounded-full mr-3"></div>
                    Location preferences
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature Card 2 */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-none card-hover">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-emerald-green rounded-xl flex items-center justify-center mb-4">
                  <Route className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Visual Goal Roadmaps</h3>
                <p className="text-slate-600 mb-4">AI-generated personalized learning paths with clear milestones and timelines.</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-green rounded-full mr-3"></div>
                    Step-by-step guidance
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-green rounded-full mr-3"></div>
                    Progress tracking
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-green rounded-full mr-3"></div>
                    Milestone rewards
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Feature Card 3 */}
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-none card-hover">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-warm-orange rounded-xl flex items-center justify-center mb-4">
                  <SearchIcon className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-3">Scholarship Discovery</h3>
                <p className="text-slate-600 mb-4">Find and apply to scholarships and internships tailored to your profile.</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-green rounded-full mr-3"></div>
                    Real-time opportunities
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-green rounded-full mr-3"></div>
                    Deadline reminders
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-green rounded-full mr-3"></div>
                    Application tracking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* EduSwipe Preview */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-6">
                EduSwipe: Find Your Perfect Study Buddy
              </h2>
              <p className="text-xl text-slate-600 mb-8">
                Discover teammates with complementary skills for projects, competitions, and study groups. Our AI matches you based on compatibility scores and verified skills.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-emerald-green rounded-full flex items-center justify-center">
                    <Shield className="text-white" size={16} />
                  </div>
                  <span className="text-slate-700">Skill verification with blockchain badges</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-sky-blue rounded-full flex items-center justify-center">
                    <Brain className="text-white" size={16} />
                  </div>
                  <span className="text-slate-700">AI-powered compatibility scoring</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                    <Filter className="text-white" size={16} />
                  </div>
                  <span className="text-slate-700">Advanced filters by skills and location</span>
                </div>
              </div>

              <Link href="/eduswipe">
                <Button className="bg-gradient-to-r from-sky-blue to-emerald-green text-white hover:shadow-lg transition-shadow text-lg px-8 py-4">
                  Try EduSwipe Now
                </Button>
              </Link>
            </div>

            {/* EduSwipe Mockup */}
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-6 max-w-sm mx-auto">
                <div className="relative h-96">
                  {/* Card Stack Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl transform rotate-3 opacity-60"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl transform rotate-1 opacity-80"></div>
                  
                  {/* Front Card */}
                  <div className="absolute inset-0 bg-white rounded-2xl shadow-lg border-2 border-slate-100">
                    <div className="p-6 h-full flex flex-col">
                      {/* Profile */}
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-blue to-emerald-green mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                        P
                      </div>
                      
                      <h3 className="text-xl font-semibold text-center text-slate-800 mb-2">Priya Sharma</h3>
                      <p className="text-center text-slate-600 text-sm mb-4">Computer Science • Delhi</p>
                      
                      {/* Compatibility Score */}
                      <div className="bg-emerald-50 rounded-xl p-3 mb-4">
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-2xl font-bold text-emerald-green">94%</span>
                          <span className="text-emerald-700 text-sm">Match</span>
                        </div>
                      </div>
                      
                      {/* Skills */}
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-700 mb-2">Verified Skills</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-xs">Python</span>
                          <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs">React</span>
                          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs">Design</span>
                        </div>
                        
                        <div className="text-sm text-slate-600">
                          Looking for: Web Dev teammates for hackathons
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Swipe Buttons */}
                <div className="flex justify-center space-x-4 mt-6">
                  <div className="w-14 h-14 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
                    <span className="text-xl">✕</span>
                  </div>
                  <div className="w-14 h-14 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center">
                    <Heart size={20} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Buddy Coming Soon */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 lg:p-12 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bot size={32} />
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Meet Your AI Buddy - Coming Soon!
              </h2>
              <p className="text-xl mb-8 text-purple-100">
                Get ready for 24/7 emotional support, motivational coaching, and voice-powered assistance. Your personal AI mentor that understands your journey.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6 text-center">
                    <MessageCircle size={24} className="mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Smart Conversations</h3>
                    <p className="text-sm text-purple-100">Chat with AI that understands your academic stress</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6 text-center">
                    <Mic size={24} className="mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Voice Assistant</h3>
                    <p className="text-sm text-purple-100">Speak in Hindi, Bengali, or English - we understand all</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20">
                  <CardContent className="p-6 text-center">
                    <Heart size={24} className="mx-auto mb-3" />
                    <h3 className="font-semibold mb-2">Emotional Support</h3>
                    <p className="text-sm text-purple-100">Motivation and guidance when you need it most</p>
                  </CardContent>
                </Card>
              </div>
              
              <Button className="bg-white text-purple-600 hover:bg-gray-50 text-lg px-8 py-4">
                Get Notified When Ready
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Educational Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who are already using AI to achieve their academic and career goals
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="bg-white text-sky-blue hover:bg-gray-50 shadow-lg text-lg px-8 py-4">
                Start My Journey
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-sky-blue text-lg px-8 py-4"
            >
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
