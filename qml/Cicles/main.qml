import QtQuick 2.0
import QtQuick.Controls 1.0

Rectangle {
    id: mainApp
// No dimensions. The rectangle must be full screen

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

    CalendariMensual {
        anchors.top: title.bottom
        anchors.margins: 20
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.bottom: areaInfo.top
    }

    Rectangle {
        id: areaInfo
        height: 60
        anchors.bottom: parent.bottom
        width: parent.width
        color: "#05ff00"
    }

}
