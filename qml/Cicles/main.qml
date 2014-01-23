import QtQuick 2.0
import QtQuick.Controls 1.0
import "CalendariMensual.js" as CalEngine


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
        onDateSelected: {
            var data = new Date(year,month,day);
            areaInfo.text = 'Dia seleccionat: ' + nomDeDiaSetmana(data.getDay()) + ' ' + day + ' de ' + nomDeMes(month) + ' de ' + year + '\n';
            CalEngine.addDays(data,28);
            areaInfo.text += 'Proper període: '  + nomDeDiaSetmana(data.getDay()) + ' ' + data.getDate() + ' de ' + nomDeMes(data.getMonth()) + ' de ' + data.getFullYear();
        }
    }

    Rectangle {
        property alias text: label.text
        id: areaInfo
        height: parent.height / 4
        anchors.bottom: parent.bottom
        anchors.margins: 40
        anchors.left: parent.left
        anchors.right: parent.right
        z: 2

        color: "pink"
        Text {
            id: label
            color: "#000000"
            anchors.centerIn: parent
            text: 'Toca un dia del calendari'
            font.pointSize: 20
            lineHeight: 2
            z: 3
        }

    }

    Rectangle {
        id: shadow
        color: "#000000"
        z: 1
        x: areaInfo.x + 5
        y: areaInfo.y + 5
        width: areaInfo.width
        height: areaInfo.height
        Component.onCompleted: console.log('Ara' + x + '-' + y)
    }


}
