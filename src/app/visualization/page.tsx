'use client'

import { Barplot } from '@/components/Barplot';
import { Button } from '@/components/Button';
import Trendplot from '@/components/Trendplot';
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { useState } from 'react';
import db from "@/data/output.json"

type DataEntry = {
  [key: string]: number;
};

type YearData = DataEntry[];

type DataObject = {
  [year: string]: YearData[];
};

const data: DataObject = db;

function convertData(dataArray: { [x: string]: number; }[]) {
  return dataArray.map((dataObj: { [x: string]: number; }) => {
    return Object.keys(dataObj).map(key => {
      return { name: key, value: dataObj[key] };
    });
  }).flat();
}

export default function Projects() {
  const [topicIndex, setTopicIndex] = useState(0);
  const [year, setYear] = useState("1986");
  const scalingFactors = [0.0, 0.9269062042708435, 2.3858535379166494, 3.0704093839559445, 4.051942153651232, 5.145942669086449, 5.761958767052235, 6.319206569021326, 7.182132045948975, 9.100136416717897, 10.140688144552554, 12.364888839859907, 14.736675483695388, 14.27249132226738, 15.689098548392383, 15.49482540280877, 16.06528494680469, 16.229977843254606, 16.684015759918992, 19.893219480514805, 23.22170346450875, 25.253591536923544, 26.221500747375863, 28.68918548825689, 26.19082885191767, 26.59370476059779, 28.411595153275318, 31.02198031176495, 32.483318778996576, 31.569079006174125, 35.9942410523157, 36.98285808821382, 40.159297506081025, 35.286065562501825, 44.17396926292722, 41.92082443934087, 40.27866754093768];

  const topics = ["Well Stimulation and Operational Efficiency", "Reservoir Combustion Experiments", "Modeling and Prediction of Liquid Rate in Separator Systems", "Scale Inhibition in Well Operations", "Advanced Wellbore Measurement and Operation", "Hydraulic Fracturing and Reservoir Modeling", "Shale Reservoir Properties and Treatment", "Electrical Resistivity Modeling and Analysis", "Emission Detection and Environmental Monitoring", "Surfactant and Polymer Performance in Enhanced Oil Recovery", "Offshore Inspection and Robotics", "Pore Wettability and Fluid Imbibition in Core Samples", "Pipeline Performance and Hydrate Prevention"]

  const years = Array.from({ length: 2023 - 1986 + 1 }, (v, i) => (1986 + i).toString());


  return (
    <SimpleLayout
      title="Data Visualization"
      intro="Interactive displays of our key research findings."
    >
      <h1>Years:</h1>
      {years.map(y => <Button variant={y == year ? "primary" : "secondary"} className='m-2' key={y} onClick={() => setYear(y)}>{y}</Button>)}
      <h1>Topics:</h1>
      {topics.map((t, index) => <Button variant={index == topicIndex ? "primary" : "secondary"} className='m-2' key={index} onClick={() => setTopicIndex(index)}>{t}</Button>)}
      <Barplot data={convertData(data[year][topicIndex])} width={800} height={600} />
      <Trendplot />

    </SimpleLayout>
  )
}
