import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Palette from './Palette';
import PaletteList from './PaletteList';
import SingleColorPalette from './SingleColorPalette';
import NewPaletteForm from './NewPaletteForm';
import seedColors from './seedColors';
import { generatePalette } from './ColorHelpers';
import Page from './Page';

class App extends Component {
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem('palettes'));
    this.state = { palettes: savedPalettes || seedColors };
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
    this.deletePalette = this.deletePalette.bind(this);
  }

  findPalette(id) {
    const { palettes } = this.state;
    return palettes.find(palette => palette.id === id);
  }

  deletePalette(id) {
    this.setState(
      st => ({ palettes: st.palettes.filter(palette => palette.id !== id) }),
      this.syncLocalStorage,
    );
  }

  savePalette(newPalette) {
    const { palettes } = this.state;
    this.setState({ palettes: [...palettes, newPalette] }, this.syncLocalStorage);
  }

  syncLocalStorage() {
    // save palettes to local storage
    const { palettes } = this.state;
    window.localStorage.setItem('palettes', JSON.stringify(palettes));
  }

  render() {
    const { palettes } = this.state;
    return (
      <Route render={({ location }) => (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="page" timeout={500}>
            <Switch location={location}>
              <Route
                exact
                path="/palette/new"
                render={routeProps => (
                  <Page>
                    <NewPaletteForm
                      savePalette={this.savePalette}
                      palettes={palettes}
                      {...routeProps}
                    />
                  </Page>
                )}
              />
              <Route
                exact
                path="/"
                render={routeProps => (
                  <div className="page">
                    <PaletteList
                      palettes={palettes}
                      {...routeProps}
                      deletePalette={this.deletePalette}
                    />
                  </div>
                )}
              />
              <Route
                exact
                path="/palette/:id"
                render={routeProps => (
                  <Page>
                    <Palette palette={generatePalette(
                      this.findPalette(routeProps.match.params.id),
                    )}
                    />
                  </Page>
                )}
              />
              <Route
                exacts
                path="/palette/:paletteId/:colorId"
                render={routeProps => (
                  <Page>
                    <SingleColorPalette
                      colorId={routeProps.match.params.colorId}
                      palette={generatePalette(
                        this.findPalette(routeProps.match.params.paletteId),
                      )}
                    />
                  </Page>
                )}
              />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      )}
      />
    );
  }
}

export default App;
