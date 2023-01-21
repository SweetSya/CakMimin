
//Disable Nav
document.querySelector('.nav').style.cssText = 'display : none;'

//disable cart view
function disable_add_to_cart() {
    cart_add = document.querySelector('.product-container').querySelectorAll('.product-top') 
    for(var x = 0; x < cart_add.length; x++) {
        cart_add[x].children[0].classList.add('disable-component')
    }
}
document.querySelector('.detail-order-active').classList.remove('detail-order-active')
disable_add_to_cart()
//LOGIC EDIT BTN FOR ALL
allContainer = document.querySelectorAll('.container')

//Global Variabel
prod_to_delete = []
newsig_to_delete = []

const admin_url_img = 'reso/adminpanel/img'
const pub_url_img = 'reso/image/icon'

const editLayout =
{
    //for all [0]
    edit_btn: () => {
        let rt = document.createElement('div')
            rt.innerHTML =
                        `
                            <div>
                                <img src="`+admin_url_img+`/edit-pencil.png" alt="">
                            </div>
                        `
            rt.classList.add('edit-btn')
            rt.onclick = (e) => {
                editTools(e)
            }
        return rt
    },
    //EDIT PRODUCT
    edit_product: () => {
        main_elem = document.querySelector('.product-container')
            //if there is insert more already, then execute exit or remocing edit tools!
            if(main_elem.querySelector('.prod-insert-more')) {
                product_RemoveEdit(main_elem)
                group_product_sizing()
                return ''
            }
        current_data = main_elem.querySelectorAll('.product-top')
        edit_data_price = main_elem.querySelectorAll('.product-price')
        edit_data_detail = main_elem.querySelectorAll('.product-detail')

            for(var x = 0; x < current_data.length; x++) {
                current_data[x].innerHTML =  current_data[x].innerHTML + `
                    <div data-product-name="`+current_data[x].children[0].getAttribute('data-product-name')+`" class="product-add-wrapper product-remove">
                        <span class="cart-icon"><img src="`+admin_url_img+`/remove.png" alt=""></span>
                        <span class="cart-text">Remove</span>
                    </div>
                    <div data-product-id="PROD-`+x+`" data-product-name="`+current_data[x].children[0].getAttribute('data-product-name')+`" data-product-imgsrc="`+current_data[x].children[0].getAttribute('data-product-imgsrc')+`" data-product-satuan="`+current_data[x].children[0].getAttribute('data-product-satuan')+`" data-product-price="`+current_data[x].children[0].getAttribute('data-product-price')+`" data-product-detail="`+edit_data_detail[x].innerText+`"class="product-add-wrapper product-edit">
                        <span class="cart-icon"><img src="`+admin_url_img+`/edit.png" alt=""></span>
                        <span class="cart-text">Edit</span>
                    </div>
                `
                current_data[x].children[1].onclick = (e) => {
                    prod_name = e.target.closest('.product-remove').getAttribute('data-product-name')

                    if(prod_to_delete.includes(prod_name)) {
                        e.target.closest('.product-remove').classList.remove('prod-delete')
                        prod_to_delete.splice(prod_to_delete.indexOf(prod_name), 1)
                    } else {
                        e.target.closest('.product-remove').classList.add('prod-delete')
                        prod_to_delete.push(prod_name)
                    }

                    setProductDeleteButton()
                    group_product_sizing()
                    
                }
                current_data[x].children[2].onclick = (e) => {
                    p_id = e.target.closest('.product-edit').getAttribute('data-product-id')
                    p_name = e.target.closest('.product-edit').getAttribute('data-product-name')
                    p_price = e.target.closest('.product-edit').getAttribute('data-product-price')
                    p_imgsrc = e.target.closest('.product-edit').getAttribute('data-product-imgsrc')
                    p_detail = e.target.closest('.product-edit').getAttribute('data-product-detail')
                    p_satuan = e.target.closest('.product-edit').getAttribute('data-product-satuan')
                    createProductModal_edit(p_name, p_price, p_imgsrc, p_detail, p_satuan, p_id)
                }
            }

        if(main_elem.querySelector('.prod-active')) {
            main_elem.querySelector('.prod-active').classList.remove('prod-active')
        }

        p_add_elem = document.querySelector('.product-group')
            p_add_child = document.createElement('div')
            p_add_child.classList.add('product-group-inner', 'prod-active')
            p_add_child.innerHTML = `
                <div class="wrapper-product prod-insert-more">
                    <img src="`+admin_url_img+`/add.png" alt="">
                </div>
            `
            p_add_child.onclick = () => {
                createProductModal_add("PROD-"+current_data.length)
            }

        p_add_elem.insertBefore(p_add_child, p_add_elem.firstChild)
        
        group_product_sizing()
    },
    //EDIT NEWS IG
    edit_newsig: () => {
        main_elem = document.querySelector('.newsig-container')

        if(main_elem.querySelector('.newsig-update-wrapper')) {
            main_elem.querySelector('.newsig-update-wrapper').remove()
            main_elem.querySelector('.newsig-wrapper-content').classList.remove('disable-newsig')
            return ''
        }
        main_elem.querySelector('.newsig-wrapper-content').classList.add('disable-newsig')

        child = document.createElement('span')
        child.innerHTML = '<img src="'+admin_url_img+'/edit-pencil.png" alt="" class="newsig-update">'
        child.classList.add('newsig-update-wrapper')
        child.onclick = () => {
            data = main_elem.querySelectorAll('.newsig-content')
            createNewsigModal_edit(data)
        }
        main_elem.querySelector('.newsig-header').appendChild(child)
    },
    //EDIT TESTIMONI DAN GALLERY
    edit_testi_gallery: () => {
        // Testimoni
        main_elem = document.querySelector('.testimoni-container')
        sec_elem = document.querySelector('.gallery-wrapper-content')
        if(prepareTestimoniEdit(main_elem)) {
            prepareGalleryEdit(sec_elem)
            // Deactive
            return ''
        }
        prepareGalleryEdit(sec_elem)
        // Active
        AboutCreateForm()
       
    },
    //EDIT ABOUT
    edit_about: () => {
        main_elem = document.querySelector('.about-container')
        sec_elem = document.querySelector('.wrapper-about-lower-content')
        third_elem = document.querySelector('.wrapper-about-upper-content')

        if(prepareAboutEdit(main_elem)) {
            //if its activated

            return ''
        }
        //if edit deactivated
        AboutCreateForm(main_elem)
    },
    //EDIT HEADER
    edit_header: () => {
        main_elem = document.querySelector('.header-container')

        if(prepareHeaderEdit(main_elem)) {
            //if its acivated
            createHeaderImgEdit(main_elem)

            return ''
        }
        //if edit deactivated
        main_elem.querySelector('.head-pic').firstChild.remove()
        headerCreateForm(main_elem)
    }
}

