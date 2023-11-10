"use server";

import type { Prisma, User } from "@prisma/client";
import { UserCreateInputSchema } from "@prisma/zod";
import { prisma } from "#/lib/utils/prisma";
import { z } from "zod";

export async function getUsers(): Promise<User[]> {
  return prisma.user.findMany();
}

export async function createUser(input: Prisma.UserCreateInput): Promise<void> {
  const data = UserCreateInputSchema.parse(input);

  await prisma.user.create({ data });
}

export async function removeUser(userId: string): Promise<void> {
  const id = z.string().parse(userId);

  await prisma.user.delete({ where: { id } });
}