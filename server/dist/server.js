var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// shared/schema.ts
var schema_exports = {};
__export(schema_exports, {
  ambulanceBookings: () => ambulanceBookings,
  ambulances: () => ambulances,
  appointments: () => appointments,
  chatMessages: () => chatMessages,
  departments: () => departments,
  dietDays: () => dietDays,
  dietMealItems: () => dietMealItems,
  dietMeals: () => dietMeals,
  doctorAvailability: () => doctorAvailability,
  doctorLeaves: () => doctorLeaves,
  doctors: () => doctors,
  emergencyIncidents: () => emergencyIncidents,
  fitnessData: () => fitnessData,
  healthData: () => healthData,
  homeVisitRequests: () => homeVisitRequests,
  hospitals: () => hospitals,
  insertAmbulanceBookingSchema: () => insertAmbulanceBookingSchema,
  insertAmbulanceSchema: () => insertAmbulanceSchema,
  insertAppointmentSchema: () => insertAppointmentSchema,
  insertChatMessageSchema: () => insertChatMessageSchema,
  insertDepartmentSchema: () => insertDepartmentSchema,
  insertDietDaySchema: () => insertDietDaySchema,
  insertDietMealItemSchema: () => insertDietMealItemSchema,
  insertDietMealSchema: () => insertDietMealSchema,
  insertDoctorAvailabilitySchema: () => insertDoctorAvailabilitySchema,
  insertDoctorLeaveSchema: () => insertDoctorLeaveSchema,
  insertDoctorSchema: () => insertDoctorSchema,
  insertEmergencyIncidentSchema: () => insertEmergencyIncidentSchema,
  insertFitnessDataSchema: () => insertFitnessDataSchema,
  insertHealthDataSchema: () => insertHealthDataSchema,
  insertHomeVisitRequestSchema: () => insertHomeVisitRequestSchema,
  insertHospitalSchema: () => insertHospitalSchema,
  insertMedicalRecordSchema: () => insertMedicalRecordSchema,
  insertMedicationLogSchema: () => insertMedicationLogSchema,
  insertMedicationSchema: () => insertMedicationSchema,
  insertSymptomCheckSchema: () => insertSymptomCheckSchema,
  insertUserSchema: () => insertUserSchema,
  medicalRecords: () => medicalRecords,
  medicationLogs: () => medicationLogs,
  medications: () => medications,
  symptomChecks: () => symptomChecks,
  users: () => users
});
import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
var users, healthData, medicalRecords, doctors, hospitals, departments, appointments, doctorAvailability, doctorLeaves, homeVisitRequests, emergencyIncidents, ambulances, ambulanceBookings, chatMessages, symptomChecks, fitnessData, insertUserSchema, insertHealthDataSchema, insertMedicalRecordSchema, insertAppointmentSchema, insertChatMessageSchema, medications, medicationLogs, insertMedicationSchema, insertMedicationLogSchema, insertHospitalSchema, insertDoctorSchema, insertDepartmentSchema, insertDoctorAvailabilitySchema, insertDoctorLeaveSchema, insertHomeVisitRequestSchema, insertEmergencyIncidentSchema, insertAmbulanceSchema, insertAmbulanceBookingSchema, insertSymptomCheckSchema, insertFitnessDataSchema, dietDays, dietMeals, dietMealItems, insertDietDaySchema, insertDietMealSchema, insertDietMealItemSchema;
var init_schema = __esm({
  "shared/schema.ts"() {
    "use strict";
    users = pgTable("users", {
      id: serial("id").primaryKey(),
      username: text("username").notNull().unique(),
      password: text("password").notNull(),
      fullName: text("full_name").notNull(),
      email: text("email").notNull().unique(),
      phoneNumber: text("phone_number"),
      dateOfBirth: text("date_of_birth"),
      gender: text("gender"),
      address: text("address"),
      city: text("city"),
      state: text("state"),
      latitude: text("latitude"),
      longitude: text("longitude"),
      profileImage: text("profile_image"),
      role: text("role").notNull().default("user")
      // user, hospital, ambulance
    });
    healthData = pgTable("health_data", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      heartRate: integer("heart_rate"),
      bloodPressureSystolic: integer("blood_pressure_systolic"),
      bloodPressureDiastolic: integer("blood_pressure_diastolic"),
      bloodGlucose: integer("blood_glucose"),
      temperature: integer("temperature"),
      recordedAt: timestamp("recorded_at").defaultNow()
    });
    medicalRecords = pgTable("medical_records", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      title: text("title").notNull(),
      description: text("description"),
      fileUrl: text("file_url"),
      doctorName: text("doctor_name"),
      hospital: text("hospital"),
      date: timestamp("date").notNull()
    });
    doctors = pgTable("doctors", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      specialty: text("specialty").notNull(),
      department: text("department"),
      // Department like Cardiology, Neurology, etc.
      hospital: text("hospital"),
      hospitalId: integer("hospital_id").references(() => hospitals.id),
      phoneNumber: text("phone_number"),
      email: text("email"),
      profileImage: text("profile_image"),
      availableDays: text("available_days").array(),
      availabilityStatus: text("availability_status").default("available"),
      // available, unavailable, on-leave
      rating: integer("rating")
    });
    hospitals = pgTable("hospitals", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").references(() => users.id),
      name: text("name").notNull(),
      address: text("address").notNull(),
      city: text("city"),
      state: text("state"),
      phoneNumber: text("phone_number").notNull(),
      email: text("email"),
      logo: text("logo"),
      rating: integer("rating"),
      latitude: text("latitude"),
      longitude: text("longitude"),
      departments: text("departments").array(),
      services: text("services").array(),
      emergencyServices: boolean("emergency_services").default(true),
      established: text("established"),
      beds: integer("beds"),
      website: text("website")
    });
    departments = pgTable("departments", {
      id: serial("id").primaryKey(),
      name: text("name").notNull(),
      description: text("description"),
      hospitalId: integer("hospital_id").references(() => hospitals.id)
    });
    appointments = pgTable("appointments", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      doctorId: integer("doctor_id").references(() => doctors.id),
      hospitalId: integer("hospital_id").references(() => hospitals.id),
      departmentId: integer("department_id").references(() => departments.id),
      date: timestamp("date").notNull(),
      time: text("time").notNull(),
      isVirtual: boolean("is_virtual").default(false),
      status: text("status").default("scheduled"),
      notes: text("notes"),
      requestType: text("request_type").default("direct"),
      createdAt: timestamp("created_at").defaultNow(),
      updatedAt: timestamp("updated_at").defaultNow()
    });
    doctorAvailability = pgTable("doctor_availability", {
      id: serial("id").primaryKey(),
      doctorId: integer("doctor_id").notNull().references(() => doctors.id),
      dayOfWeek: integer("day_of_week").notNull(),
      startTime: text("start_time").notNull(),
      endTime: text("end_time").notNull(),
      isAvailable: boolean("is_available").default(true)
    });
    doctorLeaves = pgTable("doctor_leaves", {
      id: serial("id").primaryKey(),
      doctorId: integer("doctor_id").notNull().references(() => doctors.id),
      startDate: timestamp("start_date").notNull(),
      endDate: timestamp("end_date").notNull(),
      reason: text("reason")
    });
    homeVisitRequests = pgTable("home_visit_requests", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      address: text("address").notNull(),
      latitude: text("latitude"),
      longitude: text("longitude"),
      symptoms: text("symptoms"),
      preferredDate: timestamp("preferred_date"),
      preferredTimeSlot: text("preferred_time_slot"),
      assignedHospitalId: integer("assigned_hospital_id").references(() => hospitals.id),
      assignedDoctorId: integer("assigned_doctor_id").references(() => doctors.id),
      status: text("status").default("pending"),
      notes: text("notes"),
      createdAt: timestamp("created_at").defaultNow()
    });
    emergencyIncidents = pgTable("emergency_incidents", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      latitude: text("latitude").notNull(),
      longitude: text("longitude").notNull(),
      address: text("address"),
      emergencyType: text("emergency_type"),
      description: text("description"),
      assignedAmbulanceId: integer("assigned_ambulance_id"),
      assignedHospitalId: integer("assigned_hospital_id").references(() => hospitals.id),
      status: text("status").default("pending"),
      dispatchedAt: timestamp("dispatched_at"),
      arrivedAt: timestamp("arrived_at"),
      completedAt: timestamp("completed_at"),
      createdAt: timestamp("created_at").defaultNow()
    });
    ambulances = pgTable("ambulances", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").references(() => users.id),
      vehicleNumber: text("vehicle_number").notNull(),
      hospitalId: integer("hospital_id").references(() => hospitals.id),
      currentLatitude: text("current_latitude"),
      currentLongitude: text("current_longitude"),
      status: text("status").default("available"),
      driverName: text("driver_name"),
      driverPhone: text("driver_phone")
    });
    ambulanceBookings = pgTable("ambulance_bookings", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      ambulanceId: integer("ambulance_id").notNull().references(() => ambulances.id),
      pickupAddress: text("pickup_address").notNull(),
      pickupLatitude: text("pickup_latitude"),
      pickupLongitude: text("pickup_longitude"),
      dropoffAddress: text("dropoff_address"),
      patientName: text("patient_name").notNull(),
      patientPhone: text("patient_phone").notNull(),
      medicalCondition: text("medical_condition"),
      status: text("status").default("pending"),
      scheduledTime: timestamp("scheduled_time"),
      dispatchedAt: timestamp("dispatched_at"),
      completedAt: timestamp("completed_at"),
      createdAt: timestamp("created_at").defaultNow()
    });
    chatMessages = pgTable("chat_messages", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      message: text("message").notNull(),
      isUserMessage: boolean("is_user_message").notNull(),
      timestamp: timestamp("timestamp").defaultNow()
    });
    symptomChecks = pgTable("symptom_checks", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      symptoms: text("symptoms").array().notNull(),
      diagnosis: text("diagnosis").notNull(),
      riskLevel: text("risk_level").notNull(),
      // low, moderate, high, critical
      recommendations: text("recommendations").notNull(),
      severity: text("severity"),
      createdAt: timestamp("created_at").defaultNow()
    });
    fitnessData = pgTable("fitness_data", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      source: text("source").notNull(),
      // manual, fitbit, apple-health, google-fit
      steps: integer("steps"),
      heartRate: integer("heart_rate"),
      caloriesBurned: integer("calories_burned"),
      sleepHours: integer("sleep_hours"),
      distance: integer("distance"),
      // in meters
      activeMinutes: integer("active_minutes"),
      weight: integer("weight"),
      // in kg
      date: timestamp("date").notNull(),
      syncedAt: timestamp("synced_at").defaultNow()
    });
    insertUserSchema = createInsertSchema(users).pick({
      username: true,
      password: true,
      fullName: true,
      email: true,
      phoneNumber: true,
      role: true
    }).extend({
      role: z.enum(["user", "hospital", "ambulance"]).default("user")
    });
    insertHealthDataSchema = createInsertSchema(healthData).omit({
      id: true,
      recordedAt: true
    });
    insertMedicalRecordSchema = createInsertSchema(medicalRecords).omit({
      id: true
    });
    insertAppointmentSchema = createInsertSchema(appointments).omit({
      id: true
    }).extend({
      date: z.union([z.string(), z.date()]).transform((val) => {
        if (typeof val === "string") {
          return new Date(val);
        }
        return val;
      })
    });
    insertChatMessageSchema = createInsertSchema(chatMessages).omit({
      id: true,
      timestamp: true
    });
    medications = pgTable("medications", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      name: text("name").notNull(),
      dosage: text("dosage").notNull(),
      frequency: text("frequency").notNull(),
      startDate: timestamp("start_date").notNull(),
      endDate: timestamp("end_date"),
      instructions: text("instructions"),
      timeOfDay: text("time_of_day").notNull(),
      // Morning, Afternoon, Evening, Night, or specific times
      withFood: boolean("with_food").default(false),
      active: boolean("active").default(true),
      refillDate: timestamp("refill_date"),
      createdAt: timestamp("created_at").defaultNow().notNull()
    });
    medicationLogs = pgTable("medication_logs", {
      id: serial("id").primaryKey(),
      medicationId: integer("medication_id").notNull().references(() => medications.id),
      userId: integer("user_id").notNull().references(() => users.id),
      takenAt: timestamp("taken_at").defaultNow().notNull(),
      skipped: boolean("skipped").default(false),
      notes: text("notes")
    });
    insertMedicationSchema = createInsertSchema(medications, {
      id: void 0,
      createdAt: void 0
    });
    insertMedicationLogSchema = createInsertSchema(medicationLogs, {
      id: void 0
    });
    insertHospitalSchema = createInsertSchema(hospitals).omit({
      id: true
    });
    insertDoctorSchema = createInsertSchema(doctors).omit({
      id: true
    });
    insertDepartmentSchema = createInsertSchema(departments).omit({
      id: true
    });
    insertDoctorAvailabilitySchema = createInsertSchema(doctorAvailability).omit({
      id: true
    });
    insertDoctorLeaveSchema = createInsertSchema(doctorLeaves).omit({
      id: true
    }).extend({
      startDate: z.union([z.string(), z.date()]).transform((val) => typeof val === "string" ? new Date(val) : val),
      endDate: z.union([z.string(), z.date()]).transform((val) => typeof val === "string" ? new Date(val) : val)
    });
    insertHomeVisitRequestSchema = createInsertSchema(homeVisitRequests).omit({
      id: true,
      createdAt: true
    }).extend({
      preferredDate: z.union([z.string(), z.date(), z.null()]).transform((val) => {
        if (!val) return null;
        return typeof val === "string" ? new Date(val) : val;
      }).optional()
    });
    insertEmergencyIncidentSchema = createInsertSchema(emergencyIncidents).omit({
      id: true,
      createdAt: true,
      dispatchedAt: true,
      arrivedAt: true,
      completedAt: true
    });
    insertAmbulanceSchema = createInsertSchema(ambulances).omit({
      id: true
    });
    insertAmbulanceBookingSchema = createInsertSchema(ambulanceBookings).omit({
      id: true,
      createdAt: true,
      dispatchedAt: true,
      completedAt: true
    });
    insertSymptomCheckSchema = createInsertSchema(symptomChecks).omit({
      id: true,
      createdAt: true
    });
    insertFitnessDataSchema = createInsertSchema(fitnessData).omit({
      id: true,
      syncedAt: true
    }).extend({
      date: z.union([z.string(), z.date()]).transform((val) => typeof val === "string" ? new Date(val) : val)
    });
    dietDays = pgTable("diet_days", {
      id: serial("id").primaryKey(),
      userId: integer("user_id").notNull().references(() => users.id),
      date: text("date").notNull(),
      totalCalories: integer("total_calories").default(0),
      totalProtein: integer("total_protein").default(0),
      totalCarbs: integer("total_carbs").default(0),
      totalFat: integer("total_fat").default(0),
      waterIntake: integer("water_intake").default(0),
      notes: text("notes")
    });
    dietMeals = pgTable("diet_meals", {
      id: serial("id").primaryKey(),
      dietDayId: integer("diet_day_id").notNull().references(() => dietDays.id, { onDelete: "cascade" }),
      type: text("type").notNull(),
      time: text("time").notNull(),
      notes: text("notes")
    });
    dietMealItems = pgTable("diet_meal_items", {
      id: serial("id").primaryKey(),
      dietMealId: integer("diet_meal_id").notNull().references(() => dietMeals.id, { onDelete: "cascade" }),
      name: text("name").notNull(),
      quantity: text("quantity").notNull(),
      calories: integer("calories").notNull(),
      protein: integer("protein").notNull(),
      carbs: integer("carbs").notNull(),
      fat: integer("fat").notNull()
    });
    insertDietDaySchema = createInsertSchema(dietDays).omit({
      id: true
    });
    insertDietMealSchema = createInsertSchema(dietMeals).omit({
      id: true
    });
    insertDietMealItemSchema = createInsertSchema(dietMealItems).omit({
      id: true
    });
  }
});

