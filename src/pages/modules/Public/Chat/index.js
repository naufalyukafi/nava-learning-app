import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Divider, List, ListItem} from '@ui-kitten/components';

const Chat = ({navigation}) => {
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
          <TouchableOpacity onPress={() => navigation.navigate('Room')}>
            <ListItem title={item.title} description={item.description} />
          </TouchableOpacity>
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

export default Chat;
