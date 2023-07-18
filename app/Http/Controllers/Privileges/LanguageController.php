<?php

namespace App\Http\Controllers\Privileges;

use App\Http\Controllers\Controller;
use App\Http\Requests\Privileges\LanguageRequest;
use App\Models\Privileges\Language;
use App\Models\Privileges\LanguageView;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

class LanguageController extends Controller
{
    private $table;
    private $tableView;

    public function __construct() {
        $this->table = new Language();
        $this->tableView = new LanguageView();
    }

    public function verbs()
    {
        $verbs = collect();
        $verbs->put('edit', ['PUT']);
        $verbs->put('restore', ['PUT']);
        $verbs->put('destroy', ['DELETE']);
        $verbs->put('destroyPermanent', ['DELETE']);
        return $verbs;
    }

    public function index(Request $request)
    {
        return HelperTableGet($request, $this->tableView, [], [], [
            ['key', 'asc'],
        ], []);
    }

    public function create(LanguageRequest $request)
    {
        $model             = $this->table;
        $model->key        = $request->key;
        $model->lang_en    = $request->lang_en;
        $model->lang_id    = $request->lang_id;
        $model->created_by = auth()->user()->id;
        $model->updated_by = auth()->user()->id;
        $model->save();

        return response()->json([
            'message' => HelperMessageSuccessStore(),
        ]);
    }

    public function edit(LanguageRequest $request, string $id)
    {
        $model             = $this->table::findOrFail(Crypt::decryptString($id));
        $model->key        = $request->key;
        $model->lang_en    = $request->lang_en;
        $model->lang_id    = $request->lang_id;
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
            $model = $this->table::findOrFail(Crypt::decryptString($id));
            $model->deleted_by = $user_id;
            $model->save();
            $model->delete();

            return response()->json([
                'message' => HelperMessageSuccessDestroy(),
            ]);
        } else {
            return response()->json([
                'message' => "Your username or password is wrong."
            ], 404);
        }
    }

    public function helper(Request $request)
    {
        $user_id = HelperDeveloperUserId($request);
        if ($user_id > 0) {
            DB::beginTransaction();
            try {
                foreach (HelperDeveloperLangEn() as $item) {
                    $en = collect($item);
                    $key = $en->keys()->first();
                    $val = $en->values()->first();

                    $check = Language::where('key', $key)->get();
                    if ($check->count() < 1) {
                        $model = new Language;
                        $model->key = $key;
                        $model->lang_en = $val;
                        $model->created_by = $user_id;
                        $model->updated_by = $user_id;
                        $model->save();
                    } else {
                        $checkLang = Language::where('key', $key)->whereNotNull('lang_en')->get();
                        if ($checkLang->count() < 1) {
                            $model = Language::findOrFail($check->first()->id);
                            $model->lang_en = $val;
                            $model->updated_by = $user_id;
                            $model->save();
                        }
                    }
                }

                foreach (HelperDeveloperLangId() as $item) {
                    $id = collect($item);
                    $key = $id->keys()->first();
                    $val = $id->values()->first();

                    $check = Language::where('key', $key)->get();
                    if ($check->count() < 1) {
                        $model = new Language;
                        $model->key = $key;
                        $model->lang_id = $val;
                        $model->created_by = $user_id;
                        $model->updated_by = $user_id;
                        $model->save();
                    } else {
                        $checkLang = Language::where('key', $key)->whereNotNull('lang_id')->get();
                        if ($checkLang->count() < 1) {
                            $model = Language::findOrFail($check->first()->id);
                            $model->lang_id = $val;
                            $model->updated_by = $user_id;
                            $model->save();
                        }
                    }
                }

                DB::commit();

                return response()->json([
                    'message' => HelperMessageSuccessUpdate()
                ]);
            } catch (\Exception $e) {
                DB::rollback();
                throw $e;
            } catch (\Throwable $e) {
                DB::rollback();
                throw $e;
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
            ['key', 'asc'],
        ], []);
    }

    public function restore(Request $request)
    {
        DB::beginTransaction();
        try {
            if ($request->datatable) {
                foreach ($request->datatable as $value) {
                    $check = $this->table::where('key', Arr::get($value, 'key'))->get();
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
