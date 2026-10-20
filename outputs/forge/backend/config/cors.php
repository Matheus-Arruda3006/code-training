<?php
return ['paths' => ['api/*'], 'allowed_methods' => ['GET','POST','PUT','OPTIONS'],
    'allowed_origins' => array_filter(array_map('trim', explode(',', env('FRONTEND_ORIGINS', 'http://localhost:5173,http://127.0.0.1:5173')))),
    'allowed_origins_patterns' => [], 'allowed_headers' => ['Content-Type','Accept','Authorization'],
    'exposed_headers' => [], 'max_age' => 3600, 'supports_credentials' => false];
