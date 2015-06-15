###API cards sorter
JavaScript API - реализующий сортировку карточек путешественника.

###Документация
####cardsSorter()
Функция cardsSorter() принимает на вход несортированный список карточек путешественника и сортирует (выстраивает отрезки маршрута в последовательную цепочку)
Данные поступают в функцию в формате массива объектов (карточек):

    @param array:
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
    }
    
Обязательные данные: <br />
**from**: пункт отправления <br />
**to**: пункт назначения <br />
**transportType**: тип транспорта <br />
**additionalInfo**: дополнительные данные. Данное свойство содержит дополнительную информацию: Route number, Gate, Seat, Baggage
Данные являются необязательными, могут отсутствовать.

####buildDescription()
Функция buildDescription() сотавляет и возврашет список маршрута с описанием путешествия в следуюшем формате:

    "Take " + transportType + " from " + from + " to " + to + "." + additionalInfo + "." + "\n"
 
  **Пример:**<br />
  Take flight from Stockholm to New York JFK. Route number SK22. Gate 22. Seat 7B. Baggage will be automatically transferred from your last leg.

