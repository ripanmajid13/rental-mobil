<?php

use App\Models\Backend\Api;
use App\Models\Backend\Module;
use App\Models\Privileges\LanguageView;
use App\Models\Privileges\User;
use App\Models\Privileges\UserView;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

if (!function_exists('HelperDeveloperSuperAdmin')) {
    function HelperDeveloperSuperAdmin() {
        return 'default-super-admin';
    }
}

if (!function_exists('HelperDeveloperLog')) {
    function HelperDeveloperLog($data) {
       Log::debug($data);
    }
}

if (!function_exists('HelperDeveloperToken')) {
    function HelperDeveloperToken($id, $device = null) {
        $user = User::findOrFail($id);
        $userView = UserView::findOrFail($id);
        $permissions = collect();

        if ($user->hasRole(HelperDeveloperSuperAdmin())) {
            foreach (Api::get() as $apiSU) {
                $permissions->push([
                    'uri' => $apiSU->path,
                    'name' => $apiSU->permission,
                    'display' => $apiSU->permissions->first()->display ?? null,
                ]);
            }
        } else {
            // global
            foreach (Api::where('middleware', false)->get() as $apiGlobal) {
                $permissions->push([
                    'uri' => $apiGlobal->path,
                    'name' => $apiGlobal->permission,
                    'display' => $apiGlobal->permissions->first()->display ?? null,
                ]);
            }

            // user -> roles
            foreach ($user->roles as $userRoles) {
                foreach ($userRoles->permissions as $userRolesPermissions) {
                    $userRolePermission = Api::where('permission', $userRolesPermissions->name)->get();
                    foreach ($userRolePermission as $userRolePermissionValue) {
                        $permissions->push([
                            'uri' => $userRolePermissionValue->path,
                            'name' => $userRolesPermissions->name,
                            'display' => $userRolesPermissions->display
                        ]);
                    }
                }
            }


            // user -> permissions
            foreach ($user->permissions as $userPermissions) {
                $userPermission = Api::where('permission', $userPermissions->name)->get();
                foreach ($userPermission as $userPermissionValue) {
                    $permissions->push([
                        'uri' => $userPermissionValue->path,
                        'name' => $userPermissions->name,
                        'display' => $userPermissions->display
                    ]);
                }
            }
        }

        // language
        $lang_id = [];
        $lang_en = [];
        foreach (LanguageView::orderBy('key', 'asc')->get() as $value) {
            if ($value->lang_id != null) {
                $lang_id = array_merge($lang_id, [$value->key => $value->lang_id]);
            }

            if ($value->lang_en != null) {
                $lang_en = array_merge($lang_en, [$value->key => $value->lang_en]);
            }
        }

        $result = [
            'id' => $userView->id,
            'name' => $userView->name,
            'email' => $userView->email,
            'username' => $userView->username,
            'roles' => $user->roles->pluck('name'),
            'permissions' => collect($permissions->unique('uri'))->sortBy('uri')->filter(function ($value) {
                return Arr::get($value, 'uri') && Arr::get($value, 'name') && Arr::get($value, 'display');
            })->values(),
            'lang' => collect([
                'id' => [
                    'translation' => $lang_id
                ],
                'en' => [
                    'translation' => $lang_en
                ]
            ])
        ];

        if ($device == null) {
            return $result;
        } else {
            return array_merge([
                'token' => 'Bearer '.$user->createToken($device ?? 'device-'.auth()->user()->id)->plainTextToken,
            ], $result);
        }
    }
}

if (!function_exists('HelperDeveloperUserId')) {
    function HelperDeveloperUserId($request) {
        $type = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';
        $user = User::where($type, $request->username)->first() ?? collect();

        // check false account
        if ($user->count() < 1) {
            return 0;
        } else {
            // check false match password
            if(!Hash::check(Crypt::decryptString($request->password), $user->password)) {
                return 0;
            } else {
                return $user->id;
            }
        }
    }
}

if (!function_exists('HelperDeveloperLangEn')) {
    function HelperDeveloperLangEn() {
        return collect([
            [ "Active" => "Active" ],
            [ "Add" => "Add" ],
            [ "Add Language" => "Add Language" ],
        ]);
    }
}

