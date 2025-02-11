<!DOCTYPE html>
<html lang="id">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Rapor Siswa</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			margin: 20px;
		}

		h2,
		h3 {
			text-align: center;
		}

		table {
			width: 100%;
			border-collapse: collapse;
			margin-top: 20px;
		}

		th,
		td {
			border: 1px solid black;
			padding: 8px;
			text-align: center;
		}

		th {
			background-color: #f2f2f2;
		}

		.info-table td {
			text-align: left;
		}
	</style>
</head>

<body>

	<h2>RAPOR PESERTA DIDIK</h2>
	<h3>{{$semester->nama_semester}} - {{$semester->tahun_ajaran}}</h3>

	<!-- Informasi Siswa -->
	<table class="info-table" style="margin-bottom: 20px;">
		<tr>
			<td><strong>Nama</strong></td>
			<td>: {{ $siswa->nama }}</td>
			<td><strong>NISN</strong></td>
			<td>: {{ $siswa->nisn }}</td>
		</tr>
		<tr>
			<td><strong>Kelas</strong></td>
			<td>: {{ $kelas->nama_kelas }}</td>
			<td><strong>Wali Kelas</strong></td>
			<td>: {{ $walikelas->nama }}</td>
		</tr>
	</table>

	<h3>Nilai Akademik</h3>
	<table>
		<thead>
			<tr>
				<th>No</th>
				<th>Mata Pelajaran</th>
				<th>Nilai</th>
				<th>Capaian Kompetensi</th>
			</tr>
		</thead>
		<tbody>
			@if($nilai->isEmpty())
			<tr>
				<td colspan="4" style="text-align: center; color: red;">Data nilai akademik belum tersedia.</td>
			</tr>
			@else
			@foreach($nilai as $key => $n)
			<tr>
				<td>{{ $key + 1 }}</td>
				<td>{{ $n->mapel->nama_mapel }}</td>
				<td>{{ $n->nilai }}</td>
				<td>{{ $n->capaian_kompetensi }}</td>
			</tr>
			@endforeach
			@endif
		</tbody>
	</table>

	<!-- Tabel Nilai Ekstrakurikuler -->
	<h3>Nilai Ekstrakurikuler</h3>
	<table>
		<thead>
			<tr>
				<th>No</th>
				<th>Ekstrakurikuler</th>
				<th>Keterangan</th>
			</tr>
		</thead>
		<tbody>
			@if($nilaiExtra->isEmpty())
			<tr>
				<td colspan="3" style="text-align: center; color: red;">Data nilai ekstrakurikuler belum tersedia.</td>
			</tr>
			@else
			@foreach($nilaiExtra as $key => $ne)
			<tr>
				<td>{{ $key + 1 }}</td>
				<td>{{ $ne->extra->nama_extra }}</td>
				<td>{{ $ne->Keterangan }}</td>
			</tr>
			@endforeach
			@endif
		</tbody>
	</table>

	<!-- Tabel Absensi -->
	<h3>Absensi</h3>
	<table>
		<thead>
			<tr>
				<th>Sakit</th>
				<th>Izin</th>
				<th>Alpa</th>
			</tr>
		</thead>
		<tbody>
			@if($jumlahSakit == 0 && $jumlahIzin == 0 && $jumlahAlpa == 0)
			<tr>
				<td colspan="3" style="text-align: center; color: red;">Data absensi belum tersedia.</td>
			</tr>
			@else
			<tr>
				<td>{{ $jumlahSakit }}</td>
				<td>{{ $jumlahIzin }}</td>
				<td>{{ $jumlahAlpa }}</td>
			</tr>
			@endif
		</tbody>
	</table>

	<!-- Tanda Tangan -->
	<table style="margin-top: 120px; width: 100%;">
		<tr>
			<td style="text-align: center; border:none">
				<p>Orang Tua / Wali</p>
				<br><br><br><br><br>
				<p>________________________</p>
			</td>
			<td style="text-align: center; border: none">
				<p>Wali Kelas</p>
				<br><br><br>
				<p><strong>{{ $walikelas->nama }}</strong></p>
				<p>________________________</p>
			</td>
		</tr>

	</table>
	<div style="text-align: center; border: none; width: 100%;">
		<p>Kepala Sekolah</p>
		<br><br><br>
		<p>________________________</p>
	</div>


</body>

</html>