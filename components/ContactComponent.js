import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, Button, Icon } from 'react-native-elements';
import * as MailComposer from 'expo-mail-composer';

class Contact extends Component {
    static navigationOptions = {
        title: 'Contact Us'
      };

      
    sendMail() {
        MailComposer.composeAsync({
            recipients: ['jonathan@jonathan.com.mx'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }
    

     render() {
        return(
            <View>
                 <Card title='Contact Information'>
                    <Text>121, Clear Water Bay Road</Text>
                    <Text>Clear Water Bay, Kowloon</Text>
                    <Text>Mexico</Text>
                    <Text>Tel: +449 1234 5678</Text>
                    <Text>Fax: +499 8765 4321</Text>
                    <Text>Email:jonathan@jonathan.com.mx</Text>
                    <Button title="Send Email"
                    buttonStyle={{backgroundColor: "#512DA8"}}
                    icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                    onPress={this.sendMail}
                    />
                    <Button
                        title="Send Email"
                        buttonStyle={{backgroundColor: "#512DA8"}}
                        icon={<Icon name='envelope-o' type='font-awesome' color='white' />}
                        onPress={this.sendMail}
                        />
                        
                </Card>
            </View>
               

                
        );
    }
}
export default Contact;