if (!function_exists('HelperDeveloperLangId')) {
    function HelperDeveloperLangId() {
        return collect([
            [ "Active" => "Aktif" ],
            [ "Add" => "Tambah" ],
            [ "Add Language" => "Tambah Bahasa" ],
            [ "All" => "Semua" ],
            [ "April" => "April" ],
            [ "Are you sure you want to delete this data" => "Apakah anda yakin ingin menghapus data ini" ],
            [ "Are you sure you want to delete this data permanently" => "Apakah anda yakin ingin menghapus data ini secara permanen" ],
            [ "Are you sure you want to update this data" => "Anda yakin ingin memperbarui data ini" ],
            [ "Are you sure you want to restore this data" => "Apakah anda yakin ingin memulihkan data ini" ],
            [ "August" => "Agustus" ],
            [ "Back" => "Kembali" ],
            [ "Cancel" => "Batal" ],
            [ "Code" => "Kode" ],
            [ "Create another" => "Buat yang lain" ],
            [ "Data deleted successfully." => "Data berhasil dihapus." ],
            [ "Data not found." => "Data tidak ditemukan." ],
            [ "Data was restored successfully." => "Pemulihan data berhasil." ],
            [ "Data row only one." => "Baris data hanya satu." ],
            [ "Data was saved successfully." => "Data berhasil disimpan." ],
            [ "Data successfully downloaded." => "Data berhasil diunduh." ],
            [ "Date" => "Tanggal" ],
            [ "Date Of Birth" => "Tanggal Lahir" ],
            [ "December" => "Desember" ],
            [ "Delete" => "Hapus" ],
            [ "Permanent Delete" => "Hapus Permanen" ],
            [ "Display" => "Tampilan" ],
            [ "Download" => "Unduh" ],
            [ "Edit" => "Ubah" ],
            [ "Edit Language" => "Ubah Bahasa" ],
            [ "Failed to be printed." => "Gagal dicetak." ],
            [ "February" => "Februari" ],
            [ "Flush Cache" => "Bersihkan Cache" ],
            [ "Friday" => "Jumat" ],
            [ "Information" => "Informasi" ],
            [ "January" => "Januari" ],
            [ "Join" => "Bergabung" ],
            [ "Language" => "Bahasa" ],
            [ "July" => "Juli" ],
            [ "June" => "Juni" ],
            [ "Lock Account" => "Kunci Akun" ],
            [ "March" => "Maret" ],
            [ "Master" => "Master" ],
            [ "May" => "Mei" ],
            [ "Message" => "Pesan" ],
            [ "Name" => "Nama" ],
            [ "No" => "Tidak" ],
            [ "November" => "November" ],
            [ "Main Menu" => "Menu Utama" ],
            [ "module-dashboard" => "Dashboard" ],
            [ "module-pathname-privileges-permission" => "Izin" ],
            [ "module-pathname-privileges-role" => "Peran" ],
            [ "module-pathname-privileges-user" => "Pengguna" ],
            [ "Monday" => "Senin" ],
            [ "October" => "Oktober" ],
            [ "pathname-dashboard" => "Dashboard" ],
            [ "pathname-privileges-language" => "Bahasa" ],
            [ "pathname-privileges-language-create" => "Tambah Bahasa" ],
            [ "pathname-privileges-language-destroy" => "Hapus Bahasa"],
            [ "pathname-privileges-language-edit" => "Ubah Bahasa" ],
            [ "pathname-privileges-language-trash" => "Sampah Bahasa" ],
            [ "pathname-privileges-permission" => "Izin" ],
            [ "pathname-privileges-role-data" => "Data" ],
            [ "pathname-privileges-role-data-create" => "Tambah Data" ],
            [ "pathname-privileges-role-data-destroy" => "Hapus Data" ],
            [ "pathname-privileges-role-data-edit" => "Ubah Data" ],
            [ "pathname-privileges-role-data-trash" => "Sampah Data" ],
            [ "pathname-privileges-role-type" => "Jenis" ],
            [ "pathname-privileges-role-type-create" => "Tambah Jenis" ],
            [ "pathname-privileges-role-type-destroy" => "Hapus Jenis" ],
            [ "pathname-privileges-role-type-edit" => "Ubah Jenis" ],
            [ "pathname-privileges-role-type-trash" => "Sampah Jenis" ],
            [ "pathname-privileges-type" => "Jenis" ],
            [ "pathname-privileges-type-create" => "Tambah Jenis" ],
            [ "pathname-privileges-type-destroy" => "Hapus Jenis" ],
            [ "pathname-privileges-type-edit" => "Ubah Jenis" ],
            [ "pathname-privileges-type-trash" => "Sampah Jenis" ],
            [ "pathname-privileges-user" => "Pengguna" ],
            [ "pathname-privileges-user-create" => "Tambah Pengguna" ],
            [ "pathname-privileges-user-destroy" => "Hapus Pengguna" ],
            [ "pathname-privileges-user-download-excel" => "Unduh Excel Pengguna" ],
            [ "pathname-privileges-user-download-pdf" => "Unduh Pdf Pengguna" ],
            [ "pathname-privileges-user-edit" => "Ubah Pengguna" ],
            [ "pathname-privileges-user-print" => "Cetak Laporan Pengguna" ],
            [ "pathname-privileges-user-show" => "Lihat Pengguna" ],
            [ "pathname-privileges-user-trash" => "Sampah Pengguna" ],
            [ "pathname-setting-profile" => "Pengaturan Profile" ],
            [ "Permission" => "Izin" ],
            [ "Permissions" => "Izin" ],
            [ "Photo" => "Foto" ],
            [ "Print" => "Cetak" ],
            [ "Printed successfully." => "Berhasil dicetak." ],
            [ "Privileges" => "Hak Istimewa" ],
            [ "Profile" => "Profil" ],
            [ "Refresh" => "Segarkan" ],
            [ "Reload" => "Muat Ulang" ],
            [ "Report" => "Laporan" ],
            [ "Role" => "Peran" ],
            [ "Roles" => "Peran" ],
            [ "Restore" => "Pulihkan" ],
            [ "Restore All" => "Pulihkan Semua" ],
            [ "Saturday" => "Sabtu" ],
            [ "Sunday" => "Minggu" ],
            [ "Save" => "Simpan" ],
            [ "Search" => "Cari" ],
            [ "September" => "September" ],
            [ "Setting" => "Pengaturan" ],
            [ "Setting Profile" => "Pengaturan Profil" ],
            [ "Setting Language" => "Pengaturan Bahasa" ],
            [ "The data has been permanently deleted successfully." => "Data telah berhasil dihapus secara permanen." ],
            [ "The data has been successfully updated." => "Data telah berhasil diperbarui." ],
            [ "Thursday" => "Kamis" ],
            [ "Transaction" => "Transaksi" ],
            [ "Trash" => "Sampah" ],
            [ "Tuesday" => "Selasa" ],
            [ "Type" => "Jenis" ],
            [ "User" => "Pengguna" ],
            [ "User Report" => "Laporan Pengguna" ],
            [ "Users" => "Pengguna" ],
            [ "View" => "Lihat" ],
            [ "Wednesday" => "Rabu" ],
            [ "Yes" => "Ya" ],
        ]);
    }
}
