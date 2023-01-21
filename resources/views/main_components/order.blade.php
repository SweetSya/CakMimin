<!-- TROLLEY PAGE(ORDER PAGE) -->
<div class="order-container">
    <!-- DETIL ORDERS -->
    <div class="detail-order-wrapper">
        <div class="detail-order-header">
            <div class="order-header-wrapper">
                <h1>Detail Order</h1>
            </div>
        </div>
        <div class="detail-order-content">
            <div class="detail-order-content-wrapper">
                <div class="detail-order-buyer-wrapper">
                    <div class="detail-order-buyer">
                        <input placeholder="Nama" type="text">
                        <input placeholder="Alamat" type="text">
                        <input placeholder="Kota" type="text">
                        <input placeholder="Provinsi" type="text">
                        <input placeholder="No yang dapat dihubungi" type="text">
                        <p>*After click order, please wait for the the web redirecting you to the seller’s for buying process </p>
                    </div>
                    <div class="detail-order-btn">
                        <button class="smry-order-cancel">Cancel</button>
                        <button class="smry-order-now">Order Now</button>
                    </div>
                </div>
                <div class="detail-order-summary">
                    <div class="detail-order-summary-wrapper">
                        <div class="order-summary-header">
                            <h3>Summary<br>Order</h3>
                            <span>
                                <p class="smry-order-code"></p>
                                <p class="smry-order-date"></p>
                            </span>
                        </div>
                        <div class="order-summary-content">
                            <!-- ORDER SMRY BOX -->
                            <!-- <div class="smry-order">
                                <span class="smry-order-name">Pizza Number One</span>
                                <span>
                                    <p><span class="smry-order-qty">2</span>*<span class="smry-order-price">25.000</span></p>
                                    <p class="smry-order-subtotal">50.000</p>
                                </span>
                            </div> -->
                            
                        </div>
                        <div class="order-summary-footer">
                            <h3>Total</h3>
                            <span>
                                <p>Rp.</p>
                                <p class="smry-order-total">0</p>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- ORDERS -->
    <div class="order-wrapper detail-order-active">
        <div class="order-header">
            <div class="order-header-wrapper">
                <h1>Shopping Cart</h1>
                <div class="order-close-btn">
                    <img src="{{ URL::asset('reso/image/icon/back-cart.png') }}" alt="">
                </div>
            </div>
        </div>
        <div class="order-content">
            <div class="order-content-wrapper">
                {{-- Ordered Items Will be here --}}
            </div>
        </div>
        <div class="order-footer">
            <div>
                <p>Total</p>
                <span>
                    <p>Rp.</p>
                    <p class="order-total">0,-</p>
                </span>
            </div>
            <div>
                <button class="order-clear">Clear Basket</button>
                <button class="order-now">Order Now</button>
            </div>
        </div>
    </div>
</div>