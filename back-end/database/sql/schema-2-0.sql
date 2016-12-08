
DROP TABLE IF EXISTS "task_lists";
DROP TABLE IF EXISTS "tasks";
DROP TABLE IF EXISTS "lists";

CREATE TABLE "tasks" (
"id"  SERIAL ,
"text" VARCHAR(120) NOT NULL DEFAULT 'NULL' ,
"priority" INTEGER ,
"completed" BOOLEAN NOT NULL DEFAULT 'false' ,
PRIMARY KEY ("id")
);

CREATE TABLE "lists" (
"id"  SERIAL ,
"name" VARCHAR(20) ,
PRIMARY KEY ("id"),
UNIQUE ("name")
);

CREATE TABLE "task_lists" (
"task_id" INTEGER ,
"list_id" INTEGER
);

ALTER TABLE "task_lists" ADD FOREIGN KEY ("task_id") REFERENCES "tasks" ("id");
ALTER TABLE "task_lists" ADD FOREIGN KEY ("list_id") REFERENCES "lists" ("id");
