import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma", // ← ya lo tienes
  datasource: {
    url: process.env.DATABASE_URL="mysql://root:3312@localhost:3306/agroecoalmacen", 
  },
});
