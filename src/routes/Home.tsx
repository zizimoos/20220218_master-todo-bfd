import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import Item from "../components/Item";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafafa;
  overflow: hidden;
`;

const BoardHome = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  background-color: chocolate;
`;

const ItemWrapper = styled.div`
  width: 80vw;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Home = () => {
  const onDragEnd = (props: DropResult) => {
    console.log(props);
  };
  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          <Droppable droppableId="HomeDroppable">
            {(provided, snapshot) => (
              <BoardHome ref={provided.innerRef} {...provided.droppableProps}>
                <Draggable draggableId="HomeDraggable_00" index={0}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ItemWrapper>
                        <Item />
                      </ItemWrapper>
                    </div>
                  )}
                </Draggable>

                {provided.placeholder}
              </BoardHome>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </Container>
  );
};
export default Home;
