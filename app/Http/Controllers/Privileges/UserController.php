<?php

namespace App\Http\Controllers\Privileges;

use App\Http\Controllers\Controller;
use App\Http\Requests\Privileges\UserRequest;
use App\Models\Privileges\PermissionView;
use App\Models\Privileges\User;
use App\Models\Privileges\UserView;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UserController extends Controller
{
    private $table;
    private $tableView;

    public function __construct() {
        $this->table = new User();
        $this->tableView = new UserView();
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
        ], [
            "active" => [
                [
                    "value" => "true",
                    "label" => "TRUE"
                ],
                [
                    "value" => "false",
                    "label" => "FALSE"
                ],
            ],
        ]);
    }

    public function create()
    {
        return response()->json([
            'permissions' => PermissionView::select('id as value', 'name as label')->orderBy('name', 'asc')->get(),
            'active' => collect([
                [
                    "value" => "true",
                    "label" => "TRUE"
                ],
                [
                    "value" => "false",
                    "label" => "FALSE"
                ]
            ])
        ]);
    }

    public function store(UserRequest $request)
    {
        DB::beginTransaction();
        try {
            $model                = $this->table;
            $model->first_name    = $request->first_name;
            $model->last_name     = $request->last_name;
            $model->date_of_birth = $request->date_of_birth;
            $model->email         = $request->email;
            $model->username      = $request->username;
            $model->password      = bcrypt(Crypt::decryptString($request->password));
            $model->active        = $request->active == 'true' ? true : false;
            $model->created_by    = auth()->user()->id;
            $model->updated_by    = auth()->user()->id;
            $model->save();

            if ($request->permissions) {
                HelperDeveloperLog(json_decode($request->permissions));
                $role = USer::findOrFail($model->id);
                $role->syncPermissions(json_decode($request->permissions));
            }

            DB::commit();

            return response()->json([
                'message' => HelperMessageSuccessStore(),
                'permissions' => PermissionView::select('id as value', 'name as label')->orderBy('name', 'asc')->get(),
                'data' => [
                    'active' => collect([
                        [
                            "value" => "true",
                            "label" => "TRUE"
                        ],
                        [
                            "value" => "false",
                            "label" => "FALSE"
                        ]
                    ])
                ]
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

    public function edit(string $id)
    {
        HelperDeveloperLog('data');
        return response()->json([
            'data' => $this->tableView::select('first_name', 'last_name', 'date_of_birth', 'active', 'email', 'username', 'password', 'permissions_id as permissions')->findOrFail(Crypt::decryptString($id)),
            'permissions' => PermissionView::select('id as value', 'name as label')->orderBy('name', 'asc')->get(),
            'active' => collect([
                [
                    "value" => "true",
                    "label" => "TRUE"
                ],
                [
                    "value" => "false",
                    "label" => "FALSE"
                ]
            ])
        ]);
    }

    public function update(UserRequest $request, string $id)
    {
        DB::beginTransaction();
        try {
            $model                = $this->table::findOrFail(Crypt::decryptString($id));
            $model->first_name    = $request->first_name;
            $model->last_name     = $request->last_name;
            $model->date_of_birth = $request->date_of_birth;
            $model->email         = $request->email;
            $model->username      = $request->username;
            if ($model->password != $request->password) {
                $model->password = bcrypt(Crypt::decryptString($request->password));
            }
            $model->active        = $request->active == 'true' ? true : false;
            $model->updated_by    = auth()->user()->id;
            $model->save();

            if ($request->permissions) {
                HelperDeveloperLog(json_decode($request->permissions));
                $role = USer::findOrFail(Crypt::decryptString($id));
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
            if ($check->roles) {
                return response()->json([
                    'message' => "Type is in use."
                ], 404);
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
        ], [
            "active" => [
                [
                    "value" => "true",
                    "label" => "TRUE"
                ],
                [
                    "value" => "false",
                    "label" => "FALSE"
                ],
            ],
        ]);
    }

    public function restore(Request $request)
    {
        DB::beginTransaction();
        try {
            if ($request->datatable) {
                foreach ($request->datatable as $value) {
                    $check = $this->table::where(DB::raw('LOWER(username)'), Str::lower(Arr::get($value, 'username')))->orWhere(DB::raw('LOWER(email)'), Str::lower(Arr::get($value, 'email')))->get();
                    if ($check->count() < 1) {
                        $model = $this->table::onlyTrashed()->findOrFail(Crypt::decryptString(Arr::get($value, 'id')));
                        $model->updated_by = auth()->user()->id;
                        $model->deleted_by = null;
                        $model->save();
                        $model->restore();
                    }
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
            if ($request->datatable) {
                foreach ($request->datatable as $value) {
                    $model = $this->table::onlyTrashed()->findOrFail(Crypt::decryptString(Arr::get($value, 'id')));
                    $model->forceDelete();
                }
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
}
