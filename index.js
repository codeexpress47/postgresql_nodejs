// git add --all
// git commit -am 'v1.0'
// git push -u origin main

var xpress = require("express");
var app = xpress();

app.use(xpress.json({ limit: "1mb" }));
app.use(xpress.urlencoded({ extended: true, limit: "1mb" }));

app.listen(9000, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Api running...");
  }
});

app.get("/", (req, res) => {
  res.send({ status: "Api running..." });
});

// ==================== CODE ================

app.use("/master/user_login/", require("./master/user_login.js"));
