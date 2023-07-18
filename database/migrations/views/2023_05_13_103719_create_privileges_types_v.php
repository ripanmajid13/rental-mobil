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
            CREATE VIEW privileges_types_v AS
                SELECT
                    privileges_types.*,
                    (SELECT JSON_AGG(jsonb_build_object('value', privileges_roles.id, 'label', privileges_roles.display))::TEXT FROM privileges_roles
                        WHERE privileges_roles.privileges_type_id = privileges_types.id
                    ) AS roles
                FROM privileges_types;
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
            DROP VIEW IF EXISTS "privileges_types_v";
        SQL;
    }
};
