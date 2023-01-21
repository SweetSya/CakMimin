//head button click

document.querySelector('.head-btn-1').addEventListener('click', ()=> {
    autoScroll(document.querySelector('.about-container'))
})
document.querySelector('.head-btn-2').addEventListener('click', ()=> {
    autoScroll(document.querySelector('.product-container'))
})

//nav click scrolling
nav_btn = document.querySelectorAll('.navbutton')

const data_navigasi = 
[
    {
        name: ['product','produk'],
        to: 'product',
    },
    {
        name: ['testimoni', 'testimonies'],
        to: 'testimoni'
    },
    {
        name: ['about', 'tentang','mengenai'],
        to: 'about'
    }

]
// object inside is price, name, imgsrc
var data_order = []
var data_total_payment = 0

for(var x = 0; x < nav_btn.length; x++) {
    nav_btn[x].addEventListener('click', (e) => {
        let elem = e.target.textContent.toLowerCase()
        elem = check_data_nav(elem)
        autoScroll(document.querySelector('.'+elem+'-container'))
        if(document.querySelector('.navTrigger').classList.contains('active') && window.width < 769) {
            document.querySelector('.navTrigger').click()
        }
    })
}
function check_data_nav(elem) {
    for(var y = 0; y < data_navigasi.length; y++) {
        if(data_navigasi[y].name.includes(elem)) {
            return data_navigasi[y].to
        }
    }
    return '-'
}
function autoScroll(element) {
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})

}

//product add to cart handling
notif_trolley = document.querySelector('.trolley-notif')
trolley_count = document.querySelector('.trolley-count')
product_add = document.querySelectorAll('.product-add-wrapper')

//Handling item add clicked
for(var x = 0; x < product_add.length; x++) {
    product_add[x].addEventListener('click', (e) => {
        //later, acces data here
        const elem = e.target.closest('.product-add-wrapper')
        const data_current = 
        {
            name: elem.getAttribute('data-product-name'),
            price: elem.getAttribute('data-product-price'),
            imgsrc: elem.getAttribute('data-product-imgsrc'),
            subtotal: elem.getAttribute('data-product-price'),
            qty: 1,
            listener: false
        }
        //dont forget to check if product already in object data
        for(var x = 0; x < data_order.length; x++) {
            if(data_order[x].name === data_current.name) {
                toast({title: "Produk ganda", message: "Produk sudah di dalam keranjang!", type: "warning", duration: 1500 })
                return ''
            }
        }
        data_order.push(data_current)
        //add to view shop cart
        add_orders()
        //dont forget to add count if the product already clicked!
        trolley_recount()
        //Toast
        toast({title: "Produk masuk", message: "Produk dalam keranjang!", type: "success", duration: 1500 })
    })
}
//recounting trolley
function trolley_recount() {
    total_payment()
    document.querySelector('.trolley-wrap').classList.add('animate__animated', 'animate__tada')
    setTimeout(()=> {
        document.querySelector('.trolley-wrap').classList.remove('animate__animated', 'animate__tada')
    },1050)
    if(data_order.length > 0) {
        if(!notif_trolley.classList.contains('trolley-active')) {
            notif_trolley.classList.add('trolley-active')
        }
        trolley_count.textContent = data_order.length
        return ''
    }

    if(notif_trolley.classList.contains('trolley-active') && data_order.length < 1) {
        notif_trolley.classList.remove('trolley-active')
        return ''
    }

    console.error('Something went wrong!')
}
//add items to order view
function add_orders() {
    pos = data_order.length-1

    prt = document.querySelector('.order-content-wrapper')
    
    lyt = document.createElement('div')
    lyt.classList.add('order-items')
    lyt.innerHTML = dom_layout[0].layout_orders

    prt.appendChild(lyt)
    child = prt.lastElementChild
    insert_to_view_cart(child, pos)

    redefine_listener_order()
}

