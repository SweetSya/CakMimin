//CHECK IF MOBILE IS USED
window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};

// FOR RESIZING EACH CLASS '.CONTAINER' and SUB-CONTAINER(header, product, etc)
function define_device_size() {
    width = window.innerWidth
    height = window.innerHeight

    document.documentElement.style.setProperty('--device_height', height+'px')
    document.documentElement.style.setProperty('--device_width', width+'px')

    const dataH = define_container_elemet_height()
    document.documentElement.style.setProperty('--header_height', dataH[0].header+'px')
    document.documentElement.style.setProperty('--newsig_height', dataH[0].newsig+'px')
    document.documentElement.style.setProperty('--product_height', dataH[0].product+'px')
    document.documentElement.style.setProperty('--testi_height', dataH[0].testi+'px')
    document.documentElement.style.setProperty('--about_height', dataH[0].about+'px')
    //add more here for each container
    
}
// THIS IS THE PART FOR THE MIN HEIGHT FOR EACH SUB-CONTAINER
function define_container_elemet_height() {
    let elemHeight = [{
        'header':document.querySelector('.wrapper-head-content').clientHeight,
        'newsig':document.querySelector('.wrapper-newsig-content').clientHeight,
        'product':document.querySelector('.wrapper-product-content').clientHeight,
        'testi':document.querySelector('.testi-wrapper-content').clientHeight,
        'about':document.querySelector('.wrapper-about-content').clientHeight
    }] 
    return elemHeight
}

function determine_gallery_size() {
  if(windowWidth < 483) {
    gl = document.querySelectorAll('.gallery-img')
    if(gl.length > 4) {
      for(var x = 4; x < gl.length; x++) {
        gl[x].classList.add('gallery-none')
      }
    }
  }
  if(windowWidth >= 483) {
    gl = document.querySelectorAll('.gallery-img')
    for(var x = 4; x < gl.length; x++) {
      if(gl[x].classList.contains('gallery-none')) {
          gl[x].classList.remove('gallery-none')
      }
    }
    
  } 
}
// AVOIDING UNEXPECTED RESIZE ON PHONE SUCH AS SAFARI, CHECK THE CURRENT SIZE FIRST
var windowWidth = $(window).width();
var windowHeight = $(window).height();
//LISTENER RESIZE FOR CODE LINE 1
window.addEventListener('resize', ()=> {
    if ($(window).width() != windowWidth || $(window).height() != windowHeight) { //THE "AVOID UNEXPECTED RESIZE" IF STATEMENT
      
        // Update the window width for next time
        windowWidth = $(window).width();
        windowHeight = $(window).height();
        
        define_device_size()
        
        // PRODUCT
        group_product_sizing()

        //REDUCING GALLERY AND INCREASING AT CERTAIN SIZE
        determine_gallery_size(windowWidth)
    }
})

fire_dom_setup()

function fire_dom_setup() {
    define_device_size()
    group_product_sizing()
    determine_gallery_size()
}

// function test_rein() {
//     if(document.querySelector('.testi-text').getAttribute('contentEditable') === 'true') {
//         for(var x = 0; x < testi_text.length; x++) {
//             testi_text[x].setAttribute("contenteditable", "false");
//         }
//         testi_name = document.querySelectorAll('.testi-name')
//         for(var x = 0; x < testi_name.length; x++) {
//             testi_name[x].setAttribute("contenteditable", "false");
//         }
//         return ''
//     }
//     document.querySelector('.testimoni-container').scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});

//     testi_text = document.querySelectorAll('.testi-text')
//     for(var x = 0; x < testi_text.length; x++) {
//         testi_text[x].setAttribute("contenteditable", "true");
//     }
//     testi_name = document.querySelectorAll('.testi-name')
//     for(var x = 0; x < testi_name.length; x++) {
//         testi_name[x].setAttribute("contenteditable", "true");
//     }
// }


// LOADING SCREEN



// TOAST JS
// Toast function
function toast({title = "",message = "",type = "sucess",duration = 2000}) {
    console.log('TOAST')
    const main = document.getElementById("toast")
    
    if(main){
      const toast = document.createElement("div")
      // Auto remove toast
      const autoRemoveToast = setTimeout(function(){
        main.removeChild(toast)
      },duration + 1000)

      // Remove toast when clicked
      toast.onclick = function(e){
        if(e.target.closest(".toast__close")){
          main.removeChild(toast)
          clearTimeout(autoRemoveToast)
        }
      }

      const icons = {
        success: "fa-solid fa-circle-check",            
        info: "fa-solid fa-circle-info",
        warning: "fa-solid fa-triangle-exclamation",
        error: "fa-solid fa-xmark",
        close: '<img src="reso/image/icon/delete.png" alt="">'
      }
      const icon = icons[type]
      
      const delay = durationInSecond = (duration/1000).toFixed(2)

      toast.classList.add('toast', `toast--${type}`)
      toast.style.animation = `slideInLeft ease 0.3s, fadeOut ease .5s ${delay}s forwards`;
     
      toast.innerHTML = `
        <div class="toast__icon">
          <i class="${icon}"></i>
        </div>
  
        <div class="toast__body">
          <h3 class="toast__title">${title}</h3>
          <p class="toast__msg">${message}</p>
        </div>
  
        <div class="toast__close">
           ${icons.close}
        </div>
        <div class="progress-track"></div>
        <div class="progress-running progress--${type}"></div>
      `
      
        const progressRunning = toast.querySelector(".progress-running")
        progressRunning.style.animation = `progress linear ${durationInSecond}s forwards`;

        main.appendChild(toast)
    }
  }

document.querySelector('.saran-masukkan-btn').addEventListener('click', () => {
  msg = encodeURI(document.querySelector('.saran-masukkan').value)
  window.open('https://wa.me/6289512336000?text='+msg, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
})

document.querySelector('.reseller-join a').addEventListener('click', () => {
  msg = encodeURI('Halo kak, saya ingin bertanya lebih lanjut mengenai menjadi bagian dari reseller cak mimin!')
  window.open('https://wa.me/6289512336000?text='+msg, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
})