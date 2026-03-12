import React, { useEffect, useState } from "react";
import Notification from "./components/Notification";
import Header from "./components/Header";
import StatsGrid from "./components/StatsGrid";
import Input from "./components/Input";
import TodoList from "./components/TodoList";
import ClearButton from "./components/ClearButton";
import { supabase } from "./lib/supabase";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [notification, setNotification] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  // Fetch data from Supabase
  useEffect(() => {
    fetchTodos();
  }, []);
  const fetchTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log("Fetch error:", error);
      t;
    } else {
      setTodos(data);
      console.log(data);
    }
  };

  //Todo add
  const handleAddTodo = async () => {
    if (!input.trim()) return;

    const { data, error } = await supabase
      .from("todos")
      .insert([{ text: input, completed: false }])
      .select();

    if (error) {
      console.log(error);
      return;
    }
    setTodos([data[0], ...todos]);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-indigo-950 via-purple-950 to-pink-950 p-3 sm:p-6 relative overflow-hidden">
        <Notification />
        <div className="max-w-3xl mx-auto relative z-10">
          <Header />
          <StatsGrid />
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onAdd={handleAddTodo}
            onKeyPress={handleKeyPress}
          />
          <TodoList todos={todos} editingId={editingId} editText={editText}  />
          <ClearButton />
        </div>
      </div>
    </>
  );
};

export default App;
