<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Memo extends Model
{
    protected $guarded = ['id'];

    public function parentMemo()
    {
        return $this->hasOne(Memo::class, 'id', 'parent_id');
    }
}
