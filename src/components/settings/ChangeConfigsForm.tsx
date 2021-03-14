import React, {Component, ReactNode} from "react";
import {StyleSheet, View} from "react-native";
import {withTranslation} from "react-i18next";
import SelectBox from 'react-native-multi-selectbox';
import {xorBy} from 'lodash'
import {BLACK, INDIGO} from "../../configuration/Constants";
import {getCurrentUserConfig, getTopics, saveCurrentUserConfig} from "../client/Client";
import {Topic} from "../../models/Topic";
import {ErrorResponse} from "../../models/HttpError";
import {MaterialIndicator} from "react-native-indicators";
import {Button, Text} from "native-base";
import {ProfileConfiguration} from "../../models/ProfileConfiguration";

class ChangeConfigsForm extends Component<any, any> {

    static controlStyles = StyleSheet.create({
        common: {
            marginVertical: 10
        },
        selectContainer: {
            borderBottomWidth: 1,
            borderBottomColor: INDIGO
        },
        inputFilterContainerStyle: {
            display: "none"
        },
        labelStyle: {
            fontSize: 14,
            color: BLACK
        },
        multiOptionContainerStyle: {
            backgroundColor: INDIGO
        },
        containerStyle: {
            borderBottomColor: INDIGO
        }
    });

    constructor(props: any) {
        super(props);
        this.state = {
            topics: {
                loading: false,
                items: [],
                selected: []
            },
            languageLevel: {
                loading: false,
                items: [],
                selected: []
            }
        };
        this.onLoadTopics = this.onLoadTopics.bind(this);
        this.onLoadLanguageLevels = this.onLoadLanguageLevels.bind(this);
        this.onSelectTopic = this.onSelectTopic.bind(this);
        this.onSaveChanges = this.onSaveChanges.bind(this);
        this.onSelectLanguageLevel = this.onSelectLanguageLevel.bind(this);
        this.onLoadConfig = this.onLoadConfig.bind(this);
    }

    async componentDidMount() {
        await this.onLoadTopics();
        this.onLoadLanguageLevels();
        this.onLoadConfig();
    }

    onLoadTopics() {
        this.setState({
            topics: {
                loading: true,
                items: this.state.topics.items,
                selected: []
            }
        });
        return getTopics()
            .then((topics: Topic[]) => {
                this.setState({
                    topics: {
                        loading: false,
                        items: topics.map(topic => {
                            return {id: topic.id, item: topic.name}
                        }),
                        selected: []
                    }
                });
            })
            .catch((error: ErrorResponse) => {
                this.setState({
                    topics: {
                        loading: false,
                        items: [],
                        selected: []
                    }
                });
            });
    }

    onLoadLanguageLevels() {
        const levels = ["Elementary", "Beginner", "Pre-Intermediate", "Intermediate", "Upper-Intermediate", "Native"];
        const items: any[] = [];
        for (let i = 0; i < levels.length; i++) {
            items.push({
                id: i,
                item: levels[i]
            });
        }
        this.setState({
            languageLevel: {
                loading: false,
                items: items,
                selected: []
            }
        })
    }

    onSelectTopic(item: any) {
        this.setState({
            topics: {
                loading: this.state.topics.loading,
                items: this.state.topics.items,
                selected: xorBy(this.state.topics.selected, [item], 'id')
            }
        })
    }

    onSelectLanguageLevel(item: any) {
        this.setState({
            languageLevel: {
                loading: this.state.languageLevel.loading,
                items: this.state.languageLevel.items,
                selected: item
            }
        })
    }

    onLoadConfig() {
        getCurrentUserConfig()
            .then((config: ProfileConfiguration) => {
                this.setState({config});
                let selectedTopics: any[] = [];
                if (config.preferredTopics) {
                    for (const topic of config.preferredTopics) {
                        selectedTopics.push({id: topic.id, item: topic.name});
                    }
                    this.setState({
                        topics: {
                            loading: this.state.topics.loading,
                            items: this.state.topics.items,
                            selected: selectedTopics
                        }
                    });
                }
                if (config.languageSkillsConfig && config.languageSkillsConfig.selectedLanguageLevel) {
                    this.setState({
                       languageLevel: {
                           loading: this.state.languageLevel.loading,
                           items: this.state.languageLevel.items,
                           selected: config.languageSkillsConfig.selectedLanguageLevel
                       }
                    });
                }
            })
            .catch((error: ErrorResponse) => {
                console.error("Can't load config: " + JSON.stringify(error));
            });
    }

