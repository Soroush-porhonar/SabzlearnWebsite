import { createRequire } from "node:module";


const require = createRequire(import.meta.url);
const Validator = require("fastest-validator");

const validator = new Validator();

const registerSchema = {
  username: {
    type: "string",
    min: 3,
    max:255,
    empty: false,
  },
  email: {
    type: "email",
  },
  phone:{
    type:"number",
    max:11
  },
  password: {
    type: "string",
    min: 8,
    max:24
  },
  confirmPassword: {
    type: "equal",
    field:"password"
  },
  $$strict: true,
};

export const checkRegister = validator.compile(registerSchema);

