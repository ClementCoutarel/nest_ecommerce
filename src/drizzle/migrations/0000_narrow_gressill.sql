CREATE TABLE "user_role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text,
	"role_id" integer,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