    onSaveChanges() {
        const selectedTopics = this.state.topics.selected;
        const selectedLanguageLevel = this.state.languageLevel.selected;
        const currentConfig = this.state.config;

        const topics: Topic[] = selectedTopics.map(item => {
            let topic: Topic = new Topic();
            topic.id = item.id;
            topic.name = item.item;
            return topic;
        });

        saveCurrentUserConfig(topics, selectedLanguageLevel, currentConfig.id)
            .then((config: ProfileConfiguration) => {
                this.setState({config});
            })
            .catch((error: ErrorResponse) => {
                console.error(error);
            });
    }

    render() {
        const {topics, languageLevel} = this.state;
        const {t} = this.props;

        const loader: ReactNode = (
            <MaterialIndicator
                style={ChangeConfigsForm.controlStyles.common}
                color={INDIGO}
            />
        );

        const selectPreferredTopicsNode = topics.loading ?
            loader :
            <View
                style={Object.assign({}, ChangeConfigsForm.controlStyles.common, ChangeConfigsForm.controlStyles.selectContainer)}>
                <SelectBox
                    label={t("settings:fields.selectPreferredTopics")}
                    inputPlaceholder={null}
                    inputFilterContainerStyle={ChangeConfigsForm.controlStyles.inputFilterContainerStyle}
                    labelStyle={ChangeConfigsForm.controlStyles.labelStyle}
                    multiOptionContainerStyle={ChangeConfigsForm.controlStyles.multiOptionContainerStyle}
                    containerStyle={ChangeConfigsForm.controlStyles.containerStyle}
                    arrowIconColor={INDIGO}
                    toggleIconColor={INDIGO}
                    searchIconColor={INDIGO}
                    options={topics.items}
                    selectedValues={topics.selected}
                    onMultiSelect={this.onSelectTopic}
                    onTapClose={this.onSelectTopic}
                    isMulti
                />
            </View>;

        const selectLanguageLevelNode = languageLevel.loading ?
            loader :
            <View
                style={Object.assign({}, ChangeConfigsForm.controlStyles.common, ChangeConfigsForm.controlStyles.selectContainer)}>
                <SelectBox
                    label={t("settings:fields.selectLanguageLevel")}
                    inputPlaceholder={null}
                    inputFilterContainerStyle={ChangeConfigsForm.controlStyles.inputFilterContainerStyle}
                    labelStyle={ChangeConfigsForm.controlStyles.labelStyle}
                    containerStyle={ChangeConfigsForm.controlStyles.containerStyle}
                    arrowIconColor={INDIGO}
                    toggleIconColor={INDIGO}
                    searchIconColor={INDIGO}
                    options={languageLevel.items}
                    value={languageLevel.selected}
                    onChange={this.onSelectLanguageLevel}
                />
            </View>;

        const noItems: boolean = topics.items.length === 0 || languageLevel.items.length === 0;
        const noSelectedItems: boolean = topics.selected.length === 0 || !languageLevel.selected;
        const saveButtonDisabled: boolean = noItems || noSelectedItems;
        const buttonStyles = saveButtonDisabled ? {backgroundColor: "#ccc"} : {backgroundColor: INDIGO};

        //TODO add locale to loading!

        return (
            <View>
                {selectPreferredTopicsNode}
                {selectLanguageLevelNode}
                <View style={ChangeConfigsForm.controlStyles.common}>
                    <Button full
                            disabled={saveButtonDisabled}
                            onPress={this.onSaveChanges}
                            style={buttonStyles}
                    >
                        <Text>{t("settings:buttons.saveChanges")}</Text>
                    </Button>
                    {noItems ?
                        <Text style={{
                            fontSize: 12,
                            color: "gray",
                            textAlign: "center",
                            paddingVertical: 5
                        }}>
                            {t("settings:text.saveChangesDisabled")}
                        </Text> :
                        null}
                </View>
            </View>
        );
    }

}

export default withTranslation()(ChangeConfigsForm);
