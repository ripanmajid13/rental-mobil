import { z } from 'zod';

const schema = z.object({
    name: z
        .string()
        .nonempty({
            message: 'The name field is required.',
        })
        .max(50, {
            message: 'The name field must not be greater than 50 characters.',
        }),
});

export default schema;
