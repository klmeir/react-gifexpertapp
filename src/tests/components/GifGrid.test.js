import React from 'react';
import '@testing-library/jest-dom';

import { GifGrid } from '../../components/GifGrid';
import { shallow } from 'enzyme';
import { useFetchGifs } from '../../hooks/useFetchGifs';
jest.mock('../../hooks/useFetchGifs');

describe('Pruebas en el <GifGrid />', () => {

    const category = 'Bleach';

    test('debe mostrarse correctamente', () => {

        useFetchGifs.mockReturnValue({
            data: [],
            loading: true
        });
        
        const wrapper = shallow( <GifGrid category={category} /> );
        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h3').text().trim() ).toBe( category );

    });
    
    test('debe de mostrar items cuando se cargan imágenes useFetchGifs', () => {
        
        const gifs = [
            {
                id: '123',
                title: 'Cualquier cosa',
                url: 'https://localhost/cualquier/cosa.jpg'
            },
            {
                id: '456',
                title: 'Otro elemento',
                url: 'https://localhost/otros/ping.jpg'
            }
        ];

        useFetchGifs.mockReturnValue({
            data: gifs,
            loading: false
        });

        const wrapper = shallow( <GifGrid category={category} /> );

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('p').exists() ).toBe( false );
        expect( wrapper.find('GifGridItem').length ).toBe( gifs.length );

    });
    

});
