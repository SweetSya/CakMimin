<!-- HEADER SECTION -->
<div class="container header-container">
    <div class="wrapper-head-content">
        <div class="wrapper-head-content-left">
            <div class="head-h1-content">
                {{-- A <span class="txt-color-1">good</span> product were created with <span class="txt-color-1">love</span> --}}
                <h1>{!! $arr_header[0]->header_content !!}</h1>
            </div>
            <div class="head-p-content">
                <p>{{ $arr_header[1]->header_content }}</p>
            </div>
        </div>
        <div class="wrapper-head-content-btn">
            <div class="head-btn-content btn">
                <button class="head-btn-1">Learn More</button>
                <button class="head-btn-2">
                    Order Now
                    <img src="{{ URL::asset('reso/image/icon/keranjang.png') }}" alt="">
                </button>
            </div>
        </div>
        <div class="wrapper-head-content-right">
            <div class="wrapper-head-pic">
                <div class="head-pic">
                    <img src="{{ URL::asset($arr_header[2]->header_content) }}" alt="">
                </div>
            </div>
        </div>
    </div>
</div>