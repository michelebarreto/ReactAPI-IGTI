import React, { Component } from 'react';
import Countries from './components/countries/Countries';
import Header from './header/Header';

export default class App extends Component {
  constructor (){
    super();

    this.state={
      allCountries:[],
      filteredCountries:[],
      filteredPopulation:0,
      filter:''
      
    };
  }
  async componentDidMount(){
    const res =await fetch('https://restcountries.eu/rest/v2/all'); // aqui é uma API com nome e imagem das bandeiras dos paises
    const json =await res.json();
    // esses dados dentro do json.map são referencias de dentro do array dos paises
    const allCountries =json.map(({name,numericCode,flag,population})=>{
      return {
        id: numericCode,
        name,
        filterName: name.toLowerCase(),
        flag,
        population,

      };
    });

    const filteredPopulation=this.calculateTotalPopulatioFrom(allCountries);
 
    this.setState({
      allCountries,
      filteredCountries:Object.assign([],allCountries),
      filteredPopulation,
    });
  }

  calculateTotalPopulatioFrom=(countries)=>{
    const totalPopulation = countries.reduce(
      (accumulator, current)=>{
      return accumulator + current.population;
     },0);
     return totalPopulation;

  }

  handleChangeFilter = (newText)=>{
    this.setState({
      filter:newText,
    });

    const filterLowerCase = newText.toLowerCase();

    const filteredCountries = this.state.allCountries.filter((country) =>{
     return  country.filterName.includes(filterLowerCase);
    });

    const filteredPopulation=this.calculateTotalPopulatioFrom(filteredCountries);

    this.setState({
      filteredCountries,
      filteredPopulation,
    });

  };

  render() {
    const {filteredCountries, filter, filteredPopulation} = this.state;

    return (
      //esse container é referência do materialize que estiliza a pagina
    <div className="container">
    <h1 style={styles.ceteredTitle}> Relação dos Países</h1>
    <Header filter={filter} 
    countryCount={filteredCountries.length}
    totalPopulation={filteredPopulation}
    onChangeFilter={this.handleChangeFilter}/>

    <Countries countries ={filteredCountries}/>
    </div>
    );
  }
}
// aqui vamos criar uma variavel para centralizar o texto, fora do css
const styles={
  ceteredTitle:{
    textAlign:'center',
  },

};