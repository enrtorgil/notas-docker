<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\NoteRequest;
use App\Http\Resources\NoteResource;
use App\Models\Note;
use Illuminate\Http\Request;

class NoteController extends Controller
{
    // GET /api/notes?q=
    public function index(Request $request)
    {
        $q = $request->string('q')->toString();

        $notes = Note::when($q, fn($qb) => $qb->where('title', 'like', "%{$q}%"))
            ->orderByDesc('created_at')
            ->paginate(10);

        return response()->json([
            'data' => [
                'items' => NoteResource::collection($notes->items()),
                'pagination' => [
                    'current_page' => $notes->currentPage(),
                    'last_page'    => $notes->lastPage(),
                    'per_page'     => $notes->perPage(),
                    'total'        => $notes->total(),
                    'has_more'     => $notes->hasMorePages(),
                ],
            ],
            'message' => null,
            'errors'  => null,
        ]);
    }

    // POST /api/notes
    public function store(NoteRequest $request)
    {
        $note = Note::create($request->validated());

        return response()->json([
            'data'    => new NoteResource($note),
            'message' => null,
            'errors'  => null,
        ], 201);
    }

    // GET /api/notes/{note}
    public function show(Note $note)
    {
        return response()->json([
            'data'    => new NoteResource($note),
            'message' => null,
            'errors'  => null,
        ]);
    }

    // PUT /api/notes/{note}
    public function update(NoteRequest $request, Note $note)
    {
        $note->update($request->validated());

        return response()->json([
            'data'    => new NoteResource($note),
            'message' => null,
            'errors'  => null,
        ]);
    }

    // DELETE /api/notes/{note}
    public function destroy(Note $note)
    {
        $note->delete();

        return response()->json([
            'data'    => true,
            'message' => null,
            'errors'  => null,
        ]);
    }
}
