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
            CREATE VIEW privileges_users_v AS
                SELECT
                    privileges_users.id,
                    privileges_users.first_name,
                    privileges_users.last_name,
                    CONCAT(privileges_users.first_name, ' ', privileges_users.last_name) AS "name",
                    privileges_users.username,
                    privileges_users.password,
                    privileges_users.date_of_birth::TEXT,
                    privileges_users.email,
                    privileges_users.email_verified_at,
                    privileges_users.active::TEXT,
                    TO_CHAR(privileges_users.created_at, 'yyyy-mm-dd') as "join",
                    (
                        SELECT JSON_AGG(CONCAT("name", ' ', display))::TEXT
                        FROM (
                            SELECT privileges_roles.id, privileges_types."name", privileges_roles.display, privileges_model_has_roles.model_id AS user_id
                            FROM privileges_roles
                            INNER JOIN privileges_types ON privileges_types.id = privileges_roles.privileges_type_id
                            INNER JOIN privileges_model_has_roles ON privileges_model_has_roles.privileges_role_id = privileges_roles.id
                            ORDER BY privileges_roles."name" ASC
                        ) AS privileges_roles
                        WHERE privileges_roles.user_id = privileges_users.id
                    ) AS roles,
                    (
                        SELECT JSON_AGG(privileges_permissions."name")::TEXT
                        FROM (
                        SELECT id, "name", privileges_model_has_permissions.model_id AS user_id
                            FROM privileges_permissions
                            INNER JOIN privileges_model_has_permissions ON privileges_model_has_permissions.privileges_permission_id = privileges_permissions.id
                            ORDER BY privileges_permissions."name" ASC
                        ) as privileges_permissions
                        WHERE privileges_permissions.user_id = privileges_users.id
                    ) AS permissions,
                    (
                        SELECT JSON_AGG(privileges_permissions.id)::TEXT
                        FROM (
                        SELECT id, "name", privileges_model_has_permissions.model_id AS user_id
                            FROM privileges_permissions
                            INNER JOIN privileges_model_has_permissions ON privileges_model_has_permissions.privileges_permission_id = privileges_permissions.id
                            ORDER BY privileges_permissions."name" ASC
                        ) as privileges_permissions
                        WHERE privileges_permissions.user_id = privileges_users.id
                    ) AS permissions_id,
                    privileges_users.created_by,
                    privileges_users.updated_by,
                    privileges_users.deleted_by,
                    privileges_users.created_at,
                    privileges_users.updated_at,
                    privileges_users.deleted_at
                FROM privileges_users;
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
            DROP VIEW IF EXISTS "privileges_users_v";
        SQL;
    }
};
