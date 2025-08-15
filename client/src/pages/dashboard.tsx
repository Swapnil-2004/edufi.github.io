import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/hooks/use-language";
import { 
  Target,
  TrendingUp,
  Award,
  Users,
  Calendar,
  BookOpen,
  Star,
  Coins,
  Flame,
  University,
  GraduationCap,
  Trophy,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export default function Dashboard() {
  const { t } = useLanguage();
  
  // Mock user data - in real app this would come from auth
  const currentUser = {
    id: "mock-user-id",
    fullName: "Arjun Kumar",
    eduCoins: 1245,
    streakDays: 12,
    completionPercentage: 73
  };

  // Fetch user progress
  const { data: userProgress = [], isLoading: progressLoading } = useQuery<any[]>({
    queryKey: ['/api/progress', currentUser.id],
    enabled: !!currentUser.id
  });

  // Fetch recommendations
  const { data: recommendations = [], isLoading: recommendationsLoading } = useQuery({
    queryKey: ['/api/recommendations', currentUser.id],
    enabled: !!currentUser.id
  });

  // Fetch colleges for recommendations
  const { data: colleges = [] } = useQuery<any[]>({
    queryKey: ['/api/colleges']
  });

  // Fetch scholarships for recommendations
  const { data: scholarships = [] } = useQuery<any[]>({
    queryKey: ['/api/scholarships']
  });

  const isLoading = progressLoading || recommendationsLoading;

  // Mock progress data for demonstration
  const mockProgress = [
    { subject: "Mathematics", chapter: "Calculus Integration", completionPercentage: 73, timeSpent: 240 },
    { subject: "Physics", chapter: "Electromagnetic Waves", completionPercentage: 85, timeSpent: 180 },
    { subject: "Chemistry", chapter: "Organic Chemistry", completionPercentage: 60, timeSpent: 200 }
  ];

  const progressData = userProgress.length > 0 ? userProgress : mockProgress;

  const roadmapSteps = [
    { id: 1, title: "Foundation", status: "completed", progress: 100 },
    { id: 2, title: "Intermediate", status: "completed", progress: 100 },
    { id: 3, title: "Advanced", status: "current", progress: 73 },
    { id: 4, title: "Test Prep", status: "upcoming", progress: 0 }
  ];

  const currentFocus = {
    subject: "Calculus Integration",
    chapter: "Integration by Parts",
    progress: 73,
    estimatedCompletion: "2 days"
  };

  const achievements = [
    { title: "First Week", description: "Completed your first week", icon: Calendar, earned: true },
    { title: "Quick Learner", description: "Finished 5 chapters in a day", icon: BookOpen, earned: true },
    { title: "Consistent", description: "7 day learning streak", icon: Flame, earned: true },
    { title: "Scholar", description: "Scored 90%+ on practice test", icon: Trophy, earned: false }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Welcome back, {currentUser.fullName}!
              </h1>
              <p className="text-blue-100 text-lg">
                You're {currentUser.completionPercentage}% closer to your JEE Main goal 🎯
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="bg-warm-orange text-white px-4 py-2 rounded-xl flex items-center space-x-2">
                <Coins size={20} />
                <span className="font-semibold">{currentUser.eduCoins.toLocaleString()} EduCoins</span>
              </div>
              <div className="bg-emerald-green text-white px-4 py-2 rounded-xl flex items-center space-x-2">
                <Flame size={20} />
                <span className="font-semibold">{currentUser.streakDays} Day Streak</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-blue"></div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Learning Roadmap */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target size={20} />
                    <span>Your Learning Roadmap</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    {/* Progress Timeline */}
                    <div className="flex items-center justify-between mb-6">
                      {roadmapSteps.map((step, index) => (
                        <div key={step.id} className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mb-2 ${
                            step.status === 'completed' 
                              ? 'bg-emerald-green' 
                              : step.status === 'current'
                              ? 'bg-sky-blue'
                              : 'bg-slate-200 text-slate-400'
                          }`}>
                            {step.status === 'completed' ? (
                              <CheckCircle size={16} />
                            ) : step.status === 'current' ? (
                              `${step.progress}%`
                            ) : (
                              step.id
                            )}
                          </div>
                          <span className="text-xs text-slate-600">{step.title}</span>
                          {index < roadmapSteps.length - 1 && (
                            <div className={`w-20 h-1 mt-2 ${
                              step.status === 'completed' ? 'bg-emerald-green' : 'bg-slate-200'
                            }`} />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Current Focus */}
                    <div className="bg-sky-50 rounded-xl p-4">
                      <h4 className="font-medium text-slate-800 mb-2">
                        Current Focus: {currentFocus.subject}
                      </h4>
                      <Progress value={currentFocus.progress} className="mb-2" />
                      <p className="text-sm text-slate-600">
                        {Math.floor(currentFocus.progress / 25)} of 4 chapters completed • 
                        Est. {currentFocus.estimatedCompletion} remaining
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Subject Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen size={20} />
                    <span>Subject Progress</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {progressData.map((subject: any, index: number) => (
                      <div key={index} className="p-4 bg-slate-50 rounded-xl">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium text-slate-800">{subject.subject}</h4>
                          <Badge variant="secondary">{subject.completionPercentage}%</Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{subject.chapter}</p>
                        <Progress value={subject.completionPercentage} className="mb-2" />
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{subject.timeSpent} minutes studied</span>
                          <span>
                            {subject.completionPercentage >= 80 ? 'Excellent' : 
                             subject.completionPercentage >= 60 ? 'Good' : 'Needs Focus'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Trophy size={20} />
                    <span>Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {achievements.map((achievement, index) => {
                      const IconComponent = achievement.icon;
                      return (
                        <div 
                          key={index} 
                          className={`p-4 rounded-xl border-2 ${
                            achievement.earned 
                              ? 'bg-yellow-50 border-yellow-200' 
                              : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              achievement.earned ? 'bg-yellow-400' : 'bg-slate-300'
                            }`}>
                              <IconComponent 
                                size={20} 
                                className={achievement.earned ? 'text-white' : 'text-slate-500'} 
                              />
                            </div>
                            <div>
                              <h4 className={`font-medium ${
                                achievement.earned ? 'text-slate-800' : 'text-slate-500'
                              }`}>
                                {achievement.title}
                              </h4>
                              <p className={`text-sm ${
                                achievement.earned ? 'text-slate-600' : 'text-slate-400'
                              }`}>
                                {achievement.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Clock size={16} className="text-sky-blue" />
                      <span className="text-slate-600">Study Time</span>
                    </div>
                    <span className="font-semibold">4.5 hrs today</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CheckCircle size={16} className="text-emerald-green" />
                      <span className="text-slate-600">Completed</span>
                    </div>
                    <span className="font-semibold">8 chapters</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Star size={16} className="text-yellow-500" />
                      <span className="text-slate-600">Average Score</span>
                    </div>
                    <span className="font-semibold">87%</span>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommended for You</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {colleges.slice(0, 2).map((college: any) => (
                    <div key={college.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-8 h-8 bg-sky-blue rounded-lg flex items-center justify-center">
                        <University className="text-white" size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-slate-800">{college.name}</p>
                        <p className="text-xs text-slate-600">
                          {parseFloat(college.rating || "0") * 20}% match • ₹{parseInt(college.fees || "0").toLocaleString('en-IN')} fees
                        </p>
                      </div>
                    </div>
                  ))}

                  {scholarships.slice(0, 2).map((scholarship: any) => (
                    <div key={scholarship.id} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                      <div className="w-8 h-8 bg-emerald-green rounded-lg flex items-center justify-center">
                        <GraduationCap className="text-white" size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm text-slate-800">{scholarship.title}</p>
                        <p className="text-xs text-slate-600">
                          Deadline: {new Date(scholarship.deadline).toLocaleDateString('en-IN', { 
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Users className="text-white" size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm text-slate-800">Study Group</p>
                      <p className="text-xs text-slate-600">5 new matches</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle size={20} />
                    <span>Upcoming Deadlines</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="p-3 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-red-800">JEE Main Registration</span>
                      <Badge variant="destructive" className="text-xs">5 days</Badge>
                    </div>
                    <p className="text-xs text-red-600">Complete your application</p>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-yellow-800">Mock Test</span>
                      <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-700">Tomorrow</Badge>
                    </div>
                    <p className="text-xs text-yellow-600">Practice test scheduled</p>
                  </div>

                  <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium text-sm text-blue-800">Study Group Meeting</span>
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">2 hours</Badge>
                    </div>
                    <p className="text-xs text-blue-600">Physics discussion</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
