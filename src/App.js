import React from "react";

import { Cards, Chart, CountryPicker } from "./components";
import styles from "./App.module.css";
import { fetchData } from "./api";
import { Card, CardText } from "reactstrap";

import coronaImage from "./images/image.png";
import coronaImage2 from "./images/virus-4918363_1280.png";

class App extends React.Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();

    this.setState({ data: fetchedData });
  }

  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);

    this.setState({ data: fetchedData, country: country });

    //fetch the data
    //set the state
  };

  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} alt="COVID-19" src={coronaImage2} />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />

        <Card className="footer">
          <CardText>
            {" "}
            Adus pe lume cu greu si{" "}
            <span role="img" aria-label="love">
              ❤️
            </span>{" "}
            de{" "}
            <a
              href="https://github.com/cosics"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cezara Luca
            </a>
          </CardText>
        </Card>
      </div>
    );
  }
}

export default App;
