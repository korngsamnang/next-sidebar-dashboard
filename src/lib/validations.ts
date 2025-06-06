import * as z from "zod";

export const searchParamsSchema = z.object({
    page: z.coerce.number().default(1),
    per_page: z.coerce.number().default(10),
    sort: z.string().optional(),
    operator: z.enum(["and", "or"]).optional(),
});
