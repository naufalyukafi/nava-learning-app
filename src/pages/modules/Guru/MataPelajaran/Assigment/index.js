import React, {useState, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Icon, List, ListItem} from '@ui-kitten/components';
import firestore from '@react-native-firebase/firestore';
import ImageView from 'react-native-image-viewing';
import Loading from '../../../../../components/Loading';

const Assigment = ({route}) => {
  const {threadLesson} = route.params;
  const [answer, setAnswer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [isAnswer, setIsAnswer] = useState(0);

  useEffect(() => {
    const fetchAssigments = async () => {
      try {
        const listData = [];
        await firestore()
          .collection('Assigment'+threadLesson.params.threadLesson.mapel)
          .orderBy('assigmentTime', 'desc')
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              const {images, assigmentTime, email} = doc.data();
              listData.push({
                id: doc.id,
                images, 
                assigmentTime,
                email
              });
            });
          });
        setAnswer(listData);
        
        if (loading) {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchAssigments();
  }, []);
  const renderItemIcon = (props) => (
    <Icon {...props} name='person'/>
  );

  if(answer.length === 0) {
    return loading ? <Loading /> : <Text style={{textAlign: 'center', marginTop: 20}}>Hasil Tugas Siswa Masih kosong</Text>
  }  
  
  return (
    <View style={styles.wrapper}>
       <List
          data={answer}
          renderItem={({item}) => (
            <>
              <ListItem
                  key={item.id}
                  title={item.email}
                  accessoryLeft={renderItemIcon}
                  accessoryRight={() => <Button onPress={() => {
                    setVisible(true)
                    setIsAnswer(item.id)
                  }}>Lihat Jawaban</Button>}
              />
              {(visible === true && isAnswer === item.id) && 
              <>
                {item.images.length === 1 ? 
                <ImageView 
                images={[
                  {
                    uri: item.images[0],
                  }
                ]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setVisible(false)}
              />
                :<ImageView 
                images={[
                  {
                    uri: item.images[0],
                  },
                  {
                    uri: item.images[1],
                  },
                  {
                    uri: item.images[2],
                  }
                ]}
                imageIndex={0}
                visible={visible}
                onRequestClose={() => setVisible(false)}
              />
              }
              </>
              }
            </>
          )}
        />

    </View>
    // </View>
  );
};

const styles = StyleSheet.create({
  wrapperr: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});
export default Assigment;
