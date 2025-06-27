import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(), // auto-incrementing primary key field
  name: text().unique().notNull(),
  email: text('email').unique(),
  password: text().notNull(),
  role_id: integer('role_id'),
});

export const user_role = pgTable('user_role', {
  id: serial('id').primaryKey(), // auto-incrementing primary key field
  name: text('name'),
});

export const usersRelations = relations(users, ({ one }) => ({
  user_role: one(user_role, {
    fields: [users.role_id],
    references: [user_role.id],
  }),
})); 