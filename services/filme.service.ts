import { ListagemFilme } from "../src/models/listagem-filme";
import {API_KEY} from "./../secrets"

export class FilmeService {

    async selecionarFilmePorPopularidade(): Promise<ListagemFilme[]> {
        const url = `https://api.themoviedb.org/3/movie/popular`;

        try {
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${API_KEY}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                return this.MapearFilmes(data);
            } else {
                throw new Error("Ocorreu erro ao tentar obter dados requisitados");
            }
        } catch (error: any) { // <- Declare explicitamente o tipo da variável error
            throw new Error(`Erro na solicitação: ${(error as Error).message}`);
        }
    }

    async selecionarFilmeLancamento(): Promise<ListagemFilme[]> {
      const url = `https://api.themoviedb.org/3/movie/now_playing`;

      try {
          const response = await fetch(url, {
              method: "GET",
              headers: {
                  accept: "application/json",
                  Authorization: `Bearer ${API_KEY}`
              }
          });

          if (response.ok) {
              const data = await response.json();
              return this.MapearFilmes(data);
          } else {
              throw new Error("Ocorreu erro ao tentar obter dados requisitados");
          }
      } catch (error: any) { // <- Declare explicitamente o tipo da variável error
          throw new Error(`Erro na solicitação: ${(error as Error).message}`);
      }
  }

  async selecionarFilmeEmBreve(): Promise<ListagemFilme[]> {
    const url = `https://api.themoviedb.org/3/movie/upcoming`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${API_KEY}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            return this.MapearFilmes(data);
        } else {
            throw new Error("Ocorreu erro ao tentar obter dados requisitados");
        }
    } catch (error: any) { // <- Declare explicitamente o tipo da variável error
        throw new Error(`Erro na solicitação: ${(error as Error).message}`);
    }
}


    private MapearFilmes(objetos: any): ListagemFilme[] {
        return objetos.results.map((obj: any) => {
            return new ListagemFilme(
                obj.id,
                obj.title,
                obj.overview,
                obj.poster_path,
                obj.backdrop_path
            );
        });
    }
}
