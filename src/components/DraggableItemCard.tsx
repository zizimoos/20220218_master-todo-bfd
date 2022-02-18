import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDragging ? "tomato" : props.theme.colors.subBackColor};
  box-shadow: ${(props) => props.isDragging && "0 0 10px rgba(0,0,0,0.5)"};
`;

interface ICardProps {
  id: number;
  text: string;
  index: number;
}

const DraggableItemCard = ({ id, text, index }: ICardProps) => {
  return (
    <Draggable draggableId={String(id)} key={text} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {text}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableItemCard);
