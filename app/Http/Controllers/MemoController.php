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
        // $memos = Memo::all();
        // return $memos;
        if ($request->ajax()) {
            $memos =  Memo::all();
            return response()->json(['memos' => $memos]);
        } else {
            return view('memos.memoList');
        }
    }

    /**
     * Store a newly created resource in storage.
     * メモ新規作成
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $memo = new Memo();
        // $memo->fill($request->all())->save();
        Memo::create([
            'content'=>$request->content,
            'user_id'=>$request->user_id,
        ]);
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
