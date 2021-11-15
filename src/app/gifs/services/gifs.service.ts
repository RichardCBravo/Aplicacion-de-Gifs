import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey     :string='Uwarn2N4lpMOFrsEB5sd87jlb806nTKF';
  private servicioUrl:string='https://api.giphy.com/v1/gifs';
  private _historial :string[]=[];

  public resultado: Gif[]=[];

  get historial(){
    return[...this._historial];
  }

  constructor(private http:HttpClient){
    this._historial=JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultado=JSON.parse(localStorage.getItem('resultado')!) || [];
  }

  buscarGifs(query: string){
    if(query.trim().length===0){
      return;
    }
    query=query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,6);

      localStorage.setItem('historial',JSON.stringify(this._historial));
    }

    const params=new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', '20')
    .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
    .subscribe((resp)=>{
      this.resultado=resp.data;

      localStorage.setItem('resultado',JSON.stringify(this.resultado));
    });
  }

}
