<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="Sauki Shop">
        <meta name="author" content="RNA">
        <meta name="keyword" content="Laravel,Vite,React,MUI,Coreui">

        <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('/vite.svg') }}">
        <link rel="icon" type="image/png" sizes="32x32" href="{{ asset('/vite.svg') }}">
        <link rel="icon" type="image/png" sizes="16x16" href="{{ asset('/vite.svg') }}">
        <link rel="icon" type="image/x-icon" href="{{ asset('/vite.svg') }}" />
        <link rel="manifest" href="{{ asset('/build/manifest.json') }}">

        <title>{{ config('app.name') }}</title>

        <style type="text/css">
            .table {
                border-collapse: collapse;
                font-family: Calibri, Helvetica, sans-serif;
                width: 100%;
            }

            .table th,
            .table td, {
                border: 1px solid #000;
                padding: 3px 4px;
            }
        </style>
    </head>
    <body>
        @yield('content')
    </body>
</html>
