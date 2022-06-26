import React, { Component } from 'react'

import {
    View,
    Text,
} from 'react-native';

const DayInWeek = ({day}) =>{
        return(
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Text
                    style={{
                        color: "gray",
                    }}
                >
                    {day}
                </Text>
            </View>
        )
    }

    export default DayInWeek;