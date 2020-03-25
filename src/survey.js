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
import { auth } from "./firebase";
import VerySad from "@material-ui/icons/SentimentVeryDissatisfied";
import Sad from "@material-ui/icons/SentimentDissatisfied";
import Happy from "@material-ui/icons/SentimentSatisfied";
import VeryHappy from "@material-ui/icons/SentimentVerySatisfied";
import { db, functions } from "./firebase";

export default function Survey(props) {
  const [sleep, setSleep] = useState("");
  const [exercise, setExercise] = useState("");
  const [scripture, setScripture] = useState("");
  const [happiness, setHappiness] = useState(0);
  const [phoneNumber, setphoneNumber] = useState("");
  const [message, setMessage] = useState(
    "Check out HealthTracker App https://healthtracker-177e4.web.app/"
  );

  const handleSave = () => {
    db.collection("users")
      .doc(props.user.uid)
      .collection("surveys")
      .add({
        sleep: sleep,
        happiness: happiness,
        exercise: exercise,
        scripture: scripture,
        date: new Date()
      })
      .then(() => {
        setSleep("");
        setExercise("");
        setScripture("");
        setHappiness(0);
      });
  };

  const handleSaveInvite = () => {
    const sendInvite = functions.httpsCallable("sendInvite");
    sendInvite({ number: phoneNumber, message: message }).then(function(
      result
    ) {
      // Read result of the Cloud Function.
      // ...
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <Paper
        style={{ padding: 12, marginTop: 30, width: "100%", maxWidth: 400 }}
      >
        <Typography variant="h4">Survey</Typography>
        <Typography style={{ marginTop: 16 }}>
          How many hours of sleep did you get last night?
        </Typography>
        <TextField
          fullWidth
          value={sleep}
          onChange={e => setSleep(e.target.value)}
        ></TextField>
        <Typography style={{ marginTop: 16 }}>
          How many hours did you exercise?
        </Typography>
        <TextField
          fullWidth
          value={exercise}
          onChange={e => setExercise(e.target.value)}
        ></TextField>
        <Typography style={{ marginTop: 16 }}>
          How many minutes did you study the scriptures?
        </Typography>
        <TextField
          fullWidth
          value={scripture}
          onChange={e => setScripture(e.target.value)}
        ></TextField>
        <Typography style={{ marginTop: 16 }}>
          How happy were you today?
        </Typography>
        <div style={{ display: "flex" }}>
          <Radio
            checked={happiness === 1}
            checkedIcon={<VerySad />}
            icon={<VerySad />}
            onChange={() => setHappiness(1)}
          />
          <Radio
            checked={happiness === 2}
            checkedIcon={<Sad />}
            icon={<Sad />}
            onChange={() => setHappiness(2)}
          />
          <Radio
            checked={happiness === 3}
            checkedIcon={<Happy />}
            icon={<Happy />}
            onChange={() => setHappiness(3)}
          />
          <Radio
            checked={happiness === 4}
            checkedIcon={<VeryHappy />}
            icon={<VeryHappy />}
            onChange={() => setHappiness(4)}
          />
        </div>

        <Button
          onClick={handleSave}
          style={{ marginTop: 16 }}
          varient="outlined"
          color="primary"
        >
          Save
        </Button>
      </Paper>
      <Paper
        style={{ padding: 12, marginTop: 30, width: "100%", maxWidth: 400 }}
      >
        <Typography variant="h4">Invite User to App</Typography>
        <Typography style={{ marginTop: 16 }}>Phone number</Typography>
        <TextField
          fullWidth
          value={phoneNumber}
          onChange={e => setphoneNumber(e.target.value)}
        ></TextField>
        <Typography style={{ marginTop: 16 }}>Message</Typography>
        <TextField
          fullWidth
          value={message}
          multiline
          rows={4}
          onChange={e => setMessage(e.target.value)}
        ></TextField>

        <Button
          onClick={handleSaveInvite}
          style={{ marginTop: 16 }}
          varient="outlined"
          color="primary"
        >
          Send
        </Button>
      </Paper>
    </div>
  );
}
