import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import * as S from './post.styles';
import { useEffect, useRef } from 'react';
import Button from '../../components/common/Button/Button.component';
import { ButtonType } from '../../components/common/Button/button.types';
import { fileRefs } from '../../utils/fileRefs';
import PostList from '../../components/common/PostList/PostList.component';
import SelectInput from '../../components/common/select-input/SelectInput.component';
import { clothes } from '../../utils/enums';
import { theme } from '../../styles/themes';
import { useInfiniteQuery } from '@tanstack/react-query';
import Box from '../../components/common/Box/Box';
import { fetchPosts } from '../../api/requests';

const Posts: React.FC = () => {
  const { startQuery } = useParams();
  const LoadMoreButton = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(startQuery);

  const {
    data,
    isError,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', query],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam, query }),
    getNextPageParam: lastPage => {
      const nextPage = lastPage.metadata.nextPage;
      const totalPages = lastPage.metadata.totalPages;

      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 3 * 60 * 1000,
    enabled: !!query,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          console.log('INTERSECT');
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    if (LoadMoreButton.current) {
      observer.observe(LoadMoreButton.current);
    }

    return () => observer.disconnect();
  }, [LoadMoreButton.current]);

  const buildQuery = (key: string, option: string): void => {
    const newQuery = `${startQuery}&${key}=${option}`;
    setQuery(newQuery);
  };

  const buttonType =
    isFetchingNextPage || isLoading
      ? ButtonType.Pending
      : !hasNextPage || isFetchingNextPage
      ? ButtonType.Disabled
      : ButtonType.Message;

  return (
    <Box width="100%" gap="2rem" backgroundColor={theme.color.backgroundMain}>
      <Box
        width="100%"
        objectFit="contain"
        maxHeight="30rem"
        overflow="hidden"
        justifyContent="center"
      >
        <S.MainImg src={fileRefs.clothesMain} alt="Clothes" />
      </Box>
      <Box
        flexDirection="row"
        gap="3rem"
        justifyContent="center"
        alignItems="center"
        padding="0 2rem"
      >
        <SelectInput
          optionsArray={clothes}
          initialValue="All"
          label="Category"
          handleSelect={option => buildQuery('subCategory', option)}
        />
        <SelectInput
          optionsArray={clothes}
          initialValue="All"
          label="Sort by"
          handleSelect={(option: string) => {
            console.log(option);
          }}
        />
      </Box>
      {data &&
        data.pages.map((data, i) => <PostList key={i} posts={data.posts} />)}

      <Box alignItems="center">
        <div ref={LoadMoreButton}>
          <Button buttonType={buttonType} onClick={() => fetchNextPage()}>
            {isFetchingNextPage || isLoading
              ? 'Loading more...'
              : isError
              ? 'Error!'
              : 'No more posts!'}
          </Button>
          {error instanceof Error && <p> error.message</p>}
        </div>
      </Box>
    </Box>
  );
};

export default Posts;
