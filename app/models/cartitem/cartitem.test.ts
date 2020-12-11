import { CartitemModel, Cartitem } from "./cartitem"

test("can be created", () => {
  const instance: Cartitem = CartitemModel.create({})

  expect(instance).toBeTruthy()
})