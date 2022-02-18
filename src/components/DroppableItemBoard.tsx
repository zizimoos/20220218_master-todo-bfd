import { Droppable } from "react-beautiful-dnd";
import DraggableItemCard from "./DraggableItemCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { ITodo, IWorkList, workListState } from "../atoms";
import { useRecoilState } from "recoil";

const Wrapper = styled.div<{ boardId: any }>`
  width: 300px;
  padding: 20px 10px;
  padding-top: 20px;
  background-color: ${(props) => props.theme.colors.mainBackColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  ${(props) =>
    props.boardId === "WAST" &&
    `
    background-color:transparent;
    
    `}
  overflow: hidden;
`;

interface IBoardProps {
  boardId: any;
  isDraggingOver: boolean;
  isDraggingFromThis: boolean;
}

const Board = styled.div<IBoardProps>`
  flex-grow: 1;
  background-color: ${(props) =>
    props.isDraggingOver
      ? "lightblue"
      : props.isDraggingFromThis
      ? "wheat"
      : "silver"};
  ${(props) =>
    props.boardId === "WAST" &&
    `
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color:khaki;
    position:absolute;
    bottom:0;
    right:0;
    margin:30px;
    `}
  transition: background-color 0.2s ease-in-out;
`;

const Title = styled.h1<{ boardId: any }>`
  margin-bottom: 10px;
  ${(props) =>
    props.boardId === "WAST" &&
    `
   display:none;
    `}
`;

const Form = styled.form<{ boardId: any }>`
  width: 100%;
  margin-bottom: 5px;
  input {
    width: 100%;
    padding: 5px;
    padding-left: 15px;
    border: none;
    border-radius: 20px;
  }
  ${(props) =>
    props.boardId === "WAST" &&
    `
   display:none;
    `}
`;

interface IDroppableProps {
  workList: ITodo[];
  boardId: string;
}

interface IFormData {
  todo: string;
}

const DroppableItemBoard = ({ workList, boardId }: IDroppableProps) => {
  const [addTodo, setAddTodo] = useRecoilState(workListState);
  const { register, setValue, handleSubmit } = useForm<IFormData>();
  const onValid = (data: IFormData) => {
    const newTodo = { id: Number(Date.now()), text: data.todo };
    const targetTodoBoard = [...addTodo[boardId]];
    const newBoard = [newTodo, ...targetTodoBoard];
    setAddTodo({ ...addTodo, [boardId]: newBoard });
    localStorage.setItem(
      "workList",
      JSON.stringify({ ...addTodo, [boardId]: newBoard })
    );
    setValue("todo", "");
  };
  return (
    <Wrapper boardId={boardId}>
      <Title boardId={boardId}>
        {boardId === "DOIN" ? "IN PROGRESS" : boardId}
      </Title>
      <Form onSubmit={handleSubmit(onValid)} boardId={boardId}>
        <input
          {...register("todo", { required: true })}
          type="text"
          placeholder={`Add a todo ${boardId}`}
        />
      </Form>
      <Droppable droppableId={boardId}>
        {(provided, snapshot) => (
          <Board
            ref={provided.innerRef}
            {...provided.droppableProps}
            boardId={boardId}
            isDraggingOver={snapshot.isDraggingOver}
            isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
          >
            {workList.map((item, index) => (
              <DraggableItemCard
                id={item.id}
                text={item.text}
                index={index}
                key={index}
              />
            ))}
            {provided.placeholder}
          </Board>
        )}
      </Droppable>
    </Wrapper>
  );
};
export default DroppableItemBoard;
