import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NovoJogoComponent } from './novo-jogo/novo-jogo.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { StarRatingComponent } from './star-rating/star-rating.component';
import {
  MatTreeFlatDataSource,
  MatTreeFlattener,
  MatTreeModule,
} from '@angular/material/tree';
import { MatTooltipModule } from '@angular/material/tooltip';
import { GerenciadorComponent } from './gerenciador/gerenciador.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ImportacaoJsonComponent } from './importacao-json/importacao-json.component';
import { PartidaComponent } from './partida/partida.component';
import { NgChartsModule } from 'ng2-charts';
import { GoalChanceChartComponent } from './partida/goal-chance-chart/goal-chance-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NovoJogoComponent,
    StarRatingComponent,
    GerenciadorComponent,
    ImportacaoJsonComponent,
    PartidaComponent,
    GoalChanceChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    RouterModule,
    AppRoutingModule,
    NgbCarouselModule,
    NgbModule,
    MatIconModule,
    MatTreeModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatCheckboxModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