// server/db.ts
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
var pool, db;
var init_db = __esm({
  "server/db.ts"() {
    "use strict";
    init_schema();
    neonConfig.webSocketConstructor = ws;
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL must be set. Did you forget to provision a database?"
      );
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle({ client: pool, schema: schema_exports });
  }
});

// server/utils/distance.ts
var distance_exports = {};
__export(distance_exports, {
  calculateDistance: () => calculateDistance
});
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}
function toRad(degrees) {
  return degrees * (Math.PI / 180);
}
var init_distance = __esm({
  "server/utils/distance.ts"() {
    "use strict";
  }
});

// server/auth.ts
var auth_exports = {};
__export(auth_exports, {
  comparePasswords: () => comparePasswords,
  hashPassword: () => hashPassword,
  setupAuth: () => setupAuth
});
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { z as z2 } from "zod";
async function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const buf = await scryptAsync(password, salt, 64);
  return `${buf.toString("hex")}.${salt}`;
}
async function comparePasswords(supplied, stored) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = await scryptAsync(supplied, salt, 64);
  return timingSafeEqual(hashedBuf, suppliedBuf);
}
function setupAuth(app2) {
  const sessionSettings = {
    secret: process.env.SESSION_SECRET || "careguidian-secret-key",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      maxAge: 1e3 * 60 * 60 * 24,
      // 24 hours
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    }
  };
  app2.set("trust proxy", 1);
  app2.use(session(sessionSettings));
  app2.use(passport.initialize());
  app2.use(passport.session());
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await storage.getUserByUsername(username);
        if (!user || !await comparePasswords(password, user.password)) {
          return done(null, false);
        } else {
          return done(null, user);
        }
      } catch (error) {
        return done(error);
      }
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await storage.getUser(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
  app2.post("/api/register", async (req, res, next) => {
    try {
      const registerSchema = insertUserSchema.extend({
        password: z2.string().min(8, "Password must be at least 8 characters long"),
        email: z2.string().email("Invalid email format")
      });
      const validatedData = registerSchema.parse(req.body);
      const existingUsername = await storage.getUserByUsername(validatedData.username);
      if (existingUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      const existingEmail = await storage.getUserByEmail(validatedData.email);
      if (existingEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const user = await storage.createUser({
        ...validatedData,
        password: await hashPassword(validatedData.password)
      });
      if (validatedData.role === "hospital") {
        if (!req.body.address || !req.body.city || !req.body.state) {
          return res.status(400).json({ message: "Address, city, and state are required for hospital registration" });
        }
        try {
          await storage.createHospital({
            userId: user.id,
            name: validatedData.fullName,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            phoneNumber: validatedData.phoneNumber || "",
            email: validatedData.email
          });
        } catch (error) {
          console.error("Failed to create hospital record:", error);
          return res.status(500).json({ message: "Failed to create hospital record. Please contact support." });
        }
      }
      req.login(user, (err) => {
        if (err) return next(err);
        res.status(201).json(user);
      });
    } catch (error) {
      if (error instanceof z2.ZodError) {
        return res.status(400).json({ message: "Invalid registration data", errors: error.errors });
      }
      next(error);
    }
  });
  app2.post("/api/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      req.login(user, (loginErr) => {
        if (loginErr) return next(loginErr);
        return res.status(200).json(user);
      });
    })(req, res, next);
  });
  app2.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });
  app2.get("/api/user", (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    res.json(req.user);
  });
}
var scryptAsync;
var init_auth = __esm({
  "server/auth.ts"() {
    "use strict";
    init_storage();
    init_schema();
    scryptAsync = promisify(scrypt);
  }
});

