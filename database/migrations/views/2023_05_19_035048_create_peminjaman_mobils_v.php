<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement($this->createView());
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement($this->dropView());
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    private function createView(): string
    {
        return <<<SQL
            CREATE VIEW peminjaman_mobils_v AS
                SELECT peminjaman_mobils.id,
                    concat(manajemen_mobils.merk, ' ', manajemen_mobils.model, ' ', manajemen_mobils.plat) AS mobil,
                    concat(manajemen_mobils_users.first_name, ' ', manajemen_mobils_users.last_name) AS owner,
                    peminjaman_mobils.manajemen_mobil_id AS mobil_id,
                    peminjaman_mobils.tanggal_mulai,
                    peminjaman_mobils.tanggal_selesai,
                    peminjaman_mobils.tarif,
                    pengembalian_mobils.id AS pengembalian,
                    peminjaman_mobils.created_by,
                    peminjaman_mobils.updated_by,
                    peminjaman_mobils.deleted_by,
                    peminjaman_mobils.created_at,
                    peminjaman_mobils.updated_at,
                    peminjaman_mobils.deleted_at
                FROM peminjaman_mobils
                    JOIN manajemen_mobils ON manajemen_mobils.id = peminjaman_mobils.manajemen_mobil_id
                    JOIN privileges_users manajemen_mobils_users ON manajemen_mobils_users.id = manajemen_mobils.created_by
                    LEFT JOIN pengembalian_mobils on pengembalian_mobils.peminjaman_mobil_id = peminjaman_mobils.id;
        SQL;
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    private function dropView(): string
    {
        return <<<SQL
            DROP VIEW IF EXISTS "peminjaman_mobils_v";
        SQL;
    }
};