function insert_to_view_cart(child, pos) {
    //add price and subtotal
    child.querySelector('.order-items-price').textContent = rp_format(data_order[pos].price)
    child.querySelector('.order-items-subtotal').textContent = rp_format(data_order[pos].subtotal)
    //add name
    child.querySelector('.order-items-name').textContent = data_order[pos].name    
    //add pic source
    child.querySelector('.order-items-pic').childNodes[1].src = data_order[pos].imgsrc
    //add qty
    child.querySelector('.input-items-qty').value = data_order[pos].qty
}

//trolley or order handling
const order_btn = document.querySelector('.order-button')
const order_cont = document.querySelector('.order-container')
const order_close_btn = document.querySelector('.order-close-btn')
    // hadnling order btn on click
    order_btn.addEventListener('click', ()=> {
        order_cont_click_handling()
    })
    //handling order close on click
    order_close_btn.addEventListener('click', ()=> {
        order_cont_click_handling()
    })
    
function order_cont_click_handling() {
    if(order_cont.classList.contains('order-active')) {
        order_cont.classList.remove('order-active')
        
        return ''
    }
    order_cont.classList.add('order-active')
}
//redefine deleting button and qty on 
function redefine_listener_order() {
    lis =  document.querySelectorAll('.order-items-remove').length-1

    if(data_order[lis].listener) return ''

    //deleting order on btn click
    document.querySelectorAll('.order-items-remove')[lis].addEventListener('click', (e) => {
        remove_orders(e.target.closest('.order-items').querySelector('.order-items-name').textContent)
        e.target.closest('.order-items').classList.add('animate__animated', 'animate__lightSpeedOutLeft', 'animate__faster')
        setTimeout(()=> {
            e.target.closest('.order-items').remove()
        }, 550)
    })
    //func for lstenening add and reduce qty
    document.querySelectorAll('.order-items-qty-plus')[lis].addEventListener('click', (e) => {
        redefine_qty(e, 0)
    })
    document.querySelectorAll('.order-items-qty-minus')[lis].addEventListener('click', (e) => {
        redefine_qty(e, 1)
    })
    document.querySelectorAll('.input-items-qty')[lis].addEventListener('input', (e) => {
        redefine_qty(e, 2)
    })
    data_order[lis].listener = true
}
//redefine quantity
function redefine_qty(e, ind) {
    d_name = e.target.closest('.order-items').querySelector('.order-items-name').textContent
    id = get_data_order_index_by_name(d_name)
    
    elem = e.target.closest('.order-items').querySelector('.input-items-qty')
    
    switch_redefine_qty(elem, ind)

    data_order[id].qty = elem.value

    subtotal_payment(id)
    insert_to_view_cart(document.querySelectorAll('.order-items')[id], id)

    total_payment()
}
function switch_redefine_qty(elem, ind) {
    switch(ind) {
        case 0: //ad more qty
            if(elem.value === '') {
                elem.value = 1
                return ''
            }
            if(elem.value >= 99) {
                return ''
            }
            elem.value = parseInt(elem.value)+1
            break
        case 1: //minus qty
            if(elem.value - 1 === 0) {
                return ''
            }
            elem.value = parseInt(elem.value)-1
            break
        case 2: //changing by typing
            if(elem.value.toString().length > 2) {
                elem.value = 99
                return ''
            }
            break
    }
}
//calc subtotal
function subtotal_payment(lis) {
    data_order[lis].subtotal = parseInt(data_order[lis].qty) * parseInt(data_order[lis].price)
}
//calc total payment
function total_payment() {
    elem = document.querySelector('.order-total')
    total = 0
    for(var x in data_order) {
        total = parseInt(total) + parseInt(data_order[x].subtotal)
    }
    data_total_payment = total
    elem.textContent = rp_format(total)
}

//funnction removing orders
function remove_orders(d_name) {
    x = get_data_order_index_by_name(d_name)
    data_order.splice(x, 1)
    trolley_recount()
}

//Text Format Rupiah
function rp_format(angka) {
    var number_string = angka.toString(),
	split   		= number_string.split(','),
	sisa     		= split[0].length % 3,
	rupiah     		= split[0].substr(0, sisa),
	ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
 
	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if(ribuan){
		separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}
 
	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return rupiah+',-';
}

