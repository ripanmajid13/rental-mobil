import { z } from 'zod';

const schema = z.object({
    tanggal_mulai: z
        .string()
        .nonempty({
            message: 'The tanggal mulai field is required.',
        })
        .max(50, {
            message: 'The tanggal mulai field must not be greater than 50 characters.',
        }),
    tanggal_selesai: z
        .string()
        .nonempty({
            message: 'The tanggal selesai field is required.',
        })
        .max(50, {
            message: 'The tanggal selesai field must not be greater than 50 characters.',
        }),
    mobil_id: z
        .number({
            required_error: 'The mobil field is required.',
        })
        .max(50, {
            message: 'The mobil field must not be greater than 50 characters.',
        }),
});

export default schema;
