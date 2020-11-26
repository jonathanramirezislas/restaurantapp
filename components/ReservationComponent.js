import React, { Component ,useState } from 'react';
import { Text, View, ScrollView, StyleSheet, Picker, Switch, Button,Modal, Alert  } from 'react-native';
import * as Animatable from 'react-native-animatable';
//import DateTimePicker from '@react-native-community/datetimepicker';
import * as Permissions from 'expo-permissions';
import * as Calendar  from 'expo-calendar';
import { Notifications } from 'expo';
import DateTimePicker from '@react-native-community/datetimepicker';

class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guests: 1,
            smoking: false,
            date: new Date(this.props.date)       
         }
this.setDate = this.setDate.bind(this);
    }

  
  
  setDate(newDate) {
  this.setState({date: newDate });
    }

    static navigationOptions = {
        title: 'Reserve Table'
    }

    handleReservation = () => {
        Alert.alert(
            'Your Reservation OK?',
            `Number of Guests: ${this.state.guests} \n
            Smoking? ${this.state.smoking} \n
            Date and Time: ${this.state.date}`,
            [
                { 
                    text: 'Cancel', 
                    onPress: () => this.resetForm(),
                    style: ' cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
                        this.presentLocalNotification(this.state.date); 
                        this.addReservationToCalendar(this.state.date);
                        console.log(this.state.date);
                        this.resetForm();
                    }
                }
            ],
            { cancelable: false }
        );
    }

    resetForm() {
        this.setState({
            guests: 1,
            smoking: false,
            date: ''
        });
    }

    obtainCalendarPermission = async () => {
        let permission = await Permissions.askAsync(Permissions.CALENDAR);
        if (permission.status !== 'granted') {
            Alert.alert('Calendar access is not granted!');
        } 
        console.log(permission)
        return permission;
    }

    addReservationToCalendar = async (date) => {
        await this.obtainCalendarPermission();
            
        let startTime = new Date(Date.parse(date));
        let endTime = new Date(Date.parse(date) + (2*60*60*1000));
        console.log(startTime);
        console.log(endTime);

        Calendar.createEventAsync(Calendar.DEFAULT, {
            title: 'Con Fusion Table Reservation',
            startDate: startTime,
            endDate: endTime,
            timeZone: 'Asia/Hong_Kong',
            location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
        }) 
    }

    // request permission from the system
    async obtainNotificationPermission() {
        // first check if permission exists
        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            // ask permission
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
            if (permission.status !== 'granted') {
                Alert.alert('Permission not granted to show notifications');
            }
        }
        return permission;
    }

    // configure the notification
    async presentLocalNotification(date) {
        await this.obtainNotificationPermission();
        Notifications.presentLocalNotificationAsync({
            title: 'Your Reservation',
            body: 'Reservation for ' + date + ' requested', 
            ios: {
                sound: true
            },
            android: {
                sound: true,
                vibrate: true,
                color: '#512DA8'
            }
        });
    }

    
    render() {
        const { date } = this.state;

        return(
            <Animatable.View animation="zoomIn" duration={2000}>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guests</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={this.state.guests}
                    onValueChange={(itemValue, itemIndex) => this.setState({guests: itemValue})}>
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={this.state.smoking}
                    trackColor='#512DA8'
                    onValueChange={(value) => this.setState({smoking: value})}>
                </Switch>
                </View>
                <View style={styles.formRow}>
                <Text style={styles.formLabel}>Date and Time</Text>
            
                <DateTimePicker
                        testID="dateTimePicker"
                       // timeZoneOffsetInMinutes={0}
                        value={new Date(2020, 1, 1)}
                        mode="date"
                        is24Hour={true}
                        display="default"
                        onChange={this.setDate}
                         />
                </View>
                <View style={styles.formRow}>
                <Button
                    onPress={() => this.handleReservation()}
                    title="Reserve"
                    color="#512DA8"
                    accessibilityLabel="Learn more about this purple button"
                    />
                </View>
              {/*
              
               <Modal animationType = {"slide"} transparent = {false}
                    visible = {this.state.showModal}
                    onDismiss = {() => this.toggleModal() }
                    onRequestClose = {() => this.toggleModal() }>
                    <View style = {styles.modal}>
                        <Text style = {styles.modalTitle}>Your Reservation</Text>
                        <Text style = {styles.modalText}>Number of Guests: {this.state.guests}</Text>
                        <Text style = {styles.modalText}>Smoking?: {this.state.smoking ? 'Yes' : 'No'}</Text>
                        <Text style = {styles.modalText}>Date and Time: {this.state.date}</Text>
                        
                        <Button 
                            onPress = {() =>{this.toggleModal(); this.resetForm();}}
                            color="#512DA8"
                            title="Close" 
                            />
                    </View>
                </Modal>
              */}
               
                
                </Animatable.View>
        );
    }

};

const styles = StyleSheet.create({
    formRow: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      flexDirection: 'row',
      margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    },
    modal: {
        justifyContent: 'center',
        margin: 20
     },
     modalTitle: {
         fontSize: 24,
         fontWeight: 'bold',
         backgroundColor: '#512DA8',
         textAlign: 'center',
         color: 'white',
         marginBottom: 20
     },
     modalText: {
         fontSize: 18,
         margin: 10
     }
});

export default Reservation;