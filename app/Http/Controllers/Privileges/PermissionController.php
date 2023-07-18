<?php

namespace App\Http\Controllers\Privileges;

use App\Http\Controllers\Controller;
use App\Models\Privileges\Permission;
use App\Models\Privileges\PermissionView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class PermissionController extends Controller
{
    private $table;
    private $tableView;

    public function __construct() {
        $this->table = new Permission();
        $this->tableView = new PermissionView();
    }

    public function verbs()
    {
        $verbs = collect();
        $verbs->put('destroy', ['DELETE']);
        return $verbs;
    }

    public function index(Request $request)
    {
        return HelperTableGet($request, $this->tableView, [], [], [
            ['middleware', 'asc'],
            ['name', 'asc'],
        ], []);
    }

    public function destroy(string $id)
    {
        $check = $this->tableView::findOrFail(Crypt::decryptString($id));
        if ($check->middleware < 1) {
            $model = $this->table::findOrFail(Crypt::decryptString($id));
            $model->deleted_by = auth()->user()->id;
            $model->save();
            $model->forceDelete();

            return response()->json([
                'message' => HelperMessageSuccessDestroy(),
            ]);
        } else {
            return response()->json([
                'message' => "Permission is in use."
            ], 404);
        }
    }
}
