/**
 * socket handler.
 * @param {*} io client.
 * @param {string} channel  chat channel btw clients.
 */
const socket = (io) => {
  io.on("connection", (client) => {
    console.log("New Connection");

    client.on("disconnect", () => {
      console.log("client disconnected");
    });

    // chat area.
    client.on(`chat message`, (msg) => {
      console.log(msg);
    });
    client.emit("chat message", { data: "say good bye to holiday..." });
  });
};

module.exports = socket;
