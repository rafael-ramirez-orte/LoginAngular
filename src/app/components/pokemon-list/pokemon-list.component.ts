import { DataService } from '../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})
export class PokemonListComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  totalPokemons: number | undefined;

  constructor(
    private dataService: DataService
    ) { }

    ngOnInit(): void {
      this.getPokemons();
      
    }
    //logOut() {
      //this.afAuth.signOut().then(() => this.router.navigate(['/login']));
    //}

  getPokemons(){
      this.dataService.getPokemons(10, this.page + 0)
      .subscribe((response: any) =>{
        this.totalPokemons = response.count;
        
        response.results.forEach((result: { name: string; }) => {
          this.dataService.getMoreData(result.name)
          .subscribe((uniqResponse: any) => {
            this.pokemons.push(uniqResponse);
            console.log(this.pokemons);
  
          });
        });
      });
    
  }
}
