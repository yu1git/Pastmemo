<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Memo extends Model
{
    //Mass Assignment（割り当て許可）の設定：$guarded(保護)は複数代入禁止項目の設定:それぞれが独立して格納されなくてはいけない値
    protected $guarded = ['id'];

    // 一つのユーザーを持つリレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // tagとの中間テーブルを持つ
    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }
}
