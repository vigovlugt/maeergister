import { NextPage } from "next";
import { Radar, Polar, Bar } from "react-chartjs-2";
import { useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { database } from "firebase";

interface IProps {}

const colors = [
  {
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    borderColor: "rgba(255, 99, 132)"
  },
  {
    backgroundColor: "rgba(255, 159, 64, 0.2)",
    borderColor: "rgba(255, 159, 64)"
  },
  {
    backgroundColor: "rgba(255, 205, 86, 0.2)",
    borderColor: "rgba(255, 205, 86)"
  },
  {
    backgroundColor: "rgba(54, 162, 235, 0.2)",
    borderColor: "rgba(54, 162, 235)"
  }
];

const radarDataFn = data => () => ({
  datasets: [0, 1, 2, 3].map((_, i) => ({
    label: "P" + (i + 1),
    ...colors[i],
    data: data ? data.students.map(s => s["Grade" + (i + 1)]) : []
  })),
  labels: data ? data.students.map(s => s.Name) : []
});

const GRADES_QUERY = gql`
  {
    students {
      Name
      Grade1
      Grade2
      Grade3
      Grade4
    }
  }
`;

const Page: NextPage<IProps, {}> = () => {
  const { data } = useQuery(GRADES_QUERY);

  const radarData = useMemo(radarDataFn(data), [data]);

  return (
    <div>
      <h1 className="mt-3">Cijfers</h1>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Cijfer per persoon</h5>
              <Radar data={radarData} height={200}></Radar>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Cijfer per persoon</h5>
              <Bar data={radarData} height={200}></Bar>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <table className="table bg-white mx-3">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Naam</th>
              <th scope="col">Periode 1</th>
              <th scope="col">Periode 2</th>
              <th scope="col">Periode 3</th>
              <th scope="col">Periode 4</th>
            </tr>
          </thead>
          <tbody>
            {data.students.map((s, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{s.Name}</td>
                <td>{s.Grade1}</td>
                <td>{s.Grade2}</td>
                <td>{s.Grade3}</td>
                <td>{s.Grade4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
