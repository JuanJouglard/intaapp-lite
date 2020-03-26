import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Percentage} from '../../shared/PercentageCircle';

export class Percentages extends Component {
  render() {
    return (
      <View style={styles.percentages}>
        <Text style={styles.cover}>Cubrimiento</Text>
        <View style={styles.circlesContainer}>
          <Percentage
            color="#32CD32"
            percentage={this.props.percentageGreen}
            title="Vivo"
          />
          <Percentage
            color="#fce303"
            percentage={this.props.percentageYellow}
            title="Muerto"
          />
          <Percentage
            color="#f5f7f7"
            percentage={this.props.percentageYellow}
            title="Desnudo"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  percentages: {
    flex: 2,
    width: '90%',
    borderRadius: 25,
    backgroundColor: '#1f2f33',
    alignItems: 'center',
    padding: 25,
    elevation: 3,
    paddingTop: 0,
  },
  circlesContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  cover: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
});
