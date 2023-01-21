<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ConDB extends Model {

    public function retriveDB($table) {
        return DB::table($table)->get();
    }

    public function insertDB($query) {
        DB::insert($query);
    }

    public function deleteDB($table, $identifier, $arr) {
        DB::table($table)
             ->whereIn($identifier, $arr)
             ->delete();
    }

    public function convertPic($r, $path_img) {
        $r->validate([
            'gambar' => 'required|image|mimes:jpeg,png,jpg,gif,svg',
        ]);
    
        $imageName = time().'.'.$r->gambar->extension();  
     
        $r->gambar->move($path_img, $imageName);

        return '/'.$imageName;
    }

    public function removeDbPic($identifier, $table, $arr) {
        $data = DB::table($table)->whereIn($identifier, $arr)->get();
        for($x = 0; $x < count($data); $x++) {
            if($table == 'product') {
                $path = $data[$x]->product_img_src;
            }
            if($table == 'testimoni') {
                $path = $data[$x]->testimoni_gambar;
            }
            if($table == 'gallery') {
                $path = $data[$x]->gallery_img;
            }
            if($table == 'header') {
                $path = $data[$x]->header_content;
            }
            File::delete($path);
        }
        
    }

    public function updateDB($table, $identifier, $where, $query) {
        DB::table($table)
            ->where($where, $identifier)
            ->limit(1)
            ->update($query);
    }


    public function initUpdateAbout($r, $table) {
        for($x = 0; $x < count($r->data); $x++) {
            DB::table($table)
                ->where('about_id', $x+1)
                ->limit(1)
                ->update([
                    'about_text'=> $r->data[$x]
                ]);
        }
    }
    public function initUpdateHeader($r, $table) {
        for($x = 0; $x < count($r->data); $x++) {
            DB::table($table)
                ->where('header_id', $x+1)
                ->limit(1)
                ->update([
                    'header_content'=> $r->data[$x]
                ]);
        }
    }
}