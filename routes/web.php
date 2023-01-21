<?php

use App\Http\Controllers\AdminPanelController;
use Illuminate\Support\Facades\Route;
use Illuminate\Routing\UrlGenerator;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/', [Controller::class, 'showView']);

Route::get('admin',function () {
        if(session()->has('user_session')) {
            return redirect('adminpanel');
        }
        return view('admin.loginPage');
    }
);
Route::post('/admin/auth', [LoginController::class, 'loginAuth']);

Route::get('adminpanel', [LoginController::class, 'loginValidate']);

//Product
Route::post('adminpanel/addproduct', [AdminPanelController::class, 'db_addproduct']);
Route::post('adminpanel/deleteproduct', [AdminPanelController::class, 'db_deleteproduct']);
Route::post('adminpanel/updateproduct', [AdminPanelController::class, 'db_updateproduct']);

//Newsig
Route::post('adminpanel/addnewsig', [AdminPanelController::class, 'db_addnewsig']);
Route::post('adminpanel/deletenewsig', [AdminPanelController::class, 'db_deletenewsig']);

//Testimoni
Route::post('adminpanel/updatetesti', [AdminPanelController::class, 'db_updatetesti']);

//Gallery
Route::post('adminpanel/updategallery', [AdminPanelController::class, 'db_updategallery']);

//About
Route::post('adminpanel/updateabout', [AdminPanelController::class, 'db_updateabout']);

//Header
Route::post('adminpanel/updateheader', [AdminPanelController::class, 'db_updateheader']);
Route::post('adminpanel/updateheaderimg', [AdminPanelController::class, 'db_updateheaderimg']);


Route::get('adminpanel/logout', function() {
    session()->forget('user_session', 'key_session');
    return redirect('admin')->with('logout', 'Berhasil Logout!');
});
