import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from "firebase";
import {Button, Card, CardSection, Header, Spinner} from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {

    state = { loggedIn: null };

    componentWillMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBujbmPloY_yn9WzzjLwYeDBICfMbdDMEw',
            authDomain: 'auth-5e128.firebaseapp.com',
            databaseURL: 'https://auth-5e128.firebaseio.com',
            projectId: 'auth-5e128',
            storageBucket: 'auth-5e128.appspot.com',
            messagingSenderId: '167788873467'
        });

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({ loggedIn: true });
            }else {
                this.setState({ loggedIn: false });
            }
        });
    }

    renderContent() {
        switch (this.state.loggedIn) {
            case true:
                return (
                    <Card>
                        <CardSection>
                            <Button onPress={() => firebase.auth().signOut()}>
                                Log Out
                            </Button>
                        </CardSection>
                    </Card>
                );
            case  false:
                return <LoginForm/>;
            default:
                return (
                    <Card>
                        <CardSection>
                            <Spinner size="large"/>
                        </CardSection>
                    </Card>
                );
        }
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                { this.renderContent() }
            </View>
        );
    }
}

export default App;
