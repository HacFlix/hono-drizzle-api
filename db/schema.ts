import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";

export const todosTable = sqliteTable("todos", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  completed: integer({ mode: "boolean" }).notNull().default(false),
});

export const insertUserSchema = createInsertSchema(todosTable);
