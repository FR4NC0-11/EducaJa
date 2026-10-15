import type { Lesson } from "./catalog";
import { javaLessons } from "./curriculum-java";
import { webLessons } from "./curriculum-web";
import { sqlLessons } from "./curriculum-sql";
import { iotLessons } from "./curriculum-iot";
export const additionalLessons: Record<string, Lesson[]> = {
  "java-poo": javaLessons,
  "web-fundamentos": webLessons,
  postgresql: sqlLessons,
  "iot-fundamentos": iotLessons,
};
