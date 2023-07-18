<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
   /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement($this->createView());
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
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
            CREATE VIEW backend_logs_v AS
                SELECT
                    backend_logs.id,
                    backend_logs.logged_at,
                    backend_apis.controller,
                    backend_apis."action",
                    TO_CHAR(backend_logs.logged_at, 'yyyy-mm-dd') AS "date",
                    TO_CHAR(backend_logs.logged_at, 'HH24:MI:SS') AS "time",
                    backend_logs.level,
                    backend_logs.message,
                    backend_logs.read::TEXT,
                    CONCAT(privileges_users.first_name, ' ', privileges_users.last_name) AS user,
                    backend_logs.created_by,
                    backend_logs.updated_by,
                    backend_logs.deleted_by,
                    backend_logs.created_at,
                    backend_logs.updated_at,
                    backend_logs.deleted_at
                FROM backend_logs
                LEFT JOIN backend_apis ON backend_apis."uri" = backend_logs.route
                LEFT JOIN privileges_users ON privileges_users.id = backend_logs.created_by;
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
            DROP VIEW IF EXISTS "backend_logs_v";
        SQL;
    }
};
