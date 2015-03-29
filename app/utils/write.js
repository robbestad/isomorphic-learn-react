var write = module.exports = (string, type, res) => {
  res.setHeader("Cache-Control", "public, max-age=172800"); // 2419200 14 days
  res.setHeader("Expires", new Date(Date.now() + 172800).toUTCString()); // 345600000
  res.writeHead(200, {
    'Content-Length': string.length,
    'Content-Type': type
  });
  res.write(string);
  res.end();
};


