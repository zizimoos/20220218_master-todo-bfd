import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) => props.theme.colors.subBackColor};
`;

interface ICardProps {
  item: string;
  index: number;
}

const DraggableItemCard = ({ item, index }: ICardProps) => {
  return (
    <Draggable draggableId={item} key={item} index={index}>
      {(provided, snapshot) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item}
        </Card>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableItemCard);
