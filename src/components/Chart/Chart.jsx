import React, { useState, useEffect } from "react";
import { fetchDailyData, fetchCountries } from "../../api";
import { Line, Bar } from "react-chartjs-2";

import styles from "./Chart.module.css";

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  const [dailyData, setDailyData] = useState([]);
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    //console.log(dailyData);

    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      setCountries(await fetchCountries());
    };

    //console.log(countries);

    fetchAPI();
  }, []);

  const lineChart1 = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Infectări",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Decese",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  //console.log(confirmed, recovered, deaths);

  const lineChart2 = countries.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: countries.map(({ confirmed }) => country),
            label: "Infectări",
            borderColor: "#3333ff",
            fill: true,
          },
          {
            data: countries.map(({ deaths }) => country),
            label: "Decese",
            borderColor: "red",
            backgroundColor: "rgba(255, 0, 0, 0.5",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Infectați", "Vindecați", "Decedați"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0, 0, 255, 0.5)",
              "rgba(0, 255, 0, 0.5)",
              "rgba(255, 0, 0, 0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Starea actuală în ${country}` },
      }}
    />
  ) : null;

  return (
    <div className={styles.container}>{country ? barChart : lineChart1}</div>
  );
};

/*  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  ); */

export default Chart;
