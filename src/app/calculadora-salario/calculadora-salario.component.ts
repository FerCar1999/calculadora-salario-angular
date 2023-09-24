import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-calculadora-salario',
  templateUrl: './calculadora-salario.component.html',
  styleUrls: ['./calculadora-salario.component.css']
})
export class CalculadoraSalarioComponent{
  //Variable que guarda el valor del salario
  salario: number|null = null;
  renta: number|null = null;
  afp: number|null = null;
  isss: number|null = null;
  salario_liquido: number|null = null;
  
  //Funcion primaria para calcular los descuentos
  calcularDescuentos(){}
}
