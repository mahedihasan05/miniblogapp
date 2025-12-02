import { useQuery, gql } from '@apollo/client';


const GET_POSTS = gql`
query GetPosts($page: Int, $limit: Int) {
posts(page: $page, limit: $limit) { id title body }
}
`;


export const usePagination = (initialPage = 1, limit = 10) => {
const { data, loading, error, fetchMore, refetch } = useQuery(GET_POSTS, {
variables: { page: initialPage, limit }
});


const loadMore = async (currentPage) => {
await fetchMore({ variables: { page: currentPage + 1, limit } });
};


return {
posts: data?.posts || [],
loading,
error,
loadMore,
refetch
};
};


export const GET_POSTS_QUERY = GET_POSTS;