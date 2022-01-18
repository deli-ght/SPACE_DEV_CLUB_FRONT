import { NextPage } from "next"
import styled from "@emotion/styled"
import Head from "next/head"

import { DetailHeader } from "../../components/Details/DetailHeader"
import { LeftHeader } from "../../components/Details/LeftHeader"
import { RightHeader } from "../../components/Details/RightHeader"

import { DetailCard } from "../../components/Details/DetailCard"
import { PALLETS_LIGHT } from "../../constants"
import { Header } from "../../components/Common/Header"

const DetailsIndexPage: NextPage = () => {
  return (
    <main>
      <Head>
        <title>Space Dev Club</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header username={"deli-ght"} user={true} />
      <DetailContainer>
        <LeftHeader />
        <DetailHeader />
        <RightHeader />
      </DetailContainer>
      <CardContainer>
        <DetailCard />
      </CardContainer>
    </main>
  )
}

export default DetailsIndexPage

const DetailContainer = styled.section`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
`
const CardContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${PALLETS_LIGHT.BACKGROUND};
  box-shadow: rgb(0 0 0 / 8%) 0px 0px 32px;
  margin-top: 50px;
`
