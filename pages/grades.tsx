import { NextPage } from "next";
import { Radar, Polar } from "react-chartjs-2";
import { useMemo } from "react";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

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

// {
//   label: "P1",
//   backgroundColor: "rgba(255, 99, 132, 0.2)",
//   borderColor: "rgba(255, 99, 132)",
//   data: [2, 8.9, 10, 5, 7.8]
// }

const radarDataFn = data => () => ({
  labels: [data ? data.students.map(s => s["Name"]) : ""],
  datasets: [0, 1, 2, 3].map((_, i) => ({
    label: "P" + (i + 1),
    ...colors[i],
    data: [data ? data.students.map(s => s["Grade" + (i + 1)]) : null]
  }))
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
  const { data, loading } = useQuery(GRADES_QUERY);

  const radarData = useMemo(radarDataFn(data), [data]);

  return (
    <div>
      <h1 className="mt-3">Cijfers</h1>
      <div className="row">
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Cijfer per persoon</h5>
              <Radar data={radarData} height={200}></Radar>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
        <div className="col-md-5">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Cijfer per persoon</h5>
              <Polar data={radarData} height={200}></Polar>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
