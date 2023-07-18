<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Backend\Api;
use App\Models\Privileges\Permission;
use App\Models\Privileges\User;
use App\Traits\Backend\ApiTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use ReflectionClass;
use ReflectionMethod;

class ApiController extends Controller
{
    use ApiTrait;

    public function index(Request $request)
    {
        return HelperTableGet($request, new Api(), [], [], [
            ['path', 'asc'],
        ], []);
    }

    public function update(Request $request)
    {
        DB::beginTransaction();
        try {
            $request->validate([
                'username' => 'string',
                'password' => 'string',
            ]);

            $loginType = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

            // get user
            $user = User::where($loginType, $request->username)->first() ?? collect();

            // check false account
            if ($user->count() < 1) {
                return response()->json([
                    'message' => "Account not found."
                ], 404);
            } else {
                // check false match password
                if(!Hash::check(Crypt::decryptString($request->password), $user->password)) {
                    return response()->json([
                        'message' => "Account not found."
                    ], 404);
                } else {
                    $result = collect();
                    $data = collect($this->listData('Http/Controllers'));
                    $dataIgnore = collect(['.DS_Store', 'Auth', 'Backend', 'Controller.php']);
                    $dataFilter = $data->filter(function ($value) use ($dataIgnore) {
                        return $dataIgnore->intersect([$value])->count() < 1;
                    });

                    foreach ($dataFilter as $file) {
                        if (strpos(strval($file), 'Controller.php')) {
                            $folder = '';
                            $pathMethod = 'App\Http\Controllers\\'.Str::replace('.php', '', $file);
                            foreach ($this->getMethod($pathMethod) as $ref) {
                                $result->push($this->setMethod($folder, $file, $ref, $pathMethod));
                            }
                        } else {
                            foreach ($this->listData('Http/Controllers/'.$file) as $file2) {
                                if (strpos(strval($file2), 'Controller.php')) {
                                    $folder2 = $file;
                                    $pathMethod2 = 'App\Http\Controllers\\'.$file.'\\'.Str::replace('.php', '', $file2);
                                    foreach ($this->getMethod($pathMethod2) as $ref2) {
                                        $result->push($this->setMethod($folder2, $file2, $ref2, $pathMethod2));
                                    }
                                } else {
                                    foreach ($this->listData('Http/Controllers/'.$file.'/'.$file2) as $file3) {
                                        if (strpos(strval($file3), 'Controller.php')) {
                                            $folder3 = $file.' '.$file2;
                                            $pathMethod3 = 'App\Http\Controllers\\'.$file.'\\'.$file2.'\\'.Str::replace('.php', '', $file3);
                                            foreach ($this->getMethod($pathMethod3) as $ref3) {
                                                $result->push($this->setMethod($folder3, $file3, $ref3, $pathMethod3));
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    foreach ($result as $item) {
                        $api = Api::where('controller', Arr::get($item, 'controller'))->where('action', Arr::get($item, 'action'))->get();
                        if ($api->count() < 1) {
                            // new api
                            $modelApi             = new Api();
                            $modelApi->method_id  = Arr::get($item, 'method_id');
                            $modelApi->methods    = Arr::get($item, 'methods');
                            $modelApi->controller = Arr::get($item, 'controller');
                            $modelApi->uri        = Arr::get($item, 'uri');
                            $modelApi->path       = Arr::get($item, 'path');
                            $modelApi->permission = Arr::get($item, 'permission');
                            $modelApi->middleware = Arr::get($item, 'middleware');
                            $modelApi->action     = Arr::get($item, 'action');
                            $modelApi->created_by = $user->id;
                            $modelApi->updated_by = $user->id;
                            $modelApi->save();
                        } else {
                            if ($api->first()->methods != Arr::get($item, 'methods')) {
                                // update methods
                                $modelMethods = Api::findOrFail($api->first()->id);
                                $modelMethods->methods    = Arr::get($item, 'methods');
                                $modelMethods->updated_by = $user->id;
                                $modelMethods->save();
                            } else if ($api->first()->middleware != Arr::get($item, 'middleware')) {
                                // update middleware
                                $modelMiddleware = Api::findOrFail($api->first()->id);
                                $modelMiddleware->middleware = Arr::get($item, 'middleware');
                                $modelMiddleware->updated_by = $user->id;
                                $modelMiddleware->save();
                            }
                        }

                        // new permission
                        if (Arr::get($item, 'middleware')) {
                            $permission = Permission::where('name', Arr::get($item, 'permission'))->get();
                            if ($permission->count() < 1) {
                                $modelPermission             = new Permission();
                                $modelPermission->name       = Arr::get($item, 'permission');
                                $modelPermission->display    = Arr::get($item, 'module');
                                $modelPermission->guard_name = 'api';
                                $modelPermission->created_by = $user->id;
                                $modelPermission->updated_by = $user->id;
                                $modelPermission->save();
                            }
                        }
                    }


                    // delete
                    $apis = Api::get();
                    foreach ($apis as $api) {
                        $isExistApi = $result->where('controller', $api->controller)->where('action', $api->action);
                        if ($isExistApi->count() < 1) {
                            $modelApi = Api::findOrFail($api->id);
                            $modelApi->forceDelete();
                        }
                    }


                    DB::commit();

                    return response()->json([
                        'message' => HelperMessageSuccessUpdate()
                    ]);
                }
            }
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }
    }

    private function listData($path)
    {
        return array_diff(scandir(app_path($path)), array('..', '.'));
    }

    private function getMethod($file)
    {
        $rClass = new ReflectionClass($file);
        return Arr::where($rClass->getMethods(ReflectionMethod::IS_PUBLIC), function ($valueReflection) use($file) {
            return Str::replace("\\", "/", $valueReflection->class) == Str::replace("\\", "/", $file) && $valueReflection->name != 'verbs' && $valueReflection->name != 'global' && $valueReflection->name != '__construct';
        });
    }

    private function setMethod($folder, $file, $ref, $path)
    {
        return [
            'module'     => $this->module($folder, $file, $ref->name),
            'method_id'  => Arr::get($this->method($path, $ref->name), 'id'),
            'methods'    => Arr::get($this->method($path, $ref->name), 'name'),
            'controller' => '\\'.$path,
            'uri'        => $this->uri($folder, $file, $ref),
            'path'       => $this->path($folder, $file, $ref),
            'permission' => $this->permission($folder, $file, $ref),
            'middleware' => $this->access($path, $ref->name),
            'action'     => $ref->name,
        ];
    }
}
