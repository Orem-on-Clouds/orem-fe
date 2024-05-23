"use client";

import styled from "styled-components";
import Button from "@/components/common/Button";
import Link from "next/link";
import Typo from "@/components/common/Typo";
import { seasonalOrem } from "@/assets/icon";
import { useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOremBySeason, saveOrem } from "@/api";
import Splash from "../common/LoadingPage";
import Image from "next/image";
import { useState } from "react";

const seasonIcon: Record<string, JSX.Element> = {
  봄: seasonalOrem.spring,
  여름: seasonalOrem.summer,
  가을: seasonalOrem.autumn,
  겨울: seasonalOrem.winter,
};

export default function Page() {
  const router = useSearchParams();
  const season = router.get("season") as string;

  const { data: oremResponse, refetch } = useQuery({
    queryKey: ["season", season],
    queryFn: () => getOremBySeason(season),
    enabled: !!season,
    select: (res) => res.data.data,
  });

  const handleAgainRecommend = () => {
    refetch();
  };

  const [isSaved, setIsSaved] = useState(false);
  const { mutate } = useMutation({
    mutationFn: saveOrem,
  });
  const handleSaveOrem = () => {
    const uuid = localStorage.getItem("uuid") as string;

    if (!oremResponse) return;

    mutate(
      {
        oremId: oremResponse.id,
        uuid,
      },
      {
        onSuccess: (res) => {
          if (res.data?.data === "Success") {
            setIsSaved(true);
          }
        },
      },
    );
  };

  return oremResponse ? (
    <Container>
      <div>
        <TextBox>
          <Typo size={20} color="#646464">
            {season}엔 이 오름을 추천해요
          </Typo>
          <OremNameBox>
            <Typo weight="bold" size={30}>
              {oremResponse?.name}
            </Typo>
            {seasonIcon[season]}
          </OremNameBox>
        </TextBox>
        <ImageBox>
          <Image src={oremResponse?.imageUrl} alt={`${oremResponse?.name} 이미지`} fill objectFit="cover" />
          <div>
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.49022 16.8625C10.4989 14.1881 13.8266 9.36424 13.8266 6.75826C13.8266 3.02577 10.7703 0 7.00011 0C3.22992 0 0.173584 3.02577 0.173584 6.75826C0.173584 9.36424 3.50131 14.1881 5.50999 16.8625C6.26535 17.8682 7.73486 17.8682 8.49022 16.8625ZM6.99993 10.8086C9.1992 10.8086 10.9821 9.02578 10.9821 6.8265C10.9821 4.62723 9.1992 2.84437 6.99993 2.84437C4.80066 2.84437 3.01779 4.62723 3.01779 6.8265C3.01779 9.02578 4.80066 10.8086 6.99993 10.8086Z"
                fill="white"
              />
            </svg>
            <Link href={oremResponse?.placeUrl ?? ""} target="_blank">
              위치 보기
            </Link>
          </div>
        </ImageBox>
        <TagBox>
          {oremResponse?.keywords.map((keyword) => (
            <Tag key={keyword}># {keyword}</Tag>
          ))}
        </TagBox>
        <Typo size={14}>{oremResponse?.description}</Typo>
      </div>
      <ButtonBox>
        <Button color="brown" width={114} onClick={handleAgainRecommend}>
          다시 추천받기
        </Button>
        {isSaved ? (
          <Link href="orem-history">
            <Button variant="outlined">저장된 오름 보기</Button>
          </Link>
        ) : (
          <Button onClick={handleSaveOrem}>다녀온 오름에 저장하기</Button>
        )}
      </ButtonBox>
      <BigCircle />
    </Container>
  ) : (
    <Splash />
  );
}

const Container = styled("div")`
  height: 100%;
  padding: 40px 24px 44px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TextBox = styled("div")`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin-bottom: 40px;
`;

const OremNameBox = styled("div")`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const ImageBox = styled("div")`
  width: 100%;
  height: 342px;
  border-radius: 28px;
  position: relative;
  overflow: hidden;
  margin-bottom: 14px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  div {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 22px 27px;
    display: flex;
    align-items: center;
    column-gap: 5px;

    a {
      color: #fff;
    }
  }
`;

const TagBox = styled("div")`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 25px;
`;

const Tag = styled("div")`
  padding: 4px 16px;
  border-radius: 40px;
  background-color: #fff;
  font-size: 14px;
  line-height: 140%;
`;

const ButtonBox = styled("div")`
  width: 100%;
  margin-top: 64px;
  display: flex;
  column-gap: 6px;

  a {
    width: 100%;
  }

  button:first-child {
    flex-shrink: 0;
  }
`;

const BigCircle = styled("div")`
  width: 1112px;
  height: 1112px;
  background-color: #e2dacf;
  border-radius: 9999px;
  position: fixed;
  top: 28%;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
`;
