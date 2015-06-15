
/*=====================================================
*
*
*
*
*
*
*
*
*
======================================================*/


/**
Функция принимать на вход несортированный список карточек

 который отсортирует такой список карточек и вернет словесное описание, как проделать ваше путешествие. API должен принимать на вход несортированный список карточек в формате придуманном вами и возвращать, например, такое описание:
 * Функция принимает список карточек путешественника
 *      и возвращает описание путешествия.
 * Список карточек передается функции в виде массива объектов.
 * Каждая карточка - объект этого массива. В каждой карточке:
 *      точка отпрвления 'from', назначения 'to'
 *      и тип транспорта 'transportType' являются обязательными
 *      остальные данные - дополнительные и необязательные (могут отсутствовать)
 *      все дополнительные данные которые должны быть отражены в описании
 *      необходимо поместить в объект карточки как свойства 'additionalInfo'.
 * В описании после основной информации будет обображаться
 *      дополнительная информация в виде пары "Название свойства" "значение".
 * @param array состоящий из объектов-карточек такого формата:
 * {
        from: "Moscow",
        to: "London",
        transportType: "flight",
        additionalInfo: {
            "Route number": "N554",
            "Seat": "4A",
            "Gate": "22",
            "Baggage": "drop at ticket counter 344"
        }
    }
 * @return string содержащая описание путешествия сделующего вида:
 * "Take " + transportType + " from " + from + " to " + to + "." + additionalInfo + "." + "\n"
 * Пример:
 * Take flight from Moscow to London. Route number N554. Seat 4A. Gate 22. Baggage drop at ticket counter 344.
 */
function cardsSorter(array) {
    var i, beginAt,
        pointsFrom = [], pointsTo = [], sortPoints, sortedCards = [];

    for (i = 0; i < array.length; i += 1) {   /* Расставляем по массивам пункты отправления и прибытия */
        pointsFrom.push(array[i].from);
        pointsTo.push(array[i].to);
    }

    for (var i = 0; i < pointsFrom.length; i++){   /* Находим пункт отправления */
      if(pointsTo.indexOf(pointsFrom[i]) < 0)
          beginAt = pointsFrom[i];
    }

    sortPoints = function (start, array) {   /* Сортируем массив карточек */
        if (sortedCards.length !== array.length) {
            for (i = 0; i < array.length; i += 1) {
                if (array[i].from === start) {
                    sortedCards.push(array[i]);
                    start = array[i].to;
                }
            }
            sortPoints(start, array);
        }
        return sortedCards;
    };
    sortPoints(beginAt, array);

    return buildDescription(sortedCards, "To make your travel, you will need: ");
}

function buildDescription(array, text) {   /* Составляем описание */
    var description = "", additionalInfo = [];
    if(text) description += "<h3>"+text+"</h3>";
    for (i = 0; i < array.length; i += 1) {   /* проверяем наличие доп информации в карточке и наполняем массив с доп описанием */
        for (prop in array[i].additionalInfo) {
            if (array[i].additionalInfo.hasOwnProperty(prop)) {
                additionalInfo.push(" " + prop + " " + array[i].additionalInfo[prop]);
            }
        }
        /* наполням строку описания */
        description +=
            "<div class='sort_item "+array[i].transportType+"'>" + "Take "+ array[i].transportType +
                " from " + array[i].from +
                " to " + array[i].to + "." +
                /* заменяем запятые точками */
                additionalInfo.toString().replace(/,/g, ".") +
                /* проверяем, нужна ли точка в конце и добавляем перевод строки */
                (additionalInfo[0] ? "." : " ") + 
            "</div>" + "\n";
        additionalInfo = [];   /* готовим массив для нового обхода */
    }
    return document.getElementById("list_of_cards").innerHTML = description;
};


var travelerCards = [
    {
        from: "Stockholm",
        to: "New York JFK",
        transportType: "flight",
        additionalInfo: {
            "Route number": "SK22",
            "Gate": "22",
            "Seat": "7B",
            "Baggage": "will be automatically transferred from your last leg"
        }
    },
    {
        from: "Madrid",
        to: "Barcelona",
        transportType: "train",
        additionalInfo: {
            "Route number": "78A",
            "Seat": "45B"
        }
    },
    {
        from: "Gerona Airport",
        to: "Stockholm",
        transportType: "flight",
        additionalInfo: {
            "Route number": "SK455",
            "Gate": "45B",
            "Seat": "3A",
            "Baggage": "drop at ticket counter 344"
        }
    },
    {
        from: "Barcelona",
        to: "Gerona Airport",
        transportType: "airport bus",
        additionalInfo: {
            "Seat": "is not assigned"
        }
    }
];

buildDescription(travelerCards, "Cards do not form a chain ");