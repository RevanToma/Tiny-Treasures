import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import * as S from "./group.styles";
import { useEffect, useRef } from "react";
import Button from "../../components/common/Button/Button.component";
import { ButtonType } from "../../components/common/Button/button.types";
import PostList from "../../components/common/PostList/PostList.component";
import { theme } from "../../styles/themes";
import { useInfiniteQuery } from "@tanstack/react-query";
import FilterPopup from "./FilterPopup/FilterPopup.component";

import { imgUrls } from "../../utils/urls/imgUrls";
import {
  selectQuery,
  selectTempQueryData,
} from "../../store/query/query.selectors";
import { fetchPosts } from "../../api/requests";
import {
  initialQueryData,
  setQuery,
  setQueryData,
  setTempQueryData,
} from "../../store/query/querySlice";
import Box from "../../components/common/Box/Box";
import { useEnums } from "../../hooks/useEnums";
import GroupNavBar from "./GroupNavBar/GroupNavBar.component";
import { goToGroupPage } from "../../utils/helpers";
import LogoNavbar from "../../assets/LogoNavbar.svg";
import { FaSearch } from "react-icons/fa";
const Group: React.FC = () => {
  const { group } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoadMoreButton = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState<undefined | string>(undefined);

  const [isFitlerPopupOpen, setIsFilterPopupOpen] = useState<boolean>(false);
  const tempQueryData = useSelector(selectTempQueryData);
  const query = useSelector(selectQuery);
  const { data: enums } = useEnums();

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
    const typeOfItemsString = tempQueryData.TypeOfItems.join(",");
    const sizesString = tempQueryData.Sizes.join(",");
    const ageString = tempQueryData.Age.join(",");
    const sortString =
      tempQueryData.Sort[0] === "Most Recent"
        ? "-createdAt"
        : tempQueryData.Sort[0] === "Distance"
        ? "distance"
        : "";

    let newQuery = `group=${group}`;

    if (typeOfItemsString.length) {
      newQuery += `&typeOfItems=${typeOfItemsString}`;
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

  const handleChangeGroup = (item: string) => {
    goToGroupPage(dispatch, navigate, item);
  };

  const buttonType =
    isFetchingNextPage || isLoading
      ? ButtonType.SmallYellow
      : !hasNextPage || isFetchingNextPage
      ? ButtonType.Tertiary
      : ButtonType.SmallGreen;

  return (
    <>
      {group && enums && isFitlerPopupOpen ? (
        <FilterPopup
          onClick={handleCancelFiltering}
          getFilterResults={getFilterResults}
          groupName={group}
        />
      ) : (
        <Box
          width="100%"
          minHeight="100vh"
          height="100%"
          gap="2rem"
          backgroundColor={theme.color.primaryOffWhite}
        >
          <S.SearchWrapper>
            <img src={LogoNavbar} />
            <S.SearchInput
              type="search"
              placeholder="search..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch size={25} onClick={handleSearch} color="#808080" />
            {/* <Button onClick={handleSearch} buttonType={ButtonType.SmallGreen}>
              Search
            </Button> */}
          </S.SearchWrapper>
          <GroupNavBar
            handleChangeGroup={handleChangeGroup}
            items={enums && enums.main}
            currentItem={group}
          />
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
                buttonType={ButtonType.SmallBlue}
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

export default Group;
