import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Resetting and Seeding Database...');

  // Wipe all data in correct relational order
  await prisma.comment.deleteMany({});
  await prisma.blog.deleteMany({});
  await prisma.follow.deleteMany({});
  await prisma.user.deleteMany({});

  // USERS (Phase 1 requirements)
  const passwordHash = await bcrypt.hash('adminadmin', 10);

  const users = await prisma.user.createMany({
    data: [
      {
        username: 'user1',
        password: passwordHash,
        firstName: 'user1',
        lastName: 'user1last',
        email: 'user1@example.com',
        phone: '1111111111',
      },
      {
        username: 'user2',
        password: passwordHash,
        firstName: 'user2',
        lastName: 'user2last',
        email: 'user2@example.com',
        phone: '2222222222',
      },
      {
        username: 'user3',
        password: passwordHash,
        firstName: 'user3',
        lastName: 'user3last',
        email: 'user3@example.com',
        phone: '3333333333',
      },
      {
        username: 'user4',
        password: passwordHash,
        firstName: 'user4',
        lastName: 'user4last',
        email: 'user4@example.com',
        phone: '4444444444',
      },
      {
        username: 'user5',
        password: passwordHash,
        firstName: 'user5',
        lastName: 'user5last',
        email: 'user5@example.com',
        phone: '5555555555',
      },
    ],
  });

  console.log('Users created');

  // FOLLOWS (Phase 3 #3)

  // Users followed by both X and Y
  await prisma.follow.createMany({
    data: [
      { follower: 'user1', following: 'user2' },
      { follower: 'user1', following: 'user3' },
      { follower: 'user2', following: 'user3' },
      { follower: 'user3', following: 'user2' },
      { follower: 'user5', following: 'user2' },
      { follower: 'user5', following: 'user3' },
    ],
  });

  console.log('Follow created');

  // BLOGS (Phase 2 + Phase 3)

  // user1 posts EXACTLY 2 blogs on 10/10/2025 [for Phase 3 #1, 2]
  const blogA1 = await prisma.blog.create({
    data: {
      subject: 'Blockchain Basics',
      description: 'Intro to blockchain',
      tags: 'blockchain,crypto,technology',
      authorUsername: 'user1',
      createdAt: new Date('2025-10-10 09:00:00'),
    },
  });

  const blogA2 = await prisma.blog.create({
    data: {
      subject: 'Future of Bitcoin',
      description: 'Is Bitcoin the new gold?',
      tags: 'bitcoin,finance,crypto',
      authorUsername: 'user1',
      createdAt: new Date('2025-10-10 15:00:00'),
    },
  });

  // user2 posts 2 blogs on DIFFERENT days
  const blogB1 = await prisma.blog.create({
    data: {
      subject: 'NestJS Guide',
      description: 'Best practices for NestJS.',
      tags: 'nestjs,backend,nodejs',
      authorUsername: 'user2',
      createdAt: new Date('2025-10-09'),
    },
  });

  const blogB2 = await prisma.blog.create({
    data: {
      subject: 'How to Learn MySQL',
      description: 'Database tips for beginners.',
      tags: 'mysql,database,sql',
      authorUsername: 'user2',
      createdAt: new Date('2025-10-11'),
    },
  });

  // user3 posts ONLY POSITIVE-COMMENT blogs (Phase 3 #7)
  const blogC1 = await prisma.blog.create({
    data: {
      subject: 'Typescript Tips',
      description: 'Make your TS better.',
      tags: 'typescript,javascript,frontend',
      authorUsername: 'user3',
      createdAt: new Date('2025-10-12'),
    },
  });

  // user4 posts blogs but gets SOME NEGATIVE COMMENTS
  const blogD1 = await prisma.blog.create({
    data: {
      subject: 'AI Ethics',
      description: 'Discussion on ethical AI.',
      tags: 'ai,ethics,philosophy',
      authorUsername: 'user4',
      createdAt: new Date(),
    },
  });

  // user5 posts NO BLOGS (Phase 3 #4)

  console.log('Blogs created');

  // COMMENTS (Phase 2 + Phase 3)

  await prisma.comment.createMany({
    data: [
      // user2 - Positive on user1's blog
      {
        sentiment: 'positive',
        content: 'Great explanation!',
        blogId: blogA1.id,
        authorUsername: 'user2',
        createdAt: new Date('2025-10-10 10:00:00'),
      },

      // user5 - Positive on user3’s blog
      {
        sentiment: 'positive',
        content: 'Very helpful!',
        blogId: blogC1.id,
        authorUsername: 'user5',
      },

      // user4 - NEGATIVE on user1’s blog (user1 fails Phase 3 #7)
      {
        sentiment: 'negative',
        content: 'I don’t agree with this.',
        blogId: blogA1.id,
        authorUsername: 'user4',
      },

      // user2 - NEGATIVE comments only (Phase 3 #6)
      {
        sentiment: 'negative',
        content: 'Needs improvement.',
        blogId: blogA2.id,
        authorUsername: 'user2',
      },

      {
        sentiment: 'negative',
        content: 'Not very clear.',
        blogId: blogD1.id,
        authorUsername: 'user2',
      },

      // user3 - Positive
      {
        sentiment: 'positive',
        content: 'Nice thoughts!',
        blogId: blogB1.id,
        authorUsername: 'user3',
      },
    ],
  });

  console.log('Comments created');

  console.log('SEEDING COMPLETE');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
