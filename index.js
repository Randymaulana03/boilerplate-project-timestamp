const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/api/:date?', (req, res) => {
  let dateParam = req.params.date;

  if (!dateParam) {
    // Kalau kosong, kirim waktu sekarang
    const now = new Date();
    return res.json({
      unix: now.getTime(),
      utc: now.toUTCString()
    });
  }

  // Jika dateParam berupa angka (unix timestamp)
  if (!isNaN(dateParam)) {
    dateParam = parseInt(dateParam);
  }

  const date = new Date(dateParam);

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('App is listening on port ' + listener.address().port);
});
