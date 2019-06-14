import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';
import PaletteFooter from './PaletteFooter';
import {withStyles} from '@material-ui/styles';
import ColorBox from './ColorBox';
import chroma from "chroma-js";

const styles = {
    Palette: {
        height: "100vh",
        display: "flex",
        flexDirection: "column"
    },
    colors: {
        height: "90%"
    },
    goBack: {
        width: "20%",
        height: "50%",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        margin: "0 auto -3.5px",
        opacity: "1",
        backgroundColor: "black",
        "& a": {
            color: "white",
            width: "100px",
            height: "30px",
            position: "absolute",
            display: "inline-block",
            top: "50%",
            left: "50%",
            marginLeft: "-50px",
            marginTop: "-15px",
            textAlign: "center",
            outline: "none",
            background: "rgba(255, 255, 255, 0.3)",
            fontSize: "1rem",
            lineHeight: "30px",
            textTransform: "uppercase",
            border: "none",
            textDecoration: "none"
        }
    }
};

class SingleColorPalette extends Component {
    constructor(props) {
        super(props);
        this._shades = this.gatherShades(this.props.palette, this.props.colorId);
        this.state = {
            format: "hex"
        };
        this.changeFormat = this.changeFormat.bind(this);
    }

    // return all shades of the colorToFilterBy from the palette
    gatherShades(palette, colorToFilterBy) {
        let shades = [];
        let allColors = palette.colors;

        for(let level in allColors) {
            shades = shades.concat(
                allColors[level].filter(color => color.id === colorToFilterBy)
            )
        }

        // return the shades excluding the level 50, which is white
        return shades.slice(1);
    }

    // change the format of the color text when copied
    changeFormat(val) {
        this.setState({format: val});
    }

    render() {
        const {format} = this.state;
        const {paletteName, emoji, id} = this.props.palette;
        const {classes} = this.props;
        const colorBoxes = this._shades.map(color => (
           <ColorBox
               key={color.name}
               name={color.name}
               background={color[format]}
               showingFullPalette={false}
           />
        ));
        return (
            <div className={classes.Palette}>
                <Navbar handleChange={this.changeFormat} showLevelsBar={false}/>
                <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>Go Back</Link>
                    </div>
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        )
    }
}

export default withStyles(styles)(SingleColorPalette);
