<?php
namespace App\Traits\Backend;

use Illuminate\Support\Arr;
use Illuminate\Support\Str;

trait ApiTrait
{
    public function module($folder, $file, $name)
    {
        if ($name == '__invoke') {
            return ltrim($folder.' '.rtrim(preg_replace('/(?<!^)[A-Z]/', ' $0', Str::replace('Controller.php', '', $file))));
        } else {
            $array = preg_split('/(?=[A-Z])/', $name);

            if ($array[0] == "store") {
                $array[0] = "Create";
            } else if ($array[0] == "update") {
                $array[0] = "Edit";
            } else {
                if ($array[0] == 'index') {
                    unset($array[0]);
                } else {
                    $array[0] = ucfirst($array[0]);
                }
            }

            return ltrim($folder.' '.rtrim(preg_replace('/(?<!^)[A-Z]/', ' $0', Str::replace('Controller.php', '', $file)).' '.implode(" ", $array)));
        }
    }

    public function method($path, $name)
    {
        $controller = new $path();

        if (method_exists($controller, 'verbs')) {
            $methods = Arr::get($controller->verbs(), $name, ["POST"]);
        } else {
            $methods = ["POST"];
        }

        if (count(array_intersect(["POST"], $methods))) {
            $id = 1;
        } else if(count(array_intersect(["PUT"], $methods)) ) {
            $id = 2;
        } else if (count(array_intersect(["DELETE"], $methods))) {
            $id = 3;
        } else {
            $id = 4;
        }

        return [
            'id' => $id,
            'name' => json_encode($methods)
        ];
    }

    public function uri($folder, $file, $ref)
    {
        $path = $folder ? Str::lower(Str::replace(" ", "-", $folder)).'-' : '';
        $controller = '/'.$path.strtolower(preg_replace('/(?<!^)[A-Z]/', '-$0', Str::replace('Controller.php', '', $file)));

        $params = collect(Arr::where($ref->getParameters(), function ($value) {
            return $value->name != 'request';
        }))->pluck('name');
        $setParams = $params->count() < 1 ? '' : '/'.collect(Arr::where($ref->getParameters(), function ($value) {
            return $value->name != 'request';
        }))->pluck('name')->map(function ($item) {
            return '{'.$item.'}';
        })->implode('/');

        if ($ref->name == '__invoke' || $ref->name == 'index') {
            return $controller.$setParams;
        } else {
            return $controller.$setParams.'/'.strtolower(preg_replace('/(?<!^)[A-Z]/', '-$0', $ref->name));
        }
    }

    public function path($folder, $file, $ref)
    {
        $path = $folder ? Str::lower(Str::replace(" ", "-", $folder)).'-' : '';
        $controller = '/'.$path.strtolower(preg_replace('/(?<!^)[A-Z]/', '-$0', Str::replace('Controller.php', '', $file)));

        $params = collect(Arr::where($ref->getParameters(), function ($value) {
            return $value->name != 'request';
        }))->pluck('name');
        $setParams = $params->count() < 1 ? '' : '/'.collect(Arr::where($ref->getParameters(), function ($value) {
            return $value->name != 'request';
        }))->pluck('name')->map(function ($item) {
            return ':'.$item;
        })->implode('/');

        if ($ref->name == '__invoke' || $ref->name == 'index') {
            return $controller.$setParams;
        } else {
            return $controller.$setParams.'/'.strtolower(preg_replace('/(?<!^)[A-Z]/', '-$0', $ref->name));
        }
    }

    public function permission($folder, $file, $ref)
    {
        $path = $folder ? Str::lower(Str::replace(" ", "-", $folder)).'-' : '';
        $controller = $path.strtolower(preg_replace('/(?<!^)[A-Z]/', '-$0', Str::replace('Controller.php', '', $file)));
        $method = preg_split('/(?=[A-Z])/', $ref->name);

        if ($method[0] == "store") {
            $method[0] = "create";
        }

        if ($method[0] == "update") {
            $method[0] = "edit";
        }

        if ($ref->name == '__invoke' || $ref->name == 'index') {
            return $controller;
        } else {
            return $controller.'-'.strtolower(preg_replace('/(?<!^)[A-Z]/', '-$0', implode("", $method)));
        }
    }

    public function access($route, $name)
    {
        $controller = new $route();

        if (method_exists($controller, 'global')) {
            return !$controller->global()->contains(function ($value) use($name) {
                return $value == $name;
            });
        } else {
            return true;
        }
    }
}
