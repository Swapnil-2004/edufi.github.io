import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, Shield, MapPin } from "lucide-react";
import { User } from "@shared/schema";

interface SwipeCardProps {
  user: User;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  compatibilityScore?: number;
}

export function SwipeCard({ user, onSwipeLeft, onSwipeRight, compatibilityScore = 94 }: SwipeCardProps) {
  const skills = Array.isArray(user.skills) ? user.skills : ['Python', 'React', 'Design'];
  
  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="bg-white rounded-2xl shadow-lg border-2 border-slate-100 p-6 h-96 flex flex-col">
        {/* Profile Image */}
        <div className="flex justify-center mb-4">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-blue to-emerald-green flex items-center justify-center text-white text-2xl font-bold">
            {user.fullName.charAt(0)}
          </div>
        </div>
        
        <h3 className="text-xl font-semibold text-center text-slate-800 mb-2">
          {user.fullName}
        </h3>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <p className="text-center text-slate-600 text-sm">{user.educationLevel || 'Student'}</p>
          {user.location && (
            <>
              <span className="text-slate-400">•</span>
              <div className="flex items-center text-slate-600 text-sm">
                <MapPin size={12} className="mr-1" />
                {user.location}
              </div>
            </>
          )}
        </div>
        
        {/* Compatibility Score */}
        <div className="bg-emerald-50 rounded-xl p-3 mb-4">
          <div className="flex items-center justify-center space-x-2">
            <span className="text-2xl font-bold text-emerald-green">{compatibilityScore}%</span>
            <span className="text-emerald-700 text-sm">Match</span>
          </div>
        </div>
        
        {/* Skills */}
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <Shield size={16} className="text-emerald-green mr-2" />
            <h4 className="font-medium text-slate-700">Verified Skills</h4>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.slice(0, 3).map((skill, index) => (
              <Badge 
                key={index}
                variant="secondary" 
                className="bg-sky-100 text-sky-700 hover:bg-sky-200"
              >
                {skill}
              </Badge>
            ))}
          </div>
          
          <div className="text-sm text-slate-600">
            Looking for: {user.goals?.toString() || 'Study partners for academic success'}
          </div>
        </div>
      </div>
      
      {/* Swipe Buttons */}
      <div className="flex justify-center space-x-4 mt-6">
        <Button
          onClick={onSwipeLeft}
          size="icon"
          className="w-14 h-14 bg-red-100 text-red-500 hover:bg-red-200 rounded-full"
        >
          <X size={20} />
        </Button>
        <Button
          onClick={onSwipeRight}
          size="icon"
          className="w-14 h-14 bg-emerald-100 text-emerald-500 hover:bg-emerald-200 rounded-full"
        >
          <Heart size={20} />
        </Button>
      </div>
    </div>
  );
}
