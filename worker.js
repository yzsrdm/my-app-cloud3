let count = 0;

onmessage = function(event) {
  const size = event.data.size;

  const interval = setInterval(() => {
    if (count < size && count < 26) {
      // Kirim huruf dan ID iterasi
      postMessage({ id: count + 1, huruf: String.fromCharCode(65 + count) }); // Menggunakan count untuk mendapatkan huruf dari A hingga Z
      count++;
    } else {
      clearInterval(interval); // Hentikan interval jika sudah mencapai input atau huruf Z
      // Kirim pesan akhir jika sudah selesai
      postMessage({ id: count + 1, huruf: "Huruf Habis" }); // Menampilkan "Huruf Habis" pada akhir
    }
  }, 1000); // Kirim setiap 1 detik
};