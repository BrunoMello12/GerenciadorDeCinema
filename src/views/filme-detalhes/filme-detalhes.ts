import { FilmeService } from "../../../services/filme.service";
import "./filme-detalhes.css";
import { DetalhesFilme } from "../../models/detalhes-filme";
import { TrailerFilme } from "../../models/trailer-filme";

export class VisualizarDetalhesFilme {
  titulo: HTMLParagraphElement;
  votos: HTMLParagraphElement;
  dataLancamento: HTMLDataElement;
  imagemFilme: HTMLImageElement;
  trailer: HTMLIFrameElement;
  texto: HTMLParagraphElement;
  FilmeService: FilmeService;
  generos: HTMLDivElement;
  idSelecionado: number;

  constructor() {
    this.registrarElementos();

    const params = new URLSearchParams(window.location.search);
    this.idSelecionado = Number.parseInt(params.get("id") as string);

    this.FilmeService = new FilmeService();
    this.FilmeService.selecionarDetalhesFilmePorId(this.idSelecionado).then(
      (f) => this.substituirElementos(f)
    );
    this.FilmeService.selecionarTrailersFilmePorId(this.idSelecionado).then(
      (t) => this.substituirTrailer(t)
    );
  }

  registrarElementos() {
    this.titulo = document.getElementById("titulo") as HTMLParagraphElement;
    this.votos = document.getElementById("votos") as HTMLParagraphElement;
    this.dataLancamento = document.getElementById(
      "dataLancamento"
    ) as HTMLDataElement;
    this.imagemFilme = document.getElementById("img") as HTMLImageElement;
    this.trailer = document.getElementById(
      "iframeTrailer"
    ) as HTMLIFrameElement;
    this.texto = document.getElementById("texto") as HTMLParagraphElement;
    this.generos = document.getElementById("generos") as HTMLDivElement;
  }

  private substituirTrailer(trailer: TrailerFilme): void {
    this.trailer.src = trailer.sourceUrl;
  }

  private substituirElementos(filme: DetalhesFilme): void {
    this.titulo.textContent = filme.titulo;
    this.votos.textContent = filme.contagemVotos + " Votos";
    this.dataLancamento.textContent = filme.dataLancamento;
    this.imagemFilme.src = filme.urlPoster;
    this.texto.textContent = filme.sinopse;


    filme.generos.forEach((genero) => {
      const badge = document.createElement("span");
      badge.className = "badge rounded-pill fs-5 px-4 py-2 bg-warning text-dark";
      badge.textContent = genero;
      this.generos.appendChild(badge);
    });
  }
}

window.addEventListener("load", () => new VisualizarDetalhesFilme());
