import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { useFavorites } from '../hooks/useFavorites';

const PostCard = ({ post, onPress }) => {
  const { theme } = useContext(ThemeContext);
  const { isFavorite, toggleFavorite } = useFavorites();

  const styles = getStyles(theme);

  return (
    <TouchableOpacity onPress={() => onPress(post)} style={styles.card}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.title}>{post.title}</Text>

        <TouchableOpacity onPress={() => toggleFavorite(post.id)}>
          <Text style={styles.star}>{isFavorite(post.id) ? '⭐' : '☆'}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.body} numberOfLines={2}>
        {post.body}
      </Text>
    </TouchableOpacity>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme === 'light' ? '#fff' : '#222',
      padding: 12,
      marginVertical: 6,
      marginHorizontal: 12,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 2,
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      color: theme === 'light' ? '#000' : '#fff',
    },
    body: {
      marginTop: 6,
      color: theme === 'light' ? '#333' : '#ddd',
    },
    star: {
      fontSize: 20,
    },
  });

export default PostCard;
