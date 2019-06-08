import React, {Component} from 'react';
import MiniPalette from './MiniPalette';
import {Link} from 'react-router-dom';

class PaletteList extends Component {
    render() {
        const {palettes} = this.props;
        const miniPalettes = palettes.map(palette => (
            <MiniPalette {...palette}/>
        ));
        return (
            <div>
                <h1>React Colors</h1>
                {miniPalettes}
            </div>
        );
    }
}

export default PaletteList;
