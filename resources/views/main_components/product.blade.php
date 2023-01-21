<!-- PRODUCT SECTION -->
<div class="container product-container">
    <div class="wrapper-product-content">
        <div class="wrapper-product-header">
            <h1>
                <span class="txt-color-1">Produk</span> Kami
            </h1>
            <p>
                Rasa yang diciptakan dengan sepenuh hati !
            </p>
        </div>
        <div class="wrapper-product-group">
            <div class="product-wrapper-inner">
                <div class="product-arrow-left product-arrow-layout">
                    <img class="product-arrow-img" src="{{ URL::asset('reso/image/icon/left.png') }}" alt="">
                </div>
                <div class="product-arrow-right product-arrow-layout">
                    <img class="product-arrow-img" src="{{ URL::asset('reso/image/icon/right.png') }}" alt="">
                </div>
                <div class="product-group">
                    <!-- CARD PRODUCT (WILL BE ADDED WITH JAVASCRIPT TOO)-->
                    
                    @foreach ($arr_products as $data)

                        <div class="product-group-inner prod-active">
                            <div class="wrapper-product" style="background-image: url('{{URL::asset($data->product_img_src)}}');">
                                <div class="product-top">
                                    <div data-product-satuan="{{ $data->product_satuan }}" data-product-imgsrc="{{ $data->product_img_src }}" data-product-price="{{ $data->product_harga }}" data-product-name="{{ $data->product_nama }}" class="product-add-wrapper">
                                        <span class="cart-icon"><img src="{{URL::asset('reso/image/icon/cart.png')}}" alt=""></span>
                                        <span class="cart-text">Add to cart</span>
                                    </div>
                                </div>
                                <div class="product-desc">
                                    <div class="product-price">
                                        Rp. {{ $data->product_harga }}.-/{{ $data->product_satuan }}
                                    </div>
                                    <div class="product-name">
                                        {{ $data->product_nama }}
                                    </div>
                                    <div class="product-detail">
                                        {{ $data->product_detail }}
                                    </div>
                                </div>
                            </div>
                        </div>

                    @endforeach

                </div>
            </div>
        </div>
    </div>
</div>