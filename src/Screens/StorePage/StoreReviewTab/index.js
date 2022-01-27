import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

import { Dimensions } from 'react-native';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
import styled from 'styled-components/native';
import { restoreStoreReviews } from "../../../../reducer/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReviewEle from '../../../Components/ReviewEle';
import ScoreRating from '../../../Components/ScoreRating';
import ScoreSummary from '../../../Components/ScoreSummary';
import ReviewOptionBar from '../../../Components/ReviewOptionBar';
import ReviewWriteBtn from '../../../Components/ReviewWriteBtn';

const SC = {
    Container: styled.View`
        flex: 1;
        background-color: #fff;
    `,
    scoreContainer: styled.View`
        flex-Direction: row;
        justify-Content: space-between;
        align-Items: center;
        padding: 30px 40px;
        border-Bottom-Width: 1px;
        border-Bottom-Color: #d3d3d3;
    `,
    scoresSummaryWrap: styled.View`
    `,
    reviewContainer: styled.View`
        flex: 1;
        background-color: ${(props) => props.BGColor};
        
    `,
    scrollView: styled.ScrollView`
        
    `
};

const StoreReviewTab = () => {
    const TOKEN_KEY = "@userKey";
    const BGColor = useSelector((state) => state.BGColor1);
    const curLargeCat = useSelector((state) => state.curLargeCat);
    const curMidCat = useSelector((state) => state.curMidCat);
    const curStore = useSelector((state) => state.curStore);
    const [storeReview, setStoreReview] = useState([]);

    const [reload, setReload] = useState(true); // 새로고침 state

    const [myReview, setMyReview] = useState(null);

    console.log("reload :", reload);
    const getStore = async () => {
        let token;
        await AsyncStorage.getItem(TOKEN_KEY, (err, result) => {
            token = result;
        });
        axios
            .get("/l-categories/" + curLargeCat + "/m-categories/" + curMidCat + "/stores/" + curStore + "/review",
                {
                    headers: {
                        Authorization: token,
                    },
                    body: { "order_type": "최신순" }
                }
            )
            .then((res) => {
                //console.log("이미 썼는가? :", res.data.isWrited);
                if (res.data.success) {
                    setMyReview(res.data.myReview);
                    setStoreReview(res.data.list);
                    setReload(false);
                }
            })
            .catch((err) => {
                console.log("error");
                console.log(err);
            });
    }

    useEffect(() => {
        if (reload) {
            getStore();
        }
    }, [reload])

    let scoreSum = 0
    const scoreDist = [0, 0, 0, 0, 0] // 별점 분포
    storeReview && storeReview.map((item) => {
        scoreSum += item.star_rating
        scoreDist[5 - item.star_rating] += 1
    })
    const scoreAvg = (scoreSum / storeReview.length).toFixed(1); // 평균 별점
    const totalScore = scoreDist.reduce((a, b) => a + b);
    

    return (
        <SC.Container>
            <SC.scoreContainer>
                <ScoreRating score={scoreAvg} />
                <SC.scoresSummaryWrap>
                    {scoreDist && scoreDist.map((item, index) => (
                        <ScoreSummary score={index} nums={item} total={totalScore} />
                    ))}
                </SC.scoresSummaryWrap>
            </SC.scoreContainer>
            <ReviewOptionBar reviewNums={storeReview.length} />
            <SC.reviewContainer BGColor={BGColor}>
                <SC.scrollView>

                    {storeReview && storeReview.map((item) => (
                        <ReviewEle nickname={item.nickname} score={item.star_rating} content={item.review} date={item.writed_at.substr(0, 10)} isMyReview={JSON.stringify(item) === JSON.stringify(myReview)} />
                    ))}

                </SC.scrollView>
            </SC.reviewContainer>
            {
                myReview === null ? 
                    <ReviewWriteBtn setReload={setReload} /> :
                    <></>
            }
            
        </SC.Container>
    );
}


export default StoreReviewTab;