<div class="container about-container">
    <div class="wrapper-about-content">
        <div class="wrapper-about-upper-content">
            <div class="about-upper-content">
                <div class="about-badge-wrapper">
                    <div class="about-badge-icon">
                        <img src="{{ URL::asset('reso/image/badge/badge1.png') }}" alt="">
                    </div>
                    <div class="about-badge-text">
                        <div class="about-badge-h1">
                            <h1>Original Recipe</h1>
                        </div>
                        <div class="about-badge-p">
                            <p>Diracik dengan resep yang istimewa dan sepenuh hati</p>
                        </div>
                    </div>
                </div>
                <div class="about-badge-wrapper">
                    <div class="about-badge-icon">
                        <img src="{{ URL::asset('reso/image/badge/badge2.png') }}" alt="">
                    </div>
                    <div class="about-badge-text">
                        <div class="about-badge-h1">
                            <h1>Bersertifikasi</h1>
                        </div>
                        <div class="about-badge-p">
                            <p>Telah memiliki sertifikasi NIB, CPPOB Risiko Rendah, CPPOB Risiko Sedang</p>
                        </div>
                    </div>
                </div>
                <div class="about-badge-wrapper">
                    <div class="about-badge-icon">
                        <img src="{{ URL::asset('reso/image/badge/badge3.png') }}" alt="">
                    </div>
                    <div class="about-badge-text">
                        <div class="about-badge-h1">
                            <h1>Halal MUI</h1>
                        </div>
                        <div class="about-badge-p">
                            <p>Telah memiliki sertifikasi dan dinyatakan Halal oleh MUI</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrapper-about-lower-content">
            <div class="about-lower-content">
                <div class="about-lower-story">
                    <div class="about-lower-story-head">
                        <h1>{{ $arr_about[0]->about_text }}</h1>
                    </div>
                    <div class="about-lower-story-content">
                       <p> {{ $arr_about[1]->about_text }} </p>
                    </div>
                    <div class="about-lower-quote1">
                        <img src="{{ URL::asset('reso/image/icon/quote.png') }}" alt="">
                    </div>
                    <div class="about-lower-quote2">
                        <img src="{{ URL::asset('reso/image/icon/quote.png') }}" alt="">
                    </div>
                </div>
                <div class="about-lower-more">
                    <div class="about-lower-more-icon">
                        <div class="lower-more-icon">
                            <img src="{{ URL::asset('reso/image/icon/chat.png') }}" alt="">
                        </div>
                        <div class="lower-more-text">
                            <span><h3>Write Us</h3></span>
                            <span><p>{{ $arr_about[2]->about_text }}</p></span>
                        </div>  
                    </div>
                    <div class="about-lower-more-icon">
                        <div class="lower-more-icon">
                            <img src="{{ URL::asset('reso/image/icon/addres.png') }}" alt="">
                        </div>
                        <div class="lower-more-text">
                            <span><h3>Visit Us</h3></span>
                            <span><p>{{ $arr_about[3]->about_text }}</p></span>
                        </div>
                    </div>
                    <div class="about-lower-more-icon">
                        <div class="lower-more-icon">
                            <img src="{{ URL::asset('reso/image/icon/telp.png') }}" alt="">
                        </div>
                        <div class="lower-more-text">
                            <span><h3>Call Us</h3></span>
                            <span><p>{{ $arr_about[4]->about_text }}</p></span>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>