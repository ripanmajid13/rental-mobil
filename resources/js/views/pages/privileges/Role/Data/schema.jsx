import { z } from 'zod';

const schema = z.object({
    type: z.number({
        required_error: 'The type field is required.',
    }),
    display: z.string().refine(
        (val) => val.length >= 1 && val.length <= 50,
        (val) => ({
            message:
                val.length < 1
                    ? 'The display field is required.'
                    : 'The display field must not be greater than 50 characters.',
        })
    ),
    permissions: z.string().optional(),
    users: z.string().optional(),
});

export default schema;
