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
            CREATE VIEW manajemen_mobils_v AS
                SELECT manajemen_mobils.id,
                    manajemen_mobils.merk,
                    manajemen_mobils.model,
                    manajemen_mobils.plat,
                    manajemen_mobils.tarif::TEXT,
                    CONCAT(privileges_users.first_name, ' ', privileges_users.last_name) AS owner,
                    manajemen_mobils.created_by,
                    manajemen_mobils.updated_by,
                    manajemen_mobils.deleted_by,
                    manajemen_mobils.created_at,
                    manajemen_mobils.updated_at,
                    manajemen_mobils.deleted_at
                FROM manajemen_mobils
                INNER JOIN privileges_users ON privileges_users.id = manajemen_mobils.created_by;
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
            DROP VIEW IF EXISTS "manajemen_mobils_v";
        SQL;
    }
};
