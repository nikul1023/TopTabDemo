import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ItemModel } from "../item/item";
import { CartitemModel } from "../cartitem/cartitem";

/**
 * Model description here for TypeScript hints.
 */
export const ItemStoreModel = types
  .model("ItemStore")
  .props({
    items : types.array(ItemModel),
    cartitems : types.array(CartitemModel),
    cartcount : types.optional(types.number,0),
  })
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
      setitems(){
        self.items.push({
          id: 1,
          name : 'Item1'
        },
        {
          id: 2,
          name : 'Item2'
        },
        {
          id: 3,
          name : 'Item3'
        },
        {
          id: 4,
          name : 'Item4'
        });
      },
      addtocart(itemid,name){
        const temp = self.cartitems.findIndex(item => item.id === itemid);
        if(temp === -1){
          self.cartitems.push({
            id : itemid,
            name: name ,
            count : 1 ,
          })
        }else{
          self.cartitems[temp].count = self.cartitems[temp].count + 1;
        }
        self.cartcount += 1 ;
      },
      removeitem(itemid){
          const temp = self.cartitems.findIndex(item => item.id === itemid);
          if(self.cartitems[temp].count === 1){
            self.cartitems.splice(temp,1)
          }else{
            self.cartitems[temp].count = self.cartitems[temp].count - 1;
          }
          self.cartcount -= 1 ;
      },
      clear(){
        self.items.clear();
      }

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

  /**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type ItemStoreType = Instance<typeof ItemStoreModel>
export interface ItemStore extends ItemStoreType {}
type ItemStoreSnapshotType = SnapshotOut<typeof ItemStoreModel>
export interface ItemStoreSnapshot extends ItemStoreSnapshotType {}
