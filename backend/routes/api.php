<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NoteController;

Route::get('/health', function () {
    try {
        DB::connection()->getPdo();
        return response()->json(['data' => ['db' => 'ok'], 'message' => null, 'errors' => null]);
    } catch (\Throwable) {
        return response()->json(['data' => ['db' => 'fail'], 'message' => null, 'errors' => null], 500);
    }
});

Route::apiResource('notes', NoteController::class);
