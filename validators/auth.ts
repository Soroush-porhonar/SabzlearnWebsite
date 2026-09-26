import * as z from "zod";

const User = z
  .object({
    username: z.string().max(100).min(3),
    email: z.email(),
    password: z.string(),
    confirmPassword: z.string(),
    phone: z.number().max(11).min(11),
    role: z.enum(["admin", "user"]).default("user"),
  })
  .strict()
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// the parsed result is validated and type safe!
//const check = User.parse();