function setProductDeleteButton() {
    p_add_elem = document.querySelector('.product-group')

    //check if there is still thing to be deleted
    if(prod_to_delete.length === 0) {
        p_add_elem.firstChild.nextElementSibling.remove()
        return ''
    }
    //check if its already defined
    if(document.querySelector('.prod-delete-btn')) {
        return ''
    }

    //create the button
    p_add_child = document.createElement('div')
    p_add_child.classList.add('product-group-inner', 'prod-active')
    p_add_child.innerHTML = `
        <div class="wrapper-product prod-delete-btn">
            <img src="`+admin_url_img+`/remove.png" alt="">
        </div>
    `
    p_add_child.onclick = () => {
        createProductModal_delete()
    }

    p_add_elem.insertBefore(p_add_child, p_add_elem.firstChild.nextElementSibling)
}
// PPRODUCT DELETE FUNCTION (makai edit jga untuk ngurangi pengeluaran waktu)
function createProductModal_delete() {
    edit_elem = document.querySelector('.order-container')
    edit_elem.classList.add('order-active')
    act_where = window.location.href+'/deleteproduct'

    edit_elem.innerHTML = edit_elem.innerHTML + `
    
    <div class="edit-prod-wrap">
        <div class="edit-prod-close">
            <img src="`+pub_url_img+`/back-cart.png" alt="">
        </div>
        <form action="`+act_where+`" method="POST" class="form-edit-prod">
        <input type="hidden" name="_token" value="`+csrf_token+`" />
            <div>
                <h1>Will Deleted</h1>
                <div>
                    `+getDelLayout()+`
                </div>
                <button>Hapus</button>
            </div>
        </form>
    </div>
    `
    disable_container()

    document.querySelector('.edit-prod-close').onclick = () => {
        document.querySelector('.edit-prod-wrap').remove()
        edit_elem.classList.remove('order-active')
        disable_container()
    }
}
// PRODUCT ADD FUNCTION (makai edit jga untuk ngurangi pengeluaran waktu)
function createProductModal_add(id) {
    edit_elem = document.querySelector('.order-container')
    edit_elem.classList.add('order-active')
    act_where = location.href+'/addproduct'

    edit_elem.innerHTML = edit_elem.innerHTML + `
    
    <div class="edit-prod-wrap">
        <div class="edit-prod-close">
            <img src="`+pub_url_img+`/back-cart.png" alt="">
        </div>
        <form action="`+act_where+`" method="POST" class="form-edit-prod" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="`+csrf_token+`" />
            <div>
                <h1>Add Data</h1>
                <div>
                    <span>
                        ID : 
                        <input readonly style="opacity: .7;" name="id" type="text" value="`+id+`">
                    </span>
                    <span>
                        Nama : 
                        <input name="nama" type="text">
                    </span>
                    <span>
                        Detail produk : 
                        <input name="detail" type="text">
                    </span>
                    <span>
                        Harga : 
                        <input name="harga" type="text">
                    </span>
                    <span>
                        Satuan : 
                        <input name="satuan" type="text">
                    </span>
                    <span>
                        Gambar : 
                        <input name="gambar" type="file" accept="image">
                        <p>*catatan : lewati jika tidak ingin menambah gambar</p>
                    </span>
                </div>
                <button>Tambah</button>
            </div>
        </form>
    </div>
    `
    disable_container()

    document.querySelector('.edit-prod-close').onclick = () => {
        document.querySelector('.edit-prod-wrap').remove()
        edit_elem.classList.remove('order-active')
        disable_container()
    }
}
function getDelLayout() {
    var rt = ''
    for(var x = 0; x < prod_to_delete.length; x++) {
        rt = rt + `
        <span>
            <input readonly style="oapcity: .8; width: 250px;" name="name[`+x+`]" type="text" value="`+prod_to_delete[x]+`">
        </span>
        `
    }
    return rt
}
// PRODUCT EDIT FUNCTION
function createProductModal_edit(a, b, c, d, e, f) { //p_name, p_price, p_imgsrc, p_detail, p_satuan, p_id
    edit_elem = document.querySelector('.order-container')
    edit_elem.classList.add('order-active')
    act_where = window.location.href+'/updateproduct'

    edit_elem.innerHTML = edit_elem.innerHTML + `
    
    <div class="edit-prod-wrap">
        <div class="edit-prod-close">
            <img src="`+pub_url_img+`/back-cart.png" alt="">
        </div>
        <form action="`+act_where+`" method="POST" class="form-edit-prod" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="`+csrf_token+`" />    
            <div>   
                <h1>Edit Data</h1>
                <div>
                    <span>
                        ID : 
                        <input readonly style="opacity: .7;" name="id" type="text" value="`+f+`">
                    </span>
                    <span>
                        Nama : 
                        <input name="nama" type="text" value="`+a+`">
                    </span>
                    <span>
                        Detail produk : 
                        <input name="detail" type="text" value="`+d+`">
                    </span>
                    <span>
                        Harga : 
                        <input name="harga" type="text" value="`+b+`">
                    </span>
                    <span>
                        Satuan : 
                        <input name="satuan" type="text" value="`+e+`">
                    </span>
                    <span>
                        Gambar : 
                        <input name="gambar" type="file" accept="image">
                        <p>*catatan : lewati jika tidak ingin mengganti gambar</p>
                    </span>
                </div>
                <button>Edit</button>
            </div>
        </form>
    </div>
    `
    disable_container()

    document.querySelector('.edit-prod-close').onclick = () => {
        document.querySelector('.edit-prod-wrap').remove()
        edit_elem.classList.remove('order-active')
        disable_container()
    }
}

