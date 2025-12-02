import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useReactiveVar } from '@apollo/client';
import { favoritePostsVar } from '../apollo/client';
import { useQuery, gql } from '@apollo/client';
import PostCard from '../components/PostCard';
import { ThemeContext } from '../context/ThemeContext';


const GET_POSTS_BY_IDS = gql`query PostsByIds($ids: [ID!]!) { postsByIds: posts(page: 1, limit: 1000) { id title body } }`;


// We simplified: the local schema doesn't support filtering by ids easily; we'll fetch a chunk and filter client-side.


const Favorites = ({ navigation }) => {
const favIds = useReactiveVar(favoritePostsVar);
const { theme } = useContext(ThemeContext);


// Fetch first large page (our mock has 100 total)
const { data, loading } = useQuery(gql`query AllPosts { posts(page:1, limit:100) { id title body } }`);
const all = data?.posts || [];
const favPosts = all.filter(p => favIds.includes(p.id));


return (
<View style={[styles.container, { backgroundColor: theme === 'light' ? '#f8f8f8' : '#000' }]}>
<Text style={[styles.heading, { color: theme === 'light' ? '#000' : '#fff' }]}>Favorites</Text>
{loading ? <Text>Loading...</Text> : (
<FlatList
data={favPosts}
keyExtractor={i => i.id}
renderItem={({ item }) => <PostCard post={item} onPress={(p) => navigation.navigate('Details', { id: p.id })} />}
ListEmptyComponent={<Text style={styles.empty}>No favorites added yet</Text>}
/>
)}
</View>
);
};


const styles = StyleSheet.create({
container: { flex: 1 },
heading: { fontSize: 20, fontWeight: '700', padding: 12 },
empty: { padding: 12, textAlign: 'center' }
});


export default Favorites;