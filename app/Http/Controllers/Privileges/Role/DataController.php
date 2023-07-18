<?php

namespace App\Http\Controllers\Privileges\Role;

use App\Exports\Privileges\RoleExport;
use App\Exports\Privileges\UsersExport;
use App\Http\Controllers\Controller;
use App\Http\Requests\Privileges\RoleRequest;
use App\Models\Privileges\PermissionView;
use App\Models\Privileges\Role;
use App\Models\Privileges\RoleView;
use App\Models\Privileges\Type;
use App\Models\Privileges\User;
use App\Models\Privileges\UserView;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DataController extends Controller
{
    private $table;
    private $tableView;

    public function __construct() {
        $this->table = new Role();
        $this->tableView = new RoleView();
    }

    public function verbs()
    {
        $verbs = collect();
        $verbs->put('update', ['PUT']);
        $verbs->put('restore', ['PUT']);
        $verbs->put('destroy', ['DELETE']);
        $verbs->put('destroyPermanent', ['DELETE']);
        return $verbs;
    }

    public function index(Request $request)
    {
        return HelperTableGet($request, $this->tableView, [], [], [
            ['name', 'asc'],
        ]);
    }

    public function create(Request $request)
    {
        return response()->json([
            'type' => Type::select('id as value', 'name as label')->orderBy('name', 'asc')->get(),
            'permissions' => PermissionView::select('id as value', 'name as label')->orderBy('name', 'asc')->get(),
            'users' => UserView::select('id as value', 'name as label')->whereRaw('LOWER(name) LIKE ? ', ['%'.Str::lower($request->users).'%'])->orderBy('name', 'asc')->get()
        ]);
    }

    public function store(RoleRequest $request)
    {
        DB::beginTransaction();
        try {
            $type = Type::findOrFail($request->type);
            $typeArray = Str::of($type->name)->explode(' ')->toArray();
            $nameArray = Str::of($request->display)->explode(' ')->toArray();

            $model                     = $this->table;
            $model->name               = Str::lower(Arr::join($typeArray, '-').'-'.Arr::join($nameArray , '-'));
            $model->display            = $request->display;
            $model->guard_name         = 'api';
            $model->privileges_type_id = $request->type;
            $model->created_by         = auth()->user()->id;
            $model->updated_by         = auth()->user()->id;
            $model->save();

            if ($request->users) {
                foreach (json_decode($request->users) as $value) {
                    $user = User::findOrFail($value);
                    $user->assignRole($model->id);
                }
            }

            if ($request->permissions) {
                HelperDeveloperLog(json_decode($request->permissions));
                $role = Role::findOrFail($model->id);
                $role->syncPermissions(json_decode($request->permissions));
            }

            DB::commit();

            return response()->json([
                'message' => HelperMessageSuccessStore(),
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function show(string $id)
    {
        return true;
    }

    public function edit(Request $request, string $id)
    {
        return response()->json([
            'data' => $this->tableView::select('display', 'type', 'permissions_id AS permissions', 'users_id AS users')->findOrFail(Crypt::decryptString(($id))),
            'type' => Type::select('id as value', 'name as label')->orderBy('name', 'asc')->get(),
            'permissions' => PermissionView::select('id as value', 'name as label')->orderBy('name', 'asc')->get(),
            'users' => UserView::select('id as value', 'name as label')->whereRaw('LOWER(name) LIKE ? ', ['%'.Str::lower($request->users).'%'])->orderBy('name', 'asc')->get()
        ]);
    }

    public function update(RoleRequest $request, string $id)
    {
        DB::beginTransaction();
        try {
            $type = Type::findOrFail($request->type);
            $typeArray = Str::of($type->name)->explode(' ')->toArray();
            $nameArray = Str::of($request->display)->explode(' ')->toArray();

            $model                     = $this->table::findOrFail(Crypt::decryptString($id));
            $model->name               = Str::lower(Arr::join($typeArray, '-').'-'.Arr::join($nameArray , '-'));
            $model->display            = $request->display;;
            $model->privileges_type_id = $request->type;
            $model->updated_by         = auth()->user()->id;
            $model->save();

            if ($request->users) {
                foreach (json_decode($request->users) as $value) {
                    $user = User::findOrFail($value);
                    $user->assignRole(Crypt::decryptString($id));
                }
            }

            if ($request->permissions) {
                HelperDeveloperLog(json_decode($request->permissions));
                $role = Role::findOrFail(Crypt::decryptString($id));
                $role->syncPermissions(json_decode($request->permissions));
            }

            DB::commit();

            return response()->json([
                'message' => HelperMessageSuccessUpdate(),
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function destroy(Request $request, string $id)
    {
        $user_id = HelperDeveloperUserId($request);
        if ($user_id > 0) {
            $check = $this->tableView::findOrFail(Crypt::decryptString($id));
            if ($check->users || $check->permissions) {
                return response()->json([
                    'message' => "Role is in use."
                ], 405);
            } else {
                $model = $this->table::findOrFail(Crypt::decryptString($id));
                $model->deleted_by = auth()->user()->id;
                $model->save();
                $model->delete();

                return response()->json([
                    'message' => HelperMessageSuccessDestroy(),
                ]);
            }
        } else {
            return response()->json([
                'message' => "Your username or password is wrong."
            ], 404);
        }
    }

    public function trash(Request $request)
    {
        return HelperTableGetOnlyTrashed($request, $this->tableView, [], [], [
            ['name', 'asc'],
        ]);
    }

    public function restore(Request $request)
    {
        DB::beginTransaction();
        try {
            foreach ($request->datatable as $value) {
                $check = $this->table::where(DB::raw('LOWER(name)'), Str::lower(Arr::get($value, 'name')))->get();
                if ($check->count() < 1) {
                    $model = $this->table::onlyTrashed()->findOrFail(Crypt::decryptString(Arr::get($value, 'id')));
                    $model->updated_by = auth()->user()->id;
                    $model->deleted_by = null;
                    $model->save();
                    $model->restore();
                }
            }

            DB::commit();

            return response()->json([
                'message' => HelperMessageSuccessRestore(),
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function destroyPermanent(Request $request)
    {
        DB::beginTransaction();
        try {
            foreach ($request->datatable as $value) {
                $id = Crypt::decryptString(Arr::get($value, 'id'));
                $model = $this->table::onlyTrashed()->findOrFail($id);
                $model->forceDelete();
            }

            DB::commit();

            return response()->json([
                'message' => HelperMessageSuccessDestroyPermanent(),
            ]);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }
    }

    public function print(Request $request)
    {
        return HelperFileDownloadPrint($request, 'exports.privileges.role', [
            'title' => $request->titleFile,
            'filter' => collect($request->datatable_filter),
            'columns' => collect($request->datatable_column),
            'model' => $this->tableView::select(collect($request->datatable_column)->pluck('column')->toArray())
            ->when(collect($request->datatable_filter)->count() > 0, function ($query) use($request) {
                foreach (collect($request->datatable_filter) as $item) {
                    if ($item['type'] == 'text' || $item['type'] == 'select' || $item['type'] == 'date') {
                        $query->whereRaw('LOWER("'.$item['key'].'") LIKE ? ', ['%'.Str::lower($item['value']).'%']);
                    } else if ($item['type'] == 'daterange') {
                        $query->whereBetween($item['key'], Str::of($item['value'])->explode(' - '));
                    }
                }
            })->orderByRaw('LOWER(name) asc')->get()
        ]);
    }

    public function downloadExcel(Request $request)
    {
        return HelperFileDownloadExcel(new RoleExport($request), $request);
    }

    public function downloadPdf(Request $request)
    {
        return HelperFileDownloadPdf($request, 'exports.privileges.role', [
            'title' => $request->titleFile,
            'filter' => collect($request->datatable_filter),
            'columns' => collect($request->datatable_column),
            'model' => $this->tableView::select(collect($request->datatable_column)->pluck('column')->toArray())
            ->when(collect($request->datatable_filter)->count() > 0, function ($query) use($request) {
                foreach (collect($request->datatable_filter) as $item) {
                    if ($item['type'] == 'text' || $item['type'] == 'select' || $item['type'] == 'date') {
                        $query->whereRaw('LOWER("'.$item['key'].'") LIKE ? ', ['%'.Str::lower($item['value']).'%']);
                    } else if ($item['type'] == 'daterange') {
                        $query->whereBetween($item['key'], Str::of($item['value'])->explode(' - '));
                    }
                }
            })->orderByRaw('LOWER(name) asc')->get()
        ]);
    }
}
