window.addEventListener('DOMContentLoaded', function () {
    'use strict'

    const start = document.getElementById('start')
    const cancel = document.getElementById('cancel')

    let bank = document.getElementById('bank-select')
    let monthPeriod = document.getElementById('month-select') //КПЕР = СРОК
    let monthPeriodClient = document.getElementById('month-select-client') //КПЕР = СРОК
    let amount = document.getElementById('amount')
    let percent = document.getElementById('percent')
    let percentResult = document.getElementById('percent-result')

    const moneyMonth = document.getElementById('money-month')
    const resultTotal = document.getElementById('result-total')
    const overpayment = document.getElementById('overpayment')
    const blockText = document.getElementById('text-result')

    const card = document.createElement('div')

    // стоимость доп гарантии
    let percentDopgarant = document.getElementById('percent-dopgarant')


    // Итоговые данные:
    // сумма с доп гарантией
    let outputSumdopGarant = document.getElementById('output-sumdop-garant')
    // первый взнос без гарантии
    let outputPvBezgarant = document.getElementById('ouput-pv-bezgarant')
    // ежемесячный без гарантии
    let outputEjBezgarant = document.getElementById('output-ej-bezgarant')
    // первый взнос с гарантией
    let outputPvSdop = document.getElementById('output-pv-sdop')
    // ежемесячный с доп.гарантией
    let outputEhSdop = document.getElementById('output-ej-sdop')
    // разница
    let outputRaznica = document.getElementById('output-raznica')



    let period1 = document.getElementById('period1')
    let pv1 = document.getElementById('pv1')
    let monthly1 = document.getElementById('monthly1')
    
    let period2 = document.getElementById('period2')
    let pv2 = document.getElementById('pv2')
    let monthly2 = document.getElementById('monthly2')
    let itog2 = document.getElementById('itog2')

    let period3 = document.getElementById('period3')
    let pv3 = document.getElementById('pv3')
    let monthly3 = document.getElementById('monthly3')

    let period4 = document.getElementById('period4')
    let pv4 = document.getElementById('pv4')
    let monthly4 = document.getElementById('monthly4')
    let itog4 = document.getElementById('itog4')

    let bc = 0 //БС = 0
    let tip = 0 //ТИП = 0
    let pc = 0 //ПС = -(СУММА - Сумма ПВ (число))

    percent.value = 20
    cancel.style.display = 'block'

    amount.addEventListener('input', function (e) {
        amount.value = e.target.value
    })


    monthPeriod.addEventListener('change', function (e) {
        monthPeriod.value = e.target.value
    })

    percentDopgarant.addEventListener('change', function (e) {
        percentDopgarant.value = e.target.value
    })


    //Функция для округления дробных чисел к сотым. Т.е. такого вида - 1.05
    function decimalAdjust(type, value, exp) {
        // Если степень не определена, либо равна нулю...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value)
        }
        value = +value
        exp = +exp
        // Если значение не является числом, либо степень не является целым числом...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN
        }
        // Сдвиг разрядов
        value = value.toString().split('e')
        value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)))
        // Обратный сдвиг
        value = value.toString().split('e')
        return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp))
    }

    start.addEventListener('click', function () {
        card.textContent = ''

        // let stavka = +bank.value / 100 / 12 //СТАВКА
        let c = (amount.value * percent.value) / 100 //Результат процента от суммы кредита (число)
        // let d = Math.pow(1 + stavka, +monthPeriod.value) // Возведение в степень СТАВКА

        


        pc = -(amount.value - c)

        // let a = -stavka * (pc * d + bc) //Верхняя часть уравнения
        // let b = (1 + stavka * tip) * (d - 1) //Нижняя часть уравнения

        // Десятичное округление к ближайшему
        if (!Math.round10) {
            Math.round10 = function (value, exp) {
                return decimalAdjust('round', value, exp)
            }
        }

        percentResult.value = Math.round(c)

        let RaschetOutputPvBezgarant = (amount.value * percent.value) / 100
        // console.log('без гарант')
        // console.log(RaschetOutputPvBezgarant)
        outputPvBezgarant.value = Math.round(RaschetOutputPvBezgarant)

        let RaschetoutputPvSdop = ((+amount.value + +percentDopgarant.value) * percent.value) / 100

        // console.log('с гарант')
        // console.log(RaschetoutputPvSdop)
        outputPvSdop.value = Math.round(RaschetoutputPvSdop)


        // moneyMonth.value = Math.round10(a / b, -2)
        // resultTotal.value = Math.round10(
            // moneyMonth.value * monthPeriod.value + c,
            // -2
        // )
        // overpayment.value = Math.round10(resultTotal.value - amount.value, -2)

        // Расчёты рассрочки
        let SumdopGarant = +percentDopgarant.value + +amount.value
        // console.log(SumdopGarant)

        outputSumdopGarant.value = SumdopGarant

        // Ежемесячный платеж без гарантии. = Сумма - Первый взнос (без гарантии)/ срок

        // outputEjBezgarant
        let RaschetOutputEjBezgarant = (+amount.value - +RaschetOutputPvBezgarant) / monthPeriod.value
        // console.log(RaschetOutputEjBezgarant)

        outputEjBezgarant.value = Math.round10(RaschetOutputEjBezgarant, -2)


        // ежеме.с переплатой
        // outputEhSdop
        let RaschetOotputEhSdop = (SumdopGarant - +RaschetoutputPvSdop) / monthPeriod.value
        // console.log(RaschetOotputEhSdop)

        outputEhSdop.value = Math.round10(RaschetOotputEhSdop, -2)

        // разница
        let RaschetOutputRaznica = +RaschetOotputEhSdop - +RaschetOutputEjBezgarant
        // console.log(RaschetOutputRaznica)

        outputRaznica.value = Math.round10(RaschetOutputRaznica, -2)

        // Мой шаблон
        period1.textContent = monthPeriod.value

        if (percentResult.value == 0) {
            pv1.textContent = 'Без первоначального взноса'
        } else {
            pv1.textContent = "Первоначальный взнос - " + outputPvBezgarant.value + " р."
        }

        monthly1.textContent = outputEjBezgarant.value

        // itogbez.textContent = resultTotal.value

        period2.textContent = monthPeriod.value

        if (percentResult.value == 0) {
            pv2.textContent = 'без первоначального взноса'
        } else {
            pv2.textContent = "первоначальный взнос - " + outputPvBezgarant.value + " р."
        }

        monthly2.textContent = outputEjBezgarant.value

        itog2.textContent = amount.value

        period3.textContent = monthPeriod.value

        if (percentResult.value == 0) {
            pv3.textContent = 'без первоначального взноса'
        } else {
            pv3.textContent = "Первоначальный взнос - " + outputPvSdop.value + " р."
        }

        monthly3.textContent = outputEhSdop.value

        period4.textContent = monthPeriod.value

        if (percentResult.value == 0) {
            pv4.textContent = 'Без первоначального взноса'
        } else {
            pv4.textContent = "первоначальный взнос - " + outputPvSdop.value + " р."
        }

        monthly4.textContent = outputEhSdop.value

        itog4.textContent = SumdopGarant


        card.insertAdjacentHTML(
            'beforeend',
            `
            <div class="card">
                <div class="card-header">
                    Предложение
                </div>
                <div class="card-body">
                    <blockquote class="blockquote mb-0">
                        <p>
                            Могу предложить Вам следующие условия: Период оплаты $monthPeriod.value мес.
                            Первоначальный взнос - $percentResult.value р, ежемесячный платеж $moneyMonth.value р. Итоговая
                            сумма, которую Вы оплатите = $resultTotal.value р. Чем меньше ежемесячный
                            платеж, тем выше процент одобрения банка, возможно досрочное
                            погашение. Подскажите пожалуйста, эти условия Вам подходят?
                        </p>
                        <footer class="blockquote-footer">Someone famous in <cite title="Source Title">Source Title</cite></footer>
                    </blockquote>
                </div>
            </div>


			<span class="results">
				Могу предложить Вам следующие условия: Период оплаты $monthPeriod.value мес.
				Первоначальный взнос - {percentResult.value} р, ежемесячный платеж {moneyMonth.value} р. Итоговая
				сумма, которую Вы оплатите = {resultTotal.value} р. Чем меньше ежемесячный
				платеж, тем выше процент одобрения банка, возможно досрочное
				погашение. Подскажите пожалуйста, эти условия Вам подходят?
      </span>
      <span class="results">
        Период оплаты {monthPeriod.value} мес.
        Первоначальный взнос - {percentResult.value} р, ежемесячный платеж {moneyMonth.value} р. Итоговая
        сумма, которую Вы оплатите = {resultTotal.value} р. 
      </span>
      <span class="results">
        Обращаю Ваше внимание, что при выборе условий с более длительным сроком и минимальном ежемесячным платежом выше вероятность получения положительного решения. 
        Поэтому рекомендую Вам следующие условия: Период оплаты {monthPeriod.value} мес. Первоначальный взнос - {percentResult.value} р., ежемесячный платеж {moneyMonth.value} р. Итоговая сумма, которую Вы оплатите = {resultTotal.value} р. По условиям предусмотрено досрочное погашение, Вы сможете оплачивать большими суммами, закроете договор за {monthPeriodClient.value} мес., итоговая сумма будет меньше. Подскажите пожалуйста, эти условия Вам подходят?
      </span>
		`
        )

        // blockText.insertAdjacentElement('beforeend', card)

        // console.log(monthPeriod.value)
        // console.log(bank.value)
    })



    cancel.addEventListener('click', function () {
        // card.textContent = ''
        // moneyMonth.value = ''
        // resultTotal.value = ''
        // overpayment.value = ''

        amount.value = ''
        percent.value = 20
        percentResult.value = ''

        // period.textContent = ''

        // monthly.value = ''
        // itog.textContent = ''

        outputEhSdop.value = ''
    })
})
