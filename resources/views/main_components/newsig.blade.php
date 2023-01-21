<!-- NEWSIG SECTION -->
<div class="container newsig-container">
    <div class="wrapper-newsig-content">
        <div class="wrapper-newsig-left">
            <div class="newsig-img-wrapper">
                <img src="{{asset('reso/image/background/newsig1-background.png')}}" alt="">
            </div>
        </div>
        <div class="wrapper-newsig-right">
            <div class="newsig-header">
                <div class="newsig-h1">
                    <h1><span class="txt-color-1">Instagram</span> news feed</h1>
                </div>
                <div class="newsig-p">
                    <p>Kabar terbaru dari laman Instagram kami</p>
                </div>
            </div>
            <div class="newsig-wrapper-content">
                 <!-- GENERATED FROM NEWSIG JS LATER -->
                <div class="newsig-inner-content-wrapper">
                    
                    @for ($x = 0; $x < count($arr_newsig); $x++)
                        <div class="newsig-content" data-newsig-id="{{ $arr_newsig[$x]->newsig_id }}">
                            {!!  $arr_newsig[$x]->url_ig  !!}
                        </div> 
                    @endfor
                    
                </div>
            </div>
        </div>
    </div>
</div>