import React, { Component } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import {  Input, CheckBox } from 'react-native-elements';
//import { SecureStore } from 'expo';
import * as SecureStore from 'expo-secure-store';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            remember: false
        }
    }

    componentDidMount() {
         /*get the userinfo when the component is mount
         Note. in real project I must check if the password did'nt change :)
         and encrypt the password
         */
        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                /*The data in SecureStore is saved as key:value */
                let userinfo = JSON.parse(userdata);
                if (userinfo) {//if userinfo is not null
                    this.setState({username: userinfo.username});//set the value from the SecureStore
                    this.setState({password: userinfo.password});
                    this.setState({remember: true})
                }
            })
    }

    static navigationOptions = {
        title: 'Login',
    };

    handleLogin() {
        console.log(JSON.stringify(this.state));
        if (this.state.remember)//if we choose to save the login
            SecureStore.setItemAsync('userinfo', JSON.stringify({username: this.state.username, password: this.state.password}))//save the data in the secureStore
                .catch((error) => console.log('Could not save user info', error));//if there is a error saving 
        else
            SecureStore.deleteItemAsync('userinfo')//delete data from SecureStore
                .catch((error) => console.log('Could not delete user info', error));

    }

    render() {
        return (
            <View style={styles.container}>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => this.setState({username})}
                    value={this.state.username}
                    containerStyle={styles.formInput}
                    />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                    containerStyle={styles.formInput}
                    />
                <CheckBox title="Remember Me"
                    center
                    checked={this.state.remember}
                    onPress={() => this.setState({remember: !this.state.remember})}
                    containerStyle={styles.formCheckbox}
                    />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => this.handleLogin()}
                        title="Login"
                        color="#512DA8"
                        />
                </View>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        margin: 40
    },
    formCheckbox: {
        margin: 40,
        backgroundColor: null
    },
    formButton: {
        margin: 60
    }
});

export default Login;