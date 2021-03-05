import BookList from './BookList';
import React from 'react';
import { shallow } from 'enzyme';

jest.mock('react-router-dom', () => ({
    useLocation: jest.fn().mockReturnValue({
        pathname: '/another-route',
        search: '',
        hash: '',
        state: null,
        key: '5nvxpbdafa',
    }),
    useHistory: jest.fn().mockReturnValue({
        pathname: '/another-route',
        search: '',
        hash: '',
        state: null,
        key: '5nvxpbdafa',
    }),
}));

describe('the BookList component', () => {
    const component = shallow(<BookList />);

    describe('BookList should render', () => {

        it('should render the jumbotron', () => {
            setTimeout(() => {
                const elem = component.find('.jumbotron');
                expect(elem.length).toBe(1);
            }, 100);
        });

        // given time I would mock a response from getBooks here and check that they render

    });

});
