<?php

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

if (!function_exists('HelperTableGet')) {
    function HelperTableGet(Request $request, $model, $select = [], $where = [], $order = [], $additional = []) {
        $table = $model::when(count($select), function($query) use($select) {
            $query->select($select);
        })->when(count($where), function ($query) use($where) {
            collect($where)->each(function ($item) use($query) {
                if (count($item) == 2) {
                    $query->where(Arr::get($item, 0, ''), Arr::get($item, 1, ''));
                } else if (count($item) == 3) {
                    $query->where(Arr::get($item, 0, ''), Arr::get($item, 1, ''), Arr::get($item, 2, ''));
                }
            });
        })->when(count($request->table_search ?? []), function ($query) use($request) {
            collect($request->table_search)->each(function ($item) use($query) {
                if (collect(['text', 'select', 'date'])->intersect([Arr::get($item, 'type')])->count()) {
                    $query->whereRaw('LOWER("'.Arr::get($item, 'key').'") LIKE ? ', ['%'.Str::lower(Arr::get($item, 'value')).'%']);
                } else if (collect(['daterange'])->intersect([Arr::get($item, 'type')])->count()) {
                    $date = Str::of(Arr::get($item, 'value'))->explode(' - ');
                    if (count($date) == 2) {
                        $query->whereBetween(Arr::get($item, 'key'), [$date[0], $date[1] == "null" ? $date[0] : $date[1]]);
                    }
                }
            });
        })->when(count($order) || count($request->table_order ?? []), function ($query) use($request, $order) {
            if (count($request->table_order ?? [])) {
                if (count($request->table_order) == 2) {
                    $query->orderByRaw('LOWER("'.Arr::get($request->table_order, 'name').'") '.Arr::get($request->table_order, 'value'));
                }
            } else if (count($order)) {
                 collect($order)->each(function ($item) use($query) {
                    if (count($item) == 2) {
                        $query->orderByRaw('LOWER("'.Arr::get($item, 0, '').'") '.Arr::get($item, 1, ''));
                    }
                });
            }
        });

        $result = collect($table->paginate($request->paginate ?? 10));

        $result->forget('first_page_url');
        $result->forget('last_page_url');
        $result->forget('links');
        $result->forget('next_page_url');
        $result->forget('path');
        $result->forget('prev_page_url');

        $result->put('additional', count($additional) < 1 ? json_decode('{}') : collect($additional));

        return $result->all();
    }
}

if (!function_exists('HelperTableGetOnlyTrashed')) {
    function HelperTableGetOnlyTrashed(Request $request, $model, $select = [], $where = [], $order = [], $additional = []) {
        $table = $model::onlyTrashed()->when(count($select), function($query) use($select) {
            $query->select($select);
        })->when(count($where), function ($query) use($where) {
            collect($where)->each(function ($item) use($query) {
                if (count($item) == 2) {
                    $query->where(Arr::get($item, 0, ''), Arr::get($item, 1, ''));
                } else if (count($item) == 3) {
                    $query->where(Arr::get($item, 0, ''), Arr::get($item, 1, ''), Arr::get($item, 2, ''));
                }
            });
        })->when(count($request->table_search ?? []), function ($query) use($request) {
            collect($request->table_search)->each(function ($item) use($query) {
                if (collect(['text', 'select', 'date'])->intersect([Arr::get($item, 'type')])->count()) {
                    $query->whereRaw('LOWER("'.Arr::get($item, 'key').'") LIKE ? ', ['%'.Str::lower(Arr::get($item, 'value')).'%']);
                } else if (collect(['daterange'])->intersect([Arr::get($item, 'type')])->count()) {
                    $date = Str::of(Arr::get($item, 'value'))->explode(' - ');
                    if (count($date) == 2) {
                        $query->whereBetween(Arr::get($item, 'key'), [$date[0], $date[1] == "null" ? $date[0] : $date[1]]);
                    }
                }
            });
        })->when(count($order) || count($request->table_order ?? []), function ($query) use($request, $order) {
            if (count($request->table_order ?? [])) {
                if (count($request->table_order) == 2) {
                    $query->orderByRaw('LOWER("'.Arr::get($request->table_order, 'name').'") '.Arr::get($request->table_order, 'value'));
                }
            } else if (count($order)) {
                 collect($order)->each(function ($item) use($query) {
                    if (count($item) == 2) {
                        $query->orderByRaw('LOWER("'.Arr::get($item, 0, '').'") '.Arr::get($item, 1, ''));
                    }
                });
            }
        });

        $result = collect($table->paginate($request->paginate ?? 10));

        $result->forget('first_page_url');
        $result->forget('last_page_url');
        $result->forget('links');
        $result->forget('next_page_url');
        $result->forget('path');
        $result->forget('prev_page_url');

        $result->put('additional', count($additional) < 1 ? json_decode('{}') : collect($additional));

        return $result->all();
    }
}
