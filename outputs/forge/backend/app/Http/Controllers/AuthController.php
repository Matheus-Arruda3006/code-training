<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
class AuthController
{
    public function register(Request $request)
    {
        $request->merge(['email' => strtolower(trim((string) $request->input('email')))]);
        $data = $request->validate([
            'name' => 'required|string|max:80', 'email' => 'required|email|max:254|unique:users',
            'password' => 'required|string|min:10|max:128',
        ]);
        return response()->json($this->session(User::create($data)), 201);
    }
    public function login(Request $request)
    {
        $data = $request->validate(['email' => 'required|email', 'password' => 'required|string']);
        $user = User::where('email', strtolower(trim($data['email'])))->first();
        if (!$user || !Hash::check($data['password'], $user->password))
            return response()->json(['message' => 'E-mail ou senha incorretos.'], 401);
        return response()->json($this->session($user));
    }
    private function session(User $user): array
    {
        $token = Str::random(80);
        $user->forceFill(['api_token_hash' => hash('sha256', $token), 'api_token_expires_at' => now()->addDays(30)])->save();
        return ['token' => $token, 'user' => $user->only('id', 'name', 'email')];
    }
    public function logout(Request $request)
    {
        $request->user()->forceFill(['api_token_hash' => null, 'api_token_expires_at' => null])->save();
        return response()->json(['message' => 'Sessão encerrada.']);
    }
}
