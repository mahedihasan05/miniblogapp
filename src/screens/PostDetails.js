import React, { useContext } from 'react';
import { View, Text, ActivityIndicator, Button, StyleSheet } from 'react-native';
import { gql, useQuery, useMutation } from '@apollo/client';
import { ThemeContext } from '../context/ThemeContext';
import { useFavorites } from '../hooks/useFavorites';


const GET_POST = gql`query GetPost($id: ID!) { post(id: $id) { id title body } }`;
const LIKE_POST = gql`mutation LikePost($id: ID!) { likePost(id: $id) { id } }`;


const PostDetails = ({ route }) => {
const { id } = route.params;
const { theme } = useContext(ThemeContext);
const { data, loading, error, refetch } = useQuery(GET_POST, { variables: { id } });
const [like] = useMutation(LIKE_POST);
const { isFavorite, toggleFavorite } = useFavorites();


const post = data?.post;


if (loading) return <View style={styles.center}><ActivityIndicator /></View>;
if (error) return (
<View style={styles.center}><Text>Error loading post</Text><Button title="Retry" onPress={() => refetch()} /></View>
);


return (
<View style={[styles.container, { backgroundColor: theme === 'light' ? '#fff' : '#111' }]}>
<Text style={[styles.title, { color: theme === 'light' ? '#000' : '#fff' }]}>{post.title}</Text>
<Text style={[styles.body, { color: theme === 'light' ? '#333' : '#ddd' }]}>{post.body}</Text>
<Button title={isFavorite(post.id) ? 'Unlike' : 'Like'} onPress={() => toggleFavorite(post.id)} />
<Button title="Like (mutation)" onPress={() => { like({ variables: { id } }); }} />
</View>
);
};


const styles = StyleSheet.create({
container: { flex: 1, padding: 16 },
title: { fontSize: 20, fontWeight: '700', marginBottom: 12 },
body: { fontSize: 16, marginBottom: 18 },
center: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});


export default PostDetails;