import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-calculadora-salario',
  templateUrl: './calculadora-salario.component.html',
  styleUrls: ['./calculadora-salario.component.css']
})
export class CalculadoraSalarioComponent{
  //Variable que guarda el valor del salario
  salario: number = 0.00;
  renta: number = 0.00;
  afp: number = 0.00;
  isss: number = 0.00;
  salario_liquido: number = 0.00;
  //dependiendo del tipo de salario sera el tipo de calculo para la renta
  //1=semanal, 2=quincenal, 3=mensual
  tipoSalario:string="Mensual"
  salario_nominal:number=0
  //funcion para verificar el input si es numero o no
  isNumber(): boolean {
    const regex = /^\d+(\.\d{1,2})?$/;
    return regex.test(this.salario?.toString());
  }
  //verifico con una funcion si el valor ingresado esta correcto
  handleInput() {
    if (this.isNumber()) {
      return true
    } else {
      return false
    }
  }
  /*funcion para rendodear decimales, recibe un numero y devuelve 
  el mismo con dos decimales*/
  roundToTwoDecimals(num: number): number {
    return Math.round((num + Number.EPSILON) * 100) / 100;
  }

  //funcion para calculo de renta, devuelve un numero que debe ser asignado a la variable renta
  //tipo salario debe ser 3
  calculoRentaMes():number{
    if(this.salario_nominal>=472.01&&this.salario_nominal<=895.24){
      return (((this.salario_nominal-472)*0.1)+17.67)
    }else if(this.salario_nominal>=895.25&&this.salario_nominal<=2038.10){
      return (((this.salario_nominal-895.24)*0.2)+60)
    }else if(this.salario_nominal>=2038.11){
      return (((this.salario_nominal-2038.10)*0.3)+288.57)
    }else{
      return 0.00
    }
  }
  //tipo salario debe ser 2
  calculoRentaQuincena():number{
    if(this.salario_nominal>=236.01&&this.salario_nominal<=447.62){
      return (((this.salario_nominal-236)*0.1)+8.83)
    }else if(this.salario_nominal>=447.63&&this.salario_nominal<=1019.05){
      return (((this.salario_nominal-447.62)*0.2)+30)
    }else if(this.salario_nominal>=1019.06){
      return (((this.salario_nominal-1019.05)*0.3)+144.28)
    }else{
      return 0.00
    }
  }
  //tipo salario debe ser 1
  calculoRentaSemanal():number{
    if(this.salario_nominal>=118.01&&this.salario_nominal<=223.81){
      return (((this.salario_nominal-118)*0.1)+4.42)
    }else if(this.salario_nominal>=223.82&&this.salario_nominal<=509.52){
      return (((this.salario_nominal-223.81)*0.2)+15)
    }else if(this.salario_nominal>=509.53){
      return (((this.salario_nominal-509.52)*0.3)+72.14)
    }else{
      return 0.00
    }
  }
  
  //Funcion primaria para calcular los descuentos
  calcularDescuentos(){
    //uso la funcion para permitir el paso o no del valor y verificar si esta correcto
    if(this.handleInput()){
      //calculo el salario con los descuentos de afp y seguro para poder calcular la renta
      this.calcularAfp();
      this.calcularISS();
      //formula es salario base-descuento afp-descuento isss
      this.salario_nominal=this.salario-this.afp-this.isss
      //aca van las funciones de calculo, entra aca si el formato esta correcto
      //con este switch verificamos el tipo de salario para ver que calculo de renta le aplica
      switch(this.tipoSalario){
        //si el salario es semanal
        case "Semanal":
          this.renta=this.roundToTwoDecimals(this.calculoRentaSemanal())
          break
        //si el salario es quincenal
        case "Quincenal":
          this.renta=this.roundToTwoDecimals(this.calculoRentaQuincena())
          break
        //si el salario es mensual
        case "Mensual":
          this.renta=this.roundToTwoDecimals(this.calculoRentaMes())
          break
      }
      
    }else{
      console.log("Formato incorrecto")
    }
    
  }

  calcularAfp(){
    if(this.handleInput()){
    var resultado = this.roundToTwoDecimals(this.salario * 0.0725);
    this.afp = resultado;
      //return this.afp;
    }else{
      console.log("Formato incorrecto")
    }
  }

  calcularISS(){
    if(this.handleInput()){
      var resultado = this.roundToTwoDecimals(this.salario * 0.03);
      this.isss = resultado;
        //return this.afp;
      }else{
        console.log("Formato incorrecto")
      }
  }
}
