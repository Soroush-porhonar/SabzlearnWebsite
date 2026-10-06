import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const Validator = require("fastest-validator");
const validator = new Validator();

const registerSchema = {
  title: {
    type: String,
    require: true,
    empty: false,
    min: 2,
    max: 15,
  },
  href: {
    type: String,
    require: true,
    empty: false,
    min: 2,
    max: 15,
  },
};
export const checkCat = validator.compile(registerSchema);
