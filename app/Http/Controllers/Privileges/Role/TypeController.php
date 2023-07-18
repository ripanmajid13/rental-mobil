<?php

namespace App\Http\Controllers\Privileges\Role;

use App\Http\Controllers\Controller;
use App\Http\Requests\Privileges\TypeRequest;
use App\Models\Privileges\Type;
use App\Models\Privileges\TypeView;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;


class TypeController extends Controller
{
    private $table;
    private $tableView;

    public function __construct() {
        $this->table = new Type();
        $this->tableView = new TypeView();
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
        ], []);
    }

    public function store(TypeRequest $request)
    {
        $model             = $this->table;
        $model->name       = $request->name;
        $model->created_by = auth()->user()->id;
        $model->updated_by = auth()->user()->id;
        $model->save();

        return response()->json([
            'message' => HelperMessageSuccessStore(),
        ]);
    }

    public function update(TypeRequest $request, string $id)
    {
        $model             = $this->table::findOrFail(Crypt::decryptString($id));
        $model->name       = $request->name;
        $model->updated_by = auth()->user()->id;
        $model->save();

        return response()->json([
            'message' => HelperMessageSuccessUpdate(),
        ]);
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
        ], []);
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
                $model = $this->table::onlyTrashed()->findOrFail(Crypt::decryptString(Arr::get($value, 'id')));
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
}