function product_RemoveEdit(main_elem) {
    if(prod_to_delete.length != 0) {
        pd = document.querySelectorAll('.prod-delete')
        for(var x = 0; x < pd.length; x++) {
            pd[x].classList.remove('prod-delete')
        }
        prod_to_delete = []
        setProductDeleteButton()
    }
    

    //removing the icon of edit in product
    current_data = main_elem.querySelectorAll('.product-top')
    for(var x = 0; x < current_data.length; x++) {
        if(current_data[x].children[1]) {
            current_data[x].children[2].remove()
            current_data[x].children[1].remove()
        }
    }
    if(main_elem.querySelector('.prod-insert-more')) {
        main_elem.querySelector('.prod-insert-more').closest('.product-group-inner').remove()
    }
    main_elem.querySelector('.product-group-inner').classList.add('prod-active')
}

//===
function createNewsigModal_edit(jml_data) {
    edit_elem = document.querySelector('.order-container')
    edit_elem.classList.add('order-active')
    act_where_1 = window.location.href+'/addnewsig'
    act_where_2 = window.location.href+'/deletenewsig'

    edit_elem.innerHTML = edit_elem.innerHTML + `
    
    <div class="edit-prod-wrap">
        <div class="edit-prod-close">
            <img src="`+pub_url_img+`/back-cart.png" alt="">
        </div>
        <form action="`+act_where_1+`" method="POST" class="form-edit-prod">
        <input type="hidden" name="_token" value="`+csrf_token+`" /> 
            <div>
                <h1>Tambah Data</h1>
                <div>
                <input name="id_embed" type="text" value=`+generate_invoice_code(21)+` hidden>
                    <span>
                        Link Embed :
                        <input name="embed" type="text">
                    </span>
                </div>
                
                <button>Tambahkan</button>
            </div>
        </form>
        <form action="`+act_where_2+`" method="POST" class="form-edit-prod">
        <input type="hidden" name="_token" value="`+csrf_token+`" />     
            <div>
                <h1>Hapus Data</h1>
                <div>
                    `+getNewsigLayout(jml_data)+`
                </div>
                
                <button>Hapus</button>
            </div>
        </form>
    </div>
    `
    disable_container()
    delete_elem = document.querySelectorAll('.newsig-id-delete')
    for(var x = 0; x < delete_elem.length; x++) {
        delete_elem[x].onclick = (e) => {
            if(newsig_to_delete.includes(e.target.previousElementSibling.value)) {
                newsig_to_delete.splice(newsig_to_delete.indexOf(e.target.previousElementSibling.value), 1)
                e.target.parentElement.classList.remove('selected-delete-newsig')
                return ''
            }
            newsig_to_delete.push(e.target.previousElementSibling.value)
            e.target.parentElement.classList.add('selected-delete-newsig')
        }
    }
    document.querySelector('.edit-prod-close').onclick = () => {
        document.querySelector('.edit-prod-wrap').remove()
        edit_elem.classList.remove('order-active')
        disable_container()
    }
}

