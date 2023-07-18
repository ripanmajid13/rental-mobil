<?php

use App\Events\ProcessEvent;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Excel as ExcelFormat;
use Maatwebsite\Excel\Facades\Excel;

if (!function_exists('HelperFileDownloadExcel')) {
    function HelperFileDownloadExcel($export, Request $request) {
        ProcessEvent::dispatch($request->broadcastAs, 1);

        sleep(1);
        ProcessEvent::dispatch($request->broadcastAs, 5);

        sleep(1);
        $file = $request->fileName.'.xlsx';
        ProcessEvent::dispatch($request->broadcastAs, 20);

        sleep(1);
        ProcessEvent::dispatch($request->broadcastAs, 75);
        $download = Excel::download($export, $file, ExcelFormat::XLSX, [
            'message' => "The data was successfully downloaded."
        ]);

        sleep(1);
        ProcessEvent::dispatch($request->broadcastAs, 90);

        sleep(1);
        return $download;
    }
}

if (!function_exists('HelperFileDownloadPdf')) {
    function HelperFileDownloadPdf(Request $request, $location = '', $data = []) {
        ProcessEvent::dispatch($request->broadcastAs, 1);

        sleep(1);
        ProcessEvent::dispatch($request->broadcastAs, 5);

        sleep(1);
        $file = $request->fileName.'.pdf';
        ProcessEvent::dispatch($request->broadcastAs, 35);

        sleep(1);
        $view = Pdf::loadView($location, $data);
        ProcessEvent::dispatch($request->broadcastAs, 45);

        sleep(1);
        $download = $view->download($file);
        ProcessEvent::dispatch($request->broadcastAs, 70);

        sleep(1);
        ProcessEvent::dispatch($request->broadcastAs, 100);

        sleep(1);
        return $download->header('message', "The data was successfully downloaded.");
    }
}

if (!function_exists('HelperFileDownloadPrint')) {
    function HelperFileDownloadPrint(Request $request, $location = '', $data = []) {
        ProcessEvent::dispatch($request->broadcastAs, 1);

        sleep(1);
        ProcessEvent::dispatch($request->broadcastAs, 5);

        sleep(1);
        $file = $request->fileName.'.pdf';
        ProcessEvent::dispatch($request->broadcastAs, 35);

        sleep(1);
        $output = Pdf::loadView($location, $data)->output();
        ProcessEvent::dispatch($request->broadcastAs, 50);

        sleep(1);
        $outputStorage = Storage::disk('documents')->put($file, $output);
        ProcessEvent::dispatch($request->broadcastAs, 65);

        if ($outputStorage) {
            sleep(1);
            $checkFile = Storage::disk('documents')->exists($file);
            ProcessEvent::dispatch($request->broadcastAs, 87);

            if($checkFile) {
                sleep(1);
                ProcessEvent::dispatch($request->broadcastAs, 100);

                sleep(1);
                return response()->json([
                    'file' => '/documents'.'/'.$file,
                    'message' => "Printed successfully."
                ]);
            } else {
                sleep(1);
                ProcessEvent::dispatch($request->broadcastAs, 100);

                sleep(1);
                return response()->json([
                    'message' => "Data not found."
                ], 404);
            }
        } else {
                sleep(1);
                ProcessEvent::dispatch($request->broadcastAs, 100);

                sleep(1);
                return response()->json([
                    'message' => "Failed to be printed."
                ], 405);
        }
    }
}
