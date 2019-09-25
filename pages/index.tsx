import { NextPage } from "next";
import Layout from "../components/Layout/Layout";
import { Bar } from "react-chartjs-2"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";

interface IProps { }

const data = {
  labels: ['Maandag', 'Dinsdag', 'Woensdag', 'Donderdag', 'Vrijdag', 'Maandag', 'Dinsdag'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: '#045286',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const Page: NextPage<IProps, {}> = () => <div>
    <div className="row mt-3">
        <div className="col-sm">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center">Absentie</h5>
                    <Bar data={ data } height={200}></Bar>
                </div>
            </div>
        </div>
        <div className="col-sm">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center">Jarigen </h5>
                    <ul className="list-group">
                        <li className="list-group-item"><FontAwesomeIcon icon={faBirthdayCake} /> - yes</li>
                    </ul>
                </div>
            </div>
        </div>
        <div className="col-sm">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center">Cijfers</h5>
                    <Bar data={[1]}></Bar>
                </div>
            </div>
        </div>
    </div>
    <div className="row mt-3">
         <div className="col-sm">
            <div className="card" style={{overflow:"hidden"}}>
                <div className="card-body bg-warning" style={{borderBottom:"2px dotted black"}}>
                    <h5 className="card-title text-center">Notities</h5>
                </div>

                <div className="card-body bg-white">
                    hai
                </div>
            </div>
        </div>
        <div className="col-sm">
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title text-center">Agenda</h5>
                </div>
            </div>
        </div>
    </div>
</div>;

export default Page;