<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Client\Request as ClientRequest;
use Illuminate\Routing\Controller as BaseController;

use Illuminate\Http\Request;
use App\Models\ConDB;

class AdminPanelController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    private $table_product = 'product';
    private $table_newsig = 'ig_newsfeed';
    private $table_testi = 'testimoni';
    private $table_gallery = 'gallery';
    private $table_about = 'about';
    private $table_header = 'header';

    private $prod_pic_src = 'reso/image/product/';
    private $testi_pic_src = 'reso/image/testimoni/';
    private $gallery_pic_src = 'reso/image/gallery';
    private $header_pic_src = 'reso/image/header';

    // PRODUCT
    function db_addproduct(Request $r) {
        $db = new ConDB();
        
        $imageName = $db->convertPic($r, $this->prod_pic_src);

        $query = "insert into ". $this->table_product." values('$r->id','$r->nama','$r->detail',$r->harga,'$r->satuan','$this->prod_pic_src.$imageName')";
        $db->insertDB($query);

        return redirect('adminpanel')->with('success', 'Produk berhasil ditambahkan!')->with('scroll','.product-container');
    }

    function db_deleteproduct(Request $r) {
        $db = new ConDB();
        
        $db->removeDbPic('product_nama',$this->table_product, $r->name);

        $db->deleteDB($this->table_product, 'product_nama',$r->name);
        return redirect('adminpanel')->with('success', 'Produk berhasil dihapus!')->with('scroll','.product-container');
    }

    function db_updateproduct(Request $r) {
        $db = new ConDB();
        
        if($r->gambar != null) {
            $imageName = $db->convertPic($r, $this->prod_pic_src);
            $arr = [$r->id];
            $db->removeDbPic('product_id',$this->table_product, $arr);
            $query = ['product_nama'=> $r->nama, 'product_detail'=> $r->detail, 'product_harga'=> $r->harga, 'product_satuan'=> $r->satuan, 'product_img_src'=> $this->prod_pic_src.$imageName];
        } else {
            $query = ['product_nama'=> $r->nama, 'product_detail'=> $r->detail, 'product_harga'=> $r->harga, 'product_satuan'=> $r->satuan];
        }

        $db->updateDB($this->table_product, $r->id, 'product_id', $query);

        return redirect('adminpanel')->with('success', 'Produk berhasil terupdate!')->with('scroll','.product-container');
    }

    //NEWSIG
    function db_addnewsig(Request $r) {
        $db = new ConDB();

        $query = "insert into ". $this->table_newsig." values('$r->id_embed','$r->embed')";
        $db->insertDB($query);

        return redirect('adminpanel');
    }
    function db_deletenewsig(Request $r) {
        $db = new ConDB();
        
        $db->deleteDB($this->table_newsig, 'newsig_id', $r->link);
        return redirect('adminpanel')->with('success', 'IG News berhasil terupdate!')->with('scroll','.newsig-container');
    }

    //TESTIMONI
    function db_updatetesti(Request $r) {
        $db = new ConDB();

        if($r->gambar != null) {
            $imageName = $db->convertPic($r, $this->testi_pic_src);
            $arr = [$r->id];
            $db->removeDbPic('testimoni_id',$this->table_testi, $arr);
            $query = ['testimoni_nama'=> $r->nama, 'testimoni_kalimat'=> $r->kalimat,'testimoni_gambar'=> $this->testi_pic_src.$imageName];
        } else {
            $query = ['testimoni_nama'=> $r->nama, 'testimoni_kalimat'=> $r->kalimat];
        }

        $db->updateDB($this->table_testi, $r->id, 'testimoni_id', $query);

        return redirect('adminpanel')->with('success', 'Testimoni berhasil terupdate!')->with('scroll','.testimoni-container');
    }

    //GALLERY
    function db_updategallery(Request $r) {
        $db = new ConDB();

        if($r->gambar != null) {
            $imageName = $db->convertPic($r, $this->gallery_pic_src);
            $arr = [$r->id];
            $db->removeDbPic('gallery_id',$this->table_gallery, $arr);
            $query = ['gallery_title_primary'=> $r->title_1, 'gallery_title_secondary'=> $r->title_2, 'gallery_img'=> $this->gallery_pic_src.$imageName];
        } else {
            $query = ['gallery_title_primary'=> $r->title_1, 'gallery_title_secondary'=> $r->title_2];
        }

        $db->updateDB($this->table_gallery, $r->id, 'gallery_id', $query);

        return redirect('adminpanel')->with('success', 'Gallery berhasil terupdate!')->with('scroll','.testimoni-container');
    }

    //About
    function db_updateabout(Request $r) {
        $db = new ConDB();
        $db->initUpdateAbout($r, $this->table_about);
        return redirect('adminpanel')->with('success', 'About berhasil terupdate!')->with('scroll','.about-container');
    }
    
    //Header
    function db_updateheader(Request $r) {
        $db = new ConDB();
        $db->initUpdateHeader($r, $this->table_header);
        return redirect('adminpanel')->with('success', 'Header berhasil terupdate!')->with('scroll','.header-container');
    }
    function db_updateheaderimg(Request $r) {
        $db = new ConDB();
        $imageName = $db->convertPic($r, $this->header_pic_src);
        $arr = [3];
        $db->removeDbPic('header_id',$this->table_header, $arr);
        $query = ['header_content'=> $this->header_pic_src.$imageName];

        $db->updateDB($this->table_header, 3, 'header_id', $query);
        return redirect('adminpanel')->with('success', 'Header berhasil terupdate!')->with('scroll','.header-container');
    }

    function checkIfAnyEmpty($r) {
        
    }   
}
