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
            CREATE VIEW privileges_roles_v AS
                SELECT
                    privileges_roles.id,
                    privileges_roles.name as "code",
                    CONCAT(privileges_types."name", ' ', privileges_roles.display) AS "name",
                    privileges_roles.privileges_type_id AS "type",
                    privileges_types."name" AS type_name,
                    privileges_roles.display,
                    (
                        SELECT JSON_AGG(privileges_permissions."name")::TEXT
                        FROM (
                            SELECT id, "name", privileges_role_has_permissions.privileges_role_id as role_id
                            FROM privileges_permissions
                            INNER JOIN privileges_role_has_permissions ON privileges_role_has_permissions.privileges_permission_id = privileges_permissions.id
                            ORDER BY privileges_permissions."name" ASC
                        ) as privileges_permissions
                        WHERE privileges_permissions.role_id = privileges_roles.id
                    ) AS permissions,
                    (
                        SELECT JSON_AGG(privileges_permissions.id)::TEXT
                        FROM (
                            SELECT id, "name", privileges_role_has_permissions.privileges_role_id as role_id
                            FROM privileges_permissions
                            INNER JOIN privileges_role_has_permissions ON privileges_role_has_permissions.privileges_permission_id = privileges_permissions.id
                            ORDER BY privileges_permissions."name" ASC
                        ) as privileges_permissions
                        WHERE privileges_permissions.role_id = privileges_roles.id
                    ) AS permissions_id,
                    (
                        SELECT JSON_AGG(CONCAT(privileges_users.first_name, ' ', privileges_users.last_name))::TEXT
                        FROM (
                            SELECT id, first_name, last_name, privileges_model_has_roles.privileges_role_id AS role_id
                            FROM privileges_users
                            INNER JOIN privileges_model_has_roles ON privileges_model_has_roles.model_id = privileges_users.id
                            ORDER BY privileges_users.first_name
                        ) as privileges_users
                        WHERE privileges_users.role_id = privileges_roles.id
                    ) AS users,
                    (
                        SELECT JSON_AGG(privileges_users.id)::TEXT
                        FROM (
                            SELECT id, first_name, last_name, privileges_model_has_roles.privileges_role_id AS role_id
                            FROM privileges_users
                            INNER JOIN privileges_model_has_roles ON privileges_model_has_roles.model_id = privileges_users.id
                            ORDER BY privileges_users.first_name
                        ) as privileges_users
                        WHERE privileges_users.role_id = privileges_roles.id
                    ) AS users_id,
                    privileges_roles.created_by,
                    privileges_roles.updated_by,
                    privileges_roles.deleted_by,
                    privileges_roles.created_at,
                    privileges_roles.updated_at,
                    privileges_roles.deleted_at
                FROM privileges_roles
                INNER JOIN privileges_types ON privileges_types.id = privileges_roles.privileges_type_id;
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
            DROP VIEW IF EXISTS "privileges_roles_v";
        SQL;
    }
};
