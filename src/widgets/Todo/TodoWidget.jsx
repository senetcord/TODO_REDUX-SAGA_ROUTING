import { useEffect, useState } from "react";
import TodoEntity from "../../entities/Todo/TodoEntity";
import InputTodo from "../../features/Todo/ui/InputTodo";
import Title from "../../features/Todo/ui/Title";
import TodoFooter from "../../features/Todo/ui/TodoFooter";
import TodoList from "../../features/Todo/ui/TodoList";
import TodoListItem from "../../features/Todo/ui/TodoListItem";
import { useDispatch, useSelector } from "react-redux";
import { getDataAsyncAction } from "../../shared/Saga/asyncActions";
import { Box, CircularProgress } from "@mui/material";

const TodoWidget = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event) => {
    setSearchText(event.target.value.toLowerCase());
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDataAsyncAction());
  }, []);
  const data = useSelector((state) => state.todo.todoList);

  const getDataLoading = useSelector(
    (state) => state.todo.loaders.getDataLoading
  );

  const addItemLoading = useSelector(
    (state) => state.todo.loaders.addItemLoading
  );

  const filteredItems = data.filter((item) =>
    item.text.toLowerCase().startsWith(searchText)
  );

  return (
    <TodoEntity>
      <Title fontSize={"2.15rem"} />
      <InputTodo />
      <Title fontSize={"1.75rem"} />
      <TodoList>
        {getDataLoading || addItemLoading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : null}

        {filteredItems.map((item) => {
          if (item.checked === false) {
            return (
              <TodoListItem
                key={item.id}
                id={item.id}
                text={item.text}
                checked={item.checked}
              />
            );
          }
        })}
        {filteredItems.map((item) => {
          if (item.checked === true) {
            return (
              <TodoListItem
                key={item.id}
                id={item.id}
                text={item.text}
                checked={item.checked}
              />
            );
          }
        })}
      </TodoList>
      <TodoFooter handleChange={handleSearchChange} />
    </TodoEntity>
  );
};
export default TodoWidget;
