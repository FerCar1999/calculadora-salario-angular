import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculadoraSalarioComponent } from './calculadora-salario/calculadora-salario.component';

const routes: Routes = [
  {path:'calculadora-salario', component: CalculadoraSalarioComponent},
  {path:'', redirectTo:'calculadora-salario',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
