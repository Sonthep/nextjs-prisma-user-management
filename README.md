# Next.js + Prisma User Management System

ระบบจัดการผู้ใช้งานและคำสั่งซื้อ ด้วย Next.js 16, Prisma ORM และ Neon Database

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Prisma](https://img.shields.io/badge/Prisma-7.2.0-2D3748?style=flat-square&logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?style=flat-square&logo=postgresql)

## 🎯 Features

### Users Management
- ✅ CRUD operations (Create, Read, Update, Delete)
- ✅ User listing with sorting
- ✅ Role management (user/admin)
- ✅ Form to add new users
- ✅ Delete with confirmation
- ✅ Change role via dropdown

### Orders Management
- ✅ CRUD operations for orders
- ✅ Link orders to users
- ✅ Order status tracking (pending, processing, completed, cancelled)
- ✅ Order amount management
- ✅ Create new orders form
- ✅ Status update dropdown

### API Routes
- ✅ RESTful API with proper HTTP methods
- ✅ Error handling and validation
- ✅ Service layer pattern for business logic
- ✅ TypeScript for type safety

## 📋 Tech Stack

- **Framework**: Next.js 16.1.3 (App Router)
- **Language**: TypeScript
- **ORM**: Prisma 7.2.0
- **Database**: PostgreSQL (Neon)
- **Styling**: CSS + Tailwind CSS
- **State Management**: React Hooks

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (Neon recommended)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Sonthep/nextjs-prisma-user-management.git
cd nextjs-prisma-user-management
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables** - Create `.env.local`:
```env
DATABASE_URL="postgresql://user:password@host/database"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

4. **Setup database**
```bash
# Run migrations
npx prisma migrate dev

# Generate Prisma Client
npx prisma generate

# Seed database with sample data
npm run seed
```

5. **Start development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
app/
├── api/
│   ├── users/
│   │   ├── route.ts           # GET, POST
│   │   └── [id]/route.ts      # GET, PATCH, DELETE
│   └── orders/
│       ├── route.ts           # GET, POST
│       └── [id]/route.ts      # GET, PATCH, DELETE
├── users/page.tsx             # Users management UI
├── orders/page.tsx            # Orders management UI
└── layout.tsx

lib/
├── prisma.ts                  # Prisma singleton
├── user.service.ts            # User business logic
└── order.service.ts           # Order business logic

prisma/
├── schema.prisma              # Database schema
├── migrations/                # Database migrations
└── seed.cjs                   # Seeding script
```

## 🔗 API Endpoints

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users |
| POST | `/api/users` | Create user |
| GET | `/api/users/[id]` | Get user by ID |
| PATCH | `/api/users/[id]` | Update user |
| DELETE | `/api/users/[id]` | Delete user |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/orders` | Get all orders |
| POST | `/api/orders` | Create order |
| GET | `/api/orders/[id]` | Get order by ID |
| PATCH | `/api/orders/[id]` | Update order |
| DELETE | `/api/orders/[id]` | Delete order |

### Example Requests

**Create User:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "role": "user"}'
```

**Create Order:**
```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"userId": "user-id", "total": "999.99", "status": "pending"}'
```

**Update Order Status:**
```bash
curl -X PATCH http://localhost:3000/api/orders/order-id \
  -H "Content-Type: application/json" \
  -d '{"status": "completed"}'
```

## 📊 Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  role      String   @default("user")
  createdAt DateTime @default(now())
  orders    Order[]
}
```

### Order Model
```prisma
model Order {
  id        String   @id @default(cuid())
  userId    String
  total     Decimal  @db.Decimal(10, 2)
  status    String   @default("pending")
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  @@index([userId])
}
```

## 🛠️ Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run seed       # Seed database

# Prisma
npx prisma generate      # Generate Prisma Client
npx prisma migrate dev   # Run migrations
npx prisma studio       # Open Prisma Studio
```

## 🎨 Pages

- **[http://localhost:3000/users](http://localhost:3000/users)** - Users management
- **[http://localhost:3000/orders](http://localhost:3000/orders)** - Orders management

## 📝 Service Layer Pattern

The project uses services for cleaner code organization:

```typescript
// user.service.ts
export const userService = {
  async getAll() { /* ... */ },
  async getById(id: string) { /* ... */ },
  async create(email: string, role?: string) { /* ... */ },
  async update(id: string, data) { /* ... */ },
  async delete(id: string) { /* ... */ },
};
```

API routes call services instead of Prisma directly.

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect repo to Vercel
3. Add `DATABASE_URL` environment variable
4. Deploy

### Railway / Other Platforms
1. Connect GitHub repo
2. Set environment variables
3. Deploy

## 🔒 Key Points

- ✅ Next.js 15+ requires `await params` in dynamic routes
- ✅ Uses Prisma ORM with PostgreSQL
- ✅ Service layer for business logic
- ✅ TypeScript for type safety
- ✅ Never commit `.env.local` with secrets
- ✅ Cascade delete: removing user deletes their orders

## 📚 Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Neon Docs](https://neon.tech/docs)

## 📄 License

MIT License - feel free to use for learning and projects!

---

**Repository:** [nextjs-prisma-user-management](https://github.com/Sonthep/nextjs-prisma-user-management)
