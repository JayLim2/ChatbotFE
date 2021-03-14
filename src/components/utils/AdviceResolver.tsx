import {Advice, CustomAdviceData} from "../../models/Advice";
import React, {ReactNode} from "react";
import {Text, View} from "react-native";

export class AdviceResolver {

    public static resolveAll(advices: Advice[]): ReactNode {
        let nodes: ReactNode[] = [];
        for (let advice of advices) {
            nodes.push(AdviceResolver.resolveAdvice(advice));
        }
        return nodes;
    }

    public static resolveAdvice(advice: Advice): ReactNode {
        const {startPosition, endPosition, adviceType, mistakeType, comment} = advice;
        let customAdviceData: CustomAdviceData = advice.customData;

        const message = String(advice.message?.message);

        if (mistakeType === "CUSTOM") {
            //TODO
        } else {
            //TODO
        }

        let text: MarkedString[] = AdviceResolver.splitByStartAndEndPositions(
            message,
            startPosition,
            endPosition
        );
        let textNodes: ReactNode[] = [];
        let k = 0;
        for (let part of text) {
            let style: any = {};
            if (part.isHighlighted) {
                switch (adviceType) {
                    case "ERROR":
                        style.backgroundColor = "#ffbebe";
                        style.color = "#b32323";
                        break;
                    case "WARN":
                        style.backgroundColor = "#ffd500";
                        style.color = "#584700";
                        break;
                    case "INFO":
                        style.backgroundColor = "#befff0";
                        style.color = "#233bb3";
                        break;
                }
            } else {
                style.color = "#fff";
            }
            const f = () => {
                alert(advice.comment)
            };
            const currentTextNode = (
                <Text key={`marked-text-part-${++k}`}
                      style={style}
                >
                    {part.value}
                </Text>
            );
            textNodes.push(
                part.isHighlighted ?
                    <View onTouchEnd={f}>
                        {currentTextNode}
                    </View> :
                    currentTextNode
            );
        }
        return (
            <View style={{flexDirection: "row"}}>
                {textNodes}
            </View>
        );
    }

    private static splitByStartAndEndPositions(string: string, start: number, end: number): MarkedString[] {
        let strings: MarkedString[] = [];
        if (start > 0) {
            strings.push({
                value: string.substring(0, start),
                isHighlighted: false
            });
        }
        strings.push({
            value: string.substring(start, end),
            isHighlighted: true
        });
        strings.push({
            value: string.substring(end, string.length),
            isHighlighted: false
        });
        return strings;
    }

}

type MarkedString = {
    value: string,
    isHighlighted: boolean
}
