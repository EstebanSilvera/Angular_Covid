import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'

let ultiDay: any = []
let country: any = []
let countryMin: any = []
let combinedArray: any = [];
let maxState: any = []
let sum = 0
let sumDeath = 0
let population = 0


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const security = localStorage.getItem('key');
    if (security !== "oaiwufhoaigjalsd352135") {
      window.location.href = "/"
    }
  }


  leerArchivo(event: any) {
    const file = event.target.files[0];
    const lector = new FileReader();

    lector.onload = () => {
      const content = lector.result as string;
      const line = content.split('\n');
      const data = line.map(linea => linea.split(','));

      const dataSummary = data.slice(1, -1)

      let ulticountry: String = dataSummary[1][6]

      dataSummary.forEach(element => {

        if (element[6] === ulticountry) {

          sum += parseInt(element[element.length - 2])

        } else {

          ultiDay.push(sum)

          sum = 0
        }

        if (!country.includes(element[6])) {
          country.push(element[6])
        }

        population += parseInt(element[13])

        ulticountry = country[country.length - 1]

      })
      ultiDay.push(sum)

      const max = Math.max(...ultiDay)
      const maxIndex = ultiDay.indexOf(max);

      maxState = JSON.stringify([country[maxIndex], String(max)])

      localStorage.setItem("max", maxState)

      console.log(JSON.parse(maxState))

      console.log(countryMin)

      console.log(max)

      console.log(dataSummary)

      console.log(ultiDay)

      console.log(country)

      for (let i = 0; i < country.length; i++) {
        combinedArray.push({
          property1: country[i],
          property2: ultiDay[i]
        });
        localStorage.setItem("information", JSON.stringify(combinedArray))
      }

      // country whith 0 death
      JSON.parse(localStorage.getItem("information")!).forEach((element: any) => {

        (element.property2 == 0) ? countryMin.push(element.property1) : console.log()

        sumDeath += parseInt(element.property2)

        localStorage.setItem("min", JSON.stringify(countryMin))
      })

      console.log(sumDeath)

      localStorage.setItem("grafic", JSON.stringify([population,sumDeath]))
      

    };

    lector.readAsText(file);

  }

  Grafic(event: any){

    const info = JSON.parse(localStorage.getItem("grafic")!)

    const data = [info[0], info[1]];
    const promedio = data.reduce((a, b) => a + b, 0) / data.length;

    const canvas = document.getElementById('myChart');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d')!;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Valor 1', 'Valor 2'],
        datasets: [{
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB'],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `Promedio: ${promedio.toFixed(2)}`
          }
        }
      }
    });
  }

  stateMin = JSON.parse(localStorage.getItem("min")!) || countryMin

  stateMax = JSON.parse(localStorage.getItem("max")!) || maxState

  dataSource = JSON.parse(localStorage.getItem("information")!) || combinedArray

  Cerrar() {
    localStorage.removeItem("key")
    localStorage.removeItem("information")
    localStorage.removeItem("min")
    localStorage.removeItem("max")
    localStorage.removeItem("grafic")
    window.location.href = "/"
  }


}
