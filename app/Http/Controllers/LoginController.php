<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\UserAuth;
use App\Models\ConDB;
use Illuminate\Http\Request;

class LoginController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function loginAuth(Request $r) {
        $model = new UserAuth();
        $panel = $model->LoginStatus($r);
        return $panel;
    }

    public function loginValidate() {
        $model = new UserAuth();
        $validation = $model->validateSession();

        if($validation) {
            $db = new ConDB();
            $products = $db->retriveDB('product');
            $newsig = $db->retriveDB('ig_newsfeed');
            $testi = $db->retriveDB('testimoni');
            $gallery = $db->retriveDB('gallery');
            $about = $db->retriveDB('about');
            $header = $db->retriveDB('header');
            return view('admin.viewpaneladmin', ['arr_products'=> $products, 'arr_newsig' => $newsig, 'arr_testi' => $testi, 'arr_gallery' => $gallery, 'arr_about' => $about, 'arr_header' => $header])->with('loggedin', 'Selamat Datang Kembali!');
        } else {
            return redirect('admin')->with('msg', 'Harap login terlebih dahulu');
        }
    }
    
}
