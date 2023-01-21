<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

use Illuminate\Http\Request;
use App\Models\ConDB;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    public function showView() {
        $db = new ConDB();
        
        $products = $db->retriveDB('product');
        $newsig = $db->retriveDB('ig_newsfeed');
        $testi = $db->retriveDB('testimoni');
        $gallery = $db->retriveDB('gallery');
        $about = $db->retriveDB('about');
        $header = $db->retriveDB('header');
        return view('user.mainpage', ['arr_products' => $products, 'arr_newsig' => $newsig, 'arr_testi' => $testi, 'arr_gallery' => $gallery, 'arr_about' => $about, 'arr_header' => $header]);
    }
}
