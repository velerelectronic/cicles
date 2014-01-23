import QtQuick 2.0

Rectangle {
    id: diaCalendari
    property alias text: contents.text
    signal touched (string text)

    width: parent.width
    height: parent.height
    color: "white"
    border.width: 2
    border.color: "#a30000"

    Text {
        id: contents
        text: "Dia"
        anchors.centerIn: parent
    }

    MouseArea {
        anchors.fill: parent
        onClicked: { diaCalendari.touched(text); }
    }

    function detectType(dayType,monthType) {
        if (dayType=='today') {
            color = "yellow"
        } else {
            if (monthType == 1) {
                color = "#f8e0ec"
            } else {
                color = "gray"
            }

        }
    }

}

