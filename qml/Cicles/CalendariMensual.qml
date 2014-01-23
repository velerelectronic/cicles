import QtQuick 2.0
import QtQuick.Controls 1.0
import "CalendariMensual.js" as CalendariMensualEngine

Rectangle {
    id: calendariMensual

    property int shownMonth: 0
    property int shownYear: 0

    ListModel {
        id: fullMonthModel
    }

    Text {
        id: shownDate
        text: {
            var mesos = ['gener','febrer','març','abril','maig','juny','juliol','agost','setembre','octubre','novembre','desembre'];
            return mesos[shownMonth] + ' de ' + shownYear.toString()
        }
        anchors.top: parent.top
        anchors.horizontalCenter: parent.horizontalCenter
        color: "black"
        font.bold: true
        font.pointSize: 26
        font.family: "Tahoma"
    }

    Row {
        id: calendarHeaders
        anchors.top: shownDate.bottom
//        anchors.top: parent.top
        width: parent.width
        height: 30
        DiaCalendariMensual {
            width: parent.width / 7
            text: qsTr("Dilluns")
        }

        DiaCalendariMensual {
            width: parent.width / 7
            text: qsTr("Dimarts")
        }

        DiaCalendariMensual {
            width: parent.width / 7
            text: qsTr("Dimecres")
        }

        DiaCalendariMensual {
            width: parent.width / 7
            text: qsTr("Dijous")
        }

        DiaCalendariMensual {
            width: parent.width / 7
            text: qsTr("Divendres")
        }

        DiaCalendariMensual {
            width: parent.width / 7
            text: qsTr("Dissabte")
        }

        DiaCalendariMensual {
            width: parent.width / 7
            text: qsTr("Diumenge")
        }

        Component.onCompleted: CalendariMensualEngine.generaCalendariMensual(fullMonthModel,parent,true,0,0);
    }

    ListView {
        id: calendari
        anchors.left: parent.left
        anchors.right: parent.right
        anchors.top: calendarHeaders.bottom
        anchors.bottom: controls.top
        clip: true
//        anchors.fill: parent

        Component {
            id: weeksDelegate

            Row {
                anchors.left: parent.left
                width: parent.width
                height: parent.parent.height / 6
                Repeater {
                    model: days
                    DiaCalendariMensual {
                        width: parent.width / 7
                        text: day
                        Component.onCompleted: detectType(dayType,monthType)
                        onTouched: console.log('Ara' + text)
                    }
                }
            }
        }

        model: fullMonthModel
        delegate: weeksDelegate
    }

    Row {
        id: controls
        height: 50
        anchors.bottom: parent.bottom
        anchors.centerIn: parent

        Button {
            text: "<<"
            onClicked: CalendariMensualEngine.generaCalendariMensual(fullMonthModel,calendariMensual,false,0,-1)
            height: parent.height
        }

        Button {
            text: "<"
            onClicked: CalendariMensualEngine.generaCalendariMensual(fullMonthModel,calendariMensual,false,-1,0)
            height: parent.height
        }

        Button {
            text: Qt.formatDateTime(new Date(), "dd/MM/yyyy")
            onClicked: CalendariMensualEngine.generaCalendariMensual(fullMonthModel,calendariMensual,true,0,0)
            height: parent.height
        }

        Button {
            text: ">"
            onClicked: CalendariMensualEngine.generaCalendariMensual(fullMonthModel,calendariMensual,false,1,0)
            height: parent.height
        }

        Button {
            text: ">>"
            height: parent.height
            onClicked: CalendariMensualEngine.generaCalendariMensual(fullMonthModel,calendariMensual,false,0,1)
        }
    }

}
