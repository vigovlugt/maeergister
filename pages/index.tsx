import { NextPage } from "next";
import Layout from "../components/Layout/Layout";
import { Bar } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

import * as firebase from "firebase/app";
import "firebase/firestore";
// import Calendar from "react-calendar"

interface IProps {}

const data = {
  labels: [
    "Maandag",
    "Dinsdag",
    "Woensdag",
    "Donderdag",
    "Vrijdag",
    "Maandag",
    "Dinsdag"
  ],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "#045286",
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

const Page: NextPage<IProps, {}> = () => {
  const [noteRef, setNoteRef] = useState();
  const [note, setNote] = useState("");

  useEffect(() => {
    const firebaseConfig = {
      apiKey: "AIzaSyDg4dVmsZXjdnGq9szpNS3oVTyu0DFiZxg",
      authDomain: "maeergister.firebaseapp.com",
      databaseURL: "https://maeergister.firebaseio.com",
      projectId: "maeergister",
      storageBucket: "maeergister.appspot.com",
      messagingSenderId: "594040557123",
      appId: "1:594040557123:web:98316a051b6bed58950ef6",
      measurementId: "G-EPS1BZQK93"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    const db = firebase.firestore();

    const noteRef = db.collection("Notes").doc("Node1");
    setNoteRef(noteRef);

    noteRef.onSnapshot(snapshot => {
      const noteDbValue = snapshot.data().value;
      setNote(noteDbValue);
    });
  });

  const setNoteValueDb = n => {
    setNote(n);
    if (noteRef) {
      noteRef.set({ value: n });
    }
  };

  return (
    <div>
      <div className="row mt-3">
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Absentie</h5>
              <Bar data={data} height={200}></Bar>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Jarigen </h5>
              <ul className="list-group">
                <li className="list-group-item">
                  <FontAwesomeIcon icon={faBirthdayCake} /> - yes
                </li>
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
          <div className="card" style={{ overflow: "hidden" }}>
            <div
              className="card-body bg-warning"
              style={{ borderBottom: "2px dotted black" }}
            >
              <h5 className="card-title text-center">Notities</h5>
            </div>

            <div
              className="card-body bg-white"
              style={{ borderBottom: "1px solid lightgray" }}
            >
              <textarea
                className="form-control"
                onChange={e => setNoteValueDb(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Agenda</h5>
            </div>

            <div className="card-body">{/* <Calendar/> */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
