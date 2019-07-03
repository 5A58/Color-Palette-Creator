import chroma from "chroma-js";
import sizes from './sizes';

export default {
    ColorBox: {
        // Main ColorBox container
        width: "20%",
        height: props => (props.showingFullPalette ? "25%" : "50%"),
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        margin: "0 auto -3.5px",
        "&:hover button": {
            opacity: 1
        },
        [sizes.down("lg")]: {
            width: "25%",
            height: props => (props.showingFullPalette ? "20%" : "50%")
        },
        [sizes.down("md")]: {
            width: "50%",
            height: props => (props.showingFullPalette ? "10%" : "50%")
        },
        [sizes.down("xs")]: {
            width: "100%",
            height: props => (props.showingFullPalette ? "5%" : "10%")
        }
    },
    copyText: {
        // determine if the color is light based on it luminance
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.5)" : "white"
    },
    colorName: {
        // determine if the color is dark based on it luminance
        color: props => chroma(props.background).luminance() <= 0.08 ? "white" : "black"
    },
    seeMore: {
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.5)" : "white",
        background: "rgba(255, 255, 255, 0.3)",
        position: "absolute",
        border: "none",
        right: "0px",
        bottom: "0px",
        width: "60px",
        height: "30px",
        textAlign: "center",
        lineHeight: "30px",
        textTransform: "uppercase"
    },
    copyButton: {
        // Button used to copy color information to clipboard
        color: props => chroma(props.background).luminance() >= 0.7 ? "rgba(0,0,0,0.5)" : "white",
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
        textDecoration: "none",
        opacity: 0
    },
    boxContent: {
        // div that contains color name
        position: "absolute",
        width: "100%",
        left: "0",
        bottom: "0",
        padding: "10px",
        color: "black",
        letterSpacing: "1px",
        textTransform: "uppercase",
        fontSize: "12px"
    },
    copyOverlay: {
        // container that will display when color is copied
        opacity: "0",
        zIndex: "0",
        width: "100%",
        height: "100%",
        transition: "transform 0.6s ease-in-out",
        transform: "scale(0.1)"
    },
    showOverlay: {
        // container that displays when color is copied
        opacity: "1",
        transform: "scale(50)",
        zIndex: "10",
        position: "absolute"
    },
    copyMessage: {
        // message container that will display when color is copied
        position: "fixed",
        left: "0",
        right: "0",
        top: "0",
        bottom: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontSize: "4rem",
        transform: "scale(0.1)",
        opacity: "0",
        color: "white",
        "& h1": {
            // message that displays when color is copied
            fontWeight: "400",
            textShadow: "1px 2px black",
            background: "rgba(255, 255, 255, 0.2)",
            width: "100%",
            textAlign: "center",
            marginBottom: "0",
            padding: "1rem",
            textTransform: "uppercase"
        },
        "& p": {
            // color information that displays when color is copied
            fontSize: "2rem",
            fontWeight: "100",
        }
    },
    showMessage: {
        // message container that displays when color is copied
        opacity: "1",
        transform: "scale(1)",
        zIndex: "25",
        transition: "all 0.4s ease-in-out",
        transitionDelay: "0.3s"
    }
};
