<?php
namespace App\Providers;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Cache\RateLimiting\Limit;
class AppServiceProvider extends ServiceProvider
{
    public function boot(): void
    {
        RateLimiter::for('api', fn ($request) => Limit::perMinute(120)->by($request->ip()));
        RateLimiter::for('credentials', fn ($request) => Limit::perMinute(6)->by($request->ip()));
    }
}
