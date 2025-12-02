import { gql, useQuery } from "@apollo/client";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PostCard from "../components/PostCard";
import { ThemeContext } from "../context/ThemeContext";

const GET_POSTS = gql`
  query GetPosts($page: Int!, $limit: Int!) {
    posts(options: { paginate: { page: $page, limit: $limit } }) {
      data {
        id
        title
        body
      }
      meta {
        totalCount
      }
    }
  }
`;

const PAGE_LIMIT = 10;

const PostList = ({ navigation }) => {
  const [page, setPage] = useState(1);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { data, loading, error, refetch, fetchMore } = useQuery(GET_POSTS, {
    variables: { page, limit: PAGE_LIMIT },
  });

  const posts = data?.posts?.data || [];

  const onEndReached = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMore({
      variables: { page: nextPage, limit: PAGE_LIMIT },
    });
  };

  const onPressPost = (post) => {
    navigation.navigate("Details", { id: post.id });
  };

  if (loading && page === 1) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error loading posts</Text>
        <Text style={{ marginTop: 8, color: "#999", fontSize: 12 }}>
          {error?.message}
        </Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme === "light" ? "#f2f2f2" : "#000" },
      ]}
    >
      <View style={styles.header}>
        <Button title={`Theme: ${theme}`} onPress={toggleTheme} />
        <Button
          title="Favorites"
          onPress={() => navigation.navigate("Favorites")}
        />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PostCard post={item} onPress={onPressPost} />
        )}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListEmptyComponent={<Text style={styles.empty}>No posts found</Text>}
        ListFooterComponent={() =>
          loading ? <ActivityIndicator style={{ margin: 12 }} /> : null
        }
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => {
              setPage(1);
              refetch({ page: 1, limit: PAGE_LIMIT });
            }}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  header: { flexDirection: "row", justifyContent: "space-between", padding: 8 },
  empty: { padding: 16, textAlign: "center" },
});

export default PostList;
