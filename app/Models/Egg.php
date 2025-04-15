<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Egg extends Model
{
    protected $table = 'egg';

    protected $fillable = ['user_id', 'temperature', 'love', 'first_stage','second_stage' ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
