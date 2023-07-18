<?php

namespace App\Http\Controllers\MainMenu;

use App\Http\Controllers\Controller;
use App\Models\ManajemenMobilView;
use App\Models\PeminjamanMobil;
use App\Models\PeminjamMobilView;
use App\Models\PengembalianMobil;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PengembalianMobilController extends Controller
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
            ['pengembalian', '!=', null]
        ], [
            ['mobil', 'asc'],
        ], []);
    }

    public function create()
    {
        return response()->json([
            'mobil_id' => $this->tableView::select('id as value', DB::raw('CONCAT(mobil, \' (\', owner, \')\') AS label'))->where('pengembalian', null)->where('created_by', auth()->user()->id)->orderBy('mobil', 'asc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $model                      = new PengembalianMobil();
        $model->peminjaman_mobil_id  = $request->mobil_id;
        $model->created_by          = auth()->user()->id;
        $model->updated_by          = auth()->user()->id;
        $model->save();

        return response()->json([
            'message' => "Mobil berhasil di kembalikan."
        ]);
    }
}
