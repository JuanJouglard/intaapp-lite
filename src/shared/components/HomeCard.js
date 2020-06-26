import {StyleSheet, View, Text} from 'react-native';
import React from 'react';
import {CardItem, Icon} from 'native-base';

export function HomeCard(props) {
  return (
    <View style={styles.cardContainer}>
      <CardItem style={styles.card} header button onPress={props.onPress}>
        <Icon
          type={props.icon.type}
          name={props.icon.name}
          style={styles.icon}
        />
        <Text style={styles.descText}>{props.text}</Text>
      </CardItem>
    </View>
  );
}
const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'rgba(31, 47, 51, 0.3)',
  },
  cardContainer: {
    flex: 1,
    padding: 25,
  },
  icon: {
    fontSize: 64,
    width: 'auto',
    color: 'rgba(31, 47, 51, 1)',
  },
  descText: {
    color: 'rgb(26, 40, 43)',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    textAlign: 'center',
  },
});
