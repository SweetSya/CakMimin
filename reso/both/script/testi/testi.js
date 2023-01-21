testi_nav = document.querySelectorAll('.navi-testi-btn')

for(var x = 0; x < testi_nav.length; x++) {
    testi_nav[x].addEventListener('click', (e)=> {
        document.querySelector('.navi-testi-active').classList.remove('navi-testi-active')
        e.target.classList.add('navi-testi-active')
        change_testi(e)
    })
}
function change_testi(e) {
    document.querySelector('.testi-active').classList.remove('testi-active')
    document.querySelectorAll('.testi-outer-gap')[e.target.dataset.click].classList.add('testi-active')
}

const gallery = document.querySelector('.gallery')
const gallery_wrap = document.querySelector('.gallery-wrapper-content')
