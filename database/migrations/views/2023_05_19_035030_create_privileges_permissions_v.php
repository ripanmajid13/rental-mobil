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
            CREATE VIEW privileges_permissions_v AS
                SELECT
                    privileges_permissions.id,
                    privileges_permissions.name,
                    privileges_permissions.guard_name,
                    privileges_permissions.display,
                    (
                        SELECT backend_apis.controller FROM backend_apis
                        WHERE backend_apis."permission" = privileges_permissions."name"
                        GROUP BY backend_apis.controller
                    ) AS controller,
                    (
                        SELECT JSON_AGG(backend_apis."path")::TEXT
                        FROM ( SELECT "path", "permission" FROM backend_apis ORDER BY "path" ASC ) AS backend_apis
                        WHERE backend_apis."permission" = privileges_permissions."name"
                    ) AS "path",
                    (
                        SELECT JSON_AGG(backend_apis."uri")::TEXT
                        FROM ( SELECT "uri", "permission" FROM backend_apis ORDER BY "uri" ASC ) AS backend_apis
                        WHERE backend_apis."permission" = privileges_permissions."name"
                    ) AS uri,
                    (
                        SELECT CASE WHEN count(backend_apis.middleware) < 1 THEN '0' ELSE '1' END
                        FROM backend_apis
                        WHERE backend_apis."permission" = privileges_permissions."name"
                        AND backend_apis.middleware = TRUE
                    ) AS middleware,
                    (
                        SELECT JSON_AGG(privileges_roles."name")::TEXT
                        FROM (
                            SELECT id, "name", privileges_role_has_permissions.privileges_permission_id AS permission_id
                            FROM privileges_roles
                            INNER JOIN privileges_role_has_permissions ON privileges_role_has_permissions.privileges_role_id = privileges_roles.id
                            ORDER BY privileges_roles."name" ASC
                        ) AS privileges_roles
                        WHERE privileges_roles.permission_id = privileges_permissions.id
                    ) AS roles,
                    (
                        SELECT JSON_AGG(CONCAT(privileges_users.first_name, ' ', privileges_users.last_name))::TEXT
                        FROM (
                            SELECT id, first_name, last_name, privileges_model_has_permissions.privileges_permission_id AS permission_id
                            FROM privileges_users
                            INNER JOIN privileges_model_has_permissions ON privileges_model_has_permissions.model_id = privileges_users.id
                            ORDER BY first_name ASC
                        ) AS privileges_users
                        WHERE privileges_users.permission_id = privileges_permissions.id
                    ) AS users,
                    privileges_permissions.created_by,
                    privileges_permissions.updated_by,
                    privileges_permissions.deleted_by,
                    privileges_permissions.created_at,
                    privileges_permissions.updated_at,
                    privileges_permissions.deleted_at
                FROM privileges_permissions;
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
            DROP VIEW IF EXISTS "privileges_permissions_v";
        SQL;
    }
};
