import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";

import { Dimensions } from 'react-native';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
import styled from 'styled-components/native';
import { restoreStoreReviews } from "../../../../reducer/index";

import ReviewEle from '../../../Components/ReviewEle';
import ScoreRating from '../../../Components/ScoreRating';
import ScoreSummary from '../../../Components/ScoreSummary';
import ReviewOptionBar from '../../../Components/ReviewOptionBar';
import ReviewWriteBtn from '../../../Components/ReviewWriteBtn';

const StoreReviewTab = () => {
    const dispatch = useDispatch();
    const curLargeCat = useSelector((state) => state.curLargeCat);
    const curMidCat = useSelector((state) => state.curMidCat);
    const curStore = useSelector((state) => state.curStore);
    const [storeReview, setStoreReview] = useState([]);
    const [reload, setReload] = useState(true); // 새로고침 state

    const getStore = async () => {
        await axios
            .get("/l-categories/" + curLargeCat + "/m-categories/" + curMidCat + "/stores/" + curStore + "/review")
            .then((res) => {
                setStoreReview(res.data.list);
                setReload(false);
                //dispatch(restoreStoreReviews(res.data.list));
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
            height: auto;
        `,
        scrollView: styled.ScrollView`
            height: 600px;
        `
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
            <SC.scrollView>
                <SC.reviewContainer>
                    {storeReview && storeReview.map((item) => (
                        <ReviewEle nickname={item.nickname} score={item.star_rating} content={item.review} date={item.writed_at} />
                    ))}
                </SC.reviewContainer>
            </SC.scrollView>

            <ReviewWriteBtn setReload={setReload} />
        </SC.Container>
    );
}

export default StoreReviewTab;