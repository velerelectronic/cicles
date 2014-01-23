import QtQuick 2.0
import QtQuick.Controls 1.0

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

    CalendariMensual {
        anchors.top: title.bottom
        anchors.bottom: parent.bottom
        width: parent.width
    }
}
