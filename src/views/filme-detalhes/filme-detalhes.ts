import {API_KEY} from "../../../secrets"
import "./filme-detalhes.css";

export class DetalhesFilme {
  titulo: HTMLParagraphElement;
  votos: HTMLParagraphElement;
  dataLancamento: HTMLDataElement;
  imagemFilme: HTMLImageElement;
  trailer: HTMLIFrameElement;

  constructor() {
    
  }

  registrarElementos(){

  }


}

window.addEventListener("load", () => new DetalhesFilme());
