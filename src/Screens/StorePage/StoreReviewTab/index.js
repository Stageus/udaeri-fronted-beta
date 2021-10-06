import React from 'react';
import { SafeAreaView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Foundation, FontAwesome } from '@expo/vector-icons';
import { Rating } from 'react-native-ratings';
import styled from 'styled-components/native';
import ReviewEle from '../../../Components/ReviewEle';
import ScoreRating from '../../../Components/ScoreRating';
import ScoreSummary from '../../../Components/ScoreSummary';
import ReviewOptionBar from '../../../Components/ReviewOptionBar';
import ReviewWriteBtn from '../../../Components/ReviewWriteBtn';

const StoreReviewTab = () => {
    const reviewList = [
        {
            nickname: "효다몬",
            content: "ㄹㅇ 맛있음",
            score: 5,
            date: "2021-09-12"
        },
        {
            nickname: "코딩하는 노예",
            content: "자주 먹으니깐 질림",
            score: 4,
            date: "2021-09-10"
        },
        {
            nickname: "이상민",
            content: "양이 너무 많음",
            score: 5,
            date: "2021-09-09"
        },
        {
            nickname: "정유진",
            content: "",
            score: 4,
            date: "2021-09-02"
        },
        {
            nickname: "아무개",
            content: "",
            score: 5,
            date: "2021-09-01"
        },
        {
            nickname: "홍길동",
            content: "",
            score: 5,
            date: "2021-08-12"
        },
        {
            nickname: "혜팔이",
            content: "야야야야야야야야",
            score: 1,
            date: "2021-08-12"
        },
    ]

    let scoreSum = 0
    const scoreDist = [0, 0, 0, 0, 0] // 별점 분포
    reviewList.map((item) => {
        scoreSum += item.score
        scoreDist[5 - item.score] += 1
    })

    const scoreAvg = (scoreSum / reviewList.length).toFixed(1); // 평균 별점
    const totalScore = scoreDist.reduce((a, b) => a + b);

    const SC = {
        Container: styled.View`
            flex: 1;
            background-color: #fff;
        `,
        scoreContainer: styled.View`
            flex-Direction: row;
            justify-Content: space-between;
            align-Items: center;
            padding: 30px;
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
                    {reviewList.map((item) => (
                        <ReviewEle nickname={item.nickname} score={item.score} content={item.content} date={item.date} />
                    ))}
                </SC.reviewContainer>
            </ScrollView>
            <ReviewWriteBtn />
        </SC.Container>
    );
}

export default StoreReviewTab;