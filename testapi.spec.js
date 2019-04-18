import request from "supertest";
import { app, listTodos } from "./index";

describe.skip("/GET", () => {
  test("Lay tat ca danh sach Todo", done => {
    request(app)
      .get("/todos")
      .expect(200)
      .end((err, res) => {
        expect(res.body.data).toEqual(listTodos);
        done();
      });
  });

  test("Lay todo theo id", done => {
    request(app)
      .get("/todos/" + listTodos[0].id)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data).toEqual(listTodos[0]);
        done();
      });
  });

  test("Tra ve loi neu todo khong ton tai", done => {
    request(app)
      .get("/todos/" + listTodos[0].id + "x")
      .expect(404)
      .end((err, res) => {
        done();
      });
  });
});

describe("/POST", () => {
  test("Tao moi todo", done => {
    request(app)
      .post("/todos")
      .send({ todo: "xxx" })
      .expect(200)
      .end((err, res) => {
        expect(res.body.data.todo).toBe("xxx");
        expect(listTodos[listTodos.length - 1].todo).toBe("xxx");
        done();
      });
  });
});
describe("/DELETE", () => {
  test("Xoa todo theo id", done => {
    const fakeId = listTodos[0].id;
    request(app)
      .delete("/todos/" + fakeId)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data == fakeId).toEqual(true);
        listTodos.forEach(todo => expect(todo.id == fakeId).toEqual(false));
        done();
      });
  });

  test("Tra ve loi neu todo khong ton tai", done => {
    request(app)
      .delete("/todos/" + listTodos[0].id + "x")
      .expect(404)
      .end((err, res) => {
        done();
      });
  });
});
describe("/PATCH", () => {
  test("Update todo theo id", done => {
    const fakeData = {
      id: listTodos[0].id,
      todo: "xxx",
      done: true
    };
    request(app)
      .patch("/todos/" + fakeData.id)
      .send(fakeData)
      .expect(200)
      .end((err, res) => {
        expect(res.body.data).toEqual(fakeData);
        done();
      });
  });

  test("Tra ve loi neu todo khong ton tai", done => {
    request(app)
      .patch("/todos/" + listTodos[0].id + "x")
      .expect(404)
      .end((err, res) => {
        done();
      });
  });
});
