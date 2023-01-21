const dom_layout = 
[ 
    {
    layout_orders: 
    // this  one, add 'div' with classlist 'order-items'
        `
        <div class="order-items-wrapper">
            <div class="order-items-pic">
                <img src="" alt="">
            </div>
            <div class="order-items-desc">
                <div class="order-items-desc-head">
                    <h3 class="order-items-name"> </h3>
                    <img class="order-items-remove" src="reso/image/icon/delete.png" alt="">
                </div>
                <div class="order-items-desc-price">
                    <p>Price</p>
                    <span>
                        <p>Rp.</p>
                        <p class="order-items-price">,-</p>
                    </span>
                </div>
                <div class="order-items-desc-qty">
                    <p>Quantity</p>
                    <span>
                        <div class="order-items-qty-minus">-</div>
                        <div class="order-items-qty"><input type="number" class="input-items-qty"></input></div>
                        <div class="order-items-qty-plus">+</div>
                    </span>
                </div>
                <div class="order-items-desc-subtotal">
                    <p>Subtotal</p>
                    <span>
                        <p>Rp.</p>
                        <p class="order-items-subtotal">25.000,-</p>
                    </span>
                </div>
            </div>
        </div>
        `,
    layout_smry:
        //<div class="smry-order">
        `
        <span class="smry-order-name">Pizza Number One</span>
        <span>
            <p><span class="smry-order-qty">2</span>*<span class="smry-order-price">25.000</span></p>
            <p class="smry-order-subtotal">50.000</p>
        </span>
        `
    }
]
const layout_whatsapp_orders = (id, tgl, produk, total, p_nama, p_alamat, p_kota, p_provinsi, p_no) => {
    return `Pemesanan :\n===========\nID - `+id+`\nTGL - `+tgl+`\n\nOrderan :\n===========\n`+get_wa_orderan_list(produk, total)+`\nKepada :\n===========\nNama : `+p_nama+`\nAlamat : `+p_alamat+`\nKota / Provinsi : `+p_kota+` / `+p_provinsi+`\nNo yang dapat dihubungi : `+p_no+`\n===========`
}

function get_wa_orderan_list(data, total) {
    a = ''
    for(var x = 0; x < data.length; x++) {
        a = a+'- '+data[x].qty+'*'+data[x].name+' = '+rp_format(data[x].subtotal)+'\n'
    }
    a = a + 'Total : '+rp_format(total)+'\n'
    return a
}