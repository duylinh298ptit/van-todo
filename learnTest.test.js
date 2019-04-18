import mdw from "./learnTest";

// const { isVerifyToken } = mdw;

const res = { json: jest.fn() };
const next = jest.fn();
const spy = jest.spyOn(mdw, "verifyToken");

it("test success", () => {
  const req = { token: "ds" };
  // co token va token hop le
  // next duoc chay 1 lan
  // res.json 0
  // expect(spyVerify).toHaveBeenCalled();
  // verifyToken.mockReturnValue(false);
  mdw.isVerifyToken(req, res, next);
  expect(spy).toHaveBeenCalled();
  // spyVerify.mockReturnValue(false);
  expect(res.json).not.toHaveBeenCalled();
  expect(next).toHaveBeenCalledTimes(1);
});