// server/storage.ts
import session2 from "express-session";
import { eq, desc, and, gte, lte } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import pg from "pg";
var Pool2, PostgresSessionStore, DatabaseStorage, storage;
var init_storage = __esm({
  "server/storage.ts"() {
    "use strict";
    init_schema();
    init_db();
    ({ Pool: Pool2 } = pg);
    PostgresSessionStore = connectPg(session2);
    DatabaseStorage = class {
      sessionStore;
      // Using any for SessionStore to avoid type issues
      constructor() {
        const pool2 = new Pool2({ connectionString: process.env.DATABASE_URL });
        this.sessionStore = new PostgresSessionStore({
          pool: pool2,
          tableName: "session",
          createTableIfMissing: true
        });
        this.seedInitialData();
      }
      async getUser(id) {
        const [user] = await db.select().from(users).where(eq(users.id, id));
        return user;
      }
      async getUserByUsername(username) {
        const [user] = await db.select().from(users).where(eq(users.username, username));
        return user;
      }
      async getUserByEmail(email) {
        const [user] = await db.select().from(users).where(eq(users.email, email));
        return user;
      }
      async createUser(insertUser) {
        const [user] = await db.insert(users).values(insertUser).returning();
        return user;
      }
      async getUserHealthData(userId) {
        return await db.select().from(healthData).where(eq(healthData.userId, userId));
      }
      async createHealthData(data) {
        const [newHealthData] = await db.insert(healthData).values(data).returning();
        return newHealthData;
      }
      async getLatestHealthData(userId) {
        const [latestData] = await db.select().from(healthData).where(eq(healthData.userId, userId)).orderBy(desc(healthData.recordedAt)).limit(1);
        return latestData;
      }
      async getUserMedicalRecords(userId) {
        return await db.select().from(medicalRecords).where(eq(medicalRecords.userId, userId));
      }
      async createMedicalRecord(record) {
        const [newRecord] = await db.insert(medicalRecords).values(record).returning();
        return newRecord;
      }
      async getMedicalRecord(id) {
        const [record] = await db.select().from(medicalRecords).where(eq(medicalRecords.id, id));
        return record;
      }
      async getAllDoctors() {
        return await db.select().from(doctors);
      }
      async getDoctor(id) {
        const [doctor] = await db.select().from(doctors).where(eq(doctors.id, id));
        return doctor;
      }
      async getDoctorsByHospital(hospitalId) {
        return await db.select().from(doctors).where(eq(doctors.hospitalId, hospitalId));
      }
      async getDoctorsByDepartment(department) {
        return await db.select().from(doctors).where(eq(doctors.department, department));
      }
      async createDoctor(doctor) {
        const [newDoctor] = await db.insert(doctors).values(doctor).returning();
        return newDoctor;
      }
      async updateDoctor(id, doctor) {
        const [updated] = await db.update(doctors).set(doctor).where(eq(doctors.id, id)).returning();
        return updated;
      }
      async updateDoctorAvailabilityStatus(doctorId, status) {
        const [updated] = await db.update(doctors).set({ availabilityStatus: status }).where(eq(doctors.id, doctorId)).returning();
        return updated;
      }
      async getAllHospitals() {
        return await db.select().from(hospitals);
      }
      async getHospital(id) {
        const [hospital] = await db.select().from(hospitals).where(eq(hospitals.id, id));
        return hospital;
      }
      async getHospitalByEmail(email) {
        const [hospital] = await db.select().from(hospitals).where(eq(hospitals.email, email));
        return hospital;
      }
      async getHospitalByUserId(userId) {
        const [hospital] = await db.select().from(hospitals).where(eq(hospitals.userId, userId));
        return hospital;
      }
      async createHospital(hospital) {
        const [newHospital] = await db.insert(hospitals).values(hospital).returning();
        return newHospital;
      }
      async updateHospital(id, hospital) {
        const [updatedHospital] = await db.update(hospitals).set(hospital).where(eq(hospitals.id, id)).returning();
        return updatedHospital;
      }
      async searchHospitalsByCity(city) {
        return await db.select().from(hospitals).where(eq(hospitals.city, city));
      }
      async searchHospitalsByLocation(latitude, longitude, maxDistance) {
        const { calculateDistance: calculateDistance2 } = await Promise.resolve().then(() => (init_distance(), distance_exports));
        const allHospitals = await db.select().from(hospitals);
        const hospitalsWithDistance = allHospitals.filter((hospital) => hospital.latitude && hospital.longitude).map((hospital) => {
          const distance = calculateDistance2(
            latitude,
            longitude,
            parseFloat(hospital.latitude),
            parseFloat(hospital.longitude)
          );
          return { ...hospital, distance };
        }).filter((hospital) => hospital.distance <= maxDistance).sort((a, b) => a.distance - b.distance);
        return hospitalsWithDistance;
      }
      async updateUserLocation(userId, city, state, latitude, longitude) {
        const [updatedUser] = await db.update(users).set({ city, state, latitude, longitude }).where(eq(users.id, userId)).returning();
        return updatedUser;
      }
      async getUserAppointments(userId) {
        return await db.select().from(appointments).where(eq(appointments.userId, userId));
      }
      async getUserAppointmentsWithDetails(userId) {
        const userAppointments = await db.select({
          id: appointments.id,
          userId: appointments.userId,
          doctorId: appointments.doctorId,
          hospitalId: appointments.hospitalId,
          date: appointments.date,
          time: appointments.time,
          isVirtual: appointments.isVirtual,
          status: appointments.status,
          notes: appointments.notes,
          doctorName: doctors.name,
          doctorSpecialty: doctors.specialty,
          doctorPhoneNumber: doctors.phoneNumber,
          doctorEmail: doctors.email,
          doctorProfileImage: doctors.profileImage,
          hospitalName: hospitals.name,
          hospitalAddress: hospitals.address,
          hospitalPhoneNumber: hospitals.phoneNumber
        }).from(appointments).leftJoin(doctors, eq(appointments.doctorId, doctors.id)).leftJoin(hospitals, eq(appointments.hospitalId, hospitals.id)).where(eq(appointments.userId, userId)).orderBy(desc(appointments.date));
        return userAppointments;
      }
      async createAppointment(appointment) {
        const [newAppointment] = await db.insert(appointments).values(appointment).returning();
        return newAppointment;
      }
      async getAppointment(id) {
        const [appointment] = await db.select().from(appointments).where(eq(appointments.id, id));
        return appointment;
      }
      async updateAppointmentStatus(id, status) {
        const [updatedAppointment] = await db.update(appointments).set({ status }).where(eq(appointments.id, id)).returning();
        return updatedAppointment;
      }
      async getUserChatHistory(userId) {
        return await db.select().from(chatMessages).where(eq(chatMessages.userId, userId));
      }
      async createChatMessage(message) {
        const [newMessage] = await db.insert(chatMessages).values(message).returning();
        return newMessage;
      }
      // Medication management
      async getUserMedications(userId) {
        return await db.select().from(medications).where(eq(medications.userId, userId));
      }
      async getUserActiveMedications(userId) {
        return await db.select().from(medications).where(and(
          eq(medications.userId, userId),
          eq(medications.active, true)
        ));
      }
      async getMedication(id) {
        const [medication] = await db.select().from(medications).where(eq(medications.id, id));
        return medication;
      }
      async createMedication(medication) {
        const [newMedication] = await db.insert(medications).values(medication).returning();
        return newMedication;
      }
      async updateMedication(id, medication) {
        const [updatedMedication] = await db.update(medications).set(medication).where(eq(medications.id, id)).returning();
        return updatedMedication;
      }
      async toggleMedicationStatus(id, active) {
        const [updatedMedication] = await db.update(medications).set({ active }).where(eq(medications.id, id)).returning();
        return updatedMedication;
      }
      async getMedicationLogs(medicationId) {
        return await db.select().from(medicationLogs).where(eq(medicationLogs.medicationId, medicationId)).orderBy(desc(medicationLogs.takenAt));
      }
      async createMedicationLog(log2) {
        const [newLog] = await db.insert(medicationLogs).values(log2).returning();
        return newLog;
      }
      async getUserDietDay(userId, date) {
        const [dietDay] = await db.select().from(dietDays).where(and(
          eq(dietDays.userId, userId),
          eq(dietDays.date, date)
        ));
        return dietDay;
      }
      async createDietDay(dietDay) {
        const [newDietDay] = await db.insert(dietDays).values(dietDay).returning();
        return newDietDay;
      }
      async updateDietDay(id, dietDay) {
        const [updatedDietDay] = await db.update(dietDays).set(dietDay).where(eq(dietDays.id, id)).returning();
        return updatedDietDay;
      }
      async getDietMeals(dietDayId) {
        return await db.select().from(dietMeals).where(eq(dietMeals.dietDayId, dietDayId));
      }
      async createDietMeal(meal) {
        const [newMeal] = await db.insert(dietMeals).values(meal).returning();
        return newMeal;
      }
      async updateDietMeal(id, meal) {
        const [updatedMeal] = await db.update(dietMeals).set(meal).where(eq(dietMeals.id, id)).returning();
        return updatedMeal;
      }
      async deleteDietMeal(id) {
        await db.delete(dietMeals).where(eq(dietMeals.id, id));
      }
      async getDietMealItems(mealId) {
        return await db.select().from(dietMealItems).where(eq(dietMealItems.dietMealId, mealId));
      }
      async createDietMealItem(item) {
        const [newItem] = await db.insert(dietMealItems).values(item).returning();
        return newItem;
      }
      async deleteDietMealItem(id) {
        await db.delete(dietMealItems).where(eq(dietMealItems.id, id));
      }
      // Appointment management
      async cancelAppointment(id, userId) {
        const result = await db.update(appointments).set({ status: "cancelled", updatedAt: /* @__PURE__ */ new Date() }).where(and(eq(appointments.id, id), eq(appointments.userId, userId))).returning();
        return result.length > 0;
      }
      async rescheduleAppointment(id, userId, newDate, newTime) {
        const [updatedAppointment] = await db.update(appointments).set({ date: newDate, time: newTime, updatedAt: /* @__PURE__ */ new Date() }).where(and(eq(appointments.id, id), eq(appointments.userId, userId))).returning();
        return updatedAppointment;
      }
      // Departments
      async getAllDepartments() {
        return await db.select().from(departments);
      }
      async getDepartmentsByHospital(hospitalId) {
        return await db.select().from(departments).where(eq(departments.hospitalId, hospitalId));
      }
      // Doctor Availability & Leaves
      async getDoctorAvailability(doctorId) {
        return await db.select().from(doctorAvailability).where(eq(doctorAvailability.doctorId, doctorId));
      }
      async getDoctorLeaves(doctorId) {
        return await db.select().from(doctorLeaves).where(eq(doctorLeaves.doctorId, doctorId));
      }
      async isDoctorAvailable(doctorId, date) {
        const leaves = await db.select().from(doctorLeaves).where(and(
          eq(doctorLeaves.doctorId, doctorId),
          eq(doctorLeaves.startDate, date)
        ));
        return leaves.length === 0;
      }
      // Home Visit Requests
      async createHomeVisitRequest(request) {
        const [newRequest] = await db.insert(homeVisitRequests).values(request).returning();
        return newRequest;
      }
      async getUserHomeVisitRequests(userId) {
        return await db.select().from(homeVisitRequests).where(eq(homeVisitRequests.userId, userId));
      }
      async updateHomeVisitRequestStatus(id, status, assignedHospitalId, assignedDoctorId) {
        const updateData = { status };
        if (assignedHospitalId) updateData.assignedHospitalId = assignedHospitalId;
        if (assignedDoctorId) updateData.assignedDoctorId = assignedDoctorId;
        const [updated] = await db.update(homeVisitRequests).set(updateData).where(eq(homeVisitRequests.id, id)).returning();
        return updated;
      }
      // Emergency Incidents
      async createEmergencyIncident(incident) {
        const [newIncident] = await db.insert(emergencyIncidents).values(incident).returning();
        return newIncident;
      }
      async getEmergencyIncident(id) {
        const [incident] = await db.select().from(emergencyIncidents).where(eq(emergencyIncidents.id, id));
        return incident;
      }
      async updateEmergencyIncidentStatus(id, status, ambulanceId, hospitalId) {
        const updateData = { status };
        if (ambulanceId !== void 0) updateData.assignedAmbulanceId = ambulanceId;
        if (hospitalId !== void 0) updateData.assignedHospitalId = hospitalId;
        if (status === "dispatched") updateData.dispatchedAt = /* @__PURE__ */ new Date();
        if (status === "arrived") updateData.arrivedAt = /* @__PURE__ */ new Date();
        if (status === "completed") updateData.completedAt = /* @__PURE__ */ new Date();
        const [updated] = await db.update(emergencyIncidents).set(updateData).where(eq(emergencyIncidents.id, id)).returning();
        return updated;
      }
      async getUserEmergencyIncidents(userId) {
        return await db.select().from(emergencyIncidents).where(eq(emergencyIncidents.userId, userId)).orderBy(desc(emergencyIncidents.createdAt));
      }
      // Ambulances
      async getAvailableAmbulances() {
        return await db.select().from(ambulances).where(eq(ambulances.status, "available"));
      }
      async getNearestAvailableAmbulance(latitude, longitude) {
        const availableAmbulances = await this.getAvailableAmbulances();
        if (availableAmbulances.length === 0) return void 0;
        const userLat = parseFloat(latitude);
        const userLon = parseFloat(longitude);
        let nearestAmbulance = availableAmbulances[0];
        let minDistance = Infinity;
        for (const ambulance of availableAmbulances) {
          if (ambulance.currentLatitude && ambulance.currentLongitude) {
            const ambLat = parseFloat(ambulance.currentLatitude);
            const ambLon = parseFloat(ambulance.currentLongitude);
            const distance = Math.sqrt(
              Math.pow(userLat - ambLat, 2) + Math.pow(userLon - ambLon, 2)
            );
            if (distance < minDistance) {
              minDistance = distance;
              nearestAmbulance = ambulance;
            }
          }
        }
        return nearestAmbulance;
      }
      async updateAmbulanceStatus(id, status, latitude, longitude) {
        const updateData = { status };
        if (latitude) updateData.currentLatitude = latitude;
        if (longitude) updateData.currentLongitude = longitude;
        const [updated] = await db.update(ambulances).set(updateData).where(eq(ambulances.id, id)).returning();
        return updated;
      }
      async createAmbulanceBooking(booking) {
        const [newBooking] = await db.insert(ambulanceBookings).values(booking).returning();
        return newBooking;
      }
      async getUserAmbulanceBookings(userId) {
        return await db.select().from(ambulanceBookings).where(eq(ambulanceBookings.userId, userId)).orderBy(desc(ambulanceBookings.createdAt));
      }
      async updateAmbulanceBookingStatus(id, status) {
        const [updated] = await db.update(ambulanceBookings).set({ status }).where(eq(ambulanceBookings.id, id)).returning();
        return updated;
      }
      async getAmbulanceByUserId(userId) {
        const [ambulance] = await db.select().from(ambulances).where(eq(ambulances.userId, userId));
        return ambulance;
      }
      async getAmbulanceBookingsByAmbulanceId(ambulanceId) {
        return await db.select().from(ambulanceBookings).where(eq(ambulanceBookings.ambulanceId, ambulanceId)).orderBy(desc(ambulanceBookings.createdAt));
      }
      async updateAmbulanceLocation(id, latitude, longitude) {
        const [updated] = await db.update(ambulances).set({ currentLatitude: latitude, currentLongitude: longitude }).where(eq(ambulances.id, id)).returning();
        return updated;
      }
      async searchAmbulances(latitude, longitude, maxDistance) {
        const { calculateDistance: calculateDistance2 } = await Promise.resolve().then(() => (init_distance(), distance_exports));
        const availableAmbulances = await db.select({
          id: ambulances.id,
          vehicleNumber: ambulances.vehicleNumber,
          status: ambulances.status,
          currentLatitude: ambulances.currentLatitude,
          currentLongitude: ambulances.currentLongitude,
          userId: ambulances.userId,
          driverName: users.fullName,
          driverPhone: users.phoneNumber
        }).from(ambulances).leftJoin(users, eq(ambulances.userId, users.id)).where(eq(ambulances.status, "available"));
        const ambulancesWithDistance = availableAmbulances.filter((amb) => amb.currentLatitude && amb.currentLongitude).map((amb) => {
          const distance = calculateDistance2(
            latitude,
            longitude,
            parseFloat(amb.currentLatitude),
            parseFloat(amb.currentLongitude)
          );
          return {
            ...amb,
            distance
          };
        }).filter((amb) => amb.distance <= maxDistance).sort((a, b) => a.distance - b.distance);
        return ambulancesWithDistance;
      }
      // Symptom Checker
      async createSymptomCheck(check) {
        const [newCheck] = await db.insert(symptomChecks).values(check).returning();
        return newCheck;
      }
      async getUserSymptomChecks(userId) {
        return await db.select().from(symptomChecks).where(eq(symptomChecks.userId, userId)).orderBy(desc(symptomChecks.createdAt));
      }
      async getSymptomCheck(id) {
        const [check] = await db.select().from(symptomChecks).where(eq(symptomChecks.id, id));
        return check;
      }
      // Fitness Data
      async createFitnessData(data) {
        const [newData] = await db.insert(fitnessData).values(data).returning();
        return newData;
      }
      async getUserFitnessData(userId) {
        return await db.select().from(fitnessData).where(eq(fitnessData.userId, userId)).orderBy(desc(fitnessData.date));
      }
      async getUserFitnessDataByDateRange(userId, startDate, endDate) {
        return await db.select().from(fitnessData).where(
          and(
            eq(fitnessData.userId, userId),
            gte(fitnessData.date, startDate),
            lte(fitnessData.date, endDate)
          )
        ).orderBy(desc(fitnessData.date));
      }
      async getLatestFitnessData(userId) {
        const [latest] = await db.select().from(fitnessData).where(eq(fitnessData.userId, userId)).orderBy(desc(fitnessData.date)).limit(1);
        return latest;
      }
      async seedInitialData() {
        try {
          const adminExists = await this.getUserByUsername("admin");
          if (!adminExists) {
            console.log("Admin user not found. Creating admin user...");
            const { hashPassword: hashPassword2 } = await Promise.resolve().then(() => (init_auth(), auth_exports));
            await this.createUser({
              username: "admin",
              password: await hashPassword2("admin"),
              email: "admin@careguardian.com",
              fullName: "Admin User",
              phoneNumber: "123-456-7890",
              role: "user"
            });
            console.log("Admin user created successfully.");
          }
          const existingDepartments = await this.getAllDepartments();
          if (existingDepartments.length === 0) {
            console.log("Seeding departments...");
            const departmentData = [
              { hospitalId: 1, name: "Cardiology", description: "Heart and cardiovascular care" },
              { hospitalId: 1, name: "Neurology", description: "Brain and nervous system care" },
              { hospitalId: 1, name: "Orthopedics", description: "Bone and joint care" },
              { hospitalId: 1, name: "Pediatrics", description: "Children's healthcare" },
              { hospitalId: 1, name: "General Medicine", description: "General health and wellness" }
            ];
            for (const dept of departmentData) {
              await db.insert(departments).values(dept);
            }
            console.log("Departments seeded successfully.");
          }
        } catch (error) {
          console.error("Error seeding initial data:", error);
        }
      }
    };
    storage = new DatabaseStorage();
  }
});

