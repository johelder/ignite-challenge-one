import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Task } from "./TasksList";
import Icon from "react-native-vector-icons/Feather";
import trashIcon from "../assets/icons/trash/trash.png";
import closeIcon from "../assets/icons/close/close.png";
import editIcon from "../assets/icons/edit/edit.png";

interface TaskitemProps {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (taskId: number, newTaskTitle: string) => void;
}

export function TaskItem({
  index,
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskitemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task.title);
  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setEditedTask(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, editedTask);
    setIsEditing(false);
  }

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            style={task.done ? styles.taskTextDone : styles.taskText}
            value={editedTask}
            onChangeText={setEditedTask}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.taskButtonsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing} style={{paddingHorizontal: 12}}>
            <Image source={closeIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing} style={{paddingHorizontal: 12}}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.separator} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={{ paddingRight: 24, paddingLeft: 12, opacity: isEditing ? 0.2 : 1 }}
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
    fontFamily: "Inter-Medium",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
    fontFamily: "Inter-Medium",
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },

  taskButtonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
