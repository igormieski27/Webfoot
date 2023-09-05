import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NovoJogoComponent } from './novo-jogo/novo-jogo.component';
import { GerenciadorComponent } from './gerenciador/gerenciador.component';
import { ImportacaoJsonComponent } from './importacao-json/importacao-json.component';
import { PartidaComponent } from './partida/partida.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'novo-jogo', component: NovoJogoComponent },
  { path: 'gerenciador', component: GerenciadorComponent },
  { path: 'importar', component: ImportacaoJsonComponent },
  { path: 'partida', component: PartidaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
