import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { workListState } from "../atoms";

import DroppableItemBoard from "./DroppableItemBoard";

const Wrapper = styled.div`
  width: 100%;
  max-width: 680px;
  height: 100vh;
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const Boards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;
const Item = () => {
  const [workList, setWorkList] = useRecoilState(workListState);
  console.log(workList);

  return (
    <DragDropContext
      onDragEnd={({ destination, source }) => {
        if (!destination) {
          return;
        }
        if (destination.droppableId === source.droppableId) {
          const workListCopy = [...workList[source.droppableId]];
          const targt = workListCopy.splice(source.index, 1);
          workListCopy.splice(destination.index, 0, ...targt);
          setWorkList({ ...workList, [source.droppableId]: workListCopy });
          localStorage.setItem(
            "workList",
            JSON.stringify({ ...workList, [source.droppableId]: workListCopy })
          );
        }
        if (destination.droppableId !== source.droppableId) {
          const sourceWorkList = [...workList[source.droppableId]];
          const target = sourceWorkList.splice(source.index, 1);
          const destinationWorkList = [...workList[destination.droppableId]];
          destinationWorkList.splice(destination.index, 0, ...target);
          setWorkList({
            ...workList,
            [source.droppableId]: sourceWorkList,
            [destination.droppableId]: destinationWorkList,
          });
          localStorage.setItem(
            "workList",
            JSON.stringify({
              ...workList,
              [source.droppableId]: sourceWorkList,
              [destination.droppableId]: destinationWorkList,
            })
          );
        }
        if (destination.droppableId === "WAST") {
          const workListCopy = [...workList[source.droppableId]];
          workListCopy.splice(source.index, 1);
          setWorkList({ ...workList, [source.droppableId]: workListCopy });
          localStorage.setItem(
            "workList",
            JSON.stringify({ ...workList, [source.droppableId]: workListCopy })
          );
        }
      }}
    >
      <Wrapper>
        <Boards>
          {Object.keys(workList).map((boardId) => (
            <DroppableItemBoard
              workList={workList[boardId]}
              boardId={boardId}
              key={boardId}
            />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
};

export default Item;
