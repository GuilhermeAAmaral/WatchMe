import { ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import GlobalContext from './GlobalContext'

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface GlobalStateProvider {
  children: ReactNode  
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

export interface MoviesContextData {
    selectedGenreId: number, 
    genres: GenreResponseProps[],
    movies: MovieProps[],
    selectedGenre: GenreResponseProps, 
    handleClickButton: (id: number) => void

}

const GlobalState = ({children}: GlobalStateProvider) => {

    const [selectedGenreId, setSelectedGenreId] = useState(1);
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps); 

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
          setGenres(response.data);
        });
      }, []);
    
      useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
          setMovies(response.data);
        });
    
        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
          setSelectedGenre(response.data);
        })
      }, [selectedGenreId]);
    
      function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <GlobalContext.Provider value = {{     
            selectedGenreId,
            genres,
            movies,
            selectedGenre,
            handleClickButton
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalState

