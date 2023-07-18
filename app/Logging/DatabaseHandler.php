<?php

namespace App\Logging;

use App\Models\Backend\Log;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Monolog\Handler\AbstractProcessingHandler;
use Monolog\LogRecord;

class DatabaseHandler extends AbstractProcessingHandler
{
    protected function write(LogRecord $record): void
    {
        if (Schema::hasTable('backend_logs')) {
            Log::create([
                'route' => Str::replace('api', '', request()->route()->uri),
                'level' => $record->level,
                'message' => $record->message,
                'logged_at' => $record->datetime,
                'context' => json_encode($record->context),
                'extra' => json_encode($record->extra),
                'created_by' => auth()->user()->id ?? null,
                'updated_by' => auth()->user()->id ?? null
            ]);
        }
    }
}
