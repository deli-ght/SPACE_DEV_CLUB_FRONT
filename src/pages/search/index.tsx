import type { NextPage } from "next";
import styled from "@emotion/styled";
import { SearchBar } from "../../components/Search/SearchBar";
import { FindPost } from "../../components/Search/FindPost";
import { MyCard } from "../../components/MyPage/MyCard";
import { CARD_DATA, MEDIA_QUERY_END_POINT } from "../../constants";
import DetailCard from "../../components/MyPage/Series/DetailCard";
import { SeriesCard } from "../../components/MyPage/Series/SeriesCard";

const MyPage: NextPage = () => {
    return (
        <Container>
            <SearchBar />
            {/* <FindPost /> */}
            {/* <CardContainer>
                {CARD_DATA.map((e, index) => (
                    <MyCard
                        key={index}
                        imageUrl="/public/image/sample.jpeg"
                        postTitle={e.postTitle}
                        postDesc={e.postDesc}
                        tags={e.tags}
                        date={e.date}
                        comment={e.comment}
                    />
                ))}
                            </CardContainer>
 */}
            <DetailCard />
            {/* <SeriesCard
                imageUrl="/public/image/sample.jpeg"
                postTitle="제목입니다. 제목."
                count
                updateDate
            /> */}
        </Container>
    );
};

export default MyPage;

const Container = styled.div`
    margin: 0 auto;
    max-width: 734px;
    @media only screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
        padding: 20px;
        input {
            height: 27px;
        }
    }
`;

const CardContainer = styled.div`
    padding-top: 64px;
`;
