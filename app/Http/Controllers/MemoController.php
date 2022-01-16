<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Memo;
use App\Http\Requests\CreateMemoRequest;

class MemoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // ログインユーザーのmemoのみを取り出す
        $memos = Auth::user()->memos;
        return $memos;
    }

    /**
     * Store a newly created resource in storage.
     * メモ新規作成
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $memo = new Memo();
        // ログインユーザーのidと紐付ける
        $memo->user_id = auth()->id();
        $memo->title = $request->title;
        $memo->content = $request->content;
        $memo->save();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $memo = Memo::find($id);
        return $memo;
    }

    /**
     * Update the specified resource in storage.
     * メモ更新
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $updateMemo = [
            'title'=>$request->title,
            'content'=>$request->content
        ];
        Memo::where('id', $id)->update($updateMemo);
    }

    /**
     * Remove the specified resource from storage.
     * メモ削除
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Memo::where('id', $id)->delete();
    }

    // public function __construct()
    // {
    //     // 認証が必要
    //     $this->middleware('auth');
    // }

}