function getNewsigLayout(data) {
    var rt = ''
    for(var x = 0; x < data.length; x++) {
        rt = rt+ `
        <span> 
            <span><input class="newsig-id-to-delete" name="link[`+x+`]" type="text" value="`+data[x].getAttribute('data-newsig-id')+`" readonly> <img src="`+pub_url_img+`/delete.png" class="newsig-id-delete" style="width:30px;height:30px;background-color: rgba(var(--color_white), 1); border-radius: 100%; padding: 5px;"></span>
        </span>
        `
    }
    return rt
}
//== Testimoni dan gallery

function prepareTestimoniEdit(main_elem) {
    quote_cards = main_elem.querySelectorAll('.testi-card-quote')
    if(quote_cards[0].classList.contains('testi-edit-active')) {
        for(var x = 0; x < quote_cards.length; x++) {
            quote_cards[x].classList.remove('testi-edit-active')
            
            quote_cards[x].querySelector('span').remove()
        }

        return true
    }

    for(var x = 0; x < quote_cards.length; x++) {
        quote_cards[x].classList.add('testi-edit-active')
        
        span = document.createElement('span')
        span.innerHTML = `
            <img class="testi-quote testi-btn-edit" src="`+admin_url_img+`/edit.png" alt="">
        `
        span.style.cssText = 'height: 100%; width:auto; display: flex; align-items:center;'
        span.onclick = (e) => {
            trg = e.target.closest('.testi-card-wrapper')
            id = trg.getAttribute('data-id-testi')
            kalimat = trg.querySelector('.testi-text').textContent
            nama = trg.querySelector('.testi-name').textContent

            text = trg.querySelector('.testi-card-text').textContent
            createTestiModal_edit(id, nama, kalimat)
        }
        quote_cards[x].appendChild(span)

    }

    return false     
}

