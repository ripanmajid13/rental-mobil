@extends('pdf')

@section('content')
    <h1 style="text-align: center; margin-bottom: 0">{{ $title }}</h1>

    @foreach($filter as $f)
        <p style="margin: 0">{{ $f['display'] }} : {{ $f['value'] }}</p>
    @endforeach

    <table class="table" style="width: 100%; margin-top: 10px" page-break-inside: always;>
		<thead>
			<tr>
                <th>#</th>
                @foreach($columns as $column)
                    <th>{{ $column['display'] }}</th>
                @endforeach
			</tr>
		</thead>
		<tbody>
            @forelse ($model as $k => $m)
                <tr>
                    <td>{{ $k+1 }}</td>
                    @foreach($columns as $column)
                        @if ($column['column'] == 'users' || $column['column'] == 'permissions')
                            <td align="right">{{ $m[$column['column']] ? count(json_decode($m[$column['column']])) : 0 }}</td>
                        @else
                            <td>{{ $m[$column['column']] }}</td>
                        @endif
                    @endforeach
                </tr>
            @empty
                <tr>
                    <td colspan="{{ count($columns)+1 }}" align="center">-</td>
                </tr>
            @endforelse
		</tbody>
	</table>
@endsection
