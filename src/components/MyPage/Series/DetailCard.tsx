import React from "react"
import styled from "@emotion/styled"
import Image from "next/image"
import SAMPLE_IMAGE from "../../../../public/image/sample.jpeg"
import { MEDIA_QUERY_END_POINT, PALLETS_LIGHT } from "../../../constants"
import { css } from "@emotion/react"
import { DetailCardProps } from "../../../types/Main"

const DetailCard = ({ margin = "0", padding = "0", ...props }: DetailCardProps) => {
  return (
    <>
      {/* 마이페이지 글 카드, 서치카드 공유, 시리즈 카드 하나, 시리즈 디테일 하나. */}
      <Container margin={margin} padding={padding}>
        <h2>
          <span>{props.postIdx}. </span>{props.postTitle}
        </h2>
        <DetailContainer>
          <ImageContainer>
            <Image
              className="main-image"
              alt="sample image"
              width={192}
              height={100}
              layout="responsive"
              src={SAMPLE_IMAGE}
            ></Image>
          </ImageContainer>
          <DescContainer>
            <p className="desc">
              {props.postDesc}
            </p>
            <p className="date">{props.date}</p>
          </DescContainer>
        </DetailContainer>
      </Container>
    </>
  )
}

export default DetailCard

interface Containerprops {
  margin: string
  padding: string
}

const containerstyle = (props: Containerprops) => css`
  margin: ${props.margin};
  padding: ${props.padding};
`

const Container = styled.div`
  ${containerstyle}
  background : ${PALLETS_LIGHT.CARD_BACKGROUND};
  border-radius: 4px;
  span {
    color: ${PALLETS_LIGHT.BORDER};
    font-style: italic;
  }
  h2 {
    margin-bottom: 20px;
    font-size: 21px;
    line-height: 1.5;
    color: ${PALLETS_LIGHT.SUB_FONT};
  }
`

const DetailContainer = styled.div`
  display: flex;
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    display: block;
  }
`

const ImageContainer = styled.div`
  width: 192px;
  height: 100px;
  overflow: hidden;
  .main-image {
    object-fit: cover;
  }
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    width: 100%;
    height: auto;
  }
`

const DescContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 16px;
  width: 80%;
  > .desc {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 24px;
    color: ${PALLETS_LIGHT.SUB_FONT};
  }
  > .date {
    color: ${PALLETS_LIGHT.BORDER};
    font-size: 14px;
  }
  @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    width: 100%;
    margin: 0;
    > .date {
      margin-top: 16px;
    }
  }
`
