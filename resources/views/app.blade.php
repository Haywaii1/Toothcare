<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React in Laravel</title>

    <!-- Vite setup for React -->
    @viteReactRefresh
    @vite(['resources/js/app.jsx'])

    <!-- CSRF Token for API requests -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>
<body>
    <div id="app"></div> <!-- React will mount here -->
</body>
</html>
