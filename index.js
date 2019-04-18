const express = require("express");
const bodyParser = require("body-parser");
// export để chạy unit test thôi
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
let listTodos = [
  {
    id: 1,
    todo: "Hoc bai cu",
    done: true
  },
  {
    id: 2,
    todo: "Uong nuoc",
    done: false
  },
  {
    id: 3,
    todo: "Hoc code",
    done: false
  }
];

// Lay tat ca danh sach todo
app.get("/todos", (req, res) => {
  res.json({
    data: listTodos,
    message: "Lay danh sach todo thanh cong"
  });
});

// Lay todo theo id
app.get("/todos/:id", (req, res) => {
  // B1: Lay param id
  const id = req.params.id;
  // Tìm index của todo theo id( sử dụng findIndex), nếu có todo thì index = todo index, nếu không có thì index = -1
  const index = listTodos.findIndex(todo => {
    return todo.id == id;
  });
  // Neu index = -1 => todo theo id khong ton tai, tra ve loi
  if (index === -1) {
    res.status(404);
    res.json({
      message: "Todo khong ton tai"
    });
  }

  // Neu index !== -1 => todo = listTodos[index]
  res.json({
    data: listTodos[index],
    message: "Lay todo thanh cong"
  });
});

// Tạo một todo
app.post("/todos", (req, res) => {
  const todo = req.body.todo;
  // tao mot todo
  const newTodo = {
    id: Math.random(), // tao 1 id ngau nhien
    todo: todo,
    done: false // false = chua lam xong
  };

  listTodos.push(newTodo);

  res.json({
    data: newTodo,
    message: "Tạo mới todo thành công"
  });
});

// Xoa 1 todo
app.delete("/todos/:id", (req, res) => {
  // B1: Lay param id

  const id = req.params.id;
  // Tìm index của todo theo id( sử dụng findIndex), nếu có todo thì index = todo index, nếu không có thì index = -1
  const index = listTodos.findIndex(todo => {
    return todo.id == id;
  });
  // Neu index = -1 => todo theo id khong ton tai, tra ve loi
  if (index === -1) {
    res.status(404);
    res.json({
      message: "Todo khong ton tai"
    });
  }

  // Neu index !== -1 => dung splice de xoa todo
  listTodos.splice(index, 1);
  res.json({
    data: id,
    message: "Xoa todo thanh cong"
  });
});

// Update 1 todo
app.patch("/todos/:id", (req, res) => {
  // B1: Lay param id
  const id = req.params.id;
  // Tìm index của todo theo id( sử dụng findIndex), nếu có todo thì index = todo index, nếu không có thì index = -1
  const index = listTodos.findIndex(todo => {
    return todo.id == id;
  });
  // Neu index = -1 => todo theo id khong ton tai, tra ve loi
  if (index === -1) {
    res.status(404);
    res.json({
      message: "Todo khong ton tai"
    });
  }

  // Tao moi 1 todo
  const newTodo = {
    ...listTodos[index],
    ...req.body
  };
  // Neu index !== -1 => dung splice de  cap nhat
  listTodos.splice(index, 1, newTodo);
  res.json({
    data: newTodo,
    message: "Cap nhat todo thanh cong"
  });
});

// khong can quan tam process env NODE_ENV
if (process.env.NODE_ENV !== "test") {
  app.listen(3333, () => {
    console.log("> Server running");
  });
}

module.exports = { app, listTodos };
