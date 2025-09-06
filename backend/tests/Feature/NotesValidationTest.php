<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class NotesValidationTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function store_requires_title(): void
    {
        $response = $this->postJson('/api/notes', ['content' => 'x']);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title']);
    }
}
