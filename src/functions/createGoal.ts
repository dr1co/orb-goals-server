import { db } from "../db";
import { goals } from "../db/schema";

interface CreateGoalRequest {
  userId: string,
  title: string;
  desiredWeeklyFrequency: number;
}

export async function createGoal(request: CreateGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      userId: request.userId,
      title: request.title,
      desiredWeeklyFrequency: request.desiredWeeklyFrequency,
    })
    .returning();

  const goal = result[0];

  return {
    goal,
  };
}