function createTestiModal_edit(id, nama, kalimat) { 
    edit_elem = document.querySelector('.order-container')
    edit_elem.classList.add('order-active')
    act_where = window.location.href+'/updatetesti'

    edit_elem.innerHTML = edit_elem.innerHTML + `
    
    <div class="edit-prod-wrap">
        <div class="edit-prod-close">
            <img src="`+pub_url_img+`/back-cart.png" alt="">
        </div>
        <form action="`+act_where+`" method="POST" class="form-edit-prod" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="`+csrf_token+`" />    
            <div>   
                <h1>Edit Data</h1>
                <div>
                    <span>
                        ID Testimoni :
                        <input readonly style="opacity: .7;" name="id" type="text" value="`+id+`">
                    </span>
                    <span>
                        Nama : 
                        <input name="nama" type="text" value="`+nama+`">
                    </span>
                    <span>
                        Kalimat Testimoni : 
                        <input name="kalimat" type="text" value="`+kalimat+`">
                    </span>
                    <span>
                        Gambar : 
                        <input name="gambar" type="file" accept="image">
                        <p>*catatan : lewati jika tidak ingin mengganti gambar</p>
                    </span>
                </div>
                <button>Edit</button>
            </div>
        </form>
    </div>
    `
    disable_container()

    document.querySelector('.edit-prod-close').onclick = () => {
        document.querySelector('.edit-prod-wrap').remove()
        edit_elem.classList.remove('order-active')
        disable_container()
    }
}

function prepareGalleryEdit(sec_elem) {
    parent = sec_elem.querySelectorAll('.gallery-img')
    
    if(sec_elem.querySelector('.gallery-edit-btn')) {
        btns = document.querySelectorAll('.gallery-edit-btn')
        for(var x = 0; x < btns.length; x++) {
            btns[x].remove()
        }
        return ''
    }

    for(var x = 0; x < parent.length; x++) {
        img = document.createElement('img')
        img.src = admin_url_img+'/edit.png'
        img.style.cssText = 'position: absolute; width: 40px; height: 40px; background-color: rgba(var(--color_white), 1); border-radius: 100%; padding: 5px; margin-top: 5px; margin-left: 5px; z-index: 51;'
        
        img.classList.add('gallery-edit-btn')

        img.onclick = (e) => {
            id = e.target.closest('.gallery-img').getAttribute('data-id-gallery')
            title_primary = e.target.previousElementSibling.children[0].textContent
            title_secondary = e.target.previousElementSibling.children[1].textContent
            createGalleryModal_edit(id, title_primary, title_secondary)
        }

        parent[x].appendChild(img)
        
    }
}

