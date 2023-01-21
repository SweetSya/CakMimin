<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;

class UserAuth extends Model {

    protected $table = 'account';
    
    private function getUsers($r) {
        $conf = DB::select('select * from account where username = ? and password = ?',[$r->username, $r->password]);
        if(count($conf)) {
            return true;
        }

        return false;
    }
    private function getSession($username) {
        $conf = DB::select('select session from account where username = ? limit 1',[$username]);
        if(count($conf)) {
            return $conf[0]->session;
        }

        return null;
    }

    public function LoginStatus($r) {
        $ses = $this->createSession($r);
        
        if($this->getUsers($r)) {
            $r->session()->put('key_session',$ses);
            $r->session()->put('user_session', $r->username);

            return redirect('adminpanel');
        }
        
        return redirect('admin')->with('msg', 'Username / password salah'); 

    }

    public function validateSession() {
        if(session()->get('user_session')) {
            if($this->getSession(session()->get('user_session')) === session()->get('key_session')) {
                return true;
            }
        }
        
        return false;
    }
    
    public function createSession($r) {
        $session = $this->generateSession();
        DB::update('update account set session = ? where username = ?', [$session, $r->username]);
        return $session;
    }

    private function generateSession() {
        $arr = ['1','2','3','4','5','6','7','8','9','0','-','=','q','w','e','r','t','y','u','i','o','p','[',']','a','s','d','f','g','h','j','k','l',';','z','x','c','v','b','n','m',',','.','/','<','>','?',':','"','|','}','{','+','_',')','(','*','&','^','%','$','#','@','!','Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
        $random = Arr::random($arr);
        return Str::random(31);
    }

    public function logoutAuth() {
        echo 'aaaaaa';
    }
}