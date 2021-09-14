import React from 'react';
// import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, ScrollView, Dimensions, TextInput  } from 'react-native';
import {AntDesign, Ionicons , Feather } from '@expo/vector-icons';
import { RFPercentage } from "react-native-responsive-fontsize";

const Search = ({ navigation }) => {
  const screenWidth = Dimensions.get('window').width;

  const recentSearchWord = [
    {word: "맛사랑", date: "09.08"},
    {word: "찌개사랑", date: "09.07"},
    {word: "스타벅스", date: "09.06"},
    {word: "투썸플레이스", date: "09.05"},
    {word: "가메이", date: "09.04"},
    {word: "영종식당", date: "09.03"},
    {word: "서브웨이", date: "09.02"},
    {word: "오겡끼", date: "09.01"},
    
  ]


  return <View style={styles.container}>
    <View style={styles.top}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}>
        <AntDesign name="arrowleft" style={styles.topIcon} color="#797D7F" />
      </TouchableOpacity>
      <TextInput
        style={styles.searchInput}
        maxLength={10}
        placeholder ="검색어를 입력하세요"
      />
      <TouchableOpacity>
        <Ionicons name="ios-search-outline" style={styles.topIcon} color="#797D7F" />
      </TouchableOpacity>
    </View>

    <View style={styles.searchWrap}>
      <View style={styles.textWrap}>
        <Text style={styles.recentSearch}>최근 검색어</Text>
        <TouchableOpacity>
            <Text style={styles.allDeleteBtn}>전체삭제</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsHorizontalScrollIndicator = {false} contentContainerStyle={{ paddingHorizontal: 20, paddingVertical:15}}>
        {recentSearchWord.map((item)=> (
          <View style={styles.searchElement}>
            <Text>
              <Ionicons name="ios-search-outline" style={styles.recentSearchIcon} color="#797D7F" />
            </Text>
            <TouchableOpacity style={styles.searchWordWrap}>
              <Text style={styles.searchWord} numberOfLines={1}>{item.word}</Text>
              <Text style={styles.searchDate}>{item.date}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text>
                <Feather name="x" style={styles.recentSearchIcon}  color="black" />
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>


    </View>

  </View>
}

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  top: {
    flex: 0.7,
    marginTop: 45,
    // backgroundColor:'yellow',
    paddingHorizontal: 20, 
    flexDirection: 'row',
    alignItems:"center",
    justifyContent: 'space-between',
  },
  topIcon: {
    fontSize: RFPercentage(3.5),
  },
  searchInput: {
    backgroundColor:'#EBEDEF', 
    borderRadius: 20,
    width: '70%',
    height: '80%',
    paddingHorizontal: 15, 
  },
  searchWrap: {
    flex: 9.3,
    // backgroundColor:'pink'
  },
  textWrap: {
    marginTop: 30,
    paddingHorizontal: 20,
    paddingBottom: 15,
    flexDirection: 'row',
    alignItems:"center",
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: "#797D7F",
  },
  recentSearch: {
    fontSize: RFPercentage(2.4),
    fontWeight: 'bold'
  },
  allDeleteBtn: {
    fontSize: RFPercentage(1.7),
    color: "#797D7F"
  },
  searchElement: {
    flexDirection: 'row',
    alignItems:"center",
    marginBottom: 15,
    justifyContent: 'space-between',
  },
  recentSearchIcon: {
    fontSize: RFPercentage(2),
  },
  searchWordWrap: {
    flexDirection: 'row',
    alignItems:"center",
  },
  searchWord: {
    fontSize: RFPercentage(2.2),
    width: Dimensions.get('window').width*0.6,
    marginRight: 10,
    // backgroundColor: 'pink',
  },
  searchDate: {
    fontSize: RFPercentage(2.2),
  },
});