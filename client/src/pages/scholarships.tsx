import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/use-language";
import { useToast } from "@/hooks/use-toast";
import { 
  Search,
  Filter,
  Bookmark,
  Calendar,
  Users,
  IndianRupee,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  Clock,
  ExternalLink
} from "lucide-react";
import { Scholarship, Internship } from "@shared/schema";

export default function Scholarships() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    state: "",
    type: "all" // all, scholarships, internships
  });

  // Fetch scholarships
  const { data: scholarships = [], isLoading: scholarshipsLoading } = useQuery<Scholarship[]>({
    queryKey: ['/api/scholarships', filters.category, filters.state],
    select: (data: Scholarship[]) => data.filter((item: Scholarship) => 
      searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  });

  // Fetch internships
  const { data: internships = [], isLoading: internshipsLoading } = useQuery<Internship[]>({
    queryKey: ['/api/internships', filters.category],
    select: (data: Internship[]) => data.filter((item: Internship) => 
      searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  });

  const isLoading = scholarshipsLoading || internshipsLoading;

  const handleBookmark = (id: string, type: 'scholarship' | 'internship') => {
    toast({
      title: "Bookmarked!",
      description: `${type === 'scholarship' ? 'Scholarship' : 'Internship'} saved to your favorites.`,
    });
  };

  const filteredData = () => {
    if (filters.type === "scholarships") return scholarships;
    if (filters.type === "internships") return internships;
    return [...scholarships, ...internships];
  };

  const getItemType = (item: any): 'scholarship' | 'internship' => {
    return 'amount' in item ? 'scholarship' : 'internship';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="gradient-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Discover Scholarships & Opportunities
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Find financial aid and internships tailored to your profile with AI-powered matching. Never miss a deadline again.
          </p>
          <div className="flex items-center justify-center space-x-8 text-white">
            <div className="flex items-center space-x-2">
              <Award size={20} />
              <span>10,000+ Scholarships</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase size={20} />
              <span>5,000+ Internships</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={20} />
              <span>Real-time Updates</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                <Input
                  placeholder="Search scholarships, internships..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="scholarships">Scholarships</SelectItem>
                    <SelectItem value="internships">Internships</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.category} onValueChange={(value) => setFilters({...filters, category: value})}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Medical">Medical</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={filters.state} onValueChange={(value) => setFilters({...filters, state: value})}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="State" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All States</SelectItem>
                    <SelectItem value="Delhi">Delhi</SelectItem>
                    <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                    <SelectItem value="Karnataka">Karnataka</SelectItem>
                    <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                    <SelectItem value="West Bengal">West Bengal</SelectItem>
                    <SelectItem value="All India">All India</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <Filter size={16} />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-blue"></div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                {filteredData().length} Opportunities Found
              </h2>
              <div className="text-slate-600">
                Showing results for "{searchQuery || 'all'}"
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredData().map((item: any) => {
                const type = getItemType(item);
                const isScholarship = type === 'scholarship';
                
                return (
                  <Card key={item.id} className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          isScholarship 
                            ? 'bg-gradient-to-br from-emerald-500 to-green-600' 
                            : 'bg-gradient-to-br from-orange-500 to-red-600'
                        }`}>
                          {isScholarship ? (
                            <GraduationCap className="text-white" size={20} />
                          ) : (
                            <Briefcase className="text-white" size={20} />
                          )}
                        </div>
                        <Badge 
                          variant="secondary" 
                          className={
                            isScholarship 
                              ? item.category === 'Merit-based' 
                                ? 'bg-green-100 text-green-700'
                                : item.category === 'Women Only'
                                ? 'bg-purple-100 text-purple-700'
                                : 'bg-blue-100 text-blue-700'
                              : 'bg-orange-100 text-orange-700'
                          }
                        >
                          {isScholarship ? item.category : 'Internship'}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-slate-600 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-slate-600">
                          <IndianRupee size={16} className="mr-2" />
                          <span>
                            {isScholarship 
                              ? `₹${parseInt(item.amount).toLocaleString('en-IN')} per year`
                              : item.stipend 
                                ? `₹${parseInt(item.stipend).toLocaleString('en-IN')} per month`
                                : 'Unpaid'
                            }
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-slate-600">
                          <Calendar size={16} className="mr-2" />
                          <span>
                            {isScholarship 
                              ? `Deadline: ${new Date(item.deadline).toLocaleDateString('en-IN')}`
                              : item.deadline
                                ? `Apply by: ${new Date(item.deadline).toLocaleDateString('en-IN')}`
                                : item.duration || 'Flexible duration'
                            }
                          </span>
                        </div>
                        {isScholarship ? (
                          <div className="flex items-center text-sm text-slate-600">
                            <Users size={16} className="mr-2" />
                            <span>{item.recipientCount?.toLocaleString('en-IN')} recipients</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-sm text-slate-600">
                            <MapPin size={16} className="mr-2" />
                            <span>{item.location || 'Remote'}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleBookmark(item.id, type)}
                          className="text-sky-blue hover:text-blue-600"
                        >
                          <Bookmark size={16} className="mr-1" />
                          Save
                        </Button>
                        <Button 
                          size="sm"
                          className="bg-sky-blue hover:bg-blue-600"
                          onClick={() => {
                            if (item.applicationUrl) {
                              window.open(item.applicationUrl, '_blank');
                            } else {
                              toast({
                                title: "Application Link",
                                description: "Application process will be available soon.",
                              });
                            }
                          }}
                        >
                          Apply Now
                          <ExternalLink size={14} className="ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {filteredData().length === 0 && (
              <Card className="text-center py-20">
                <CardContent>
                  <Search className="mx-auto text-slate-400 mb-4" size={48} />
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    No Results Found
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Try adjusting your search criteria or filters to find more opportunities.
                  </p>
                  <Button 
                    onClick={() => {
                      setSearchQuery("");
                      setFilters({ category: "", state: "", type: "all" });
                    }}
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            )}

            <div className="text-center mt-12">
              <Button 
                className="bg-gradient-to-r from-sky-blue to-emerald-green text-white hover:shadow-lg transition-shadow text-lg px-8 py-4"
                onClick={() => {
                  toast({
                    title: "More Opportunities",
                    description: "New scholarships and internships are added daily. Check back soon!",
                  });
                }}
              >
                View All Opportunities
              </Button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
