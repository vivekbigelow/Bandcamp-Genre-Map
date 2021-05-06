import { Select } from '@chakra-ui/react';
import React, { FC, RefObject, useState } from 'react';
import { useGenresQuery } from '../generated/graphql';

interface GenreDropDownProps{
    value: string;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}


export const GenreDropDown: React.FC<GenreDropDownProps> = ({handleChange, value}) => {
    const [{data,fetching}] = useGenresQuery()
    
   

    let body = null
    

    if(fetching){
        body = null
    }else if(!data?.genres){
        body = (
            <Select placeholder="No Genres"></Select>
          )
    }else{
        body = (
       
            <Select placeholder="Select a genre"
                    value = {value}
                    onChange={handleChange}
            >
                {data.genres.map(genre => 
                    <option key={genre.name} value={genre.name}>{genre.name}</option>
                    )}    
                    
            </Select>

            
            
        )
                    
        
    }

    return(
        <>
        {body}
        </>
    )
}