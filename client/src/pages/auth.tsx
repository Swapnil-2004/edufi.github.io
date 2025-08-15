import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { LanguageSwitcher } from "@/components/language-switcher";
import { apiRequest } from "@/lib/queryClient";
import { 
  GraduationCap, 
  User, 
  Mail, 
  Lock, 
  MapPin, 
  IndianRupee, 
  Target,
  Mic,
  ArrowRight,
  ArrowLeft,
  CheckCircle
} from "lucide-react";

interface FormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  educationLevel: string;
  budget: string;
  examRank: string;
  location: string;
  goals: string[];
  preferredLanguage: string;
}

export default function Auth() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    educationLevel: "",
    budget: "",
    examRank: "",
    location: "",
    goals: [],
    preferredLanguage: language
  });

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await apiRequest('POST', '/api/auth/login', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to your account.",
      });
      setLocation('/dashboard');
    },
    onError: () => {
      toast({
        title: "Login Failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiRequest('POST', '/api/auth/register', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Account Created!",
        description: "Welcome to EduFi! Your personalized journey begins now.",
      });
      setLocation('/dashboard');
    },
    onError: () => {
      toast({
        title: "Registration Failed",
        description: "Unable to create account. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({
      email: formData.email,
      password: formData.password
    });
  };

  const handleRegisterStep = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.password) {
        toast({
          title: "Required Fields",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match. Please try again.",
          variant: "destructive",
        });
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!formData.educationLevel || !formData.location) {
        toast({
          title: "Required Fields",
          description: "Please complete your profile information.",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
    } else {
      // Final submission
      const userData = {
        ...formData,
        username: formData.email, // Use email as username
        budget: formData.budget ? parseInt(formData.budget) : null,
        examRank: formData.examRank ? parseInt(formData.examRank) : null,
        goals: formData.goals,
        skills: [], // Initialize empty skills array
      };
      registerMutation.mutate(userData);
    }
  };

  const updateFormData = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const goalOptions = [
    "JEE Main/Advanced",
    "NEET",
    "CAT/MBA",
    "GATE",
    "Board Exams",
    "Skill Development",
    "Competitive Programming",
    "Research Projects"
  ];

  if (isLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <GraduationCap className="text-white" size={20} />
              </div>
              <span className="text-2xl font-bold text-slate-800">EduFi</span>
            </div>
            <div className="flex justify-end mb-4">
              <LanguageSwitcher />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-center">Welcome Back</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) => updateFormData('password', e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-sky-blue hover:bg-blue-600"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-600">
                  Don't have an account?{" "}
                  <button 
                    onClick={() => setIsLogin(false)}
                    className="text-sky-blue hover:underline font-medium"
                  >
                    Create one
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
              <GraduationCap className="text-white" size={20} />
            </div>
            <span className="text-2xl font-bold text-slate-800">EduFi</span>
          </div>
          <div className="flex justify-end mb-4">
            <LanguageSwitcher />
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                {step === 1 ? "Create Your Account" : 
                 step === 2 ? "Tell Us About Yourself" : 
                 "Set Your Goals"}
              </CardTitle>
              <div className="flex space-x-2">
                {[1, 2, 3].map((num) => (
                  <div
                    key={num}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      num <= step 
                        ? 'bg-sky-blue text-white' 
                        : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {num < step ? <CheckCircle size={16} /> : num}
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRegisterStep} className="space-y-6">
              
              {step === 1 && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 text-slate-400" size={16} />
                        <Input
                          id="fullName"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => updateFormData('fullName', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 text-slate-400" size={16} />
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={formData.email}
                          onChange={(e) => updateFormData('email', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="password">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
                        <Input
                          id="password"
                          type="password"
                          placeholder="Create a password"
                          value={formData.password}
                          onChange={(e) => updateFormData('password', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 text-slate-400" size={16} />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={(e) => updateFormData('confirmPassword', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Preferred Language</Label>
                    <Select value={formData.preferredLanguage} onValueChange={(value) => updateFormData('preferredLanguage', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
                        <SelectItem value="bn">বাংলা (Bengali)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Education Level *</Label>
                      <Select value={formData.educationLevel} onValueChange={(value) => updateFormData('educationLevel', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="school">School (Class 9-12)</SelectItem>
                          <SelectItem value="college">College/University</SelectItem>
                          <SelectItem value="graduate">Graduate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="location">Location *</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 text-slate-400" size={16} />
                        <Input
                          id="location"
                          placeholder="Your city/state"
                          value={formData.location}
                          onChange={(e) => updateFormData('location', e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget">Monthly Budget (₹)</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-3 text-slate-400" size={16} />
                        <Input
                          id="budget"
                          type="number"
                          placeholder="e.g., 10000"
                          value={formData.budget}
                          onChange={(e) => updateFormData('budget', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="examRank">Current Rank/Score (if any)</Label>
                      <Input
                        id="examRank"
                        type="number"
                        placeholder="e.g., 1500"
                        value={formData.examRank}
                        onChange={(e) => updateFormData('examRank', e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <Label className="flex items-center space-x-2 mb-4">
                      <Target size={16} />
                      <span>What are your academic goals? (Select all that apply)</span>
                    </Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {goalOptions.map((goal) => (
                        <button
                          key={goal}
                          type="button"
                          onClick={() => toggleGoal(goal)}
                          className={`p-3 rounded-xl border-2 text-left transition-colors ${
                            formData.goals.includes(goal)
                              ? 'border-sky-blue bg-sky-50 text-sky-800'
                              : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{goal}</span>
                            {formData.goals.includes(goal) && (
                              <CheckCircle className="text-sky-blue" size={16} />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center space-x-2 mb-2">
                      <Mic className="text-blue-600" size={16} />
                      <span className="font-medium text-blue-800">Voice Input Available</span>
                    </div>
                    <p className="text-sm text-blue-600">
                      You can use voice commands in your preferred language once you complete registration.
                    </p>
                  </div>
                </>
              )}

              <div className="flex items-center justify-between pt-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center space-x-2"
                  >
                    <ArrowLeft size={16} />
                    <span>Previous</span>
                  </Button>
                )}
                
                <div className="flex items-center space-x-4 ml-auto">
                  {step === 1 && (
                    <button 
                      type="button"
                      onClick={() => setIsLogin(true)}
                      className="text-slate-600 hover:underline"
                    >
                      Already have an account? Sign in
                    </button>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="bg-sky-blue hover:bg-blue-600 flex items-center space-x-2"
                    disabled={registerMutation.isPending}
                  >
                    <span>
                      {step === 3 ? 
                        (registerMutation.isPending ? "Creating Account..." : "Complete Registration") : 
                        "Next"
                      }
                    </span>
                    {step < 3 && <ArrowRight size={16} />}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
