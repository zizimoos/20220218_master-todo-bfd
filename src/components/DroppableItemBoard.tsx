import { Droppable } from "react-beautiful-dnd";
import DraggableItemCard from "./DraggableItemCard";
import styled from "styled-components";

const Board = styled.div`
  min-height: 200px;
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props) => props.theme.colors.mainBackColor};
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

interface IDroppableProps {
  workList: string[];
  boardId: string;
}

const DroppableItemBoard = ({ workList, boardId }: IDroppableProps) => {
  return (
    <Droppable droppableId={boardId}>
      {(provided, snapshot) => (
        <Board ref={provided.innerRef} {...provided.droppableProps}>
          <Title>{boardId === "DOIN" ? "IN PROGRESS" : boardId}</Title>
          {workList.map((item, index) => (
            <DraggableItemCard item={item} index={index} key={index} />
          ))}
          {provided.placeholder}
        </Board>
      )}
    </Droppable>
  );
};
export default DroppableItemBoard;
