/* eslint-disable react-native/no-inline-styles */
import React, {useMemo, useState} from 'react';
import {View, StyleSheet, ScrollView, RefreshControl, Text} from 'react-native';
import HeaderBar from '../header';
import AttendanceCard from './component/card';
import UserInfo from './component/user-info';
import {useStudentAttendanceQuery} from '../../hooks/attandance/query/getAttandance.query';
import {useFocusEffect} from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const [date, setDate] = useState(null);
  const {data, isLoading, refetch, isFetching} = useStudentAttendanceQuery({
    date: date,
  });
  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const [studentDetails, setStudentDetails] = useState<TStudentHeaderData>();

  const attendances: TStudentAttendance[] = useMemo(() => {
    if (!isLoading && data) {
      setStudentDetails(data.extraData);
      return data.data;
    } else {
      return [];
    }
  }, [isLoading, data]);

  return (
    <View style={styles.main}>
      <HeaderBar />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isFetching} onRefresh={refetch} />
        }>
        {studentDetails && (
          <UserInfo item={studentDetails} date={date} setDate={setDate} />
        )}

        {attendances.length === 0 && (
          <View>
            <Text
              style={{
                textAlign: 'center',
                color: '#ff008a',
                textTransform: 'uppercase',
                paddingTop: 200,
                fontSize: 15,
              }}>
              No record found
            </Text>
          </View>
        )}

        {attendances.length > 0 &&
          attendances.map(item => (
            <AttendanceCard key={item._id} data={item} />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingBottom: 90,
  },
});

export default HomeScreen;
