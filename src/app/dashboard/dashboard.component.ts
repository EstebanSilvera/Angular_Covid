import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'

//variables 

let ultiDay: any = []
let country: any = []
let populationState: any = []
let countryMin: any = []
let combinedArray: any = [];
let maxState: any = []
let affectedState: any = []
let sum = 0
let sumPopulation = 0
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

      console.log(ulticountry)

      dataSummary.forEach(element => {

        if (element[6] === ulticountry) {

          sum += parseInt(element[element.length - 2])
          sumPopulation += parseInt(element[13])

        } else {

          ultiDay.push(sum)
          populationState.push(sumPopulation)

          sumPopulation = 0
          sum = 0
        }

        if (!country.includes(element[6])) {
          country.push(element[6])
        }

        ulticountry = country[country.length - 1]

      })
      ultiDay.push(sum)
      populationState.push(sumPopulation)

      const max = Math.max(...ultiDay)
      const maxIndex = ultiDay.indexOf(max);

      maxState.push(country[maxIndex], String(max))

      localStorage.setItem("max", JSON.stringify(maxState))

      for (let i = 0; i < country.length; i++) {
        combinedArray.push({
          property1: country[i],
          property2: ultiDay[i],
          property3: populationState[i],
        });
        localStorage.setItem("information", JSON.stringify(combinedArray))
      }

      console.log(dataSummary)

      let oldInf = 0

      // country whith 0 death
      JSON.parse(localStorage.getItem("information")!).forEach((element: any) => {

        (element.property2 == 0) ? countryMin.push(element.property1) : console.log()

        let old = (element.property2 / element.property3) * 100
        if (element.property2 != 0) {

          if (old > oldInf) {

            affectedState.push([element.property1, element.property2, element.property3])

            localStorage.setItem("affected", JSON.stringify(affectedState))

            oldInf = old
          }
        }
        sumDeath += parseInt(element.property2)

        localStorage.setItem("min", JSON.stringify(countryMin))
      })

      console.log(sumDeath)

    };

    lector.readAsText(file);

  }

  Grafic() {
    const data: any = []
    const name: any = []
    JSON.parse(localStorage.getItem("information")!).forEach((element: any) => {
      if (element.property2 != 0) {
        data.push(element.property3 / element.property2) * 100
        name.push(element.property1);
      } else {
        data.push(element.property2)
        name.push(element.property1);
      }
    });

    const promedio = data.reduce((a: any, b: any) => a + b, 0) / data.length;

    const canvas = document.getElementById('myChart');
    const ctx = (canvas as HTMLCanvasElement).getContext('2d')!;

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [...name],
        datasets: [{
          data: data,
          backgroundColor: ['#FF6384', '#36A2EB', '#E67E22', '#BB8FCE', '#C0392B'],
          borderWidth: 1
        }]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: `Circle Graph`
          }
        }
      }
    });
  }

  PressGrafic() {
    console.log("presion")
    const content = document.getElementById('contentGrafic');
    content!.scrollIntoView({ behavior: 'smooth' });
  }

  PressTable() {
    console.log("presion")
    const content = document.getElementById('table');
    content!.scrollIntoView({ behavior: 'smooth' });
  }
  Home() {
    console.log("presion")
    const content = document.getElementById('home');
    content!.scrollIntoView({ behavior: 'smooth' });
  }

  affect = JSON.parse(localStorage.getItem("affected")!) || affectedState

  stateMin = JSON.parse(localStorage.getItem("min")!) || countryMin

  stateMax = JSON.parse(localStorage.getItem("max")!) || maxState

  dataSource = JSON.parse(localStorage.getItem("information")!) || combinedArray

  Cerrar() {

    const result = confirm("¿esta seguro que desea salir de la aplicacion?")

    if (result) {
      localStorage.removeItem("key")
      localStorage.removeItem("information")
      localStorage.removeItem("min")
      localStorage.removeItem("max")
      localStorage.removeItem("affected")
      window.location.href = "/"
    }
  }


}
