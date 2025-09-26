import dotenv from "dotenv";
dotenv.config();


export const config = {
  // Existing configs
  port: parseInt(process.env.PORT || '4000', 10),
  mongoUri: process.env.MONGO_URI!,
  jwtSecret: process.env.JWT_SECRET!,
  otpLength: parseInt(process.env.OTP_LENGTH || '6', 10),
  otpTtlSeconds: parseInt(process.env.OTP_TTL_SECONDS || '300', 10),
  maxCsvSizeMb: parseInt(process.env.MAX_CSV_SIZE_MB || '25', 10),

  // New SMTP configs
  smtpHost: process.env.SMTP_HOST || "smtp.gmail.com",
  smtpPort: Number(process.env.SMTP_PORT) || 587,
  smtpSecure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",
};

// Validate required env vars
if (!config.mongoUri || !config.jwtSecret) {
  throw new Error('Missing required env vars (MONGO_URI, JWT_SECRET)');
}
