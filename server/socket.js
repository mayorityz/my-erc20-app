const id = require("uniqid");
/**
 * socket handler.
 * @param {*} io client.
 * @param {string} channel  chat channel btw clients.
 */
const socket = (io) => {
  io.on("connection", (client) => {
    const ROOMID = client.handshake.query.roomid;
    client.join(ROOMID);
    console.log("New Connection");

    client.on("disconnect", (reason) => {
      console.log("client disconnected : ", reason);
    });

    // chat area.
    client.on(ROOMID, (msg) =>
      io.in(ROOMID).emit(ROOMID, { ...msg, msgid: id() })
    );
  });
};

module.exports = socket;
