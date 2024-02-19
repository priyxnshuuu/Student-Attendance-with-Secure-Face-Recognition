import {Icon} from '@rneui/themed';
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {useAppSelector} from '../../../../app/hooks';

interface IHeaderValues {
  item: TStudentHeaderData;
  date: Date | null;
  setDate: Function;
}
const Header: React.FC<IHeaderValues> = ({item, date, setDate}) => {
  const [open, setOpen] = useState(false);

  const {
    userData: {name, email},
  } = useAppSelector(state => state.user);
  return (
    <View style={styles.mainBox}>
      <View>
        <View style={styles.headingContainer}>
          <View>
            <Text style={styles.heading}>{name}</Text>
            <Text style={styles.gmail}>{email}</Text>
          </View>
          <View style={styles.totalDays}>
            <Icon style={styles.total} name="event-available" />
            <Text style={styles.days}>
              <Text style={styles.number}>{item.totalAttendance ?? 0} </Text>
              Days
            </Text>
          </View>
        </View>

        <View style={styles.line} />

        <View style={styles.statusContainer}>
          <View style={styles.flex}>
            <Icon
              name="circle"
              size={10}
              style={styles.dot}
              color={'rgb(83, 177, 253)'}
            />
            <Text style={styles.time}>On Time</Text>
            <Text style={styles.percent}>
              {Number(item.percentageOnTime ?? 0).toFixed(2) + '%'}
            </Text>
          </View>

          <View style={styles.verticleLine} />

          <View style={styles.flex}>
            <Icon
              name="circle"
              size={10}
              style={styles.dot}
              color={'rgb(247, 144, 9))'}
            />
            <Text style={styles.time}>Late</Text>
            <Text style={styles.percent}>
              {Number(item.percentageLate ?? 0).toFixed(2) + '%'}
            </Text>
          </View>
          <View style={styles.verticleLine} />
          <View style={styles.flex}>
            <Icon
              name="circle"
              size={10}
              style={styles.dot}
              color={'rgb(255, 0, 0)'}
            />
            <Text style={styles.time}>Absent</Text>
            <Text style={styles.percent}>
              {Number(item.percentageAbsent ?? 0).toFixed(2) + '%'}
            </Text>
          </View>
        </View>

        <View style={styles.line} />
        <TouchableOpacity style={styles.calander} onPress={() => setOpen(true)}>
          <Text style={styles.date}>
            {date ? date.toDateString() : new Date().toDateString()}
          </Text>
          <Icon name="calendar-month" size={25} />
          <Icon
            style={{marginLeft: 15}}
            onPress={() => setDate(null)}
            name="restart-alt"
            size={25}
            color="#ff008a"
          />
        </TouchableOpacity>

        <DatePicker
          modal
          maximumDate={new Date()}
          mode="date"
          theme="light"
          confirmText="Select"
          open={open}
          date={date ? date : new Date()}
          onConfirm={d => {
            setOpen(false);
            setDate(d);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    padding: 15,
    paddingTop: 25,
  },
  headingContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },

  icon: {
    paddingRight: 10,
    top: 4,
  },
  heading: {
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  gmail: {
    color: 'rgb(134, 142, 150)',
    left: 3,
    fontSize: 14,
  },

  total: {
    color: 'black',
    fontSize: 20,
  },
  days: {
    color: '#rgb(134, 142, 150)',
  },
  totalDays: {
    marginLeft: 80,
    top: 4,
  },
  number: {
    fontSize: 24,
    color: '#F00F89',
    fontWeight: 'bold',
  },

  line: {
    backgroundColor: '#E7E7E7',
    marginVertical: 4,
    height: 1,
    top: 8,
  },
  verticleLine: {
    height: 29,
    width: 0.8,
    backgroundColor: '#909090',
  },
  statusContainer: {
    marginTop: 15,
    flexDirection: 'row',
    borderWidth: 0.8,
    borderColor: 'rgb(134, 142, 150)',
    borderRadius: 5,
    marginBottom: 20,
  },

  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },

  time: {
    color: 'black',
    paddingLeft: 6,
    fontSize: 12,
  },

  percent: {
    paddingLeft: 10,
    color: '#rgb(134, 142, 150)',
    fontSize: 12,
  },

  dot: {
    padding: 3,
  },

  borderLeft: {
    borderLeftWidth: 1,
    borderColor: 'black',
  },

  calander: {
    marginTop: 25,
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 0.8,
    borderColor: '#rgb(134, 142, 150)',
    borderRadius: 5,
    width: '40%',
    padding: 7,
    paddingLeft: 10,
  },

  date: {
    color: 'black',
    top: 5,
    paddingRight: 8,
  },
});

export default Header;
