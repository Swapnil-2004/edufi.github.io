import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertUserMatchSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(userData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      
      const user = await storage.createUser(userData);
      res.json({ user: { ...user, password: undefined } });
    } catch (error: any) {
      res.status(400).json({ 
        message: "Invalid user data", 
        error: error.message || "Registration failed"
      });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await storage.verifyPassword(email, password);
      
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      res.json({ user: { ...user, password: undefined } });
    } catch (error) {
      res.status(500).json({ message: "Login failed", error });
    }
  });

  // User routes
  app.get("/api/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ ...user, password: undefined });
    } catch (error) {
      res.status(500).json({ message: "Failed to get user", error });
    }
  });

  app.put("/api/users/:id", async (req, res) => {
    try {
      const updates = req.body;
      const user = await storage.updateUser(req.params.id, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ ...user, password: undefined });
    } catch (error) {
      res.status(500).json({ message: "Failed to update user", error });
    }
  });

  // College routes
  app.get("/api/colleges", async (req, res) => {
    try {
      const { state, category, maxFees, minRating } = req.query;
      const filters: any = {};
      
      if (state) filters.state = state as string;
      if (category) filters.category = category as string;
      if (maxFees) filters.maxFees = parseInt(maxFees as string);
      if (minRating) filters.minRating = parseFloat(minRating as string);
      
      const colleges = Object.keys(filters).length > 0 
        ? await storage.getCollegesByFilters(filters)
        : await storage.getColleges();
      
      res.json(colleges);
    } catch (error) {
      res.status(500).json({ message: "Failed to get colleges", error });
    }
  });

  app.get("/api/colleges/:id", async (req, res) => {
    try {
      const college = await storage.getCollege(req.params.id);
      if (!college) {
        return res.status(404).json({ message: "College not found" });
      }
      res.json(college);
    } catch (error) {
      res.status(500).json({ message: "Failed to get college", error });
    }
  });

  // Scholarship routes
  app.get("/api/scholarships", async (req, res) => {
    try {
      const { category, state, isActive } = req.query;
      const filters: any = {};
      
      if (category) filters.category = category as string;
      if (state) filters.state = state as string;
      if (isActive !== undefined) filters.isActive = isActive === 'true';
      
      const scholarships = Object.keys(filters).length > 0 
        ? await storage.getScholarshipsByFilters(filters)
        : await storage.getScholarships();
      
      res.json(scholarships);
    } catch (error) {
      res.status(500).json({ message: "Failed to get scholarships", error });
    }
  });

  app.get("/api/scholarships/:id", async (req, res) => {
    try {
      const scholarship = await storage.getScholarship(req.params.id);
      if (!scholarship) {
        return res.status(404).json({ message: "Scholarship not found" });
      }
      res.json(scholarship);
    } catch (error) {
      res.status(500).json({ message: "Failed to get scholarship", error });
    }
  });

  // Internship routes
  app.get("/api/internships", async (req, res) => {
    try {
      const { category, location, isRemote, isActive } = req.query;
      const filters: any = {};
      
      if (category) filters.category = category as string;
      if (location) filters.location = location as string;
      if (isRemote !== undefined) filters.isRemote = isRemote === 'true';
      if (isActive !== undefined) filters.isActive = isActive === 'true';
      
      const internships = Object.keys(filters).length > 0 
        ? await storage.getInternshipsByFilters(filters)
        : await storage.getInternships();
      
      res.json(internships);
    } catch (error) {
      res.status(500).json({ message: "Failed to get internships", error });
    }
  });

  // EduSwipe routes
  app.get("/api/eduswipe/potential-matches/:userId", async (req, res) => {
    try {
      const matches = await storage.getPotentialMatches(req.params.userId);
      res.json(matches.map(user => ({ ...user, password: undefined })));
    } catch (error) {
      res.status(500).json({ message: "Failed to get potential matches", error });
    }
  });

  app.post("/api/eduswipe/match", async (req, res) => {
    try {
      const matchData = insertUserMatchSchema.parse(req.body);
      const match = await storage.createUserMatch(matchData);
      res.json(match);
    } catch (error) {
      res.status(400).json({ message: "Invalid match data", error });
    }
  });

  app.get("/api/eduswipe/matches/:userId", async (req, res) => {
    try {
      const matches = await storage.getUserMatches(req.params.userId);
      res.json(matches);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user matches", error });
    }
  });

  app.put("/api/eduswipe/match/:id", async (req, res) => {
    try {
      const { status } = req.body;
      const match = await storage.updateUserMatch(req.params.id, status);
      if (!match) {
        return res.status(404).json({ message: "Match not found" });
      }
      res.json(match);
    } catch (error) {
      res.status(500).json({ message: "Failed to update match", error });
    }
  });

  // Progress routes
  app.get("/api/progress/:userId", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(req.params.userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to get user progress", error });
    }
  });

  // Recommendation routes
  app.get("/api/recommendations/:userId", async (req, res) => {
    try {
      const { type } = req.query;
      const recommendations = await storage.getUserRecommendations(
        req.params.userId, 
        type as string
      );
      res.json(recommendations);
    } catch (error) {
      res.status(500).json({ message: "Failed to get recommendations", error });
    }
  });

  // Seed database route (development only)
  app.post("/api/seed", async (req, res) => {
    try {
      // Sample colleges data
      const colleges = [
        {
          name: "Indian Institute of Technology Delhi",
          category: "Engineering",
          fees: "208000",
          rating: "4.8",
          state: "Delhi",
          location: "New Delhi",
          description: "Premier engineering institute known for excellence in technology and research. Admission through JEE Advanced.",
          courses: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Chemical Engineering"],
          facilities: ["Library", "Hostels", "Labs", "Sports Complex", "Cafeteria"]
        },
        {
          name: "All India Institute of Medical Sciences",
          category: "Medical",
          fees: "75000",
          rating: "4.9",
          state: "Delhi",
          location: "New Delhi",
          description: "India's premier medical institute offering world-class medical education. Admission through NEET.",
          courses: ["MBBS", "MD", "MS", "DM", "MCh"],
          facilities: ["Hospital", "Research Labs", "Library", "Hostels", "Sports"]
        },
        {
          name: "Indian Institute of Science",
          category: "Science",
          fees: "125000",
          rating: "4.9",
          state: "Karnataka",
          location: "Bangalore",
          description: "Leading research institution in science and engineering. Admission through KVPY/JEE Advanced/GATE.",
          courses: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science"],
          facilities: ["Research Labs", "Library", "Hostels", "Cafeteria"]
        }
      ];

      const scholarships = [
        {
          title: "PM YASASVI Scholarship 2024",
          description: "Scholarship for OBC, EBC, and DNT students studying in Class 9-12. Provides financial assistance for academic excellence.",
          category: "Merit-based",
          amount: "125000",
          provider: "National Testing Agency",
          eligibilityCriteria: {"caste": "OBC/EBC/DNT", "class": "9-12", "familyIncome": "< 2.5 lakh"},
          deadline: new Date("2024-12-31"),
          state: "All India",
          recipientCount: 15000,
          isActive: true,
          applicationUrl: "https://yet.nta.ac.in/"
        },
        {
          title: "National Scholarship Portal Merit Scholarship",
          description: "Central sector scholarship for meritorious students pursuing higher education.",
          category: "Merit-based",
          amount: "200000",
          provider: "Ministry of Education",
          eligibilityCriteria: {"marks": "80%+ in Class 12", "familyIncome": "< 6 lakh"},
          deadline: new Date("2024-10-30"),
          state: "All India",
          recipientCount: 82000,
          isActive: true,
          applicationUrl: "https://scholarships.gov.in/"
        }
      ];

      const internships = [
        {
          title: "Google Summer of Code 2024",
          description: "Global program where students work on open source projects with mentoring organizations.",
          category: "Technology",
          company: "Google",
          location: "Remote",
          duration: "3 months",
          stipend: "200000",
          deadline: new Date("2024-03-18"),
          isRemote: true,
          isActive: true,
          applicationUrl: "https://summerofcode.withgoogle.com/"
        },
        {
          title: "Microsoft Research India Internship",
          description: "Research internship program for students in computer science and related fields.",
          category: "Technology",
          company: "Microsoft",
          location: "Bangalore",
          duration: "2-6 months",
          stipend: "75000",
          deadline: new Date("2024-02-28"),
          isRemote: false,
          isActive: true,
          applicationUrl: "https://www.microsoft.com/en-us/research/academic-program/internships/"
        }
      ];

      // Check if data already exists
      const existingColleges = await storage.getColleges();
      const existingScholarships = await storage.getScholarships();
      const existingInternships = await storage.getInternships();

      let message = "Database seeded successfully! ";

      // Seed colleges
      if (existingColleges.length === 0) {
        for (const college of colleges) {
          await storage.createCollege(college);
        }
        message += `Added ${colleges.length} colleges. `;
      } else {
        message += `${existingColleges.length} colleges already exist. `;
      }

      // Seed scholarships
      if (existingScholarships.length === 0) {
        for (const scholarship of scholarships) {
          await storage.createScholarship(scholarship);
        }
        message += `Added ${scholarships.length} scholarships. `;
      } else {
        message += `${existingScholarships.length} scholarships already exist. `;
      }

      // Seed internships
      if (existingInternships.length === 0) {
        for (const internship of internships) {
          await storage.createInternship(internship);
        }
        message += `Added ${internships.length} internships.`;
      } else {
        message += `${existingInternships.length} internships already exist.`;
      }

      res.json({ 
        message,
        summary: {
          colleges: (await storage.getColleges()).length,
          scholarships: (await storage.getScholarships()).length,
          internships: (await storage.getInternships()).length
        }
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to seed database", error });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
