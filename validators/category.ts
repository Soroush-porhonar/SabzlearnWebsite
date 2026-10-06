import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const Validator = require("fastest-validator");
const validator = new Validator();

const registerSchema = {
  title: {
    type: "string",
    require: true,
    empty: false,
    min: 2,
    max: 15,
  },
  href: {
    type: "string",
    require: true,
    empty: false,
    min: 2,
    max: 15,
  },
  $$strict: true,
};
export const checkCat = validator.compile(registerSchema);
