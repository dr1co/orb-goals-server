import dayjs from "dayjs";

import { db, client } from ".";
import { goalCompletions, goals } from "./schema";

async function seed() {
  await db.delete(goalCompletions);
  await db.delete(goals);

  const result = await db
    .insert(goals)
    .values([
      {
        title: "Acordar cedo",
        desiredWeeklyFrequency: 5,
      },
      {
        title: "Fazer exercícios",
        desiredWeeklyFrequency: 3,
      },
      {
        title: "Ler um livro",
        desiredWeeklyFrequency: 2,
      },
      {
        title: "Aprender um novo idioma",
        desiredWeeklyFrequency: 1,
      },
    ])
    .returning();

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
