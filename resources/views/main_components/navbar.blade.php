<!-- NAVIGATION BAR -->
<nav class="nav">
    <div class="nav-container">
        <div class="logo">
            <a class="navhome"><img src="{{ asset('reso/image/logo.jpg') }}" alt="" style="width: auto; height: 35px;">Cak Mimin</a>
        </div>
        <div class="main-nav-wrapper">
            <!-- TROLLEY -->
            <div class="trolley">
                <div class="trolley-wrap order-button">
                    <div class="trolley-notif">
                        <p class="trolley-count">0</p>
                    </div>
                    <img class="trolley-img" src="{{ URL::asset('reso/image/icon/shopping.png') }}" alt="">
                </div>
            </div>
            <div id="mainListDiv" class="main_list">
                <ul class="navlinks">
                    <li><a class="navbutton">Product</a></li>
                    <li><a class="navbutton">Testimoni</a></li>
                    <li><a class="navbutton">About</a></li>
                </ul>
            </div>  
            <span class="navTrigger">
                <i class="navTrigger-i"></i>
                <i class="navTrigger-i"></i>
                <i class="navTrigger-i"></i>
            </span>
        </div>
    </div>
</nav>