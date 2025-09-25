import { buildApp } from './app';
import { connectDB } from './lib/db';
import { config } from './config/index';

async function start() {
  try {
    // Connect to DB first
    await connectDB();

    // Build Fastify app
    const app = buildApp();

    // Start server
    await app.listen({ port: config.port, host: '0.0.0.0' });
    app.log.info(`🚀 Server running on http://localhost:${config.port}`);
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();
