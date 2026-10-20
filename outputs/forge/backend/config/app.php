<?php
return ['name' => 'Forge API', 'env' => env('APP_ENV', 'production'), 'debug' => (bool) env('APP_DEBUG', false),
    'url' => env('APP_URL', 'http://localhost:8000'), 'timezone' => 'UTC', 'locale' => 'pt_BR',
    'fallback_locale' => 'en', 'key' => env('APP_KEY'), 'cipher' => 'AES-256-CBC'];
