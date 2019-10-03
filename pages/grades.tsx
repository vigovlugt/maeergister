import { NextPage } from "next";
import { Radar } from "react-chartjs-2";

interface IProps {}

const data = {
  labels: [
    "Vigo",
    "Job",
    "Krijn",
    "Daan",
    "Arnau"
  ],
  datasets: [
    {
      label: "P1",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor:"rgba(255, 99, 132)",
      data: [2, 8.9, 10, 5, 7.8]
    },
{
      label: "P2",
      backgroundColor: "rgba(255, 159, 64, 0.2)",
      borderColor:"rgba(255, 159, 64)",
      data: [4, 5, 8, 3, 7]
    },
    {
      label: "P3",
      backgroundColor: "rgba(255, 205, 86, 0.2)",
      borderColor:"rgba(255, 205, 86)",
      data: [7, 8, 5, 9, 3]
    },
    {
      label: "P4",
      backgroundColor: "rgba(54, 162, 235, 0.2)",
      borderColor:"rgba(54, 162, 235)",
      data: [3, 1, 2, 5, 4]
    },
  ]
};

const Page: NextPage<IProps, {}> = () => {
    return <div>
            <h1 className="mt-3">Cijfers</h1>
            <div className="row">
            <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Cijfer per persoon</h5>
              <Radar data={data} height={200}></Radar>
            </div>
          </div>
        </div>
            </div>

    </div>
}

export default Page;