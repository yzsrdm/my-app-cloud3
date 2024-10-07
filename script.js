let worker;
let currentCount = 0; // Menyimpan ID iterasi saat ini

document.getElementById('startWorker').addEventListener('click', () => {
  const size = parseInt(document.getElementById('duration').value);
  
  if (isNaN(size) || size < 1 || size > 26) { // Validasi input di sini
    alert("Please enter a valid size (1-26).");
    return;
  }

  // Jika worker sudah ada, kita hentikan
  if (worker) {
    worker.terminate();
  }

  // Mengatur ulang ID iterasi
  currentCount = 0;

  // Membuat worker baru
  worker = new Worker("worker.js");
  worker.postMessage({ size });

  // Menangani pesan dari worker
  worker.onmessage = function(event) {
    // Update hasil yang ditampilkan
    document.getElementById("count").innerText = event.data.huruf;

    // Tambahkan hasil ke dalam riwayat dengan ID
    const historyTable = document.getElementById("history");
    const row = document.createElement('tr');
    
    row.innerHTML = `
      <td>${event.data.id}</td>
      <td>${event.data.huruf}</td>
      <td>${new Date().toLocaleTimeString()}</td>
    `;
    historyTable.appendChild(row);

    // Mengupdate currentCount jika huruf bukan "Huruf Habis"
    if (event.data.huruf !== "Huruf Habis") {
      currentCount++;
    }
  };

  // Hentikan worker setelah 27 detik jika size lebih dari 26
  setTimeout(() => {
    if (worker) {
      worker.terminate();
      worker = undefined;
      document.getElementById("count").innerText = "Huruf Habis";

      // Tambahkan "Huruf Habis" ke dalam riwayat
      const historyTable = document.getElementById("history");
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${currentCount + 1}</td>
        <td>Huruf Habis</td>
        <td>${new Date().toLocaleTimeString()}</td>
      `;
      historyTable.appendChild(row);
    }
  }, 27000); // 27000 ms = 27 detik
});

document.getElementById('stopWorker').addEventListener('click', () => {
  if (worker) {
    worker.terminate();
    worker = undefined;
    document.getElementById("count").innerText = ""; // Kosongkan hasil
  }
});

// Fungsi untuk mereset riwayat
document.getElementById('resetHistory').addEventListener('click', () => {
  document.getElementById("history").innerHTML = ""; // Menghapus isi riwayat
});