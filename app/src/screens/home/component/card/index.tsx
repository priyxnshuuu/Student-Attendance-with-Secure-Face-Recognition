/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Card, Icon} from '@rneui/base';
import moment from 'moment';

interface CardProps {
  data: TStudentAttendance;
}

const AttendanceCard: React.FC<CardProps> = ({data}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'late':
        return 'rgb(247, 144, 9))';
      case 'on time':
        return 'rgb(83, 177, 253)';
      default:
        return 'rgb(255, 0, 0)';
    }
  };
  return (
    <Card
      containerStyle={{
        borderWidth: 0,
        borderTopWidth: 3,
        borderColor: getStatusColor(data.status),
      }}>
      <View>
        <View style={styles.top}>
          <Text style={styles.topTextleft}>
            {moment(data.createdAt).format('ddd, MMM DD, YYYY ')}
          </Text>
          <View
            style={[
              styles.icon_Text,
              {
                backgroundColor:
                  data.status === 'late'
                    ? 'rgb(255, 250, 235)'
                    : data.status === 'on time'
                    ? 'rgb(239, 248, 255)'
                    : 'rgb(255, 229, 229)',
              },
            ]}>
            <Icon
              style={styles.dot}
              name="circle"
              size={10}
              color={
                data.status === 'late'
                  ? 'rgb(247, 144, 9)'
                  : data.status === 'on time'
                  ? 'rgb(83, 177, 253)'
                  : 'red'
              }
            />
            <Text
              style={[
                styles.topTextright,
                {
                  color:
                    data.status === 'late'
                      ? 'rgb(247, 144, 9)'
                      : data.status === 'on time'
                      ? 'rgb(83, 177, 253)'
                      : 'rgb(255, 0, 0)',
                },
              ]}>
              {data.status}
            </Text>
          </View>
        </View>
        <View style={styles.line} />

        <View style={styles.center}>
          <View>
            <Text style={styles.checkText}>Check In</Text>
            <Text style={styles.checkTime}>
              {data.inTime ? moment(data.inTime).format('LT') : '---'}
            </Text>
          </View>
          <View>
            <Text style={styles.checkText}>Check Out</Text>
            <Text style={styles.checkTime}>
              {data.outTime ? moment(data.outTime).format('LT') : '---'}
            </Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.center}>
          <View>
            <Text style={styles.checkText}>Notes:</Text>
          </View>
          <View>
            <Text style={styles.lastText}>{data.notes}</Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  lateCard: {
    backgroundColor: 'yellow',
  },
  onTimeCard: {
    backgroundColor: 'green',
  },
  absentCard: {
    backgroundColor: 'red',
  },
  icon_Text: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
  },
  top: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  topTextleft: {
    color: 'rgb(102, 112, 133)',
    top: 10,
  },

  topTextright: {
    fontSize: 12,
  },

  dot: {
    top: 2,
    paddingRight: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  content: {
    fontSize: 16,
    color: 'black',
  },

  line: {
    backgroundColor: '#E7E7E7',
    marginVertical: 4,
    height: 0.7,
    top: 4,
  },
  center: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },

  checkText: {
    color: 'rgb(134, 142, 150)',
    bottom: 6,
  },
  checkTime: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lastText: {
    color: 'black',
    bottom: 5,
    width: 285,
  },
});

export default AttendanceCard;
