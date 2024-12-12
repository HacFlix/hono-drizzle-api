import { Hono } from "hono";
import { db } from "../db";
import { todosTable } from "../db/schema";
import { eq } from "drizzle-orm";

const app = new Hono()
  .basePath("/api/todos")
  .get("/", async (c) => {
    const todos = await db.select().from(todosTable);
    return c.json(todos);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const todo = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, Number(id)));
    if (todo.length === 0) return c.notFound();
    return c.json(todo);
  })
  .post("/", async (c) => {
    const data = await c.req.json();
    const createdTodo = await db.insert(todosTable).values(data).returning();
    return c.json(createdTodo, 201);
  })
  .patch("/:id", async (c) => {
    const id = c.req.param("id");
    const todo = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, Number(id)));
    if (todo.length === 0) return c.notFound();
    const data = await c.req.json();
    const updatedTodo = await db
      .update(todosTable)
      .set(data)
      .where(eq(todosTable.id, Number(id)))
      .returning();
    return c.json(updatedTodo);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const todo = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, Number(id)));
    if (todo.length === 0) return c.notFound();
    const deletedTodo = await db
      .delete(todosTable)
      .where(eq(todosTable.id, Number(id)))
      .returning();
    return c.json(deletedTodo);
  });

export default app;
