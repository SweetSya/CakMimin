const group_product = document.querySelector('.product-group')
const product_card = document.querySelector('.wrapper-product')
jml_product = document.querySelectorAll('.product-group-inner').length
besar_gap = 0

function group_product_sizing() {
    jml_product = document.querySelectorAll('.product-group-inner').length
    let group_width = group_product.clientWidth
    let prod_width = product_card.clientWidth+25

    besar_gap = hitung_besar_gap(group_width, prod_width)

    document.documentElement.style.setProperty('--product_gap', besar_gap+'px')
}

function hitung_besar_gap(group_width, prod_width) {
    besar_gap = 0

    isi_group = Math.floor(group_width/prod_width)
    
    if(isi_group <= 1) {  
        return group_width   
    }
    if(isi_group > jml_product) {
        return group_width/jml_product
    }
    besar_gap = group_width/isi_group

    return besar_gap
    
}

pr_arrow_left = document.querySelector('.product-arrow-left')
pr_arrow_right = document.querySelector('.product-arrow-right')

pr_arrow_left.addEventListener('click', ()=> {
    fc_pr_arrow_click(0-besar_gap)
    change_prod_active('L')
    
})
pr_arrow_right.addEventListener('click', ()=> {
    fc_pr_arrow_click(besar_gap)
    change_prod_active('R')
})

function change_prod_active(val) {
    current = document.querySelector('.prod-active')

    try {
        switch(val) {
            case 'R':
                current.nextElementSibling.classList.add('prod-active')
                break
            case 'L':
                current.previousElementSibling.classList.add('prod-active')
                break
        }
    } catch(evt) {
        return ''
        
    }
    current.classList.remove('prod-active')
    console.log(document.querySelector('.prod-active'))
}

var fc_c_scroll = false
function fc_pr_arrow_click(value) {
    if(fc_c_scroll) return ''
    
    group_product.scroll({
        left: group_product.scrollLeft + value,
        top: 0,
        behavior: 'smooth'
    })

    setTimeout(()=> {
        fc_c_scroll = false
    }, 500)
    fc_c_scroll = true
}

window.addEventListener('resize', () => {
    group_product_sizing()
    group_product.scrollLeft = document.querySelector('.prod-active').offsetLeft - document.querySelector('.product-group').offsetLeft
    // group_product.scroll({
    //     top: 0,
    //     left: document.querySelector('.prod-active').offsetLeft - document.querySelector('.product-group').offsetLeft,
    //     behavior: 'smooth'
    //   });
})