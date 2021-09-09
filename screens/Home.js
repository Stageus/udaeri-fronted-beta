import React from 'react';
// import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions  } from 'react-native';
import {AntDesign, Ionicons ,FontAwesome,Entypo,Fontisto   } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";
import Bottom from '../components/Navigator'


const Home = ({navigation}) => {
  const onPressMain = () => navigation.navigate('Main');
  const onPressSearch = () => navigation.navigate('Search');
  const onPressMyPage = () => navigation.navigate('MyPage');


  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;


  const categoryList = [
    {category: "먹거리", icon: <Ionicons name="fast-food" style={styles.categoryIcon} color="white" />},
    {category: "카페/베이커리", icon: <FontAwesome name="coffee" style={styles.categoryIcon} color="white" />},
    {category: "술집", icon: <Ionicons name="beer" style={styles.categoryIcon} color="white" />},
    {category: "놀거리", icon: <Entypo name="game-controller" style={styles.categoryIcon} color="white" />},
    {category: "편의시설/서비스", icon: <Ionicons name="fast-food" style={styles.categoryIcon} color="white" />},
    {category: "상점", icon: <Fontisto name="shopping-basket" style={styles.categoryIcon} color="white" />},
  ]

  const myJjim = [
    {category:"음식점", name:"맛사랑", icon: <Ionicons name="fast-food" style={styles.jjimIcon} color="white" />},
    {category:"상점", name:"다이소", icon: <Fontisto name="shopping-basket" style={styles.jjimIcon} color="white" />},
    {category:"카페/베이커리", name:"스타벅스", icon: <FontAwesome   name="coffee" style={styles.jjimIcon} color="white" />},
    {category:"놀거리", name:"코인노래방방방방", icon: <Entypo name="game-controller" style={styles.jjimIcon} color="white" />}
  ];


  
 

  return <View style={styles.container}>
    
    <View style={styles.main}>

      {/* Top */}
      <View style={styles.top}>
        <Text style={styles.mainTitle}>우리대학 거리</Text>
        <Text style={styles.schoolName}>인하대학교</Text>
        <TouchableOpacity
          onPress={() => {
          navigation.navigate('Search'); }}>
          <Ionicons style={styles.searchIcon} name="ios-search-outline" color="black" />
        </TouchableOpacity>
      </View>

      {/* 카테고리 */}
      <View style={styles.categoryWrap}>
        {categoryList.map((item)=> (
          <View style={styles.categoryElementWrap} key={item.category}>
            <View style={styles.categoryIconWrap}>
              {item.icon}
            </View>
            <Text style={styles.categoryText}>{item.category}</Text>
            <AntDesign name="right" size={15} color="black" />
          </View>
        ))}
        {/* 지도로 보기 버튼 */}
        <TouchableOpacity
          // onPress={() => alert('Hello, world!')}
          activeOpacity={0.8}
          style={styles.mapBtn}>
          <Text style={styles.mapText}>지도로 보기</Text>
        </TouchableOpacity>
      </View>


      {/* 내가 찜한 가게 */}
      <View style={styles.jjimWrap}>
        <Text style={styles.title}>
          내가 찜한 가게
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator = {false} contentContainerStyle={{marginTop:15, flexDirection: 'row'}}>
          {myJjim.map(item=> (
            <View style={styles.jjimElementWrap} key={item.name}>
              <View style={styles.jjimIcons}>
                <View style={styles.jjimIconWrap}>
                  {item.icon}
                </View>
                <Ionicons name="heart-circle-sharp" style={{fontSize:RFPercentage(2.5)}} color="pink" />
              </View>
              <View style={{ marginLeft: 7}}>
                <Text style={{fontSize: screenHeight>800 ? RFPercentage(1.5) : RFPercentage(1.7), color: "#797D7F",}}>
                  {item.category}
                </Text>
                <Text style={{fontSize: screenHeight>800 ? RFPercentage(2) : RFPercentage(2.2), fontWeight:'bold'}} numberOfLines={1}>
                  {item.name}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
   
   {/* bottom */}
    
  </View>
}

export default Home;


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  main: {
    paddingHorizontal: 20, 
    marginTop: 45,
    flex:9
  },
  top: {
    flex: 0.7,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 10,
    alignItems: "center"
  },
  mainTitle: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  },
  title: {
    fontSize: RFPercentage(2.4),
    fontWeight: "bold",
  },
  schoolName: {
    color: "#ff9933",
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
  },
  searchIcon: {
    fontSize: RFPercentage(3.5),
  },
  categoryWrap: {
    flex:5.5,
    justifyContent: 'space-between',
    marginBottom: 20
  },
  categoryElementWrap: {
    flexDirection: 'row', 
    alignItems:"center", 
    justifyContent:"space-between", 
    height:"13%"
  },
  categoryIconWrap: {
    backgroundColor: "#ff9933",
    width: Dimensions.get('window').width*0.1,
    height: Dimensions.get('window').width*0.1,
    alignItems:"center", 
    justifyContent: 'center',
    borderRadius: 17,
    marginRight: 15,
  },
  categoryIcon : {
    fontSize:RFPercentage(3)
  },
  categoryText: {
    color:'black', 
    fontSize:RFPercentage(2.2),
    width:"78%", 
    fontWeight:"bold"
  },
  mapBtn: {
    backgroundColor: '#ff9933', 
    borderRadius:5, 
    alignItems:"center", 
    justifyContent: 'center', 
    height: Dimensions.get('window').height*0.06,
    marginTop: 20 
  },
  mapText: {
    fontSize: RFPercentage(2.4), 
    color: '#fff', 
    fontWeight:'bold'
  },
  jjimWrap: {
    flex:2.5,
  },
  jjimIcon: {
    fontSize:RFPercentage(2.8)
  },
  jjimElementWrap: {
    width:Dimensions.get('window').width*0.3, 
    height:Dimensions.get('window').width*0.3, 
    backgroundColor:'#EBEDEF', 
    marginRight:15, 
    borderRadius:20, 
    padding:10
  },
  jjimIcons:{
    flexDirection:'row', 
    alignItems:"center", 
    justifyContent: 'space-between',
    marginBottom:10
  },
  jjimIconWrap:{
    width:Dimensions.get('window').width*0.09,
    height:Dimensions.get('window').width*0.09, 
    backgroundColor:'#A9CCE3', 
    alignItems:"center", 
    justifyContent: 'center',
    borderRadius:50, 
  },


 
});
