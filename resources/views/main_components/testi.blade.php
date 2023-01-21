<!-- TESTIMONI SECTION + GALLERY -->
<div class="container testimoni-container">
    <div class="testi-wrapper-container">
        <div claas="testi-wrapper-header">
            <div class="testi-header-inner">
                <h1 class="testi-header"><span class="txt-color-1">Testimoni</span> Produk</h1>
                <p>Apa pendapat mereka tentang produk kami?</p>
            </div>
        </div>
        <div class="gallery-wrapper-content">
            <main class="gallery gallery__content--flow">
                
                @foreach ( $arr_gallery as $data)
                    <figure class="gallery-img" data-id-gallery="{{ $data->gallery_id }}">
                        <img src="{{ URL::asset($data->gallery_img) }}">
                        <figcaption class="header__caption" role="presentation">
                            <h1 class="title title--primary">{{ $data->gallery_title_primary }}</h1>
                            <h2 class="title title--secondary">{{ $data->gallery_title_secondary }}</h2>
                        </figcaption>
                    </figure>
                @endforeach
        
            </main>
        </div>
        <div class="testi-wrapper-content">
            <div class="testi-content-inner">
                <div class="testi-upper-wrapper">
                    <!-- TESTI CARD -->
                    
                    <?php $x = 0 ?>
                    @foreach ($arr_testi as $data)
                        @if ($x == 0)
                            <div class="testi-outer-gap testi-active">
                        @else
                            <div class="testi-outer-gap">
                        @endif
                            <div class="testi-card-wrapper" data-id-testi="{{ $data->testimoni_id }}">
                                <div class="testi-card-quote">
                                    <img class="testi-quote" src="{{ URL::asset('reso/image/icon/quote.png') }}" alt="">
                                </div>
                                <div class="testi-card-text">
                                    <p class="testi-text"> {{ $data->testimoni_kalimat }}</p>
                                </div>
                                <div class="testi-card-picture">
                                    <div class="testi-picture">
                                        <img class="testi-inner-pic" src="{{ URL::asset($data->testimoni_gambar) }}" alt="">
                                    </div>
                                    <div class="testi-picture-behind">
                                        
                                    </div>
                                </div>
                                <div class="testi-card-name">
                                <p class="testi-name">{{ $data->testimoni_nama }}</p>
                                </div>
                            </div>
                        </div>
                        <?php $x++ ?>
                    @endforeach
                    
                </div>
                <div class="testi-lower-wrapper">
                    <ul>
                        <li data-click="0" class="navi-testi-btn navi-testi-active"></li>
                        <li data-click="1" class="navi-testi-btn"></li>
                        <li data-click="2" class="navi-testi-btn"></li>
                        <li data-click="3" class="navi-testi-btn"></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>