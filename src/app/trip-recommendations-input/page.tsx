"use client";

import styled from "styled-components";
import Button from "@/components/common/Button";
import Link from "next/link";
import Typo from "@/components/common/Typo";

export default function Page() {
  return (
    <Container>
      <TextBox>
        <Typo weight="bold" size={30}>
          어느 계절에
          <br />
          제주로 가시나요?
        </Typo>
        <Typo size={20} color="#646464">
          선택한 계절에 어울리는
          <br />
          오름을 추천해줘요
        </Typo>
      </TextBox>
      <ButtonBox>
        <Link href="/trip-recommendations-result">
          <Button>오름 추천 받기</Button>
        </Link>
      </ButtonBox>
      <BigCircle />
    </Container>
  );
}

const Container = styled("div")`
  margin-top: 67px;
`;

const TextBox = styled("div")`
  display: flex;
  flex-direction: column;
  row-gap: 9px;
  padding: 0 24px;
`;

const Title = styled("h2")`
  font-size: 30px;
  font-weight: bold;
  line-height: 130%;
`;

const Desc = styled("p")`
  font-size: 20px;
  line-height: 130%;
  color: #646464;
`;

const ButtonBox = styled("div")`
  position: fixed;
  bottom: 24px;
  width: 100%;
  padding: 0 24px;
`;

const BigCircle = styled("div")`
  width: 1112px;
  height: 1112px;
  background-color: #d5c9ba;
  border-radius: 9999px;
  position: fixed;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  z-index: -1;
`;
