router.get('/:date?', (req, res) => {
  const { date } = req.params;

  let parsedDate;

  // Kasus: tidak ada parameter, pakai waktu sekarang
  if (!date) {
    parsedDate = new Date();
  }
  // Kasus: angka saja → parse sebagai UNIX timestamp
  else if (/^\d+$/.test(date)) {
    parsedDate = new Date(Number(date));
  }
  // Kasus: format tanggal string (ISO)
  else {
    parsedDate = new Date(date);
  }

  // Cek validitas
  if (parsedDate.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  // Balikan hasil yang valid
  res.json({
    unix: parsedDate.getTime(),
    utc: parsedDate.toUTCString(),
  });
});
