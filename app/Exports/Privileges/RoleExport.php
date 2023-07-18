<?php

namespace App\Exports\Privileges;

use App\Models\Privileges\RoleView;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;
use Maatwebsite\Excel\Concerns\WithCustomStartCell;
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Events\AfterSheet;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;
use PhpOffice\PhpSpreadsheet\Style\Fill;

class RoleExport implements FromCollection, ShouldAutoSize, WithHeadings, WithCustomStartCell, WithEvents
{
    protected $title;
    protected $filter;
    protected $headings;
    protected $collection;

    public $titleSpace = 2;
    public $filterSpace = 2;

    public function __construct(Request $request)
    {
        $this->title = $request->titleFile;
        $this->filter = collect($request->datatable_filter);
        $this->headings = collect($request->datatable_column)->pluck('display')->toArray();
        $this->collection = RoleView::select(collect($request->datatable_column)->pluck('column')->toArray())
        ->when(collect($request->datatable_filter)->count() > 0, function ($query) use($request) {
            foreach (collect($request->datatable_filter) as $item) {
                if ($item['type'] == 'text' || $item['type'] == 'select' || $item['type'] == 'date') {
                    $query->whereRaw('LOWER("'.$item['key'].'") LIKE ? ', ['%'.Str::lower($item['value']).'%']);
                } else if ($item['type'] == 'daterange') {
                    $query->whereBetween($item['key'], Str::of($item['value'])->explode(' - '));
                }
            }
        })->orderByRaw('LOWER(name) asc')->get();
    }

    public function headings(): array
    {
        return $this->headings;
    }

    public function startCell(): string
    {
        return 'B'.($this->titleSpace+$this->filter->count()+$this->filterSpace);
    }

    public function registerEvents(): array
    {
        return [
            AfterSheet::class => function(AfterSheet $event) {
                $setColumnExcel = [];
                $getColumnExcel = collect($this->headings)->count();
                for($x = 0; $x < $getColumnExcel; $x++) {
                    foreach (['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'] as $v) {
                        $setColumnExcel[] = $x == 0 ? $v : $setColumnExcel[$x-1] . $v;
                    }
                }

                // Title
                $event->sheet->setCellValue('A1', $this->title);
                $event->sheet->mergeCells('A1:'.$setColumnExcel[$getColumnExcel].'1');
                $event->sheet->getStyle('A1:'.$setColumnExcel[$getColumnExcel].'1')->applyFromArray([
                    'height' => 500,
                    'alignment' => [
                        'horizontal' => Alignment::HORIZONTAL_CENTER,
                    ],
                    'font' => [
                        'bold' => true,
                        'size' => 20
                    ],
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_NONE,
                            'color' => [
                                'rgb' => '000000'
                            ]
                        ],
                    ],
                ]);

                // Filter
                foreach ($this->filter as $keyFilter => $valFilter) {
                    $cellFilter = $this->filter->count()+1+$keyFilter+1;
                    $event->sheet->mergeCells('A'.$cellFilter.':'.$setColumnExcel[$getColumnExcel].$cellFilter);
                    $event->sheet->setCellValue('A'.$cellFilter, Arr::get($valFilter, 'display').' : '.Arr::get($valFilter, 'value'));
                }

                // No
                $event->sheet->setCellValue('A'.($this->titleSpace+$this->filter->count()+$this->filterSpace), '#');
                $event->sheet->getStyle('A'.($this->titleSpace+$this->filter->count()+$this->filterSpace))->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => [
                                'rgb' => '000000'
                            ]
                        ],
                    ],
                    'font' => [
                        'bold' => true,
                        'color' => [
                            'rgb' => 'FFFFFF'
                        ]
                    ],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'color' => [
                            'rgb' => '9BBB59'
                        ]
                    ],
                ]);
                for ($i = 1; $i <= $this->collection->count(); $i++) {
                    $event->sheet->setCellValue('A'.($this->titleSpace+$this->filter->count()+$this->filterSpace+$i), $i);
                    $event->sheet->getStyle('A'.($this->titleSpace+$this->filter->count()+$this->filterSpace+$i))->applyFromArray([
                        'alignment' => [
                            'horizontal' => Alignment::HORIZONTAL_LEFT,
                        ],
                        'borders' => [
                            'allBorders' => [
                                'borderStyle' => Border::BORDER_THIN,
                                'color' => [
                                    'rgb' => '000000'
                                ]
                            ],
                        ],
                    ]);
                }

                // Collection Heading
                $event->sheet->getStyle('B'.($this->titleSpace+$this->filter->count()+$this->filterSpace).':'.$setColumnExcel[$getColumnExcel].(($this->titleSpace+$this->filter->count()+$this->filterSpace)))->applyFromArray([
                    'borders' => [
                        'allBorders' => [
                            'borderStyle' => Border::BORDER_THIN,
                            'color' => [
                                'rgb' => '000000'
                            ]
                        ],
                    ],
                    'font' => [
                        'bold' => true,
                        'color' => [
                            'rgb' => 'FFFFFF'
                        ]
                    ],
                    'fill' => [
                        'fillType' => Fill::FILL_SOLID,
                        'color' => [
                            'rgb' => '9BBB59'
                        ]
                    ],
                ]);

                // Collection Content
                foreach ($this->collection as $cKey => $value) {
                    $keyContent = $cKey+1;

                    $event->sheet->getStyle('B'.($this->titleSpace+$this->filter->count()+$this->filterSpace+$keyContent).':'.$setColumnExcel[$getColumnExcel].(($this->titleSpace+$this->filter->count()+$this->filterSpace+$keyContent)))->applyFromArray([
                        'alignment' => [
                            'horizontal' => Alignment::HORIZONTAL_LEFT,
                        ],
                        'borders' => [
                            'allBorders' => [
                                'borderStyle' => Border::BORDER_THIN,
                                'color' => [
                                    'rgb' => '000000'
                                ]
                            ],
                        ],
                    ]);

                    // overide content
                    foreach (collect($value)->keys() as $keyColumn => $valColumn) {
                        if ($valColumn == 'users' || $valColumn == 'permissions') {
                            $colContent = $setColumnExcel[($keyColumn+1)].($this->titleSpace+$this->filter->count()+$this->filterSpace+$keyContent);

                            $event->sheet->setCellValue($colContent, $value[$valColumn] ? count(json_decode($value[$valColumn])) : 0);
                            $event->sheet->getStyle($colContent)->applyFromArray([
                                'alignment' => [
                                    'horizontal' => Alignment::HORIZONTAL_RIGHT,
                                ],
                            ]);
                        }
                    }
                }
            },
        ];
    }

    public function collection()
    {
        return $this->collection;
    }
}
