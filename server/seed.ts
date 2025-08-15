import { storage } from "./storage";
import type { InsertCollege, InsertScholarship, InsertInternship } from "@shared/schema";

const colleges: InsertCollege[] = [
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
  },
  {
    name: "Jawaharlal Nehru University",
    category: "Arts",
    fees: "45000",
    rating: "4.5",
    state: "Delhi",
    location: "New Delhi",
    description: "Premier university for liberal arts, social sciences, and languages. Admission through JNU Entrance Exam.",
    courses: ["Political Science", "History", "Economics", "Languages", "International Studies"],
    facilities: ["Library", "Hostels", "Cultural Center", "Sports Complex"]
  },
  {
    name: "Indian Institute of Technology Bombay",
    category: "Engineering",
    fees: "215000",
    rating: "4.7",
    state: "Maharashtra",
    location: "Mumbai",
    description: "Top-ranked engineering institute with strong industry connections. Admission through JEE Advanced.",
    courses: ["Computer Science", "Electronics", "Mechanical", "Civil Engineering"],
    facilities: ["Innovation Labs", "Hostels", "Library", "Sports", "Incubation Center"]
  },
  {
    name: "University of Delhi",
    category: "Arts",
    fees: "35000",
    rating: "4.3",
    state: "Delhi",
    location: "New Delhi",
    description: "One of India's largest and most prestigious universities. Admission through CUET.",
    courses: ["English", "Economics", "Commerce", "Political Science", "Mathematics"],
    facilities: ["Multiple Colleges", "Library", "Sports Complex", "Cultural Centers"]
  },
  {
    name: "Indian Institute of Technology Madras",
    category: "Engineering",
    fees: "220000",
    rating: "4.6",
    state: "Tamil Nadu",
    location: "Chennai",
    description: "Leading technical institute with focus on innovation and research. Admission through JEE Advanced.",
    courses: ["Aerospace", "Computer Science", "Ocean Engineering", "Biotechnology"],
    facilities: ["Research Centers", "Hostels", "Library", "Sports", "Startups"]
  },
  {
    name: "Lady Hardinge Medical College",
    category: "Medical",
    fees: "65000",
    rating: "4.4",
    state: "Delhi",
    location: "New Delhi",
    description: "Premier women's medical college with excellent clinical training. Admission through NEET.",
    courses: ["MBBS", "MD", "Nursing", "Physiotherapy"],
    facilities: ["Hospital", "Labs", "Hostels", "Library"]
  }
];

const scholarships: InsertScholarship[] = [
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
  },
  {
    title: "Inspire Scholarship for Higher Education",
    description: "Department of Science & Technology scholarship for science students.",
    category: "Science",
    amount: "80000",
    provider: "Department of Science & Technology",
    eligibilityCriteria: {"stream": "Science", "rank": "Top 1% in Class 12"},
    deadline: new Date("2024-11-15"),
    state: "All India",
    recipientCount: 10000,
    isActive: true,
    applicationUrl: "https://online-inspire.gov.in/"
  },
  {
    title: "Kishore Vaigyanik Protsahan Yojana",
    description: "Fellowship program to attract talented students towards research careers in science.",
    category: "Science",
    amount: "500000",
    provider: "Indian Institute of Science",
    eligibilityCriteria: {"exams": "JEE/NEET/KVPY", "interest": "Research career"},
    deadline: new Date("2024-09-30"),
    state: "All India",
    recipientCount: 7000,
    isActive: true,
    applicationUrl: "https://kvpy.iisc.ac.in/"
  },
  {
    title: "Post Matric Scholarship for SC Students",
    description: "Financial assistance for SC students pursuing higher education.",
    category: "Caste-based",
    amount: "150000",
    provider: "Ministry of Social Justice",
    eligibilityCriteria: {"caste": "SC", "familyIncome": "< 2.5 lakh"},
    deadline: new Date("2024-12-15"),
    state: "All India",
    recipientCount: 40000,
    isActive: true,
    applicationUrl: "https://scholarships.gov.in/"
  },
  {
    title: "Pragati Scholarship for Girls",
    description: "AICTE scholarship for girl students pursuing technical education.",
    category: "Women Only",
    amount: "300000",
    provider: "AICTE",
    eligibilityCriteria: {"gender": "Female", "year": "First year", "course": "Technical education"},
    deadline: new Date("2024-10-25"),
    state: "All India",
    recipientCount: 5000,
    isActive: true,
    applicationUrl: "https://www.aicte-india.org/"
  },
  {
    title: "Maulana Azad National Fellowship",
    description: "UGC fellowship for minority community students pursuing M.Phil/PhD.",
    category: "Minority",
    amount: "250000",
    provider: "University Grants Commission",
    eligibilityCriteria: {"community": "Minority", "degree": "M.Phil/PhD"},
    deadline: new Date("2024-11-30"),
    state: "All India",
    recipientCount: 1000,
    isActive: true,
    applicationUrl: "https://www.ugc.ac.in/"
  },
  {
    title: "Dr. A.P.J. Abdul Kalam IGNITE Awards",
    description: "Recognition and reward for innovative ideas by students below 18 years.",
    category: "Innovation",
    amount: "100000",
    provider: "National Innovation Foundation",
    eligibilityCriteria: {"age": "Below 18 years", "type": "Original technological ideas"},
    deadline: new Date("2024-12-20"),
    state: "All India",
    recipientCount: 30,
    isActive: true,
    applicationUrl: "https://www.nif.org.in/"
  }
];