// server/index.ts
import express2 from "express";

// server/routes.ts
init_storage();
init_auth();
init_schema();
import { createServer } from "http";
import { z as z3 } from "zod";

// server/openai.ts
import OpenAI from "openai";
var openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
async function analyzeSymptoms(symptoms, age, gender, medicalHistory) {
  try {
    const prompt = `
      As a medical assistant AI, analyze the following symptoms and provide potential diagnoses and recommendations.
      
      Patient Information:
      - Age: ${age}
      - Gender: ${gender}
      - Symptoms: ${symptoms}
      ${medicalHistory ? `- Medical History: ${medicalHistory}` : ""}
      
      Based on this information, provide:
      1. 2-5 possible conditions that match these symptoms (with probability level: low, medium, or high)
      2. General recommendations for the patient
      3. Urgency level (low, medium, high, or emergency)
      
      Respond with JSON in this format:
      {
        "possibleConditions": [
          {"condition": "Name of condition", "probability": "low/medium/high"}
        ],
        "recommendations": ["recommendation 1", "recommendation 2", ...],
        "urgencyLevel": "low/medium/high/emergency",
        "disclaimer": "Standard medical disclaimer"
      }
      
      IMPORTANT: Include a clear medical disclaimer stating this is not a replacement for professional medical advice.
    `;
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });
    const content = response.choices[0].message.content || "{}";
    const result = JSON.parse(content);
    return {
      possibleConditions: result.possibleConditions || [],
      recommendations: result.recommendations || [],
      urgencyLevel: result.urgencyLevel || "low",
      disclaimer: result.disclaimer || "This analysis is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition."
    };
  } catch (error) {
    console.error("Error analyzing symptoms:", error);
    throw new Error("Failed to analyze symptoms. Please try again later.");
  }
}
async function getFirstAidGuidance(situation) {
  try {
    const prompt = `
      As a medical assistant AI, provide first aid guidance for the following situation:
      
      Situation: ${situation}
      
      Based on this information, provide:
      1. Step-by-step first aid instructions
      2. Important warnings or precautions
      
      Respond with JSON in this format:
      {
        "situation": "Brief description of the situation",
        "steps": ["step 1", "step 2", ...],
        "warnings": ["warning 1", "warning 2", ...],
        "disclaimer": "Standard medical disclaimer"
      }
      
      IMPORTANT: Include a clear medical disclaimer stating this is not a replacement for professional medical advice or emergency services.
    `;
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });
    const content = response.choices[0].message.content || "{}";
    const result = JSON.parse(content);
    return {
      situation: result.situation || situation,
      steps: result.steps || [],
      warnings: result.warnings || [],
      disclaimer: result.disclaimer || "This guidance is not a substitute for professional medical advice, diagnosis, or treatment. In case of emergency, call emergency services immediately."
    };
  } catch (error) {
    console.error("Error getting first aid guidance:", error);
    throw new Error("Failed to get first aid guidance. Please try again later.");
  }
}

