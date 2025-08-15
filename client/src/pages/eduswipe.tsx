import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SwipeCard } from "@/components/swipe-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { User } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { Heart, X, Filter, Users, Shield, Brain, RotateCcw, MapPin, GraduationCap } from "lucide-react";

export default function EduSwipe() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [filters, setFilters] = useState({
    skills: "",
    location: "",
    educationLevel: ""
  });

  // Mock current user ID - in real app this would come from auth
  const currentUserId = "mock-user-id";

  // Fetch potential matches
  const { data: potentialMatches = [], isLoading } = useQuery<User[]>({
    queryKey: ['/api/eduswipe/potential-matches', currentUserId],
    enabled: !!currentUserId
  });

  // Fetch user matches
  const { data: userMatches = [] } = useQuery<any[]>({
    queryKey: ['/api/eduswipe/matches', currentUserId],
    enabled: !!currentUserId
  });

  // Create match mutation
  const createMatchMutation = useMutation({
    mutationFn: async (data: { userId: string; matchedUserId: string; compatibilityScore: number }) => {
      const response = await apiRequest('POST', '/api/eduswipe/match', data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/eduswipe/matches', currentUserId] });
      toast({
        title: "Match Created!",
        description: "You've successfully matched with a study buddy.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create match. Please try again.",
        variant: "destructive",
      });
    }
  });

  const currentUser = potentialMatches[currentUserIndex];

  const handleSwipeLeft = () => {
    if (currentUserIndex < potentialMatches.length - 1) {
      setCurrentUserIndex(prev => prev + 1);
    } else {
      toast({
        title: "No More Matches",
        description: "You've seen all potential matches. Check back later for new users!",
      });
    }
  };

  const handleSwipeRight = () => {
    if (currentUser) {
      createMatchMutation.mutate({
        userId: currentUserId,
        matchedUserId: currentUser.id,
        compatibilityScore: Math.floor(Math.random() * 20) + 80 // Mock compatibility score
      });
    }
    handleSwipeLeft();
  };

  const resetStack = () => {
    setCurrentUserIndex(0);
  };

  const acceptedMatches = userMatches.filter((match: any) => match.status === 'accepted');

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            EduSwipe: Find Your Perfect Study Buddy
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover teammates with complementary skills for projects, competitions, and study groups. Swipe right to connect, left to pass.
          </p>
          <div className="flex items-center justify-center space-x-8 text-white">
            <div className="flex items-center space-x-2">
              <Shield size={20} />
              <span>Verified Skills</span>
            </div>
            <div className="flex items-center space-x-2">
              <Brain size={20} />
              <span>AI Matching</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users size={20} />
              <span>Team Building</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter size={20} />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Skills</label>
                  <Input
                    placeholder="e.g., Python, React, Design"
                    value={filters.skills}
                    onChange={(e) => setFilters({ ...filters, skills: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Location</label>
                  <Select value={filters.location} onValueChange={(value) => setFilters({ ...filters, location: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="mumbai">Mumbai</SelectItem>
                      <SelectItem value="bangalore">Bangalore</SelectItem>
                      <SelectItem value="hyderabad">Hyderabad</SelectItem>
                      <SelectItem value="pune">Pune</SelectItem>
                      <SelectItem value="kolkata">Kolkata</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Education Level</label>
                  <Select value={filters.educationLevel} onValueChange={(value) => setFilters({ ...filters, educationLevel: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="school">School</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                      <SelectItem value="university">University</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={resetStack}
                  variant="outline" 
                  className="w-full"
                  disabled={isLoading}
                >
                  <RotateCcw size={16} className="mr-2" />
                  Reset Stack
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Your Stats</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Matches</span>
                    <Badge variant="secondary">{acceptedMatches.length}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Profile Views</span>
                    <Badge variant="secondary">156</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-600">Success Rate</span>
                    <Badge variant="secondary">78%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Swipe Area */}
          <div className="lg:col-span-2">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Discover Your Next Study Partner
              </h2>
              <p className="text-slate-600">
                {potentialMatches.length > 0 
                  ? `${currentUserIndex + 1} of ${potentialMatches.length} profiles`
                  : "No more profiles to show"
                }
              </p>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-blue"></div>
              </div>
            ) : currentUser ? (
              <div className="flex justify-center">
                <SwipeCard
                  user={currentUser}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  compatibilityScore={Math.floor(Math.random() * 20) + 80}
                />
              </div>
            ) : (
              <Card className="text-center py-20">
                <CardContent>
                  <Users className="mx-auto text-slate-400 mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    No More Profiles
                  </h3>
                  <p className="text-slate-600 mb-6">
                    You've seen all available matches. Check back later for new study buddies!
                  </p>
                  <Button onClick={resetStack} className="bg-sky-blue">
                    <RotateCcw size={16} className="mr-2" />
                    Start Over
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Instructions */}
            <div className="mt-8 text-center">
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="flex items-center justify-center space-x-2 text-slate-600">
                  <div className="w-8 h-8 bg-red-100 text-red-500 rounded-full flex items-center justify-center">
                    <X size={16} />
                  </div>
                  <span className="text-sm">Pass</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-slate-600">
                  <div className="w-8 h-8 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center">
                    <Heart size={16} />
                  </div>
                  <span className="text-sm">Match</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Your Matches Section */}
        {acceptedMatches.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">
              Your Study Buddies
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {acceptedMatches.slice(0, 6).map((match: any) => (
                <Card key={match.id} className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-blue to-emerald-green flex items-center justify-center text-white font-bold">
                        {match.matchedUserId.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-800">Study Partner</h3>
                        <p className="text-sm text-slate-600">Matched on March 15</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-slate-600">
                        <GraduationCap size={16} className="mr-2" />
                        Computer Science
                      </div>
                      <div className="flex items-center text-sm text-slate-600">
                        <MapPin size={16} className="mr-2" />
                        Delhi
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        {match.compatibilityScore}% Match
                      </Badge>
                      <Button size="sm" variant="outline">
                        Message
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
