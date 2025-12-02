import React, { useContext, useState } from 'react';
import { View, Text, Button, FlatList, RefreshControl, ActivityIndicator, StyleSheet } from 'react-native';

const PostList = ({ 
  loading, 
  page, 
  error, 
  posts, 
  refetch, 
  onEndReached, 
  onPressPost, 
  toggleTheme, 
  theme, 
  navigation, 
  setPage, 
  PAGE_LIMIT 
}) => {

  // LOADING at first page
  if (loading && page === 1) {
    return (
      <View style={styles.center}>
        <ActivityIndicator />
      </View>
    );
  }

  // ERROR UI
  if (error) {
    return (
      <View style={styles.center}>
        <Text>Error loading posts</Text>
        <Button title="Retry" onPress={() => refetch()} />
      </View>
    );
  }

  // MAIN UI
  return (
    <View style={[styles.container, { backgroundColor: theme === 'light' ? '#f2f2f2' : '#000' }]}>

      <View style={styles.header}>
        <Button title={`Theme: ${theme}`} onPress={toggleTheme} />
        <Button title="Favorites" onPress={() => navigation.navigate('Favorites')} />
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <PostCard post={item} onPress={onPressPost} />}
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
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 8 },
  empty: { padding: 16, textAlign: 'center' },
});

export default PostList;
