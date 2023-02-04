import { supabase } from "../utils/supabase";
import { useState, useEffect } from "react";
import styles from "../styles/Create.module.css";
import { useRouter } from "next/router";
import {db} from "../service/db";

const Create = () => {
  const initialState = {
    title: "",
    loads: "",
    reps: "",
  };

  const router = useRouter();
  const [workoutData, setWorkoutData] = useState(initialState);

  const { title, loads, reps } = workoutData;

  const handleChange = (e) => {
    setWorkoutData({ ...workoutData, [e.target.name]: e.target.value });
  };

  const createWorkout = async () => {
    const user = supabase.auth.user();

    const { data, error } = await supabase
      .from("workouts")
      .insert({
        title,
        loads,
        reps,
        user_id: user?.id,
        user_email: user?.email
      })
      .single();

    if(data){
      console.log("added", data);
      alert("Workout created successfully");
    }
    
    if(error){
      console.log("added error", error);
      addFriend();
      // alert("Workout created successfully");
    }


    // addFriend();

    setWorkoutData(initialState);
    router.push("/");
  };

  //to continue
  const addFriend = async() => {
    try {


      const user = {
        id: "1",
        email: "umar.mw@gmail.com"
      }

      // Add the new friend!
      const id = await db.workout.add({
        title,
        loads,
        reps,
        user_id: user?.id,
        user_email: user?.email
      });

      console.log(`Workout ${title} successfully added. Got id ${id}`)

      // setStatus(`Friend ${name} successfully added. Got id ${id}`);
      // setName("");
      // setAge(defaultAge);
    } catch (error) {
      console.log(`Failed to add ${title}: ${error}`)
      // setStatus(`Failed to add ${title}: ${error}`);
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.form}>
          <p className={styles.title}>Create a New Workout</p>
          <label className={styles.label}>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter a title"
          />
          <label className={styles.label}>Load (kg):</label>
          <input
            type="text"
            name="loads"
            value={loads}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter weight load"
          />
          <label className={styles.label}>Reps:</label>
          <input
            type="text"
            name="reps"
            value={reps}
            onChange={handleChange}
            className={styles.input}
            placeholder="Enter number of reps"
          />

          <button className={styles.button} onClick={createWorkout}>
            Create Workout
          </button>
        </div>
      </div>
    </>
  );
};

export default Create;
