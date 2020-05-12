const fs = require("fs");
const path = require("path");

export const writeJSON = (jsonData) => {
  fs.writeFile(
    path.join(__dirname, "../data/post.json"),
    JSON.stringify(jsonData),
    "utf8",
    (err) => {
      if (err) console.log(err);
    }
  );
};

export const readJSON = () => {
  const jsonRAW = fs.readFileSync(
    path.join(__dirname, "../data/post.json"),
    (err) => {
      if (err) console.log(err);
    }
  );
  return JSON.parse(jsonRAW);
};

export const getLastPostID = () => {
  const data = readJSON();
  let i = 0;
  data.map((e) => {
    if (e.order > i) i = e.order;
  });
  return i;
};

export const modifyOrder = (order, newOrder) => {
  let data = readJSON();
  data.map((e, index) => {
    if (e.order == order) {
      data[index].order = newOrder;
    }
  });
  writeJSON(data);
};
