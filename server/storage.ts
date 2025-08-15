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
  type InsertRecommendation,
  users,
  colleges,
  scholarships,
  internships,
  userMatches,
  userProgress,
  recommendations
} from "@shared/schema";
import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { eq, and, or, ne, desc, asc } from "drizzle-orm";
import bcrypt from "bcryptjs";

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

export class PostgresStorage implements IStorage {
  private db;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.db = drizzle(pool);
  }


  // User operations with password hashing
  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    // Hash password before storing
    const hashedPassword = await bcrypt.hash(insertUser.password, 10);
    
    const userData = {
      ...insertUser,
      password: hashedPassword,
      role: insertUser.role || "student",
      eduCoins: 0,
      streakDays: 0
    };
    
    const result = await this.db.insert(users).values(userData).returning();
    return result[0];
  }

  async updateUser(id: string, updates: Partial<User>): Promise<User | undefined> {
    const result = await this.db.update(users).set(updates).where(eq(users.id, id)).returning();
    return result[0];
  }

  async verifyPassword(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    return isValid ? user : null;
  }

  // College operations
  async getColleges(): Promise<College[]> {
    return await this.db.select().from(colleges).orderBy(asc(colleges.name));
  }

  async getCollege(id: string): Promise<College | undefined> {
    const result = await this.db.select().from(colleges).where(eq(colleges.id, id)).limit(1);
    return result[0];
  }

  async createCollege(insertCollege: InsertCollege): Promise<College> {
    const result = await this.db.insert(colleges).values(insertCollege).returning();
    return result[0];
  }

  async getCollegesByFilters(filters: {
    state?: string;
    category?: string;
    maxFees?: number;
    minRating?: number;
  }): Promise<College[]> {
    let query = this.db.select().from(colleges);
    
    const conditions: any[] = [];
    
    if (filters.state) {
      conditions.push(eq(colleges.state, filters.state));
    }
    if (filters.category) {
      conditions.push(eq(colleges.category, filters.category));
    }
    // Note: For now, we'll filter fees and rating client-side due to complex type conversion
    // In a production app, you'd want to handle numeric comparisons properly
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    return await query.orderBy(asc(colleges.name));
  }

  // Scholarship operations
  async getScholarships(): Promise<Scholarship[]> {
    return await this.db.select().from(scholarships).orderBy(desc(scholarships.deadline));
  }

  async getScholarship(id: string): Promise<Scholarship | undefined> {
    const result = await this.db.select().from(scholarships).where(eq(scholarships.id, id)).limit(1);
    return result[0];
  }

  async createScholarship(insertScholarship: InsertScholarship): Promise<Scholarship> {
    const result = await this.db.insert(scholarships).values(insertScholarship).returning();
    return result[0];
  }

  async getScholarshipsByFilters(filters: {
    category?: string;
    state?: string;
    isActive?: boolean;
  }): Promise<Scholarship[]> {
    let query = this.db.select().from(scholarships);
    
    const conditions: any[] = [];
    
    if (filters.category) {
      conditions.push(eq(scholarships.category, filters.category));
    }
    if (filters.state) {
      conditions.push(eq(scholarships.state, filters.state));
    }
    if (filters.isActive !== undefined) {
      conditions.push(eq(scholarships.isActive, filters.isActive));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    return await query.orderBy(desc(scholarships.deadline));
  }

  // Internship operations
  async getInternships(): Promise<Internship[]> {
    return await this.db.select().from(internships).orderBy(desc(internships.deadline));
  }

  async getInternship(id: string): Promise<Internship | undefined> {
    const result = await this.db.select().from(internships).where(eq(internships.id, id)).limit(1);
    return result[0];
  }

  async createInternship(insertInternship: InsertInternship): Promise<Internship> {
    const result = await this.db.insert(internships).values(insertInternship).returning();
    return result[0];
  }

  async getInternshipsByFilters(filters: {
    category?: string;
    location?: string;
    isRemote?: boolean;
    isActive?: boolean;
  }): Promise<Internship[]> {
    let query = this.db.select().from(internships);
    
    const conditions: any[] = [];
    
    if (filters.category) {
      conditions.push(eq(internships.category, filters.category));
    }
    if (filters.location) {
      conditions.push(eq(internships.location, filters.location));
    }
    if (filters.isRemote !== undefined) {
      conditions.push(eq(internships.isRemote, filters.isRemote));
    }
    if (filters.isActive !== undefined) {
      conditions.push(eq(internships.isActive, filters.isActive));
    }
    
    if (conditions.length > 0) {
      query = query.where(and(...conditions)) as any;
    }
    
    return await query.orderBy(desc(internships.deadline));
  }

  // User match operations
  async getUserMatches(userId: string): Promise<UserMatch[]> {
    return await this.db.select().from(userMatches)
      .where(
        or(
          eq(userMatches.userId, userId),
          eq(userMatches.matchedUserId, userId)
        )
      )
      .orderBy(desc(userMatches.createdAt));
  }

  async createUserMatch(insertMatch: InsertUserMatch): Promise<UserMatch> {
    const result = await this.db.insert(userMatches).values(insertMatch).returning();
    return result[0];
  }

  async updateUserMatch(id: string, status: string): Promise<UserMatch | undefined> {
    const result = await this.db.update(userMatches)
      .set({ status })
      .where(eq(userMatches.id, id))
      .returning();
    return result[0];
  }

  async getPotentialMatches(userId: string): Promise<User[]> {
    // Get users who haven't been matched with the current user
    const existingMatches = await this.getUserMatches(userId);
    const matchedUserIds = new Set([
      ...existingMatches.map(m => m.matchedUserId),
      ...existingMatches.map(m => m.userId)
    ]);
    matchedUserIds.add(userId); // Don't match with self
    
    const allUsers = await this.db.select().from(users)
      .where(eq(users.role, 'student'));
    
    return allUsers.filter(user => !matchedUserIds.has(user.id));
  }

  // User progress operations
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return await this.db.select().from(userProgress)
      .where(eq(userProgress.userId, userId))
      .orderBy(desc(userProgress.lastAccessedAt));
  }

  async createOrUpdateProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    // Check if progress exists for this user, subject, and chapter
    const existing = await this.db.select().from(userProgress)
      .where(
        and(
          eq(userProgress.userId, insertProgress.userId),
          eq(userProgress.subject, insertProgress.subject),
          eq(userProgress.chapter, insertProgress.chapter)
        )
      )
      .limit(1);
    
    if (existing[0]) {
      // Update existing progress
      const result = await this.db.update(userProgress)
        .set({
          ...insertProgress,
          lastAccessedAt: new Date()
        })
        .where(eq(userProgress.id, existing[0].id))
        .returning();
      return result[0];
    } else {
      // Create new progress
      const result = await this.db.insert(userProgress)
        .values(insertProgress)
        .returning();
      return result[0];
    }
  }

  // Recommendation operations
  async getUserRecommendations(userId: string, type?: string): Promise<Recommendation[]> {
    let query = this.db.select().from(recommendations)
      .where(eq(recommendations.userId, userId));
    
    if (type) {
      query = query.where(
        and(
          eq(recommendations.userId, userId),
          eq(recommendations.type, type)
        )
      ) as any;
    }
    
    return await query.orderBy(desc(recommendations.createdAt));
  }

  async createRecommendation(insertRecommendation: InsertRecommendation): Promise<Recommendation> {
    const result = await this.db.insert(recommendations)
      .values(insertRecommendation)
      .returning();
    return result[0];
  }
}

export const storage = new PostgresStorage();
