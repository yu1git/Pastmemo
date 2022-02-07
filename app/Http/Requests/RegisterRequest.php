<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;
use Symfony\Component\HttpFoundation\Response;


class RegisterRequest extends FormRequest {
    public function authorize() {
        //$message = "1RegisterRequestのauthorizeまできた";
        //dd($message);
        return true;
    }

    public function rules() {
        $message = "2RegisterRequestのrulesまできた";
        dd($message);
        return [
            'name'    => 'required|string|max:255',
            'email'    => 'required|string|email:strict,dns,spoof|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ];
    }

    protected function failedValidation(Validator $validator) {
        $message = "RegisterRequestのfailedValidationまできた";
        dd($message,$validator);
        $res = response()->json([
            'status' => Response::HTTP_BAD_REQUEST,
            'errors' => $validator->errors(),
        ], Response::HTTP_BAD_REQUEST);
        throw new HttpResponseException($res);
    }

}