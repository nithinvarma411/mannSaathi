import fastify from 'fastify';
import cors from '@fastify/cors';
import cookie from '@fastify/cookie';
import jwtPlugin from './lib/jwt';
import authRoutes from './routes/auth.routes';
import universityRoutes from './routes/university.routes';
import adminUniversityRoutes from './routes/adminUniversity.routes';
import adminRoutes from './routes/admin.routes';
import uniAdminRoutes from './routes/uni-admin.routes';
import reviewRoutes from './routes/review.routes';
import chatRoutes from './routes/chat.routes';
import aiRoutes from './routes/ai.routes';

export function buildApp() {
  const app = fastify({ logger: true });

  // Enable CORS - Allow frontend origin to receive cookies
  app.register(cors, { 
    origin: [
      'http://localhost:3000',    // Next.js dev server
      'http://localhost:8080',    // API server (for direct API testing)
      process.env.CLIENT_URL || 'http://localhost:3000'  // Production client URL if exists
    ], 
    credentials: true 
  });

  // Enable cookies
  app.register(cookie, {
    parseOptions: {
      httpOnly: true,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",  // "none" for cross-site cookies in dev
      secure: process.env.NODE_ENV === 'production',
    },
  });

  // Enable JWT
  app.register(jwtPlugin);

  app.get('/', async () => ({ message: "Hi, I am server, I am running" }));

  // Routes
  app.register(authRoutes);
  app.register(universityRoutes);
  app.register(adminUniversityRoutes);
  app.register(adminRoutes);
  app.register(uniAdminRoutes);
  app.register(reviewRoutes);
  app.register(chatRoutes);
  app.register(aiRoutes);

  return app;
}
