import { Component, OnInit } from '@angular/core';


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

      let ultiDay: any = []
      let country: any = []
      let ulticountry: String = dataSummary[1][6]
      let sum = 0

      console.log(ulticountry)

      dataSummary.forEach(element => {

        if (!country.includes(element[6])) {
          country.push(element[6])
        }

        if (element[6] !== ulticountry) {

          ultiDay.push(sum)

          sum = 0

        } else {

          sum += parseInt(element[element.length - 2])

        }

        ulticountry = country[country.length - 1]


      })

      console.log(dataSummary)

      console.log(ultiDay)

      console.log(country)


    };

    lector.readAsText(file);
  }

  Cerrar() {
    localStorage.removeItem("key")
    window.location.href = "/"
  }


}
