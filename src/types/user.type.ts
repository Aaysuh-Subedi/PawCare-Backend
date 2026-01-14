import z from "zod";

export const UserSchema = z.object({
    FullName: z.string().min(1),
    email: z.email(),
    password: z.string().min(8),
    phone: z.string().min(10),
    role: z.enum(["user", "admin", "provider"]).default("user"),

});

export type UserType = z.infer<typeof UserSchema>;