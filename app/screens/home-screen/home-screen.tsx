import React,{useState,useEffect} from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle,View,TouchableOpacity,StyleSheet,FlatList} from "react-native"
import { Screen, Text, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color } from "../../theme"
import { toJS } from "mobx"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.white,
  flex: 1,
  alignItems:"center"
}

export const HomeScreen = observer(function HomeScreen() {
  // Pull in one of our MST stores
   const { itemStore } = useStores()
  // OR
  // const rootStore = useStores()
  const [selected,setSelected] = useState(0);

  const selectTab =(tabindex) =>{
    setSelected(tabindex);
  }

  useEffect(() => {
    itemStore.clear();
    itemStore.setitems();
  }, [])

  
  const RenderItem = ({ name,id }) => {
    return (
      <View style= {styles.LIST_ITEM}>
        <Text text={name} preset='list' />
        <Button text='Add to cart' onPress={()=> itemStore.addtocart(id,name)} />
      </View>
    )
  }
  const RenderCartItem = ({ id,name,count }) => {
    return (
      <View style= {styles.LIST_ITEM}>
        <Text preset='list' text={name} />
        <Text preset ='list' text={count} />
        <Button text='Remove'  onPress={()=> itemStore.removeitem(id)} />
      </View>
    )
  }
  
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
     <View style={styles.tabContainer}>
          <TouchableOpacity onPress={() =>selectTab(0)} style={[styles.tab,{backgroundColor: selected == 0 ? color.primary : color.dim}]}>
              <Text style={{color: selected == 0 ? color.dim: color.background}}>Browse</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>selectTab(1)} style={[styles.tab,{backgroundColor: selected == 1 ? color.primary : color.dim}]}>
              <Text style={{color: selected == 1 ? color.dim : color.background}}>Cart({itemStore.cartcount})</Text>
          </TouchableOpacity>
     </View>
    {selected === 0 ? 
    <FlatList
    data={toJS(itemStore.items)}
    renderItem={({ item,index }) => <RenderItem name={item.name} id={item.id}/>}
    keyExtractor={(item, index) => index.toString()}
    />
    :
    <FlatList
    data={toJS(itemStore.cartitems)}
    renderItem={({ item,index }) => <RenderCartItem id={item.id} name={item.name} count={item.count}/>}
    keyExtractor={(item, index) => index.toString()}
    />
    }
    </Screen>
  )
})
const styles = StyleSheet.create({
tabContainer:{
  flexDirection:"row",
  height:29,
  borderRadius:30,
  width:'80%',
},
tab:{
  
  flex:1,
  justifyContent:'center',
  alignItems:'center'
},
LIST_ITEM:{
  borderColor: color.palette.lightGrey,
  borderWidth : 3,
  justifyContent:'space-around',
  flexDirection:'row',
  marginTop:10,
  paddingVertical:10,
  width : 250,

},
})