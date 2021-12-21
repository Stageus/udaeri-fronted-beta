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
    // const reviewList = [
    //     {
    //         nickname: "효다몬",
    //         content: "ㄹㅇ 맛있음",
    //         score: 5,
    //         date: "2021-09-12"
    //     },
    //     {
    //         nickname: "코딩하는 노예",
    //         content: "자주 먹으니깐 질림",
    //         score: 4,
    //         date: "2021-09-10"
    //     },
    //     {
    //         nickname: "이상민",
    //         content: "양이 너무 많음",
    //         score: 5,
    //         date: "2021-09-09"
    //     },
    //     {
    //         nickname: "정유진",
    //         content: "",
    //         score: 4,
    //         date: "2021-09-02"
    //     },
    //     {
    //         nickname: "아무개",
    //         content: "",
    //         score: 5,
    //         date: "2021-09-01"
    //     },
    //     {
    //         nickname: "홍길동",
    //         content: "",
    //         score: 5,
    //         date: "2021-08-12"
    //     },
    //     {
    //         nickname: "혜팔이",
    //         content: "야야야야야야야야",
    //         score: 1,
    //         date: "2021-08-12"
    //     },
    // ]
    const curLargeCat = useSelector((state) => state.curLargeCat);
    const curMidCat = useSelector((state) => state.curMidCat);
    const curStore = useSelector((state) => state.curStore);
    const [storeReview, setStoreReview] = useState({});
    useEffect(() => {
        const getStore = async () => {
            await axios
                .get("/l-categories/" + curLargeCat + "/m-categories/" + curMidCat + "/stores/" + curStore + "/review")
                .then((res) => {
                    setStoreReview(res.data);
                })
                .catch((err) => {
                    console.log("error");
                    console.log(err);
                });
        }
        getStore();
    }, [])
    console.log(storeReview)
    let scoreSum = 0
    const scoreDist = [0, 0, 0, 0, 0] // 별점 분포
    storeReview.map((item) => {
        scoreSum += item.star_rating
        scoreDist[5 - item.star_rating] += 1
    })

    const scoreAvg = (scoreSum / reviewList.length).toFixed(1); // 평균 별점
    const totalScore = scoreDist.reduce((a, b) => a + b);

    const SC = {
        Container: styled.View`
            background-color: #fff;
            height: auto;
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
            <ScrollView>
                <SC.scoreContainer>
                    <ScoreRating score={scoreAvg} />
                    <SC.scoresSummaryWrap>
                        {scoreDist.map((item, index) => (
                            <ScoreSummary score={index} nums={item} total={totalScore} />
                        ))}
                    </SC.scoresSummaryWrap>
                </SC.scoreContainer>
                <ReviewOptionBar reviewNums={reviewList.length} />
                <SC.reviewContainer>
                    {storeReview.map((item) => (
                        <ReviewEle nickname={item.nickname} score={item.star_rating} content={item.review} date={item.writed_at} />
                    ))}
                </SC.reviewContainer>
            </ScrollView>
            <ReviewWriteBtn />
        </SC.Container>
    );
}

export default StoreReviewTab;