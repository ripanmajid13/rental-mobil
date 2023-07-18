<?php

namespace App\Http\Controllers\MainMenu;

use App\Http\Controllers\Controller;
use App\Models\ManajemenMobil;
use App\Models\ManajemenMobilView;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Validation\Rule;

class ManajemenMobilController extends Controller
{
    private $table;
    private $tableView;

    public function __construct() {
        $this->table = new ManajemenMobil();
        $this->tableView = new ManajemenMobilView();
    }

    public function index(Request $request)
    {
        return HelperTableGet($request, $this->tableView, [], [], [
            ['merk', 'asc'],
        ], []);
    }

    public function store(Request $request)
    {
        $request->validate([
            'merk'  => ['required', 'string'],
            'model' => ['required', 'string'],
            'plat'  => ['required', 'string',  Rule::unique(ManajemenMobil::class, 'plat')->whereNull('deleted_at')],
            'tarif' => ['required', 'numeric'],
        ]);

        $model             = $this->table;
        $model->merk       = $request->merk;
        $model->model       = $request->model;
        $model->plat       = $request->plat;
        $model->tarif       = $request->tarif;
        $model->created_by = auth()->user()->id;
        $model->updated_by = auth()->user()->id;
        $model->save();

        return response()->json([
            'message' => HelperMessageSuccessStore(),
        ]);
    }

    public function update(Request $request, string $id)
    {
        $request->validate([
            'merk'  => ['required', 'string'],
            'model' => ['required', 'string'],
            'plat'  => ['required', 'string',  Rule::unique(ManajemenMobil::class, 'plat')->whereNull('deleted_at')->ignore(Crypt::decryptString($id))],
            'tarif' => ['required', 'numeric'],
        ]);

        $model             = $this->table::findOrFail(Crypt::decryptString($id));
        $model->merk       = $request->merk;
        $model->model      = $request->model;
        $model->plat       = $request->plat;
        $model->tarif      = $request->tarif;
        $model->updated_by = auth()->user()->id;
        $model->save();

        return response()->json([
            'message' => HelperMessageSuccessUpdate(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
