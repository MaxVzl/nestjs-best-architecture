import { registerAs } from '@nestjs/config';

export default registerAs('queue', () => ({
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379', 10),
    password: process.env.REDIS_PASSWORD,
    db: parseInt(process.env.REDIS_DB || '0', 10),
  },
  
  defaultJobOptions: {
    attempts: parseInt(process.env.QUEUE_ATTEMPTS || '3', 10),
    backoff: {
      type: 'exponential',
      delay: 2000,
    },
    removeOnComplete: true,
    removeOnFail: false,
  },

  // Queues spécifiques
  queues: {
    email: {
      name: 'email-queue',
      limiter: {
        max: 100,
        duration: 60000, // par minute
      },
    },
    reports: {
      name: 'reports-queue',
      limiter: {
        max: 10,
        duration: 60000,
      },
    },
  },
}));