function createGalleryModal_edit(id, title_primary, title_secondary) { 
    edit_elem = document.querySelector('.order-container')
    edit_elem.classList.add('order-active')
    act_where = window.location.href+'/updategallery'

    edit_elem.innerHTML = edit_elem.innerHTML + `
    
    <div class="edit-prod-wrap">
        <div class="edit-prod-close">
            <img src="`+pub_url_img+`/back-cart.png" alt="">
        </div>
        <form action="`+act_where+`" method="POST" class="form-edit-prod" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="`+csrf_token+`" />    
            <div>   
                <h1>Edit Data</h1>
                <div>
                    <span>
                        ID Gallery :
                        <input readonly style="opacity: .7;" name="id" type="text" value="`+id+`">
                    </span>
                    <span>
                        Primary Title : 
                        <input name="title_1" type="text" value="`+title_primary+`">
                    </span>
                    <span>
                        Secondary Title : 
                        <input name="title_2" type="text" value="`+title_secondary+`">
                    </span>
                    <span>
                        Gambar : 
                        <input name="gambar" type="file" accept="image">
                        <p>*catatan : lewati jika tidak ingin mengganti gambar</p>
                    </span>
                </div>
                <button>Edit</button>
            </div>
        </form>
    </div>
    `
    disable_container()

    document.querySelector('.edit-prod-close').onclick = () => {
        document.querySelector('.edit-prod-wrap').remove()
        edit_elem.classList.remove('order-active')
        disable_container()
    }
}

//== About

function prepareAboutEdit(main_elem) {
    if(main_elem.querySelector('.edit-btn-active')) {
        set = true
    } else {
        set = false
    }
    ab_head = main_elem.querySelector('.about-lower-story-head > h1')
    ab_head.contentEditable = set
    ab_story = main_elem.querySelector('.about-lower-story-content > p')
    ab_story.contentEditable = set
    ab_icon_text = main_elem.querySelectorAll('.lower-more-text')

    for(var x = 0; x < ab_icon_text.length; x++) {
        ab_icon_text[x].children[1].children[0].contentEditable = set
    }

    return set
}
function AboutCreateForm(main_elem) {
    act_where = window.location.href+'/updateabout'
    form = document.createElement('form')
    form.setAttribute('action', act_where)
    form.setAttribute('method', 'POST')
    form.classList.add('form-about-submit')
    form.setAttribute('enctype', 'multipart/form-data')
    form.style.cssText = 'display: none;'

    form.innerHTML = `
        <input type="hidden" name="_token" value="`+csrf_token+`" />
        <input name="data[0]" type="text" value="`+main_elem.querySelector('.about-lower-story-head > h1').textContent+`">
        <input name="data[1]" type="text" value="`+main_elem.querySelector('.about-lower-story-content > p').textContent+`">
        <input name="data[2]" type="text" value="`+main_elem.querySelectorAll('.lower-more-text')[0].children[1].children[0].textContent+`">
        <input name="data[3]" type="text" value="`+main_elem.querySelectorAll('.lower-more-text')[1].children[1].children[0].textContent+`">
        <input name="data[4]" type="text" value="`+main_elem.querySelectorAll('.lower-more-text')[2].children[1].children[0].textContent+`">
        `
    main_elem.appendChild(form)
    main_elem.querySelector('.form-about-submit').submit()
}

//== HEADER

function prepareHeaderEdit(main_elem) {
    if(main_elem.querySelector('.edit-btn-active')) {
        set = true
    } else {
        set = false
    }
    hr_1 = main_elem.querySelector('.head-h1-content > h1')
    hr_2 = main_elem.querySelector('.head-p-content > p')
    
    //check for color
    const regEx = new RegExp('</span>', "g");
    const regEx2 = new RegExp('<span class="txt-color-1">', "g");
    hr_1.innerHTML = hr_1.innerHTML.replace(regEx, '}')
    hr_1.innerHTML = hr_1.innerHTML.replace(regEx2, '{')
    hr_1.contentEditable = set
    hr_2.contentEditable = set

    return set
}

