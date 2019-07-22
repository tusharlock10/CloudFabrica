import React, {Component} from 'react';
import {View} from 'react-native';
import {StatusBar} from 'react-native';


export default class Header extends Component{
    render(){
        return(
            <View style={styles.headerStyle}>
                {this.props.children}

            </View>
        )
    }
}

const styles={
    headerStyle:{
        marginTop:StatusBar.currentHeight,
        elevation:7,
        backgroundColor:'rgb(255, 255, 255)',
        width:null,
        height:50,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-around',
    }
}