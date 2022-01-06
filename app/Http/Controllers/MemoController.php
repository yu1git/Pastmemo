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
        $memos = Memo::all();
        return $memos;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $memo = new Memo();
        $memo->fill($request->all())->save();
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
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $update = Memo::find($id);
        // $update->title = $request->title;
        // $update->content = $request->content;
        // $update->save();
        // return redirect("api/memos/".$id);
        $updateMemo = [
            //'memo_id'=>$request->memo_id,
            'title'=>$request->title,
            'content'=>$request->content
        ];
        Memo::where('id', $id)->update($updateMemo);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        // $memo = Memo::find($id);
        // $memo->delete();
        // return redirect('api/memos');
        Memo::where('id', $id)->delete();
    }

    // public function __construct()
    // {
    //     // 認証が必要
    //     $this->middleware('auth');
    // }

    /**
     * メモ新規作成
     * @param CreateMemoRequest $request
     * @return \Illuminate\Http\Response
     */
    // public function create(CreateMemoRequest $request)
    // {
    //     //$this->validate($request, Memo::$rules);

    // }

    /**
     * バリデーション
     */
    public function register(Request $request)
    {
        //
    }

}
