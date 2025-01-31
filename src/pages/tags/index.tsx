import styled from "@emotion/styled"
import { NextPage } from "next"
import { Header } from "@components/Common/Header"
import { useContext, useState, useRef, useEffect } from "react"
import { ThemeContext } from "@pages/_app"
import { Theme } from "@styles/theme"
import TagCards from "@components/Tags/TagCards"
import Head from "next/head"
import { API_ENDPOINT, MEDIA_QUERY_END_POINT } from "@src/constants"
import TagMainLoading from "@components/Tags/TagMainLoading"
import useSWRInfinite from "swr/infinite"
import qs from "qs"
import { fetcher } from "@utils/fetcher"

const PAGE_SIZE = 4
// 데이터 쌓인 후 12로 변경

const Tags: NextPage = () => {
  const { theme } = useContext(ThemeContext)
  const [isActive, setIsActive] = useState(false)
  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.data) return null
    const query = qs.stringify({
      populate: ["posts"],
      pagination: {
        page: pageIndex + 1,
        pageSize: PAGE_SIZE,
      },
      sort: isActive ? ["name"] : ["updatedAt:desc"],
      // relation 된 데이터의 갯수(size)을 이용해 sort하는 방법을 찾지 못해 일단 최근 수정 순으로 바꿔둠.
    })
    return `${API_ENDPOINT}/hashtags?${query}`
  }

  const { data, size, setSize, error, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
  )

  const isEmpty = data?.[0]?.data.length === 0
  const isReachingEnd = useRef<boolean>(false)

  const [target, setTarget] = useState<HTMLElement | null | undefined>(null)

  useEffect(() => {
    if (size == 1) isReachingEnd.current = false
    if (!target || isReachingEnd.current) return
    const observer = new IntersectionObserver(onIntersect, {
      threshold: 0.4,
    })
    observer.observe(target)
    return () => observer && observer.disconnect()
  }, [data, target])

  const onIntersect: IntersectionObserverCallback = ([entry], observer) => {
    if (entry.isIntersecting) {
      setSize((prev) => prev + 1)
      isReachingEnd.current =
        data === undefined
          ? false
          : isEmpty || (data && data[data.length - 1]?.data.length < PAGE_SIZE)
    }
  }

  // true - 이름순, false - 인기순
  const handleActive = (check: boolean) => {
    setIsActive(check)
  }

  return (
    <>
      <Head>
        <title>tags {isActive ? "(이름순)" : "(인기순)"}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Header user={false}></Header>
        {data ? (
          <>
            <SortContainer>
              <Sorting theme={theme} active={isActive}>
                <SortBtn
                  onClick={() => handleActive(false)}
                  theme={theme}
                  active={!isActive}
                >
                  인기순
                </SortBtn>
                <SortBtn
                  onClick={() => handleActive(true)}
                  theme={theme}
                  active={isActive}
                >
                  이름순
                </SortBtn>
              </Sorting>
            </SortContainer>
            <TagsContainer>
              {data &&
                data.map((loaded: any, index: number) =>
                  loaded.data.map((e: any, i: number) => (
                    <TagCards
                      key={i}
                      tagName={e.attributes.name}
                      tagDesc={e.attributes.description}
                      tagCount={e.attributes.posts.data.length}
                    />
                  )),
                )}
            </TagsContainer>
          </>
        ) : (
          <TagMainLoading />
        )}
        <TargetElement ref={setTarget}>
          {isValidating && !isReachingEnd.current && <TagMainLoading />}
        </TargetElement>
      </section>
    </>
  )
}
export default Tags

const SortContainer = styled.article`
  display: flex;
  justify-content: center;
  align-items: center;
`

type SortProps = {
  theme: Theme
  active: boolean
}

const Sorting = styled.div<SortProps>`
  display: inline-block;
  position: relative;
  &:after {
    content: "";
    width: 50%;
    height: 2px;
    position: absolute;
    bottom: 0;
    right: 0;
    transform: ${({ active }) =>
      active ? "translateX(0)" : "translateX(-100%)"};
    background-color: ${({ theme }) => theme.MAIN};
    transition: 0.3s ease-in;
  }
`

const SortBtn = styled.button<SortProps>`
  width: 128px;
  height: 48px;
  font-size: 18px;
  color: ${({ active, theme }) => (active ? theme.MAIN : theme.MAIN_FONT)};
  @media screen and (max-width: ${MEDIA_QUERY_END_POINT.MOBILE}) {
    font-size: 16px;
  }
`

const TagsContainer = styled.article`
  display: grid;
  margin: 64px auto 0;
  grid-template-columns: repeat(1, 1fr);
  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.SMALL}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.TABLET}) {
    grid-template-columns: repeat(3, 1fr);
    width: 1024px;
  }

  @media screen and (min-width: ${MEDIA_QUERY_END_POINT.DESKTOP}) {
    grid-template-columns: repeat(4, 1fr);
    width: 1200px;
  }
`
const TargetElement = styled.article`
  width: 100%;
  height: 100px;
`
