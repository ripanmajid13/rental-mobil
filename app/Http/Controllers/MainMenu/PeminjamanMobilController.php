<?php

namespace App\Http\Controllers\MainMenu;

use App\Http\Controllers\Controller;
use App\Models\ManajemenMobil;
use App\Models\ManajemenMobilView;
use App\Models\PeminjamanMobil;
use App\Models\PeminjamMobilView;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PeminjamanMobilController extends Controller
{
    private $table;
    private $tableView;

    public function __construct() {
        $this->table = new PeminjamanMobil();
        $this->tableView = new PeminjamMobilView();
    }

    public function index(Request $request)
    {
        return HelperTableGet($request, $this->tableView, [], [
            ['created_by', auth()->user()->id],
        ], [
            ['mobil', 'asc'],
        ], []);
    }

    public function create()
    {
        return response()->json([
            'mobil_id' => ManajemenMobilView::select('id as value', DB::raw('CONCAT(merk, \' \', model, \' \', plat, \' (\', owner, \')\') AS label'))->orderBy('merk', 'asc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'mobil_id' => ['required', 'numeric'],
            'tanggal_mulai'   => ['required', 'string'],
            'tanggal_selesai' => ['required', 'string'],
        ]);

        $exists = 0;
        $tanggal = collect();
        $tanggalInput = CarbonPeriod::create($request->tanggal_mulai, $request->tanggal_selesai);
        foreach (PeminjamanMobil::where('manajemen_mobil_id', $request->mobil_id)->get() as $tgl) {
            foreach (CarbonPeriod::create($tgl->tanggal_mulai, $tgl->tanggal_selesai) as $date) {
                $tanggal->push($date->format('Y-m-d'));
            }
        }

        foreach ($tanggalInput as $val) {
            if (in_array($val->format('Y-m-d'), $tanggal->toArray())) {
                $exists += 1;
            }
        }

        $date1 = Carbon::createFromFormat('Y-m-d', $request->tanggal_mulai);
        $date2 = Carbon::createFromFormat('Y-m-d', $request->tanggal_selesai);

        if ($date1->gte($date2)) {
            if ($exists < 1) {
                $model                      = $this->table;
                $model->manajemen_mobil_id  = $request->mobil_id;
                $model->tanggal_mulai       = $request->tanggal_mulai;
                $model->tanggal_selesai     = $request->tanggal_selesai;
                $model->tarif               = ManajemenMobil::findOrFail($request->mobil_id)->tarif;
                $model->created_by          = auth()->user()->id;
                $model->updated_by          = auth()->user()->id;
                $model->save();

                return response()->json([
                    'message' => HelperMessageSuccessStore(),
                ]);
            } else {
                return response()->json([
                    'message' => "Mobil tidak tersedia."
                ], 405);
            }
        } else {
            return response()->json([
                'message' => "Tanggal Selesai harus lebih dari Tanggal Mulai."
            ], 405);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