function createHeaderImgEdit(main_elem) {
    img = document.createElement('img')
    img.src = admin_url_img+'/edit.png'
    img.style.cssText = 'width: 40px; height: 40px; background-color: rgba(var(--color_white), 1); border-radius: 100%; padding: 5px; margin-bottom: 10px; z-index: 51;'
    img.classList.add('header-edit-btn')
    img.onclick = () => {
        createHeaderImgModal()
    }
    hr_3 = main_elem.querySelector('.head-pic')
    hr_3.insertBefore(img, hr_3.firstChild)
    
}
function createHeaderImgModal() {
    edit_elem = document.querySelector('.order-container')
    edit_elem.classList.add('order-active')
    act_where = window.location.href+'/updateheaderimg'

    edit_elem.innerHTML = edit_elem.innerHTML + `
    
    <div class="edit-prod-wrap">
        <div class="edit-prod-close">
            <img src="`+pub_url_img+`/back-cart.png" alt="">
        </div>
        <form action="`+act_where+`" method="POST" class="form-edit-prod" enctype="multipart/form-data">
        <input type="hidden" name="_token" value="`+csrf_token+`" />    
            <div>   
                <h1>Edit Image</h1>
                <div>
                    <span>
                        Gambar : 
                        <input name="gambar" type="file" accept="image">
                        <p>*catatan : disarankan PNG dan resoulusi tidak terlu besar</p>
                    </span>
                </div>
                <button>Edit</button>
            </div>
        </form>
    </div>
    `
    disable_container()
    
    document.querySelector('.edit-prod-close').onclick = () => {
        document.querySelector('.edit-prod-wrap').remove()
        edit_elem.classList.remove('order-active')
        disable_container()
    }
}

function headerCreateForm(main_elem) {
    act_where = window.location.href+'/updateheader'
    form = document.createElement('form')
    form.setAttribute('action', act_where)
    form.setAttribute('method', 'POST')
    form.classList.add('form-header-submit')
    form.setAttribute('enctype', 'multipart/form-data')
    form.style.cssText = 'display: none;'
    
    form.innerHTML = `
        <input type="hidden" name="_token" value="`+csrf_token+`" />
        <input name="data[0]" type="text" value="`+main_elem.querySelector('.head-h1-content > h1').textContent+`">
        <input name="data[1]" type="text" value="`+main_elem.querySelector('.head-p-content > p').textContent+`">
        `
    main_elem.appendChild(form)
    check_color = main_elem.querySelector('input[name="data[0]"]')
    const regEx = new RegExp('{', "g");
    const regEx2 = new RegExp('}', "g");
    check_color.value = check_color.value.replace(regEx, '<span class="txt-color-1">')
    check_color.value = check_color.value.replace(regEx2, '</span>')

    main_elem.querySelector('.form-header-submit').submit()
}

//==

const toEdit = [0,1,2,3,4]
for(var x = 0; x < allContainer.length; x++) {
    try {
      if(toEdit.includes(x)) {
        allContainer[x].insertBefore(editLayout.edit_btn(), allContainer[x].firstChild)
      }  
    } catch(err) {
        console.log('catch => '+err)
    }
}

function editTools(e) {
    if(e.target.closest('.edit-btn').classList.contains('edit-btn-active')) {
        e.target.closest('.edit-btn').classList.remove('edit-btn-active')
    } else {
        e.target.closest('.edit-btn').classList.add('edit-btn-active')
    }
    
    trg = e.target.closest('.container')
    
    if(trg.classList[1] === 'product-container') {
        return editLayout.edit_product()
    }
    if(trg.classList[1] === 'newsig-container') {
        return editLayout.edit_newsig()
    }
    if(trg.classList[1] === 'testimoni-container') {
        return editLayout.edit_testi_gallery()
    }
    if(trg.classList[1] === 'about-container') {
        return editLayout.edit_about()
    }
    if(trg.classList[1] === 'header-container') {
        return editLayout.edit_header()
    }
}