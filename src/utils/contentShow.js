import React, { Component } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Highlighter from 'react-native-highlight-words';
import { firebase, usersCollection } from "../firebase";


class ContentShow extends Component {
    state = {
        rainSound: "",
        fireSound: "",
        forestSound: "",
        wordsToSearch: [/\b\Fire\b/gi, /\b\Rain\b/gi, /\b\Forest\b/gi],
        currentUID: firebase.auth().currentUser.uid
    }

    componentDidMount() {
        usersCollection
            .doc(this.state.currentUID)
            .get()
            .then(snapshot => {
                const data = snapshot.data()
                this.setState({ rainSound: data.rain, fireSound: data.fire, forestSound: data.forest })
            })
    }

    selectSound() {
        console.warn(this.children)
        // if regexp.match(word) === word {do this } 
    }

    stopTheNoise = () => {
        rain1.stop()
        rain2.stop()
        rain3.stop()
        fire1.stop()
        fire2.stop()
        fire3.stop()
        forest1.stop()
        forest2.stop()
        forest3.stop()
    }

    render() {
        return (
            <View>
                <View style={{ padding: 10 }}>
                    <Text style={styles.articleTitle}>
                        {this.props.params.postData.title}
                    </Text>
                    <Text style={styles.articleContent}>
                        <Highlighter
                            highlightStyle={{ backgroundColor: 'yellow' }}
                            searchWords={this.state.wordsToSearch}
                            textToHighlight={this.props.params.postData.content.replace(/<p>/g, "").replace(/<\/p>/g, "\n\n")}
                            onPressHighlightedText={this.selectSound}
                            onPressNormalText={() => this.stopTheNoise()}
                        />
                    </Text>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    articleTitle: {
        fontSize: 30,
        marginBottom: 30,
        fontWeight: '300',
        color: '#444444'
    },
    articleContent: {
        fontSize: 16,
        color: '#444444'
    }
})

export default ContentShow;