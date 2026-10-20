<?php
namespace App\Http\Middleware;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
class ApiToken
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        $user = $token ? User::where('api_token_hash', hash('sha256', $token))
            ->where('api_token_expires_at', '>', now())->first() : null;
        if (!$user) return response()->json(['message' => 'Sessão inválida ou expirada. Entre novamente.'], 401);
        $request->setUserResolver(fn () => $user);
        return $next($request);
    }
}
