import { z } from 'zod';

const schema = z.object({
    mobil_id: z
        .number({
            required_error: 'The mobil field is required.',
        })
        .max(50, {
            message: 'The mobil field must not be greater than 50 characters.',
        }),
});

export default schema;
