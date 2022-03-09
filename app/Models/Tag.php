<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    // memoとの中間テーブルを持つ
    public function memos(): BelongsToMany
    {
        return $this->belongsToMany(Memo::class);
    }

}
