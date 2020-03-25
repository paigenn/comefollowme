import React, { useState, useEffect } from "react";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Toolbar,
  Typography,
  Radio
} from "@material-ui/core";
import { Link, Route } from "react-router-dom";
import { auth, db } from "./firebase";
import VerySad from "@material-ui/icons/SentimentVeryDissatisfied";
import Sad from "@material-ui/icons/SentimentDissatisfied";
import Happy from "@material-ui/icons/SentimentSatisfied";
import VeryHappy from "@material-ui/icons/SentimentVerySatisfied";
import { Line } from "react-chartjs-2";
import moment from "moment";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function Chart(props) {
  const [surveys, setSurvey] = useState([]);
  const [labels, setLabels] = useState([]);
  const [dataSets, setDataSets] = useState([]);

  useEffect(() => {
    const unsub = db
      .collection("users")
      .doc(props.user.uid)
      .collection("surveys")
      .onSnapshot(snapshot => {
        const surveys = snapshot.docs.map(doc => {
          const survey = {
            sleep: parseInt(doc.data().sleep),
            exercise: parseInt(doc.data().exercise),
            scripture: parseInt(doc.data().scripture),
            happiness: doc.data().happiness,
            date: new Date(doc.data().date.seconds * 1000),
            id: doc.id
          };
          return survey;
        });
        const sorted = surveys.sort((a, b) => {
          if (a.date > b.date) {
            return 1;
          } else {
            return -1;
          }
        });
        setSurvey(surveys);
      });
    return unsub;
  }, []);

  useEffect(() => {
    const lbls = surveys.map(survey => {
      return moment(survey.date).format("M/D/YY");
    });
    setLabels(lbls);

    const sets = [];

    const sleep = {
      label: "Hours of Sleep",
      data: surveys.map(s => s.sleep),
      borderColor: "red",
      borderWidth: 1
    };
    sets.push(sleep);

    const scripture = {
      label: "Scripture Study",
      data: surveys.map(s => s.scripture),
      borderColor: "blue",
      borderWidth: 1
    };
    sets.push(scripture);

    const exercise = {
      label: "Exercise",
      data: surveys.map(s => s.exercise),
      borderColor: "green",
      borderWidth: 1
    };
    sets.push(exercise);

    const happiness = {
      label: "Happiness",
      data: surveys.map(s => s.happiness),
      borderColor: "yellow",
      borderWidth: 1
    };
    sets.push(happiness);
    setDataSets(sets);
  }, [surveys]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      <Paper
        style={{ padding: 12, marginTop: 30, width: "100%", maxWidth: 400 }}
      >
        <Typography varient="h4">Chart</Typography>
        <Line
          data={{
            labels: labels,
            datasets: dataSets
          }}
        />
      </Paper>
      <Paper
        style={{ padding: 12, marginTop: 30, width: "100%", maxWidth: 500 }}
      >
        <Typography varient="h4">Survey Data</Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Sleep</TableCell>
                <TableCell align="right">Exercise</TableCell>
                <TableCell align="right">Scripture</TableCell>
                <TableCell align="right">Happiness</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {surveys.map(survey => (
                <TableRow>
                  <TableCell>
                    {moment(survey.date).format("MM/DD/YY")}
                  </TableCell>
                  <TableCell align="right">{survey.sleep}</TableCell>
                  <TableCell align="right">{survey.exercise}</TableCell>
                  <TableCell align="right">{survey.scripture}</TableCell>
                  <TableCell align="right">{survey.happiness}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
