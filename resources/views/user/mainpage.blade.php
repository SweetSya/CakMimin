<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Cak Mimin</title>
     <!-- add icon link -->
     <link rel = "icon" href = "{{ URL::asset('reso/image/logo.jpg') }}" type = "image/x-icon">

    {{-- LINK IMPORT CSS --}}
    @include('addon_components.style')

</head>
<body>
    @include('addon_components.toast')

    @include('main_components.order')
    @include('main_components.navbar')

    
    @include('main_components.header', ['arr_header' => $arr_header])
    @include('main_components.newsig', ['arr_newsig' => $arr_newsig])
    @include('main_components.product', ['arr_products' => $arr_products])
    @include('main_components.testi', ['arr_testi' => $arr_testi, 'arr_gallery'=> $arr_gallery])
    @include('main_components.about', ['arr_about' => $arr_about])
    @include('main_components.footer')
    {{-- LINK IMPORT SCRIPT--}}
    @include('addon_components.script')
</body>
</html>