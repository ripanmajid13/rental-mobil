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
            CREATE VIEW privileges_languages_v AS
                SELECT
                    privileges_languages.*,
                    CONCAT(user_update.first_name, ' ', user_update.last_name) as updated
                FROM privileges_languages
                INNER JOIN privileges_users as user_update
                ON user_update.id = privileges_languages.updated_by;
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
            DROP VIEW IF EXISTS "privileges_languages_v";
        SQL;
    }
};
