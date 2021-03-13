import React, {Component} from "react";
import {Text, View} from "react-native";
import {withTranslation} from "react-i18next";
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash'
import {BLACK, INDIGO} from "../../configuration/Constants";

const K_OPTIONS = [
    {
        item: 'Juventus',
        id: 'JUVE',
    },
    {
        item: 'Real Madrid',
        id: 'RM',
    },
    {
        item: 'Barcelona',
        id: 'BR',
    },
    {
        item: 'PSG',
        id: 'PSG',
    },
    {
        item: 'FC Bayern Munich',
        id: 'FBM',
    },
    {
        item: 'Manchester United FC',
        id: 'MUN',
    },
    {
        item: 'Manchester City FC',
        id: 'MCI',
    },
    {
        item: 'Everton FC',
        id: 'EVE',
    },
    {
        item: 'Tottenham Hotspur FC',
        id: 'TOT',
    },
    {
        item: 'Chelsea FC',
        id: 'CHE',
    },
    {
        item: 'Liverpool FC',
        id: 'LIV',
    },
    {
        item: 'Arsenal FC',
        id: 'ARS',
    },

    {
        item: 'Leicester City FC',
        id: 'LEI',
    },
]

class ChangeConfigsForm extends Component<any, any> {

    constructor(props: Readonly<any>) {
        super(props);
        this.state = {
            selectedTeam: {},
            selectedTeams: []
        };
        this.onChange = this.onChange.bind(this);
        this.onMultiChange = this.onMultiChange.bind(this);
    }

    onMultiChange(item: any) {
        this.setState({
            selectedTeams: xorBy(this.state.selectedTeams, [item], 'id')
        })
    }

    onChange(val: any) {
        this.setState({
            selectedTeam: val
        })
    }

    render() {
        const {selectedTeam, selectedTeams} = this.state;

        return (
            <View style={{
                borderBottomWidth: 1,
                borderBottomColor: INDIGO
            }}>
                <SelectBox
                    label={"Select preferred topics:"}
                    inputPlaceholder={null}
                    inputFilterContainerStyle={{
                        display: "none"
                    }}
                    labelStyle={{
                        fontSize: 14,
                        color: BLACK
                    }}
                    multiOptionContainerStyle={{
                        backgroundColor: INDIGO
                    }}
                    containerStyle={{
                        borderBottomColor: INDIGO
                    }}
                    arrowIconColor={INDIGO}
                    toggleIconColor={INDIGO}
                    searchIconColor={INDIGO}
                    options={K_OPTIONS}
                    selectedValues={selectedTeams}
                    onMultiSelect={this.onMultiChange}
                    onTapClose={this.onMultiChange}
                    isMulti
                />
            </View>
        );
    }

}

export default withTranslation()(ChangeConfigsForm);
