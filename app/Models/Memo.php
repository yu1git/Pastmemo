<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Memo extends Model
{
    //protected $guarded = ['id'];

    //Mass Assignment（割り当て許可）の設定
    protected $fillable =
    [
        'user_id',
    ];

    // 一つのユーザーを持つリレーション
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    // 保存時にログインユーザーのidをuser_idに保存する
    // protected static function boot()
    // {
    //     parent::boot();

    //     // 保存時user_idをログインユーザーに設定
    //     self::saving(function($memo) {
    //         $memo->user_id = \Auth::id();
    //     });
    // }
}
