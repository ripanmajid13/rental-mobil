import { z } from 'zod';

const schema = z.object({
    merk: z
        .string()
        .nonempty({
            message: 'The merk field is required.',
        })
        .max(50, {
            message: 'The merk field must not be greater than 50 characters.',
        }),
    model: z
        .string()
        .nonempty({
            message: 'The model field is required.',
        })
        .max(50, {
            message: 'The model field must not be greater than 50 characters.',
        }),
    plat: z
        .string()
        .nonempty({
            message: 'The plat field is required.',
        })
        .max(50, {
            message: 'The plat field must not be greater than 50 characters.',
        }),
    tarif: z
        .string()
        .nonempty({
            message: 'The tarif field is required.',
        })
        .max(50, {
            message: 'The tarif field must not be greater than 50 characters.',
        }),
});

export default schema;
