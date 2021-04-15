const { Client } = require("pg");

const client = new Client({
  connectionString:
    "postgres://bhcowfyjkwipjn:d047fadc44a007294f1c277e3bf8ba451e18259c3d38dd86bf2487894b88af81@ec2-34-225-167-77.compute-1.amazonaws.com:5432/d9r4mviktd840m",
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect();

client.query(
  "SELECT table_schema,table_name FROM information_schema.tables;",
  (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      console.log(JSON.stringify(row));
    }
    client.end();
  }
);
