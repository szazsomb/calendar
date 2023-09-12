/*
  Warnings:

  - Added the required column `date` to the `CalendarEvent` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_CalendarEvent" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "dedscription" TEXT,
    "date" DATETIME NOT NULL
);
INSERT INTO "new_CalendarEvent" ("dedscription", "id", "title") SELECT "dedscription", "id", "title" FROM "CalendarEvent";
DROP TABLE "CalendarEvent";
ALTER TABLE "new_CalendarEvent" RENAME TO "CalendarEvent";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
