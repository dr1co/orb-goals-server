import dayjs from "dayjs";
import bcrypt from "bcrypt";

import { db, client } from ".";
import { goalCompletions, goals, users } from "./schema";

async function seed() {
  await db.delete(goalCompletions);
  await db.delete(goals);
  await db.delete(users);

  const encrypted = await bcrypt.hash("123456", 10);

  const user = await db.insert(users).values({
    name: "Teste",
    email: "teste@email.com",
    password: encrypted,
  }).returning();

  const result = await db
    .insert(goals)
    .values([
      {
        userId: user[0].id,
        title: "Acordar cedo",
        desiredWeeklyFrequency: 5,
      },
      {
        userId: user[0].id,
        title: "Fazer exercícios",
        desiredWeeklyFrequency: 3,
      },
      {
        userId: user[0].id,
        title: "Ler um livro",
        desiredWeeklyFrequency: 2,
      },
      {
        userId: user[0].id,
        title: "Aprender um novo idioma",
        desiredWeeklyFrequency: 1,
      },
    ]).returning();

  const startOfWeek = dayjs().startOf("week");

  await db.insert(goalCompletions).values([
    {
      goalId: result[0].id,
      createdAt: startOfWeek.toDate(),
    },
    {
      goalId: result[1].id,
      createdAt: startOfWeek.add(2, "day").toDate(),
    },
  ]);
}

seed().finally(() => {
  console.log("Success!");
  client.end();
});
