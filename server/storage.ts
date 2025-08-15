import { 
  type User, 
  type InsertUser, 
  type College, 
  type InsertCollege,
  type Scholarship,
  type InsertScholarship,
  type Internship,
  type InsertInternship,
  type UserMatch,
  type InsertUserMatch,
  type UserProgress,
  type InsertUserProgress,
  type Recommendation,
  type InsertRecommendation
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: string, updates: Partial<User>): Promise<User | undefined>;
  
  // College operations
  getColleges(): Promise<College[]>;
  getCollege(id: string): Promise<College | undefined>;
  createCollege(college: InsertCollege): Promise<College>;
  getCollegesByFilters(filters: {
    state?: string;
    category?: string;
    maxFees?: number;
    minRating?: number;
  }): Promise<College[]>;
  
  // Scholarship operations
  getScholarships(): Promise<Scholarship[]>;
  getScholarship(id: string): Promise<Scholarship | undefined>;
  createScholarship(scholarship: InsertScholarship): Promise<Scholarship>;
  getScholarshipsByFilters(filters: {
    category?: string;
    state?: string;
    isActive?: boolean;
  }): Promise<Scholarship[]>;
  
  // Internship operations
  getInternships(): Promise<Internship[]>;
  getInternship(id: string): Promise<Internship | undefined>;
  createInternship(internship: InsertInternship): Promise<Internship>;
  getInternshipsByFilters(filters: {
    category?: string;
    location?: string;
    isRemote?: boolean;
    isActive?: boolean;
  }): Promise<Internship[]>;
  
  // User match operations
  getUserMatches(userId: string): Promise<UserMatch[]>;
  createUserMatch(match: InsertUserMatch): Promise<UserMatch>;
  updateUserMatch(id: string, status: string): Promise<UserMatch | undefined>;
  getPotentialMatches(userId: string): Promise<User[]>;
  
  // User progress operations
  getUserProgress(userId: string): Promise<UserProgress[]>;
  createOrUpdateProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  // Recommendation operations
  getUserRecommendations(userId: string, type?: string): Promise<Recommendation[]>;
  createRecommendation(recommendation: InsertRecommendation): Promise<Recommendation>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private colleges: Map<string, College>;
  private scholarships: Map<string, Scholarship>;
  private internships: Map<string, Internship>;
  private userMatches: Map<string, UserMatch>;
  private userProgress: Map<string, UserProgress>;
  private recommendations: Map<string, Recommendation>;

  constructor() {
    this.users = new Map();
    this.colleges = new Map();
    this.scholarships = new Map();
    this.internships = new Map();
    this.userMatches = new Map();
    this.userProgress = new Map();
    this.recommendations = new Map();
    this.initSampleData();
  }

  private initSampleData() {
    // Add sample colleges
    const sampleColleges: College[] = [
      {
        id: randomUUID(),
        name: "IIT Delhi",
        location: "Delhi",
        state: "Delhi",
        fees: "250000",
        category: "Engineering",
        rating: "4.8",
        description: "Premier engineering institute",
        website: "https://home.iitd.ac.in/",
        cutoffRank: 100,
        facilities: ["Library", "Labs", "Hostel", "Sports"],
        courses: ["Computer Science", "Electrical", "Mechanical"]
      },
      {
        id: randomUUID(),
        name: "IIT Bombay",
        location: "Mumbai",
        state: "Maharashtra",
        fees: "245000",
        category: "Engineering",
        rating: "4.9",
        description: "Top ranked engineering college",
        website: "https://www.iitb.ac.in/",
        cutoffRank: 50,
        facilities: ["Library", "Labs", "Hostel", "Research Centers"],
        courses: ["Computer Science", "Electrical", "Chemical"]
      }
    ];

    sampleColleges.forEach(college => this.colleges.set(college.id, college));

    // Add sample scholarships
    const sampleScholarships: Scholarship[] = [
      {
        id: randomUUID(),
        title: "INSPIRE Scholarship",
        description: "For students pursuing higher education in natural sciences, mathematics, and engineering.",
        amount: "80000",
        provider: "Government of India",
        category: "Merit-based",
        eligibilityCriteria: ["Top 1% in board exams", "Pursuing science stream"],
        deadline: new Date("2024-03-15"),
        applicationUrl: "https://inspire-dst.gov.in/",
        recipientCount: 10000,
        state: "All India",
        isActive: true
      },
      {
        id: randomUUID(),
        title: "Google Women Techmakers",
        description: "Supporting women pursuing computer science and technology degrees.",
        amount: "100000",
        provider: "Google",
        category: "Women Only",
        eligibilityCriteria: ["Female students", "CS/IT background", "Academic excellence"],
        deadline: new Date("2024-04-30"),
        applicationUrl: "https://developers.google.com/womentechmakers",
        recipientCount: 500,
        state: "All India",
        isActive: true
      }
    ];

    sampleScholarships.forEach(scholarship => this.scholarships.set(scholarship.id, scholarship));

    // Add sample internships
    const sampleInternships: Internship[] = [
      {
        id: randomUUID(),
        title: "Microsoft Learn Program",
        company: "Microsoft",
        description: "3-month paid internship program for computer science students.",
        stipend: "25000",
        duration: "3 months",
        location: "Bangalore",
        isRemote: false,
        requirements: ["CS/IT background", "Programming skills", "Problem solving"],
        applicationUrl: "https://careers.microsoft.com/",
        deadline: new Date("2024-05-15"),
        category: "Technology",
        isActive: true
      }
    ];

    sampleInternships.forEach(internship => this.internships.set(internship.id, internship));
  }

  // User operations
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      role: insertUser.role || "student",
      location: insertUser.location || null,
      preferredLanguage: insertUser.preferredLanguage || null,
      budget: insertUser.budget || null,
      examRank: insertUser.examRank || null,
      goals: insertUser.goals || null,
      educationLevel: insertUser.educationLevel || null,
      skills: insertUser.skills || null,
      profileImage: insertUser.profileImage || null,
      eduCoins: 0, 
      streakDays: 0,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // College operations
  async getColleges(): Promise<College[]> {
    return Array.from(this.colleges.values());
  }

  async getCollege(id: string): Promise<College | undefined> {
    return this.colleges.get(id);
  }

  async createCollege(insertCollege: InsertCollege): Promise<College> {
    const id = randomUUID();
    const college: College = { 
      ...insertCollege, 
      id,
      description: insertCollege.description || null,
      fees: insertCollege.fees || null,
      rating: insertCollege.rating || null,
      website: insertCollege.website || null,
      cutoffRank: insertCollege.cutoffRank || null,
      facilities: insertCollege.facilities || null,
      courses: insertCollege.courses || null
    };
    this.colleges.set(id, college);
    return college;
  }

  async getCollegesByFilters(filters: {
    state?: string;
    category?: string;
    maxFees?: number;
    minRating?: number;
  }): Promise<College[]> {
    return Array.from(this.colleges.values()).filter(college => {
      if (filters.state && college.state !== filters.state) return false;
      if (filters.category && college.category !== filters.category) return false;
      if (filters.maxFees && parseFloat(college.fees || "0") > filters.maxFees) return false;
      if (filters.minRating && parseFloat(college.rating || "0") < filters.minRating) return false;
      return true;
    });
  }

  // Scholarship operations
  async getScholarships(): Promise<Scholarship[]> {
    return Array.from(this.scholarships.values());
  }

  async getScholarship(id: string): Promise<Scholarship | undefined> {
    return this.scholarships.get(id);
  }

  async createScholarship(insertScholarship: InsertScholarship): Promise<Scholarship> {
    const id = randomUUID();
    const scholarship: Scholarship = { 
      ...insertScholarship, 
      id,
      state: insertScholarship.state || null,
      isActive: insertScholarship.isActive ?? true,
      recipientCount: insertScholarship.recipientCount || null,
      applicationUrl: insertScholarship.applicationUrl || null,
      eligibilityCriteria: insertScholarship.eligibilityCriteria || null
    };
    this.scholarships.set(id, scholarship);
    return scholarship;
  }

  async getScholarshipsByFilters(filters: {
    category?: string;
    state?: string;
    isActive?: boolean;
  }): Promise<Scholarship[]> {
    return Array.from(this.scholarships.values()).filter(scholarship => {
      if (filters.category && scholarship.category !== filters.category) return false;
      if (filters.state && scholarship.state !== filters.state) return false;
      if (filters.isActive !== undefined && scholarship.isActive !== filters.isActive) return false;
      return true;
    });
  }

  // Internship operations
  async getInternships(): Promise<Internship[]> {
    return Array.from(this.internships.values());
  }

  async getInternship(id: string): Promise<Internship | undefined> {
    return this.internships.get(id);
  }

  async createInternship(insertInternship: InsertInternship): Promise<Internship> {
    const id = randomUUID();
    const internship: Internship = { 
      ...insertInternship, 
      id,
      duration: insertInternship.duration || null,
      location: insertInternship.location || null,
      isRemote: insertInternship.isRemote ?? false,
      stipend: insertInternship.stipend || null,
      requirements: insertInternship.requirements || null,
      applicationUrl: insertInternship.applicationUrl || null,
      deadline: insertInternship.deadline || null,
      category: insertInternship.category || null,
      isActive: insertInternship.isActive ?? true
    };
    this.internships.set(id, internship);
    return internship;
  }

  async getInternshipsByFilters(filters: {
    category?: string;
    location?: string;
    isRemote?: boolean;
    isActive?: boolean;
  }): Promise<Internship[]> {
    return Array.from(this.internships.values()).filter(internship => {
      if (filters.category && internship.category !== filters.category) return false;
      if (filters.location && internship.location !== filters.location) return false;
      if (filters.isRemote !== undefined && internship.isRemote !== filters.isRemote) return false;
      if (filters.isActive !== undefined && internship.isActive !== filters.isActive) return false;
      return true;
    });
  }

  // User match operations
  async getUserMatches(userId: string): Promise<UserMatch[]> {
    return Array.from(this.userMatches.values()).filter(match => 
      match.userId === userId || match.matchedUserId === userId
    );
  }

  async createUserMatch(insertMatch: InsertUserMatch): Promise<UserMatch> {
    const id = randomUUID();
    const match: UserMatch = { 
      ...insertMatch, 
      id,
      status: insertMatch.status || "pending",
      compatibilityScore: insertMatch.compatibilityScore || null,
      createdAt: new Date()
    };
    this.userMatches.set(id, match);
    return match;
  }

  async updateUserMatch(id: string, status: string): Promise<UserMatch | undefined> {
    const match = this.userMatches.get(id);
    if (!match) return undefined;
    
    const updatedMatch = { ...match, status };
    this.userMatches.set(id, updatedMatch);
    return updatedMatch;
  }

  async getPotentialMatches(userId: string): Promise<User[]> {
    const currentUser = this.users.get(userId);
    if (!currentUser) return [];
    
    const existingMatches = await this.getUserMatches(userId);
    const matchedUserIds = new Set(existingMatches.map(m => m.matchedUserId));
    
    return Array.from(this.users.values()).filter(user => 
      user.id !== userId && 
      !matchedUserIds.has(user.id) &&
      user.role === 'student'
    );
  }

  // User progress operations
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(progress => 
      progress.userId === userId
    );
  }

  async createOrUpdateProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const existing = Array.from(this.userProgress.values()).find(p => 
      p.userId === insertProgress.userId && 
      p.subject === insertProgress.subject && 
      p.chapter === insertProgress.chapter
    );
    
    if (existing) {
      const updated = { 
        ...existing, 
        ...insertProgress,
        completionPercentage: insertProgress.completionPercentage || existing.completionPercentage,
        timeSpent: insertProgress.timeSpent || existing.timeSpent,
        lastAccessedAt: new Date()
      };
      this.userProgress.set(existing.id, updated);
      return updated;
    } else {
      const id = randomUUID();
      const progress: UserProgress = { 
        ...insertProgress, 
        id,
        completionPercentage: insertProgress.completionPercentage || "0",
        timeSpent: insertProgress.timeSpent || null,
        lastAccessedAt: new Date()
      };
      this.userProgress.set(id, progress);
      return progress;
    }
  }

  // Recommendation operations
  async getUserRecommendations(userId: string, type?: string): Promise<Recommendation[]> {
    return Array.from(this.recommendations.values()).filter(rec => {
      if (rec.userId !== userId) return false;
      if (type && rec.type !== type) return false;
      return true;
    });
  }

  async createRecommendation(insertRecommendation: InsertRecommendation): Promise<Recommendation> {
    const id = randomUUID();
    const recommendation: Recommendation = { 
      ...insertRecommendation, 
      id,
      score: insertRecommendation.score || null,
      reason: insertRecommendation.reason || null,
      createdAt: new Date()
    };
    this.recommendations.set(id, recommendation);
    return recommendation;
  }
}

export const storage = new MemStorage();
