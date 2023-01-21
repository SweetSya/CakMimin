<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="{{ asset('reso/admin/login.css?v=').time() }}">
    <link rel="stylesheet" href="{{ asset('reso/both/css/universal.css?v=').time() }}">
    
    <title>Login Cak Mimin</title>
    <!-- add icon link -->
    <link rel = "icon" href = "{{ URL::asset('reso/image/logo.jpg') }}" type = "image/x-icon">
</head>
<body>
    @include('addon_components.toast')
      <form action="{{ url()->current() }}/auth" method="POST">
        {{ csrf_field() }}
        <h3>Login Here</h3>
      
        <label for="username">Username</label>
        <input type="text" placeholder="Username" id="username" name="username">
      
        <label for="password">Password</label>
        <input type="password" placeholder="Password" id="password" name="password">
      
        <button>Log In</button>
        <div class="social">
          <div class="go"><i class="fab fa-google"></i> Hm? </div>
          <div class="fb"><i class="fab fa-facebook"></i> Nothing</div>
        </div>
      </form>
      <script>
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
                close: '<img style="width: 20px; margin-left: -15px;" src="{{ URL::asset('reso/image/icon/delete.png') }}" alt="">'
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
      </script>
      @if (Session::has('msg'))
          <script>
            toast({title: "Kesalahan Login!", message: {!! json_encode(Session::get('msg')) !!}, type: "error", duration: 15000 })
          </script>
      @elseif (Session::has('logout'))
        <script>
          toast({title: "Logged Out!", message: {!! json_encode(Session::get('logout')) !!}, type: "success", duration: 15000 })
        </script>
      @endif
</body>
</html>