function get_data_order_index_by_name(d_name) {
    for(var x in data_order) {
        if(data_order[x].name === d_name) {
            return x
        }
    }
}


const order_clear = document.querySelector('.order-clear')
const order_now = document.querySelector('.order-now')
order_clear.addEventListener('click', () => {
    clear_cart()
})

//Listener when first order now click
order_now.addEventListener('click', (e) => {
    if(data_order.length < 1) { //Jika tidak terdapat produk pada array
        toast({title: "Keranjang kosong", message: "Tidak ada produk dalam keranjang!", type: "error", duration: 1500 })
        return ''
    }
    e.target.closest('.order-wrapper').classList.remove('detail-order-active')
    document.querySelector('.detail-order-wrapper').classList.add('detail-order-active')

    document.querySelector('.smry-order-total').textContent = rp_format(data_total_payment)
    document.querySelector('.smry-order-code').textContent = generate_invoice_code(14)
    document.querySelector('.smry-order-date').textContent = generate_current_date()
    
    parent = document.querySelector('.order-summary-content')
    parent.innerHTML = ''

    for(var x = 0; x < data_order.length; x++) {
        vsmry = document.createElement('div')
        vsmry.innerHTML = dom_layout[0].layout_smry
        vsmry.classList.add('smry-order')

        parent.appendChild(vsmry)
        child = parent.lastElementChild

        insert_to_view_smry(child, x)
    }

    disable_container()
})
function insert_to_view_smry(child, pos) {
    //add price and subtotal
    child.querySelector('.smry-order-price').textContent = rp_format(data_order[pos].price)
    child.querySelector('.smry-order-subtotal').textContent = rp_format(data_order[pos].subtotal)
    //add name
    child.querySelector('.smry-order-name').textContent = data_order[pos].name    
    //add qty
    child.querySelector('.smry-order-qty').textContent = data_order[pos].qty
}
//to clear shopping cart
function clear_cart() {
    elem_exit = document.querySelectorAll('.order-items-remove')
    for(var x = 0; x < elem_exit.length; x++) {
        elem_exit[x].click()
    }
}

//Listener when order summary are clicked
const smry_order_now = document.querySelector('.smry-order-now')
const smry_order_cancel = document.querySelector('.smry-order-cancel')

smry_order_cancel.addEventListener('click', (e) => {
    e.target.closest('.detail-order-wrapper').classList.remove('detail-order-active')
    document.querySelector('.order-wrapper').classList.add('detail-order-active')
    disable_container()
})
smry_order_now.addEventListener('click', (e) => {
    //check if any input empty except kota / provinsi (2/3)
    if(check_input_checkout(document.querySelectorAll('.detail-order-buyer input'))) {
        elem = document.querySelectorAll('.detail-order-buyer input')
        code = document.querySelector('.smry-order-code').textContent
        date = document.querySelector('.smry-order-date').textContent

        const msg = encodeURI(layout_whatsapp_orders(code, date, data_order, data_total_payment, elem[0].value, elem[1].value, elem[2].value, elem[3].value, elem[4].value))
        window.open('https://wa.me/6289512336000?text='+msg)
        
        toast({title: "Mengarahkan!", message: "Data diproses, silahkan melanjutkan di wahtsapp!", type: "info", duration: 15000 })
        smry_order_cancel.click();
        clear_cart();
        order_close_btn.click();
        return ''
    }
    toast({title: "Kesalahan data", message: "Terjadi kesalahan pada proscek data!", type: "error", duration: 1500 })
    return ''
})
function check_input_checkout(elem) {
    var regex = new RegExp("^[a-zA-Z]+[a-zA-Z0-9, ]+$")
    if(regex.test(elem[0].value) && regex.test(elem[1].value)) {
        return true
    }
    return false
}
//disable and enable container when order are on proccess
function disable_container() {
    ct = document.querySelectorAll('.container')
    for(var x = 0; x < ct.length; x++) {
        ct[x].classList.toggle('dis-container')
    }
    document.body.classList.toggle('dis-body')
}

function generate_invoice_code(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function generate_current_date() {
    return new Date().toLocaleString()
}