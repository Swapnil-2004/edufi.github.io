import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, decimal, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("student"), // student, mentor, admin
  budget: integer("budget"),
  examRank: integer("exam_rank"),
  preferredLanguage: text("preferred_language").default("en"),
  goals: jsonb("goals"),
  location: text("location"),
  educationLevel: text("education_level"), // school, college
  skills: jsonb("skills"),
  eduCoins: integer("edu_coins").default(0),
  streakDays: integer("streak_days").default(0),
  profileImage: text("profile_image"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const colleges = pgTable("colleges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  location: text("location").notNull(),
  state: text("state").notNull(),
  fees: decimal("fees", { precision: 10, scale: 2 }),
  category: text("category").notNull(), // engineering, medical, arts, etc.
  rating: decimal("rating", { precision: 3, scale: 2 }),
  description: text("description"),
  website: text("website"),
  cutoffRank: integer("cutoff_rank"),
  facilities: jsonb("facilities"),
  courses: jsonb("courses"),
});

export const scholarships = pgTable("scholarships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  provider: text("provider").notNull(),
  category: text("category").notNull(), // merit-based, need-based, women-only, etc.
  eligibilityCriteria: jsonb("eligibility_criteria"),
  deadline: timestamp("deadline").notNull(),
  applicationUrl: text("application_url"),
  recipientCount: integer("recipient_count"),
  state: text("state"),
  isActive: boolean("is_active").default(true),
});

export const internships = pgTable("internships", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  company: text("company").notNull(),
  description: text("description").notNull(),
  stipend: decimal("stipend", { precision: 10, scale: 2 }),
  duration: text("duration"), // "3 months", "6 months", etc.
  location: text("location"),
  isRemote: boolean("is_remote").default(false),
  requirements: jsonb("requirements"),
  applicationUrl: text("application_url"),
  deadline: timestamp("deadline"),
  category: text("category"), // tech, design, marketing, etc.
  isActive: boolean("is_active").default(true),
});

export const userMatches = pgTable("user_matches", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  matchedUserId: varchar("matched_user_id").notNull().references(() => users.id),
  compatibilityScore: decimal("compatibility_score", { precision: 5, scale: 2 }),
  status: text("status").default("pending"), // pending, accepted, rejected
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  subject: text("subject").notNull(),
  chapter: text("chapter").notNull(),
  completionPercentage: decimal("completion_percentage", { precision: 5, scale: 2 }).default("0"),
  timeSpent: integer("time_spent"), // minutes
  lastAccessedAt: timestamp("last_accessed_at").defaultNow(),
});

export const recommendations = pgTable("recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  type: text("type").notNull(), // college, scholarship, internship, course
  entityId: varchar("entity_id").notNull(),
  score: decimal("score", { precision: 5, scale: 2 }),
  reason: text("reason"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
  eduCoins: true,
  streakDays: true,
});

export const insertCollegeSchema = createInsertSchema(colleges).omit({
  id: true,
});

export const insertScholarshipSchema = createInsertSchema(scholarships).omit({
  id: true,
});

export const insertInternshipSchema = createInsertSchema(internships).omit({
  id: true,
});

export const insertUserMatchSchema = createInsertSchema(userMatches).omit({
  id: true,
  createdAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  lastAccessedAt: true,
});

export const insertRecommendationSchema = createInsertSchema(recommendations).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type College = typeof colleges.$inferSelect;
export type InsertCollege = z.infer<typeof insertCollegeSchema>;
export type Scholarship = typeof scholarships.$inferSelect;
export type InsertScholarship = z.infer<typeof insertScholarshipSchema>;
export type Internship = typeof internships.$inferSelect;
export type InsertInternship = z.infer<typeof insertInternshipSchema>;
export type UserMatch = typeof userMatches.$inferSelect;
export type InsertUserMatch = z.infer<typeof insertUserMatchSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type Recommendation = typeof recommendations.$inferSelect;
export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;
