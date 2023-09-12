/*
  Warnings:

  - You are about to drop the column `dedscription` on the `CalendarEvent` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CalendarEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "date" DATETIME NOT NULL
);
INSERT INTO "new_CalendarEvent" ("date", "id", "title") SELECT "date", "id", "title" FROM "CalendarEvent";
DROP TABLE "CalendarEvent";
ALTER TABLE "new_CalendarEvent" RENAME TO "CalendarEvent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
