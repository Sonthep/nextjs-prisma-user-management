import { prisma } from "./prisma";

export const orderService = {
  // GET all orders
  async getAll() {
    return prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  // GET orders by user ID
  async getByUserId(userId: string) {
    return prisma.order.findMany({
      where: { userId },
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
  },

  // GET order by ID
  async getById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  },

  // CREATE order
  async create(userId: string, total: string, status: string = "pending") {
    return prisma.order.create({
      data: {
        userId,
        total: parseFloat(total),
        status,
      },
      include: {
        user: true,
      },
    });
  },

  // UPDATE order
  async update(id: string, data: { total?: string; status?: string }) {
    return prisma.order.update({
      where: { id },
      data: {
        total: data.total ? parseFloat(data.total) : undefined,
        status: data.status,
      },
      include: {
        user: true,
      },
    });
  },

  // DELETE order
  async delete(id: string) {
    return prisma.order.delete({
      where: { id },
    });
  },
};
