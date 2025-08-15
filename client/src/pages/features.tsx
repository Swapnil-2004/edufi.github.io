import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";
import { 
  Brain, 
  University, 
  Award, 
  Users, 
  Route, 
  SearchIcon, 
  Coins, 
  Globe, 
  Mic,
  Target,
  TrendingUp,
  Shield
} from "lucide-react";

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: University,
      title: "AI College Matching",
      description: "Get personalized college recommendations based on your budget, rank, and career goals with our advanced AI algorithms.",
      gradient: "from-sky-50 to-blue-50",
      iconBg: "bg-sky-blue",
      benefits: [
        "Budget-aware suggestions",
        "Rank-based filtering", 
        "Location preferences",
        "Course compatibility",
        "Placement records analysis"
      ]
    },
    {
      icon: Route,
      title: "Visual Goal Roadmaps",
      description: "AI-generated personalized learning paths with clear milestones, timelines, and progress tracking to keep you motivated.",
      gradient: "from-green-50 to-emerald-50",
      iconBg: "bg-emerald-green",
      benefits: [
        "Step-by-step guidance",
        "Progress tracking",
        "Milestone rewards",
        "Adaptive learning paths",
        "Performance analytics"
      ]
    },
    {
      icon: SearchIcon,
      title: "Scholarship Discovery",
      description: "Find and apply to scholarships and internships tailored to your profile with real-time updates and deadline reminders.",
      gradient: "from-orange-50 to-yellow-50",
      iconBg: "bg-warm-orange",
      benefits: [
        "Real-time opportunities",
        "Deadline reminders",
        "Application tracking",
        "Eligibility matching",
        "Success rate analysis"
      ]
    },
    {
      icon: Users,
      title: "EduSwipe - Team Matching",
      description: "Discover teammates with complementary skills for projects, competitions, and study groups using our Tinder-style interface.",
      gradient: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-500",
      benefits: [
        "Skill verification",
        "Compatibility scoring",
        "Location-based matching",
        "Project collaboration",
        "Team management tools"
      ]
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description: "Access EduFi in your preferred language with support for Hindi, Bengali, and English, making education accessible to all.",
      gradient: "from-indigo-50 to-blue-50",
      iconBg: "bg-indigo-500",
      benefits: [
        "Hindi interface",
        "Bengali support",
        "Voice input in regional languages",
        "Cultural context awareness",
        "Local exam preparation"
      ]
    },
    {
      icon: Coins,
      title: "Gamified Learning",
      description: "Earn EduCoins, maintain streaks, and unlock achievements as you progress through your educational journey.",
      gradient: "from-yellow-50 to-orange-50",
      iconBg: "bg-yellow-500",
      benefits: [
        "EduCoin rewards",
        "Streak maintenance",
        "Achievement badges",
        "Leaderboards",
        "Peer recognition"
      ]
    }
  ];

  const comingSoonFeatures = [
    {
      icon: Brain,
      title: "AI Buddy - Personal Mentor",
      description: "24/7 emotional support and motivational coaching powered by advanced AI that understands your academic journey.",
      status: "Coming Soon"
    },
    {
      icon: Mic,
      title: "Voice Assistant",
      description: "Speak naturally in your preferred language and get instant responses for queries, doubts, and guidance.",
      status: "Coming Soon"
    },
    {
      icon: Target,
      title: "Career Prediction",
      description: "AI-powered career path prediction based on your interests, skills, and market trends to guide your decisions.",
      status: "Coming Soon"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6">
            Powerful Features for Your Success
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Discover how EduFi's AI-powered tools are specifically designed to help Indian students excel academically and financially, from Tier 2/3 cities to top institutions.
          </p>
        </div>
      </section>

      {/* Main Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Core Features
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Everything you need to succeed in your educational journey, powered by cutting-edge AI technology.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className={`bg-gradient-to-br ${feature.gradient} border-none card-hover`}>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 ${feature.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-semibold text-slate-800 mb-3">
                          {feature.title}
                        </h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                          {feature.description}
                        </p>
                        <div className="space-y-3">
                          <h4 className="font-medium text-slate-700 mb-3">Key Benefits:</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {feature.benefits.map((benefit, benefitIndex) => (
                              <div key={benefitIndex} className="flex items-center text-sm text-slate-600">
                                <div className="w-2 h-2 bg-emerald-green rounded-full mr-3 flex-shrink-0"></div>
                                {benefit}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              How EduFi Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Simple steps to transform your educational journey with AI-powered guidance
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Create Your Profile",
                description: "Tell us about your goals, budget, current education level, and preferences."
              },
              {
                step: "02", 
                title: "Get AI Recommendations",
                description: "Our AI analyzes your profile and provides personalized college and scholarship suggestions."
              },
              {
                step: "03",
                title: "Connect & Collaborate",
                description: "Use EduSwipe to find study partners and teammates for projects and competitions."
              },
              {
                step: "04",
                title: "Track & Achieve",
                description: "Monitor your progress, earn EduCoins, and celebrate milestones on your journey."
              }
            ].map((step, index) => (
              <Card key={index} className="text-center bg-white border-none shadow-sm">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-sky-blue to-emerald-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">
              Coming Soon
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Exciting new features in development to make your educational journey even more powerful
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {comingSoonFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card key={index} className="border-dashed border-2 border-slate-300 bg-slate-50/50">
                  <CardContent className="p-6 text-center">
                    <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700">
                      {feature.status}
                    </Badge>
                    <div className="w-12 h-12 bg-slate-200 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="text-slate-500" size={20} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Making a Real Impact
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              See how EduFi is transforming educational outcomes for students across India
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "10,000+", label: "Students Helped", icon: Users },
              { number: "500+", label: "Scholarships Found", icon: Award },
              { number: "95%", label: "Success Rate", icon: TrendingUp },
              { number: "50+", label: "Cities Reached", icon: Globe }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center text-white">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent size={24} />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.number}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
