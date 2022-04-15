import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Nav from "../Components/Nav";
import { Button } from "@mui/material";
import { CSVLink, CSVDownload } from "react-csv";

const axios = require("axios").default;

function Weather() {
  const [currentTemp, setCurrentTemp] = useState(0);
  const [data, setData] = useState("")

  const convertToFahrenheit = (tempInKelvin) => {
    setCurrentTemp(Number.parseInt(((tempInKelvin - 273.15) * 9) / 5 + 32));
  };
  useEffect(() => {
    axios
      .get("http://localhost:5000/datasets/weather/")
      .then(function (response) {
        console.log(response);
        convertToFahrenheit(response.data.weather.main.temp);
        setData(response.data.forecast.list)
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Nav />
      <Typography style={{ fontSize: "30px", fontWeight: "500" }}>
        Current Weather at the EER: {currentTemp} &deg;F
      </Typography>
      <Button>
        <CSVLink id="remove-underline" data={data}>
          Download Metadata
        </CSVLink>
      </Button>
    </>
  );
}

export default Weather;
