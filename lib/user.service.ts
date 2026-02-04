import { prisma } from "./prisma";

export const userService = {
  // GET list all users
  async getAll() {
    return prisma.user.findMany({
      orderBy: { id: "desc" },
    });
  },

  // GET user by ID
  async getById(id: string) {
    return prisma.user.findUnique({
      where: { id },
    });
  },

  // CREATE user
  async create(email: string, role: string = "user") {
    return prisma.user.create({
      data: {
        email: String(email),
        role: String(role),
      },
    });
  },

  // UPDATE user
  async update(id: string, data: { email?: string; role?: string }) {
    return prisma.user.update({
      where: { id },
      data: {
        email: data.email ? String(data.email) : undefined,
        role: data.role ? String(data.role) : undefined,
      },
    });
  },

  // DELETE user
  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  },
};
