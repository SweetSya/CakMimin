<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Admin Cak Mimin</title>
    <!-- add icon link -->
    <link rel = "icon" href = "{{ URL::asset('reso/image/logo.jpg') }}" type = "image/x-icon">

    {{-- LINK IMPORT CSS --}}
    @include('addon_components.style')
    <link rel="stylesheet" href="{{ URL::asset('reso/adminpanel/style.css') }}">

</head>
<body>
    {{-- PANEL ADMIN
    {{ session()->get('key_session') }}
    {{ session()->get('user_session') }}

    <a href="{{ url()->current() }}/logout">Logout</a> --}}
    @include('addon_components.toast')

    @include('main_components.order')
    @include('main_components.navbar')

    
    @include('main_components.header', ['arr_header' => $arr_header])
    @include('main_components.newsig', ['arr_newsig' => $arr_newsig])
    @include('main_components.product', ['arr_products' => $arr_products])
    @include('main_components.testi', ['arr_testi'=> $arr_testi, 'arr_gallery'=> $arr_gallery])
    @include('main_components.about', ['arr_about' => $arr_about])
    @include('main_components.footer')
    {{-- LINK IMPORT SCRIPT--}}
    @include('addon_components.script')
    
    <script> const csrf_token = '{{ csrf_token() }}'; </script>
    <script src="{{ URL::asset('reso/adminpanel/script.js') }}"></script>
    
    @if (Session::has('success'))
        <script>
            try {
                toast({title: "Database Dirubah!", message: {!! json_encode(Session::get('success')) !!}, type: "info", duration: 6000 })
                document.querySelector({!! json_encode(Session::get('scroll')) !!}).scrollIntoView()
            } catch(err) {
                console.log(err)
            }
        </script>
    @endif
    @if (Session::has('loggedin'))
    <script>
        try {
            toast({title: "Halo, "+{!! json_encode(session()->get('user_session')) !!}, message: {!! json_encode(Session::get('loggedin')) !!}, type: "info", duration: 6000 })
            document.querySelector({!! json_encode(Session::get('scroll')) !!}).scrollIntoView()
        } catch(err) {
            console.log(err)
        }
    </script>
    @endif
</body>
</html>