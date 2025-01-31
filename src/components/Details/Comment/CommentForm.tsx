import styled from "@emotion/styled";
import { API_ENDPOINT, PALLETS_LIGHT } from "@constants/index";

import { Theme } from "@styles/theme";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { ThemeContext } from "@pages/_app";
import axios, { Method } from "axios";
import { PostContext } from "@src/pages/[id]/[details]";
import { useSWRConfig } from "swr";

interface ThemeProps {
  theme: Theme;
}

interface Props {
  loginUserId?: number;
  CommentGroup: number;
  CommentOrder: number;
  setCommentForm: Dispatch<SetStateAction<boolean>>;
}

export const CommentForm = ({
  loginUserId,
  CommentGroup,
  CommentOrder,
  setCommentForm,
}: Props) => {
  const { theme } = useContext(ThemeContext);
  const { postid, postObj } = useContext(PostContext);
  const [commentText, setCommentText] = useState("");
  const { mutate } = useSWRConfig();

  const SubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let CommentDepth;
    if (CommentOrder === 0) {
      CommentDepth = 0;
    } else {
      CommentDepth = 1;
    }

    const Data = {
      userid: loginUserId!,
      postid: postid,
      content: commentText,
      depth: CommentDepth,
      order: CommentOrder,
      group: CommentGroup,
      is_deleted: false,
      posts: postid,
    };

    await axios({
      method: "post" as Method,
      url: `${API_ENDPOINT}/comments`,
      data: {
        data: Data,
      },
    });
    setCommentText("");
    setCommentForm(false);
    mutate(`${API_ENDPOINT}/posts?populate=*`);
  };

  const ChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      SubmitComment(e);
    }
  };

  return (
    <article>
      <h3 className="sr-only">상세 페이지 댓글 입력 폼</h3>
      <CommentF onSubmit={SubmitComment} onKeyDown={(e) => handleKeyDown(e)}>
        <TextArea
          theme={theme}
          name="댓글 입력"
          value={commentText}
          placeholder="댓글을 작성하세요"
          onChange={ChangeText}
        ></TextArea>
        <BtnContainer>
          <CommentBtn theme={theme} type="submit">
            댓글 작성
          </CommentBtn>
        </BtnContainer>
      </CommentF>
    </article>
  );
};

const CommentF = styled.form`
  width: 100%;
`;
const TextArea = styled.textarea<ThemeProps>`
  resize: none;
  padding: 20px 20px 30px;
  outline: none;
  border: 1px solid ${PALLETS_LIGHT.SUB};
  background-color: ${({ theme }) => theme.CARD_BACKGROUND};
  margin-bottom: 1.5rem;
  width: 95%;
  border-radius: 4px;
  min-height: 90px;
  font-size: 16px;
  color: ${({ theme }) => theme.SUB_FONT};
  line-height: 1.75;
  ::placeholder {
    color: ${PALLETS_LIGHT.ICON};
  }
`;
const BtnContainer = styled.div`
  width: 95%;
  display: flex;
  justify-content: end;
  padding-left: 45px;
`;
const CommentBtn = styled.button<ThemeProps>`
  font-weight: bold;
  cursor: pointer;
  background: ${({ theme }) => theme.MAIN};
  color: ${({ theme }) => theme.SUB};
  border-radius: 4px;
  padding: 0px 20px;
  height: 32px;
  font-size: 16px;
  :hover {
    opacity: 0.9;
  }
`;
