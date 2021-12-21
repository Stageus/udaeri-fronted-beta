import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios";

import { SafeAreaView } from 'react-native';
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import { Foundation, FontAwesome } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import styled from 'styled-components/native';
import ReviewEle from '../../../Components/ReviewEle';
import ScoreRating from '../../../Components/ScoreRating';
import ScoreSummary from '../../../Components/ScoreSummary';
import ReviewOptionBar from '../../../Components/ReviewOptionBar';
import ReviewWriteBtn from '../../../Components/ReviewWriteBtn';

const StoreReviewTab = () => {

    const curLargeCat = useSelector((state) => state.curLargeCat);
    const curMidCat = useSelector((state) => state.curMidCat);
    const curStore = useSelector((state) => state.curStore);
    const [storeReview, setStoreReview] = useState([]);
    useEffect(() => {
        const getStore = async () => {
            await axios
                .get("/l-categories/" + curLargeCat + "/m-categories/" + curMidCat + "/stores/" + curStore + "/review")
                .then((res) => {
                    setStoreReview(res.data.list);
                })
                .catch((err) => {
                    console.log("error");
                    console.log(err);
                });
        }
        getStore();
    }, [])


    let scoreSum = 0
    const scoreDist = [0, 0, 0, 0, 0] // 별점 분포
    storeReview && storeReview.map((item) => {
        scoreSum += item.star_rating
        scoreDist[5 - item.star_rating] += 1
    })

    const scoreAvg = (scoreSum / storeReview.length).toFixed(1); // 평균 별점
    const totalScore = scoreDist.reduce((a, b) => a + b);

    const SC = {
        Container: styled.View`
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
        `,
    };

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
            <ScrollView>
                <SC.reviewContainer>
                    {storeReview && storeReview.map((item) => (
                        <ReviewEle nickname={item.nickname} score={item.star_rating} content={item.review} date={item.writed_at} />
                    ))}
                </SC.reviewContainer>
            </ScrollView>

            <ReviewWriteBtn />
        </SC.Container>
    );
}

export default StoreReviewTab;