// server/routes.ts
async function registerRoutes(app2) {
  setupAuth(app2);
  app2.get("/api/health-data", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const userData = await storage.getUserHealthData(req.user.id);
      res.json(userData);
    } catch (error) {
      console.error("Failed to get health data:", error);
      res.status(500).json({ message: "Failed to get health data" });
    }
  });
  app2.get("/api/health-data/latest", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const latestData = await storage.getLatestHealthData(req.user.id);
      if (!latestData) {
        return res.status(404).json({ message: "No health data found" });
      }
      res.json(latestData);
    } catch (error) {
      console.error("Failed to get latest health data:", error);
      res.status(500).json({ message: "Failed to get latest health data" });
    }
  });
  app2.post("/api/health-data", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const validatedData = insertHealthDataSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const newHealthData = await storage.createHealthData(validatedData);
      res.status(201).json(newHealthData);
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid health data", errors: error.errors });
      }
      console.error("Failed to create health data:", error);
      res.status(500).json({ message: "Failed to create health data" });
    }
  });
  app2.get("/api/medical-records", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const records = await storage.getUserMedicalRecords(req.user.id);
      res.json(records);
    } catch (error) {
      console.error("Failed to get medical records:", error);
      res.status(500).json({ message: "Failed to get medical records" });
    }
  });
  app2.get("/api/medical-records/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const recordId = parseInt(req.params.id);
      if (isNaN(recordId)) {
        return res.status(400).json({ message: "Invalid record ID" });
      }
      const record = await storage.getMedicalRecord(recordId);
      if (!record) {
        return res.status(404).json({ message: "Medical record not found" });
      }
      if (record.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized access to medical record" });
      }
      res.json(record);
    } catch (error) {
      console.error("Failed to get medical record:", error);
      res.status(500).json({ message: "Failed to get medical record" });
    }
  });
  app2.post("/api/medical-records", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const validatedData = insertMedicalRecordSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const newRecord = await storage.createMedicalRecord(validatedData);
      res.status(201).json(newRecord);
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid medical record data", errors: error.errors });
      }
      console.error("Failed to create medical record:", error);
      res.status(500).json({ message: "Failed to create medical record" });
    }
  });
  app2.get("/api/doctors", async (req, res) => {
    try {
      const doctors2 = await storage.getAllDoctors();
      res.json(doctors2);
    } catch (error) {
      console.error("Failed to get doctors:", error);
      res.status(500).json({ message: "Failed to get doctors" });
    }
  });
  app2.get("/api/doctors/:id", async (req, res) => {
    try {
      const doctorId = parseInt(req.params.id);
      if (isNaN(doctorId)) {
        return res.status(400).json({ message: "Invalid doctor ID" });
      }
      const doctor = await storage.getDoctor(doctorId);
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      res.json(doctor);
    } catch (error) {
      console.error("Failed to get doctor:", error);
      res.status(500).json({ message: "Failed to get doctor" });
    }
  });
  app2.get("/api/doctors/department/:department", async (req, res) => {
    try {
      const department = req.params.department;
      const doctors2 = await storage.getDoctorsByDepartment(department);
      res.json(doctors2);
    } catch (error) {
      console.error("Failed to get doctors by department:", error);
      res.status(500).json({ message: "Failed to get doctors by department" });
    }
  });
  app2.patch("/api/doctors/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const doctorId = parseInt(req.params.id);
      if (isNaN(doctorId)) {
        return res.status(400).json({ message: "Invalid doctor ID" });
      }
      if (req.user.role !== "hospital") {
        return res.status(403).json({ message: "Only hospitals can update doctor information" });
      }
      const updatedDoctor = await storage.updateDoctor(doctorId, req.body);
      if (!updatedDoctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      res.json(updatedDoctor);
    } catch (error) {
      console.error("Failed to update doctor:", error);
      res.status(500).json({ message: "Failed to update doctor" });
    }
  });
  app2.patch("/api/doctors/:id/availability", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const doctorId = parseInt(req.params.id);
      if (isNaN(doctorId)) {
        return res.status(400).json({ message: "Invalid doctor ID" });
      }
      if (req.user.role !== "hospital") {
        return res.status(403).json({ message: "Only hospitals can update doctor availability" });
      }
      const { status } = req.body;
      if (!status || !["available", "unavailable", "on-leave"].includes(status)) {
        return res.status(400).json({ message: "Invalid status. Must be available, unavailable, or on-leave" });
      }
      const updatedDoctor = await storage.updateDoctorAvailabilityStatus(doctorId, status);
      if (!updatedDoctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
      res.json(updatedDoctor);
    } catch (error) {
      console.error("Failed to update doctor availability:", error);
      res.status(500).json({ message: "Failed to update doctor availability" });
    }
  });
  app2.get("/api/hospitals", async (req, res) => {
    try {
      let hospitals2;
      if (req.isAuthenticated() && req.user.city) {
        hospitals2 = await storage.searchHospitalsByCity(req.user.city);
      } else {
        hospitals2 = await storage.getAllHospitals();
      }
      res.json(hospitals2);
    } catch (error) {
      console.error("Failed to get hospitals:", error);
      res.status(500).json({ message: "Failed to get hospitals" });
    }
  });
  app2.get("/api/hospitals/me", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      if (req.user.role !== "hospital") {
        return res.status(403).json({ message: "Only hospitals can access this endpoint" });
      }
      const hospital = await storage.getHospitalByUserId(req.user.id);
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found. Please contact support." });
      }
      res.json(hospital);
    } catch (error) {
      console.error("Failed to get hospital:", error);
      res.status(500).json({ message: "Failed to get hospital" });
    }
  });
  app2.get("/api/hospitals/:id", async (req, res) => {
    try {
      const hospitalId = parseInt(req.params.id);
      if (isNaN(hospitalId)) {
        return res.status(400).json({ message: "Invalid hospital ID" });
      }
      const hospital = await storage.getHospital(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }
      res.json(hospital);
    } catch (error) {
      console.error("Failed to get hospital:", error);
      res.status(500).json({ message: "Failed to get hospital" });
    }
  });
  app2.post("/api/hospitals", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const validatedData = insertHospitalSchema.parse(req.body);
      const newHospital = await storage.createHospital(validatedData);
      res.status(201).json(newHospital);
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid hospital data", errors: error.errors });
      }
      console.error("Failed to create hospital:", error);
      res.status(500).json({ message: "Failed to create hospital" });
    }
  });
  app2.patch("/api/hospitals/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const hospitalId = parseInt(req.params.id);
      if (isNaN(hospitalId)) {
        return res.status(400).json({ message: "Invalid hospital ID" });
      }
      const updatedHospital = await storage.updateHospital(hospitalId, req.body);
      if (!updatedHospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }
      res.json(updatedHospital);
    } catch (error) {
      console.error("Failed to update hospital:", error);
      res.status(500).json({ message: "Failed to update hospital" });
    }
  });
  app2.get("/api/hospitals/:id/doctors", async (req, res) => {
    try {
      const hospitalId = parseInt(req.params.id);
      if (isNaN(hospitalId)) {
        return res.status(400).json({ message: "Invalid hospital ID" });
      }
      const doctors2 = await storage.getDoctorsByHospital(hospitalId);
      res.json(doctors2);
    } catch (error) {
      console.error("Failed to get hospital doctors:", error);
      res.status(500).json({ message: "Failed to get hospital doctors" });
    }
  });
  app2.post("/api/hospitals/:id/doctors", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const hospitalId = parseInt(req.params.id);
      if (isNaN(hospitalId)) {
        return res.status(400).json({ message: "Invalid hospital ID" });
      }
      if (req.user.role !== "hospital") {
        return res.status(403).json({ message: "Only hospitals can assign doctors" });
      }
      const hospital = await storage.getHospital(hospitalId);
      if (!hospital) {
        return res.status(404).json({ message: "Hospital not found" });
      }
      const doctorData = insertDoctorSchema.parse({
        ...req.body,
        hospitalId,
        availabilityStatus: req.body.availabilityStatus || "available"
      });
      const newDoctor = await storage.createDoctor(doctorData);
      res.status(201).json(newDoctor);
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid doctor data", errors: error.errors });
      }
      console.error("Failed to create doctor:", error);
      res.status(500).json({ message: "Failed to create doctor" });
    }
  });
  app2.post("/api/hospitals/search", async (req, res) => {
    try {
      const { city, latitude, longitude, maxDistance = 50 } = req.body;
      if (city) {
        const hospitals3 = await storage.searchHospitalsByCity(city);
        return res.json({ hospitals: hospitals3 });
      }
      if (latitude !== void 0 && longitude !== void 0) {
        const hospitals3 = await storage.searchHospitalsByLocation(
          parseFloat(latitude),
          parseFloat(longitude),
          maxDistance
        );
        return res.json({ hospitals: hospitals3 });
      }
      const hospitals2 = await storage.getAllHospitals();
      res.json({ hospitals: hospitals2 });
    } catch (error) {
      console.error("Failed to search hospitals:", error);
      res.status(500).json({ message: "Failed to search hospitals" });
    }
  });
  app2.patch("/api/user/location", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const { city, state, latitude, longitude } = req.body;
      if (!city || !state || !latitude || !longitude) {
        return res.status(400).json({ message: "City, state, latitude, and longitude are required" });
      }
      const updatedUser = await storage.updateUserLocation(
        req.user.id,
        city,
        state,
        latitude,
        longitude
      );
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(updatedUser);
    } catch (error) {
      console.error("Failed to update user location:", error);
      res.status(500).json({ message: "Failed to update user location" });
    }
  });
  app2.get("/api/appointments", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const appointments2 = await storage.getUserAppointmentsWithDetails(req.user.id);
      res.json(appointments2);
    } catch (error) {
      console.error("Failed to get appointments:", error);
      res.status(500).json({ message: "Failed to get appointments" });
    }
  });
  app2.post("/api/appointments", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const validatedData = insertAppointmentSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const newAppointment = await storage.createAppointment(validatedData);
      res.status(201).json(newAppointment);
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid appointment data", errors: error.errors });
      }
      console.error("Failed to create appointment:", error);
      res.status(500).json({ message: "Failed to create appointment" });
    }
  });
  app2.patch("/api/appointments/:id/status", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const appointmentId = parseInt(req.params.id);
      if (isNaN(appointmentId)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
      }
      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ message: "Status is required" });
      }
      const appointment = await storage.getAppointment(appointmentId);
      if (!appointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      if (appointment.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized access to appointment" });
      }
      const updatedAppointment = await storage.updateAppointmentStatus(appointmentId, status);
      res.json(updatedAppointment);
    } catch (error) {
      console.error("Failed to update appointment status:", error);
      res.status(500).json({ message: "Failed to update appointment status" });
    }
  });
  app2.post("/api/appointments/:id/cancel", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const appointmentId = parseInt(req.params.id);
      if (isNaN(appointmentId)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
      }
      const success = await storage.cancelAppointment(appointmentId, req.user.id);
      if (!success) {
        return res.status(404).json({ message: "Appointment not found or unauthorized" });
      }
      res.json({ message: "Appointment cancelled successfully" });
    } catch (error) {
      console.error("Failed to cancel appointment:", error);
      res.status(500).json({ message: "Failed to cancel appointment" });
    }
  });
  app2.post("/api/appointments/:id/reschedule", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const appointmentId = parseInt(req.params.id);
      if (isNaN(appointmentId)) {
        return res.status(400).json({ message: "Invalid appointment ID" });
      }
      const { date, time } = req.body;
      if (!date || !time) {
        return res.status(400).json({ message: "Date and time are required" });
      }
      const newDate = new Date(date);
      const updatedAppointment = await storage.rescheduleAppointment(appointmentId, req.user.id, newDate, time);
      if (!updatedAppointment) {
        return res.status(404).json({ message: "Appointment not found or unauthorized" });
      }
      res.json(updatedAppointment);
    } catch (error) {
      console.error("Failed to reschedule appointment:", error);
      res.status(500).json({ message: "Failed to reschedule appointment" });
    }
  });
  app2.get("/api/departments", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const departments2 = await storage.getAllDepartments();
      res.json(departments2);
    } catch (error) {
      console.error("Failed to get departments:", error);
      res.status(500).json({ message: "Failed to get departments" });
    }
  });
  app2.get("/api/hospitals/:hospitalId/departments", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const hospitalId = parseInt(req.params.hospitalId);
      if (isNaN(hospitalId)) {
        return res.status(400).json({ message: "Invalid hospital ID" });
      }
      const departments2 = await storage.getDepartmentsByHospital(hospitalId);
      res.json(departments2);
    } catch (error) {
      console.error("Failed to get departments:", error);
      res.status(500).json({ message: "Failed to get departments" });
    }
  });
  app2.post("/api/home-visits", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const validatedData = insertHomeVisitRequestSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const newRequest = await storage.createHomeVisitRequest(validatedData);
      res.status(201).json(newRequest);
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid home visit request data", errors: error.errors });
      }
      console.error("Failed to create home visit request:", error);
      res.status(500).json({ message: "Failed to create home visit request" });
    }
  });
  app2.get("/api/home-visits", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const requests = await storage.getUserHomeVisitRequests(req.user.id);
      res.json(requests);
    } catch (error) {
      console.error("Failed to get home visit requests:", error);
      res.status(500).json({ message: "Failed to get home visit requests" });
    }
  });
  app2.post("/api/emergency", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const validatedData = insertEmergencyIncidentSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const incident = await storage.createEmergencyIncident(validatedData);
      if (incident.latitude && incident.longitude) {
        const nearestAmbulance = await storage.getNearestAvailableAmbulance(
          incident.latitude,
          incident.longitude
        );
        if (nearestAmbulance) {
          await storage.updateAmbulanceStatus(nearestAmbulance.id, "dispatched");
          await storage.updateEmergencyIncidentStatus(
            incident.id,
            "dispatched",
            nearestAmbulance.id
          );
          const updatedIncident = await storage.getEmergencyIncident(incident.id);
          return res.status(201).json({
            incident: updatedIncident,
            ambulance: nearestAmbulance
          });
        }
      }
      res.status(201).json({ incident, ambulance: null });
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid emergency data", errors: error.errors });
      }
      console.error("Failed to create emergency incident:", error);
      res.status(500).json({ message: "Failed to create emergency incident" });
    }
  });
  app2.get("/api/emergency", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const incidents = await storage.getUserEmergencyIncidents(req.user.id);
      res.json(incidents);
    } catch (error) {
      console.error("Failed to get emergency incidents:", error);
      res.status(500).json({ message: "Failed to get emergency incidents" });
    }
  });
  app2.get("/api/emergency/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const incidentId = parseInt(req.params.id);
      if (isNaN(incidentId)) {
        return res.status(400).json({ message: "Invalid incident ID" });
      }
      const incident = await storage.getEmergencyIncident(incidentId);
      if (!incident) {
        return res.status(404).json({ message: "Emergency incident not found" });
      }
      if (incident.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized access to emergency incident" });
      }
      res.json(incident);
    } catch (error) {
      console.error("Failed to get emergency incident:", error);
      res.status(500).json({ message: "Failed to get emergency incident" });
    }
  });
  app2.get("/api/ambulances/available", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const ambulances2 = await storage.getAvailableAmbulances();
      res.json(ambulances2);
    } catch (error) {
      console.error("Failed to get available ambulances:", error);
      res.status(500).json({ message: "Failed to get available ambulances" });
    }
  });
  app2.post("/api/ambulances/search", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const { latitude, longitude, mode } = req.body;
      if (!latitude || !longitude) {
        return res.status(400).json({ message: "Latitude and longitude are required" });
      }
      const lat = parseFloat(latitude);
      const lon = parseFloat(longitude);
      if (isNaN(lat) || isNaN(lon)) {
        return res.status(400).json({ message: "Invalid latitude or longitude" });
      }
      let maxDistance = mode === "emergency" ? 25 : 10;
      const ambulances2 = await storage.searchAmbulances(lat, lon, maxDistance);
      if (mode === "emergency" && ambulances2.length === 0) {
        return res.json({ fallback: "call112", ambulances: [] });
      }
      res.json({ ambulances: ambulances2 });
    } catch (error) {
      console.error("Failed to search ambulances:", error);
      res.status(500).json({ message: "Failed to search ambulances" });
    }
  });
  app2.post("/api/ambulance-bookings", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const validatedData = insertAmbulanceBookingSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const booking = await storage.createAmbulanceBooking(validatedData);
      console.log(`${(/* @__PURE__ */ new Date()).toISOString()} [express] Ambulance booking created:`, booking);
      res.status(201).json(booking);
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid booking data", errors: error.errors });
      }
      console.error("Failed to create ambulance booking:", error);
      res.status(500).json({ message: "Failed to create ambulance booking" });
    }
  });
  app2.get("/api/ambulance-bookings", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const bookings = await storage.getUserAmbulanceBookings(req.user.id);
      res.json(bookings);
    } catch (error) {
      console.error("Failed to get ambulance bookings:", error);
      res.status(500).json({ message: "Failed to get ambulance bookings" });
    }
  });
  app2.get("/api/ambulance/my-ambulance", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    if (req.user.role !== "ambulance") {
      return res.status(403).json({ message: "Access denied. Ambulance drivers only." });
    }
    try {
      const ambulance = await storage.getAmbulanceByUserId(req.user.id);
      res.json(ambulance || null);
    } catch (error) {
      console.error("Failed to get ambulance:", error);
      res.status(500).json({ message: "Failed to get ambulance" });
    }
  });
  app2.get("/api/ambulance/bookings", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    if (req.user.role !== "ambulance") {
      return res.status(403).json({ message: "Access denied. Ambulance drivers only." });
    }
    try {
      const ambulance = await storage.getAmbulanceByUserId(req.user.id);
      if (!ambulance) {
        return res.json([]);
      }
      const bookings = await storage.getAmbulanceBookingsByAmbulanceId(ambulance.id);
      res.json(bookings);
    } catch (error) {
      console.error("Failed to get ambulance bookings:", error);
      res.status(500).json({ message: "Failed to get ambulance bookings" });
    }
  });
  app2.patch("/api/ambulance/status", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    if (req.user.role !== "ambulance") {
      return res.status(403).json({ message: "Access denied. Ambulance drivers only." });
    }
    try {
      const { status } = req.body;
      const ambulance = await storage.getAmbulanceByUserId(req.user.id);
      if (!ambulance) {
        return res.status(404).json({ message: "Ambulance not found" });
      }
      const updated = await storage.updateAmbulanceStatus(ambulance.id, status);
      res.json(updated);
    } catch (error) {
      console.error("Failed to update ambulance status:", error);
      res.status(500).json({ message: "Failed to update ambulance status" });
    }
  });
  app2.patch("/api/ambulance/location", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    if (req.user.role !== "ambulance") {
      return res.status(403).json({ message: "Access denied. Ambulance drivers only." });
    }
    try {
      const { latitude, longitude } = req.body;
      const ambulance = await storage.getAmbulanceByUserId(req.user.id);
      if (!ambulance) {
        return res.status(404).json({ message: "Ambulance not found" });
      }
      const updated = await storage.updateAmbulanceLocation(ambulance.id, latitude, longitude);
      res.json(updated);
    } catch (error) {
      console.error("Failed to update ambulance location:", error);
      res.status(500).json({ message: "Failed to update ambulance location" });
    }
  });
  app2.patch("/api/ambulance/bookings/:id/accept", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    if (req.user.role !== "ambulance") {
      return res.status(403).json({ message: "Access denied. Ambulance drivers only." });
    }
    try {
      const bookingId = parseInt(req.params.id);
      const updated = await storage.updateAmbulanceBookingStatus(bookingId, "accepted");
      res.json(updated);
    } catch (error) {
      console.error("Failed to accept booking:", error);
      res.status(500).json({ message: "Failed to accept booking" });
    }
  });
  app2.patch("/api/ambulance/bookings/:id/complete", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    if (req.user.role !== "ambulance") {
      return res.status(403).json({ message: "Access denied. Ambulance drivers only." });
    }
    try {
      const bookingId = parseInt(req.params.id);
      const updated = await storage.updateAmbulanceBookingStatus(bookingId, "completed");
      res.json(updated);
    } catch (error) {
      console.error("Failed to complete booking:", error);
      res.status(500).json({ message: "Failed to complete booking" });
    }
  });
  app2.post("/api/symptom-checker", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const { symptoms, age, gender, medicalHistory } = req.body;
      if (!symptoms || typeof symptoms !== "string") {
        return res.status(400).json({ message: "Symptoms description is required" });
      }
      if (!age || typeof age !== "number") {
        return res.status(400).json({ message: "Age is required and must be a number" });
      }
      if (!gender || typeof gender !== "string") {
        return res.status(400).json({ message: "Gender is required" });
      }
      const result = await analyzeSymptoms(symptoms, age, gender, medicalHistory);
      res.json(result);
    } catch (error) {
      console.error("Failed to analyze symptoms:", error);
      res.status(500).json({
        message: "Failed to analyze symptoms",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.post("/api/first-aid-guidance", async (req, res) => {
    try {
      const { situation } = req.body;
      if (!situation || typeof situation !== "string") {
        return res.status(400).json({ message: "Situation description is required" });
      }
      const result = await getFirstAidGuidance(situation);
      res.json(result);
    } catch (error) {
      console.error("Failed to get first aid guidance:", error);
      res.status(500).json({
        message: "Failed to get first aid guidance",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });
  app2.get("/api/medications", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const medications2 = await storage.getUserMedications(req.user.id);
      res.json(medications2);
    } catch (error) {
      console.error("Failed to get medications:", error);
      res.status(500).json({ message: "Failed to get medications" });
    }
  });
  app2.get("/api/medications/active", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const activeMedications = await storage.getUserActiveMedications(req.user.id);
      res.json(activeMedications);
    } catch (error) {
      console.error("Failed to get active medications:", error);
      res.status(500).json({ message: "Failed to get active medications" });
    }
  });
  app2.get("/api/medications/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const medicationId = parseInt(req.params.id);
      if (isNaN(medicationId)) {
        return res.status(400).json({ message: "Invalid medication ID" });
      }
      const medication = await storage.getMedication(medicationId);
      if (!medication) {
        return res.status(404).json({ message: "Medication not found" });
      }
      if (medication.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized access to medication" });
      }
      res.json(medication);
    } catch (error) {
      console.error("Failed to get medication:", error);
      res.status(500).json({ message: "Failed to get medication" });
    }
  });
  app2.post("/api/medications", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const validatedData = insertMedicationSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const newMedication = await storage.createMedication(validatedData);
      res.status(201).json(newMedication);
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid medication data", errors: error.errors });
      }
      console.error("Failed to create medication:", error);
      res.status(500).json({ message: "Failed to create medication" });
    }
  });
  app2.patch("/api/medications/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const medicationId = parseInt(req.params.id);
      if (isNaN(medicationId)) {
        return res.status(400).json({ message: "Invalid medication ID" });
      }
      const medication = await storage.getMedication(medicationId);
      if (!medication) {
        return res.status(404).json({ message: "Medication not found" });
      }
      if (medication.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized access to medication" });
      }
      const { id, userId, ...updateData } = req.body;
      const updatedMedication = await storage.updateMedication(medicationId, updateData);
      res.json(updatedMedication);
    } catch (error) {
      console.error("Failed to update medication:", error);
      res.status(500).json({ message: "Failed to update medication" });
    }
  });
  app2.patch("/api/medications/:id/toggle", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const medicationId = parseInt(req.params.id);
      if (isNaN(medicationId)) {
        return res.status(400).json({ message: "Invalid medication ID" });
      }
      const { active } = req.body;
      if (typeof active !== "boolean") {
        return res.status(400).json({ message: "Active status must be a boolean" });
      }
      const medication = await storage.getMedication(medicationId);
      if (!medication) {
        return res.status(404).json({ message: "Medication not found" });
      }
      if (medication.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized access to medication" });
      }
      const updatedMedication = await storage.toggleMedicationStatus(medicationId, active);
      res.json(updatedMedication);
    } catch (error) {
      console.error("Failed to toggle medication status:", error);
      res.status(500).json({ message: "Failed to toggle medication status" });
    }
  });
  app2.get("/api/medications/:id/logs", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const medicationId = parseInt(req.params.id);
      if (isNaN(medicationId)) {
        return res.status(400).json({ message: "Invalid medication ID" });
      }
      const medication = await storage.getMedication(medicationId);
      if (!medication) {
        return res.status(404).json({ message: "Medication not found" });
      }
      if (medication.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized access to medication logs" });
      }
      const logs = await storage.getMedicationLogs(medicationId);
      res.json(logs);
    } catch (error) {
      console.error("Failed to get medication logs:", error);
      res.status(500).json({ message: "Failed to get medication logs" });
    }
  });
  app2.post("/api/medications/:id/logs", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const medicationId = parseInt(req.params.id);
      if (isNaN(medicationId)) {
        return res.status(400).json({ message: "Invalid medication ID" });
      }
      const medication = await storage.getMedication(medicationId);
      if (!medication) {
        return res.status(404).json({ message: "Medication not found" });
      }
      if (medication.userId !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized access to medication" });
      }
      const validatedData = insertMedicationLogSchema.parse({
        ...req.body,
        medicationId,
        userId: req.user.id
      });
      const newLog = await storage.createMedicationLog(validatedData);
      res.status(201).json(newLog);
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid medication log data", errors: error.errors });
      }
      console.error("Failed to create medication log:", error);
      res.status(500).json({ message: "Failed to create medication log" });
    }
  });
  app2.get("/api/chat/history", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const chatHistory = await storage.getUserChatHistory(req.user.id);
      res.json(chatHistory);
    } catch (error) {
      console.error("Failed to get chat history:", error);
      res.status(500).json({ message: "Failed to get chat history" });
    }
  });
  app2.post("/api/chat/message", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const validatedData = insertChatMessageSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const newMessage = await storage.createChatMessage(validatedData);
      if (validatedData.isUserMessage) {
        try {
          const userMessage = validatedData.message;
          const firstAidGuidance = await getFirstAidGuidance(userMessage);
          let aiResponse = `${firstAidGuidance.situation}

`;
          if (firstAidGuidance.steps && firstAidGuidance.steps.length > 0) {
            aiResponse += "**Steps:**\n";
            firstAidGuidance.steps.forEach((step, index) => {
              aiResponse += `${index + 1}. ${step}
`;
            });
            aiResponse += "\n";
          }
          if (firstAidGuidance.warnings && firstAidGuidance.warnings.length > 0) {
            aiResponse += "**Important Warnings:**\n";
            firstAidGuidance.warnings.forEach((warning) => {
              aiResponse += `\u2022 ${warning}
`;
            });
            aiResponse += "\n";
          }
          aiResponse += `_${firstAidGuidance.disclaimer}_`;
          const botResponseData = {
            userId: req.user.id,
            message: aiResponse,
            isUserMessage: false
          };
          const botResponse = await storage.createChatMessage(botResponseData);
          res.status(201).json({ userMessage: newMessage, botResponse });
        } catch (aiError) {
          console.error("AI response failed, using fallback:", aiError);
          const botResponse = await simulateChatbotResponse(validatedData.message, req.user.id);
          res.status(201).json({ userMessage: newMessage, botResponse });
        }
      } else {
        res.status(201).json(newMessage);
      }
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid message data", errors: error.errors });
      }
      console.error("Failed to create chat message:", error);
      res.status(500).json({ message: "Failed to create chat message" });
    }
  });
  app2.get("/api/diet/:date", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const date = req.params.date;
      const dietDay = await storage.getUserDietDay(req.user.id, date);
      if (!dietDay) {
        return res.json(null);
      }
      const meals = await storage.getDietMeals(dietDay.id);
      const mealsWithItems = await Promise.all(
        meals.map(async (meal) => {
          const items = await storage.getDietMealItems(meal.id);
          return { ...meal, items };
        })
      );
      res.json({ ...dietDay, meals: mealsWithItems });
    } catch (error) {
      console.error("Failed to get diet:", error);
      res.status(500).json({ message: "Failed to get diet" });
    }
  });
  app2.post("/api/diet", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const validatedData = insertDietDaySchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const newDietDay = await storage.createDietDay(validatedData);
      res.status(201).json(newDietDay);
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid diet data", errors: error.errors });
      }
      console.error("Failed to create diet:", error);
      res.status(500).json({ message: "Failed to create diet" });
    }
  });
  app2.put("/api/diet/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const dietDayId = parseInt(req.params.id);
      if (isNaN(dietDayId)) {
        return res.status(400).json({ message: "Invalid diet day ID" });
      }
      const updatedDietDay = await storage.updateDietDay(dietDayId, req.body);
      if (!updatedDietDay) {
        return res.status(404).json({ message: "Diet day not found" });
      }
      res.json(updatedDietDay);
    } catch (error) {
      console.error("Failed to update diet day:", error);
      res.status(500).json({ message: "Failed to update diet day" });
    }
  });
  app2.post("/api/diet/meals", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const validatedData = insertDietMealSchema.parse(req.body);
      const newMeal = await storage.createDietMeal(validatedData);
      res.status(201).json(newMeal);
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid meal data", errors: error.errors });
      }
      console.error("Failed to create meal:", error);
      res.status(500).json({ message: "Failed to create meal" });
    }
  });
  app2.put("/api/diet/meals/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const mealId = parseInt(req.params.id);
      if (isNaN(mealId)) {
        return res.status(400).json({ message: "Invalid meal ID" });
      }
      const updatedMeal = await storage.updateDietMeal(mealId, req.body);
      if (!updatedMeal) {
        return res.status(404).json({ message: "Meal not found" });
      }
      res.json(updatedMeal);
    } catch (error) {
      console.error("Failed to update meal:", error);
      res.status(500).json({ message: "Failed to update meal" });
    }
  });
  app2.delete("/api/diet/meals/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const mealId = parseInt(req.params.id);
      if (isNaN(mealId)) {
        return res.status(400).json({ message: "Invalid meal ID" });
      }
      await storage.deleteDietMeal(mealId);
      res.status(204).send();
    } catch (error) {
      console.error("Failed to delete meal:", error);
      res.status(500).json({ message: "Failed to delete meal" });
    }
  });
  app2.post("/api/diet/meals/items", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const validatedData = insertDietMealItemSchema.parse(req.body);
      const newItem = await storage.createDietMealItem(validatedData);
      res.status(201).json(newItem);
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid meal item data", errors: error.errors });
      }
      console.error("Failed to create meal item:", error);
      res.status(500).json({ message: "Failed to create meal item" });
    }
  });
  app2.delete("/api/diet/meals/items/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const itemId = parseInt(req.params.id);
      if (isNaN(itemId)) {
        return res.status(400).json({ message: "Invalid meal item ID" });
      }
      await storage.deleteDietMealItem(itemId);
      res.status(204).send();
    } catch (error) {
      console.error("Failed to delete meal item:", error);
      res.status(500).json({ message: "Failed to delete meal item" });
    }
  });
  app2.post("/api/symptom-check", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const { symptoms, age, gender, medicalHistory } = req.body;
      if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
        return res.status(400).json({ message: "Symptoms array is required" });
      }
      if (!age || !gender) {
        return res.status(400).json({ message: "Age and gender are required" });
      }
      const symptomsText = symptoms.join(", ");
      const analysis = await analyzeSymptoms(symptomsText, age, gender, medicalHistory);
      const diagnosisText = analysis.possibleConditions.map((c) => `${c.condition} (${c.probability} probability)`).join("; ");
      const recommendationsText = analysis.recommendations.join("; ");
      const symptomCheckData = {
        userId: req.user.id,
        symptoms,
        diagnosis: diagnosisText,
        riskLevel: analysis.urgencyLevel,
        recommendations: recommendationsText,
        severity: analysis.urgencyLevel
      };
      const validatedData = insertSymptomCheckSchema.parse(symptomCheckData);
      const newCheck = await storage.createSymptomCheck(validatedData);
      res.status(201).json({
        ...newCheck,
        possibleConditions: analysis.possibleConditions,
        recommendationsArray: analysis.recommendations,
        disclaimer: analysis.disclaimer
      });
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid symptom check data", errors: error.errors });
      }
      console.error("Failed to create symptom check:", error);
      res.status(500).json({ message: "Failed to analyze symptoms" });
    }
  });
  app2.get("/api/symptom-checks", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const checks = await storage.getUserSymptomChecks(req.user.id);
      res.json(checks);
    } catch (error) {
      console.error("Failed to get symptom checks:", error);
      res.status(500).json({ message: "Failed to get symptom checks" });
    }
  });
  app2.get("/api/symptom-checks/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const checkId = parseInt(req.params.id);
      if (isNaN(checkId)) {
        return res.status(400).json({ message: "Invalid symptom check ID" });
      }
      const check = await storage.getSymptomCheck(checkId);
      if (!check) {
        return res.status(404).json({ message: "Symptom check not found" });
      }
      res.json(check);
    } catch (error) {
      console.error("Failed to get symptom check:", error);
      res.status(500).json({ message: "Failed to get symptom check" });
    }
  });
  app2.post("/api/fitness-data", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const validatedData = insertFitnessDataSchema.parse({
        ...req.body,
        userId: req.user.id
      });
      const newData = await storage.createFitnessData(validatedData);
      res.status(201).json(newData);
    } catch (error) {
      if (error instanceof z3.ZodError) {
        return res.status(400).json({ message: "Invalid fitness data", errors: error.errors });
      }
      console.error("Failed to create fitness data:", error);
      res.status(500).json({ message: "Failed to create fitness data" });
    }
  });
  app2.get("/api/fitness-data", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const data = await storage.getUserFitnessData(req.user.id);
      res.json(data);
    } catch (error) {
      console.error("Failed to get fitness data:", error);
      res.status(500).json({ message: "Failed to get fitness data" });
    }
  });
  app2.get("/api/fitness-data/latest", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const latestData = await storage.getLatestFitnessData(req.user.id);
      if (!latestData) {
        return res.status(404).json({ message: "No fitness data found" });
      }
      res.json(latestData);
    } catch (error) {
      console.error("Failed to get latest fitness data:", error);
      res.status(500).json({ message: "Failed to get latest fitness data" });
    }
  });
  app2.get("/api/fitness-data/range", async (req, res) => {
    if (!req.isAuthenticated()) return res.status(401).json({ message: "Not authenticated" });
    try {
      const { startDate, endDate } = req.query;
      if (!startDate || !endDate) {
        return res.status(400).json({ message: "Start date and end date are required" });
      }
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
      }
      const data = await storage.getUserFitnessDataByDateRange(req.user.id, start, end);
      res.json(data);
    } catch (error) {
      console.error("Failed to get fitness data by range:", error);
      res.status(500).json({ message: "Failed to get fitness data by range" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}
async function simulateChatbotResponse(userMessage, userId) {
  const message = userMessage.toLowerCase();
  let response = "I'm sorry, I don't understand that query. Could you please rephrase it or ask about a specific first aid situation?";
  if (message.includes("burn")) {
    response = "For a minor burn:\n1. Cool the burn with cool (not cold) running water for 10-15 minutes\n2. Remove rings or other tight items\n3. Apply lotion with aloe vera\n4. Bandage the burn loosely with a sterile gauze\n5. Take an over-the-counter pain reliever if needed\n\nIf the burn is severe or larger than 3 inches, seek medical attention immediately.";
  } else if (message.includes("cut") || message.includes("bleeding")) {
    response = "To control bleeding:\n1. Apply direct pressure with a clean cloth or bandage\n2. Keep the injured area elevated above the heart if possible\n3. Clean the wound with soap and water once bleeding slows\n4. Apply antibiotic ointment and cover with a sterile bandage\n\nSeek medical attention if bleeding doesn't stop after 15 minutes of pressure or the wound is deep/large.";
  } else if (message.includes("cpr") || message.includes("cardiac")) {
    response = "For CPR (adult):\n1. Call emergency services (911)\n2. Place the person on their back on a firm surface\n3. Place your hands, one on top of the other, on the center of the chest\n4. Push hard and fast, about 100-120 compressions per minute\n5. Let the chest rise completely between compressions\n\nConsider rescue breaths if trained, but compression-only CPR can be effective too.";
  } else if (message.includes("chok")) {
    response = "For a choking adult:\n1. Ask 'Are you choking?' If they nod yes and cannot speak, act immediately\n2. Stand behind the person and wrap your arms around their waist\n3. Make a fist with one hand and place it slightly above their navel\n4. Grasp your fist with your other hand and press inward and upward with quick thrusts\n5. Repeat until the object is expelled\n\nIf the person becomes unconscious, begin CPR.";
  } else if (message.includes("heart attack") || message.includes("chest pain")) {
    response = "Possible heart attack symptoms include chest pain/pressure, pain in arms/back/neck/jaw, shortness of breath, cold sweat, nausea.\n\nActions to take:\n1. Call emergency services (911) immediately\n2. Have the person sit down and rest\n3. Loosen tight clothing\n4. If the person takes heart medication like nitroglycerin, help them take it\n5. If advised by emergency services and the person is not allergic, they might chew an aspirin\n\nIf the person becomes unconscious, begin CPR if trained.";
  } else if (message.includes("stroke")) {
    response = "Remember the acronym FAST for stroke symptoms:\nF - Face drooping\nA - Arm weakness\nS - Speech difficulty\nT - Time to call emergency services\n\nAlso watch for sudden numbness, confusion, trouble seeing, dizziness, or severe headache.\n\nCall 911 immediately if you suspect a stroke. Note the time symptoms started.";
  } else if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    response = "Hello! I'm your virtual first aid assistant. How can I help you today?";
  } else if (message.includes("thank")) {
    response = "You're welcome! If you have any other first aid questions, feel free to ask.";
  }
  const botResponseData = {
    userId,
    message: response,
    isUserMessage: false
  };
  return storage.createChatMessage(botResponseData);
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = 5e3;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
