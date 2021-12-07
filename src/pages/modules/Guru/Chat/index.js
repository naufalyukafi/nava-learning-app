import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Divider, List, ListItem} from '@ui-kitten/components';

const ChatGuru = () => {
  const [data, setData] = React.useState([
    {
      title: 'Tematik',
      description: 'Tematik asikkk...',
    },
    {
      title: 'Bahasa Inggris',
      description: 'Bahasa Inggris asikkk...',
    },
    {
      title: 'Agama Islam',
      description: 'Agama Islam asikkk...',
    },
  ]);

  return (
    <View style={styles.wrapper}>
      <List
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={({item}) => (
          <ListItem
            key={item.id}
            title={item.title}
            description={item.description}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default ChatGuru;
