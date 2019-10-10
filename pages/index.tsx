import { NextPage } from "next";
import { Bar } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBirthdayCake } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useMemo } from "react";
import isSameWeek from "date-fns/isSameWeek";
import getDay from "date-fns/getDay";
import differenceInDays from "date-fns/differenceInDays";
import * as firebase from "firebase/app";
import "firebase/firestore";

import { DayPickerRangeController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import "firebase/firestore";

interface IProps {}

const today = new Date();

const absentiesDataFn = data => () => ({
  labels: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag"],
  datasets: [
    {
      label: "Absenties per dag",
      backgroundColor: "#045286",
      data: [0, 1, 2, 3, 4].map((_, i) =>
        data
          ? data.absences.filter(a => {
              const date = new Date(a.Date);
              return getDay(date) == i + 1 && isSameWeek(date, today);
            }).length
          : 0
      )
    }
  ]
});

const gradesDataFn = (data: { students: any[] }) => () => ({
  labels: ["P1", "P2", "P3", "P4"],
  datasets: [
    {
      label: "Gemiddeld cijfer per periode",
      backgroundColor: "#045286",
      data: data
        ? data.students
            .map(s => [s.Grade1, s.Grade2, s.Grade3, s.Grade4])
            .reduce((a, b) => a.map((n, i) => n + b[i]))
            .map(n => n / data.students.length)
        : []
    }
  ]
});

const GET_HOMEDATA = gql`
  {
    students {
      Grade1
      Grade2
      Grade3
      Grade4
      DateOfBirth
    }
    absences {
      Date
    }
  }
`;

const Page: NextPage<IProps, {}> = () => {
  const [noteRef, setNoteRef] = useState();
  const [note, setNote] = useState("");

  const { data, loading } = useQuery(GET_HOMEDATA);

  const absentiesData = useMemo(absentiesDataFn(data), [data]);
  const gradesData = useMemo(gradesDataFn(data), [data]);
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
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    const db = firebase.firestore();

    const noteRef = db.collection("Notes").doc("Note1");
    setNoteRef(noteRef);

    noteRef.onSnapshot(snapshot => {
      const noteDbValue = snapshot.data();
      const value = noteDbValue.value;
      setNote(value);
    });
  }, []);

  const setNoteValueDb = n => {
    setNote(n);
    if (noteRef) {
      noteRef.set({ value: n });
    }
  };

  const birthDays = data
    ? data.students.filter(s => {
        const diffrence =
          differenceInDays(today, new Date(s.DateOfBirth)) % 364.25;
        return diffrence >= 0 && diffrence <= 7;
      })
    : [];

  return (
    <div>
      <div className="row mt-3" style={{ alignItems: "stretch" }}>
        <div className="col-sm">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Absentie</h5>
              {<Bar data={absentiesData} height={200}></Bar>}
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title text-center">Jarigen </h5>
              <ul className="list-group">
                {!loading &&
                  (birthDays.length ? (
                    birthDays.map(s => (
                      <li className="list-group-item">
                        <FontAwesomeIcon icon={faBirthdayCake} /> - {s.Name}
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item">
                      Geen jarigen de komende 7 dagen
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-sm">
          <div className="card h-100">
            <div className="card-body">
              <h5 className="card-title text-center">Cijfers</h5>
              <Bar data={gradesData}></Bar>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-sm">
          <div className="card h-100" style={{ overflow: "hidden" }}>
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
                value={note}
                onChange={e => setNoteValueDb(e.target.value)}
                style={{
                  minHeight: "400px"
                }}
              ></textarea>
              <style jsx>{`
                textarea {
                  border: 0px;
                  line-height: 31px;
                  background-image: -webkit-linear-gradient(
                      left,
                      white 10px,
                      transparent 10px
                    ),
                    -webkit-linear-gradient(right, white 10px, transparent 10px),
                    -webkit-linear-gradient(white 30px, #ccc 30px, #ccc 31px, white
                          31px);
                  background-image: -moz-linear-gradient(
                      left,
                      white 10px,
                      transparent 10px
                    ),
                    -moz-linear-gradient(right, white 10px, transparent 10px),
                    -moz-linear-gradient(white 30px, #ccc 30px, #ccc 31px, white
                          31px);
                  background-image: -ms-linear-gradient(
                      left,
                      white 10px,
                      transparent 10px
                    ),
                    -ms-linear-gradient(right, white 10px, transparent 10px),
                    -ms-linear-gradient(white 30px, #ccc 30px, #ccc 31px, white
                          31px);
                  background-image: -o-linear-gradient(
                      left,
                      white 10px,
                      transparent 10px
                    ),
                    -o-linear-gradient(right, white 10px, transparent 10px),
                    -o-linear-gradient(white 30px, #ccc 30px, #ccc 31px, white
                          31px);
                  background-image: linear-gradient(
                      left,
                      white 10px,
                      transparent 10px
                    ),
                    linear-gradient(right, white 10px, transparent 10px),
                    linear-gradient(
                      white 30px,
                      #ccc 30px,
                      #ccc 31px,
                      white 31px
                    );
                  background-size: 100% 100%, 100% 100%, 100% 31px;
                }
              `}</style>
            </div>
          </div>
        </div>
        <div className="col-xl-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center">Agenda</h5>
            </div>

            <div className="card-body">
              <DayPickerRangeController />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
