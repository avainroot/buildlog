import { PrismaClient, Prisma } from "../app/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const WorkTypes: Prisma.WorkTypeCreateInput[] = [
  { name: "Земляные работы" },
  { name: "Устройство фундамента" },
  { name: "Армирование" },
  { name: "Монтаж опалубки" },
  { name: "Бетонирование" },

  { name: "Кладка кирпича / блоков" },
  { name: "Монтаж перегородок" },
  { name: "Устройство перекрытий" },
  { name: "Гидроизоляция" },

  { name: "Монтаж кровли" },
  { name: "Фасадные работы" },
  { name: "Утепление" },

  { name: "Электромонтажные работы" },
  { name: "Прокладка кабеля" },
  { name: "Сантехнические работы" },
  { name: "Монтаж отопления и вентиляции" },

  { name: "Штукатурка" },
  { name: "Шпаклёвка" },
  { name: "Покраска" },
  { name: "Укладка плитки" },
  { name: "Стяжка пола" },
  { name: "Монтаж напольных покрытий" },
];

export async function fillWorkTypes() {
  for (const w of WorkTypes) {
    await prisma.workType.upsert({
      where: { name: w.name },
      update: {},
      create: w,
    });
  }
}

fillWorkTypes();