const internships: InsertInternship[] = [
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
  },
  {
    title: "IIT Delhi Summer Research Internship",
    description: "Research internship program for undergraduate students in various engineering disciplines.",
    category: "Engineering",
    company: "IIT Delhi",
    location: "New Delhi",
    duration: "8 weeks",
    stipend: "25000",
    deadline: new Date("2024-03-15"),
    isRemote: false,
    isActive: true,
    applicationUrl: "https://home.iitd.ac.in/"
  },
  {
    title: "Tata Consultancy Services Internship",
    description: "Technology internship program for engineering and computer science students.",
    category: "Technology",
    company: "TCS",
    location: "Multiple Cities",
    duration: "2 months",
    stipend: "30000",
    deadline: new Date("2024-04-30"),
    isRemote: false,
    isActive: true,
    applicationUrl: "https://www.tcs.com/careers"
  },
  {
    title: "AIIMS Medical Research Internship",
    description: "Research internship for medical students in various clinical departments.",
    category: "Medical",
    company: "AIIMS",
    location: "New Delhi",
    duration: "1 month",
    stipend: "15000",
    deadline: new Date("2024-05-15"),
    isRemote: false,
    isActive: true,
    applicationUrl: "https://www.aiims.edu/"
  },
  {
    title: "Flipkart Technology Internship",
    description: "Software engineering internship with hands-on experience in e-commerce technology.",
    category: "Technology",
    company: "Flipkart",
    location: "Bangalore",
    duration: "6 months",
    stipend: "50000",
    deadline: new Date("2024-01-31"),
    isRemote: false,
    isActive: true,
    applicationUrl: "https://www.flipkartcareers.com/"
  },
  {
    title: "ISRO Space Technology Internship",
    description: "Internship program in space technology and satellite systems.",
    category: "Engineering",
    company: "ISRO",
    location: "Bangalore",
    duration: "2 months",
    stipend: "20000",
    deadline: new Date("2024-03-31"),
    isRemote: false,
    isActive: true,
    applicationUrl: "https://www.isro.gov.in/"
  },
  {
    title: "Zomato Product Management Internship",
    description: "Product management and business development internship in food technology.",
    category: "Business",
    company: "Zomato",
    location: "Gurgaon",
    duration: "3 months",
    stipend: "40000",
    deadline: new Date("2024-02-15"),
    isRemote: true,
    isActive: true,
    applicationUrl: "https://www.zomato.com/careers"
  },
  {
    title: "Byju's Content Development Internship",
    description: "Educational content creation and curriculum development internship.",
    category: "Education",
    company: "Byju's",
    location: "Bangalore",
    duration: "4 months",
    stipend: "35000",
    deadline: new Date("2024-04-10"),
    isRemote: true,
    isActive: true,
    applicationUrl: "https://byjus.com/careers/"
  },
  {
    title: "Paytm Fintech Internship",
    description: "Financial technology and payments systems development internship.",
    category: "Technology",
    company: "Paytm",
    location: "Noida",
    duration: "3 months",
    stipend: "45000",
    deadline: new Date("2024-01-20"),
    isRemote: false,
    isActive: true,
    applicationUrl: "https://careers.paytm.com/"
  }
];

async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // Check if data already exists
    const existingColleges = await storage.getColleges();
    const existingScholarships = await storage.getScholarships();
    const existingInternships = await storage.getInternships();

    // Seed colleges
    if (existingColleges.length === 0) {
      console.log("📚 Seeding colleges...");
      for (const college of colleges) {
        await storage.createCollege(college);
      }
      console.log(`✅ Added ${colleges.length} colleges`);
    } else {
      console.log(`📚 ${existingColleges.length} colleges already exist`);
    }

    // Seed scholarships
    if (existingScholarships.length === 0) {
      console.log("🎓 Seeding scholarships...");
      for (const scholarship of scholarships) {
        await storage.createScholarship(scholarship);
      }
      console.log(`✅ Added ${scholarships.length} scholarships`);
    } else {
      console.log(`🎓 ${existingScholarships.length} scholarships already exist`);
    }

    // Seed internships
    if (existingInternships.length === 0) {
      console.log("💼 Seeding internships...");
      for (const internship of internships) {
        await storage.createInternship(internship);
      }
      console.log(`✅ Added ${internships.length} internships`);
    } else {
      console.log(`💼 ${existingInternships.length} internships already exist`);
    }

    console.log("🎉 Database seeding completed successfully!");

    // Display summary
    const totalColleges = await storage.getColleges();
    const totalScholarships = await storage.getScholarships();
    const totalInternships = await storage.getInternships();
    
    console.log("\n📊 Database Summary:");
    console.log(`   📚 Colleges: ${totalColleges.length}`);
    console.log(`   🎓 Scholarships: ${totalScholarships.length}`);
    console.log(`   💼 Internships: ${totalInternships.length}`);
    console.log("\n✨ EduFi is now ready with real data!");

  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    process.exit(0);
  }
}

seedDatabase();