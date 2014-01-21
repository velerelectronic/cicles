import QtQuick 2.0

Rectangle {
    id: mainApp
    width: 768
    height: 1024

    Text {
        id: title
        text: "Cicles"
        anchors.top: parent.top
        anchors.horizontalCenter: parent.horizontalCenter

        color: "#000000"
        font.italic: false
        font.bold: true
        font.pointSize: 32
        verticalAlignment: Text.AlignVCenter
        font.family: "Tahoma"
    }

    ListModel {
        id: fullMonth
        ListElement {
            numero: "Dillus"
            mes: 'Gener'
            colorCode: "grey"
        }

        ListElement {
            name: "Dimarts"
            colorCode: "red"
        }

        ListElement {
            name: "Dimecres"
            colorCode: "blue"
        }

        ListElement {
            name: "Dijous"
            colorCode: "green"
        }

        ListElement {
            name: "Divendres"
            colorCode: "green"
        }

        ListElement {
            name: "Dissabte"
            colorCode: "green"
        }

        ListElement {
            name: "Diumenge"
            colorCode: "green"
        }
    }

    Component {
        id: weeks
        Rectangle {
            color: colorCode
            anchors.fill: parent
            Text {
                text: name
                font.bold: true
                anchors.horizontalCenter: parent.horizontalCenter
            }
        }
    }

    GridView {
        id: calendari
        anchors.top: title.bottom
        width: parent.width
        anchors.bottom: parent.bottom
        cellWidth: width / 7
        cellHeight: 50
        model: fullMonth
        delegate: weeks
    }
}
