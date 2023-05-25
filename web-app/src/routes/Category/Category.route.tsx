import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as S from "./category.styles";
import { useEffect, useRef } from "react";
import Button from "../../components/common/Button/Button.component";
import { ButtonType } from "../../components/common/Button/button.types";
import PostList from "../../components/common/PostList/PostList.component";
import { theme } from "../../styles/themes";
import { useInfiniteQuery } from "@tanstack/react-query";
import FilterPopup from "./FilterPopup/FilterPopup.component";
import { queryClient } from "../../main";

import { imgUrls } from "../../utils/urls/imgUrls";
import {
  selectQuery,
  selectTempQueryData,
} from "../../store/query/query.selectors";
import { Enum } from "../../types";
import { fetchPosts } from "../../api/requests";
import {
  initialQueryData,
  setQuery,
  setQueryData,
  setTempQueryData,
} from "../../store/query/querySlice";
import Box from "../../components/common/Box/Box";

const Category: React.FC = () => {
  const { category } = useParams();
  const dispatch = useDispatch();

  const LoadMoreButton = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<undefined | string>(undefined);

  const [isFitlerPopupOpen, setIsFilterPopupOpen] = useState<boolean>(false);
  const tempQueryData = useSelector(selectTempQueryData);
  const query = useSelector(selectQuery);

  const enums: Enum | undefined = queryClient.getQueryData(["enums"]);

  const {
    data,
    isError,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch: refetchPosts,
  } = useInfiniteQuery({
    queryKey: ["posts", query],
    queryFn: ({ pageParam }) => fetchPosts({ pageParam, query, searchQuery }),
    getNextPageParam: (lastPage) => {
      if (!lastPage) return undefined;
      const nextPage = lastPage.metadata.nextPage;
      const totalPages = lastPage.metadata.totalPages;

      return nextPage <= totalPages ? nextPage : undefined;
    },
    staleTime: 3 * 60 * 1000,
    enabled: !!query,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
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

  const getFilterResults = () => {
    const categoriesString = tempQueryData.Categories.join(",");
    const sizesString = tempQueryData.Sizes.join(",");
    const ageString = tempQueryData.Age.join(",");
    const sortString =
      tempQueryData.Sort[0] === "Most Recent"
        ? "-createdAt"
        : tempQueryData.Sort[0] === "Distance"
        ? "distance"
        : "";

    let newQuery = `mainCategory=${category}`;

    if (categoriesString.length) {
      newQuery += `&subCategories=${categoriesString}`;
    }

    if (sizesString.length) {
      newQuery += `&sizes=${sizesString}`;
    }

    if (ageString.length) {
      newQuery += `&age=${ageString}`;
    }
    if (sortString.length) {
      newQuery += `&sort=${sortString}`;
    }

    dispatch(setQuery(newQuery));
    dispatch(setQueryData(tempQueryData));
    dispatch(setTempQueryData(initialQueryData));
    setIsFilterPopupOpen(false);
  };

  const handleCancelFiltering = () => {
    dispatch(setTempQueryData(initialQueryData));
    setIsFilterPopupOpen(false);
  };

  const handleSearch = () => {
    refetchPosts();
  };

  const buttonType =
    isFetchingNextPage || isLoading
      ? ButtonType.SmallYellow
      : !hasNextPage || isFetchingNextPage
      ? ButtonType.Tertiary
      : ButtonType.SmallGreen;

  return (
    <>
      {category && enums && isFitlerPopupOpen ? (
        <FilterPopup
          onClick={handleCancelFiltering}
          getFilterResults={getFilterResults}
          categoryName={category}
        />
      ) : (
        <Box
          width="100%"
          minHeight="100vh"
          height="100%"
          gap="2rem"
          backgroundColor={theme.color.backgroundMain}
        >
          <Box
            width="100%"
            alignItems="center"
            flexDirection="row"
            padding="20px"
          >
            <S.SearchInput
              type="search"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={handleSearch} buttonType={ButtonType.SmallGreen}>
              Search
            </Button>
          </Box>
          <Box
            width="100%"
            objectFit="contain"
            maxHeight="30rem"
            justifyContent="center"
          >
            <S.MainImg src={imgUrls.clothesMain} alt="Clothes" />
          </Box>
          <Box
            flexDirection="row"
            gap="3rem"
            justifyContent="center"
            alignItems="center"
            padding="0 2rem"
          >
            <Box width="100%" alignItems="center">
              <Button
                onClick={() => setIsFilterPopupOpen(true)}
                buttonType={ButtonType.SmallGreen}
              >
                Filter
              </Button>
            </Box>
          </Box>
          {data &&
            data.pages[0] &&
            data.pages.map((data, i) => (
              <PostList key={i} posts={data.posts} />
            ))}

          <Box alignItems="center">
            <div ref={LoadMoreButton}>
              <Button buttonType={buttonType} onClick={() => fetchNextPage()}>
                {isFetchingNextPage || isLoading
                  ? "Loading more..."
                  : isError
                  ? "Error!"
                  : "No more posts!"}
              </Button>
              {error instanceof Error && <p> error.message</p>}
            </div>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Category;
