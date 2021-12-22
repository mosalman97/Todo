import React,{useState,useEffect} from "react";
import styled from "styled-components";

export default function ToDo() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Buy 1 kg Tomato",
    },
    {
      id: 2,
      title: "Buy 2 Kg Onion",
    },
    {
      id: 3,
      title: "Visit Friend",
    },
  ]);
  const [Completed, setCompleted] = useState([
    {
      id: 5,
      title: "Washing Clothes",
    }
  ]);
  
  const [newTask,setNewTask] = useState("");
  const [itemCount,setItemCount] = useState(0);
  useEffect(()=>{
      setItemCount(Completed.length+tasks.length)
  },[])
    
  const addNewTask=(event)=>{
    event.preventDefault();
    let new_task = {
        id:itemCount+1,
        title:newTask,
    };
     setTasks([...tasks,new_task]);
     setNewTask("");
     setItemCount((prev)=>prev+1)
 }
 const deleteTask = (id) =>{
     let new_list = tasks.filter((task)=> task.id !== id);
     setTasks(new_list)
 }
 const deleteCompelted = (id) =>{
    let new_list = Completed.filter((task)=> task.id !== id);
    setCompleted(new_list)
}

const CompleteTask =(id)=>{
    let currentTask = tasks.find((task)=> task.id == id);
    setCompleted([...Completed,currentTask])
    
    let new_list = tasks.filter((task)=> task.id !== id);
    setTasks(new_list)
}

const revertTask = (id)=>{
    let currentTask = Completed.find((task)=> task.id == id);
    setTasks([...tasks,currentTask]);
    let new_list = Completed.filter((task)=>task.id !== id)
    setCompleted(new_list)
}
  const renderTasks = () => {
    return tasks.map((task) => (
      <ListItem>
        <LeftContainer onClick={()=>CompleteTask(task.id)}>
          <CheckContainer></CheckContainer>
          <ItemContent>{task.id},{task.title}</ItemContent>
        </LeftContainer>
        <RightContainer>
          <ActionButton onClick={()=>deleteTask(task.id)}>
            <ButtonImage
              src={require("../Components/assets/delete.svg").default}
              alt="Delete"
            />
          </ActionButton>
        </RightContainer>
      </ListItem>
    ));
  };
  
  const renderCompleted = () => {
    return Completed.map((task) => (
        <ListItem>
        <LeftContainer>
          <CheckContainerCompleted>
            <TickImage
              src={require("./assets/tick-green.svg").default}
              alt="Tickgreen"
            />
          </CheckContainerCompleted>
          <ItemContentCompleted>{task.id}{task.title}</ItemContentCompleted>
        </LeftContainer>
        <RightContainer>
          <ActionButton onClick={()=> revertTask(task.id)}  >
            <ButtonImage
              src={require("../Components/assets/revert.svg").default}
              alt="Revert"
            />
          </ActionButton>
          <ActionButton onClick={()=>deleteCompelted(task.id)}>
            <ButtonImage
              src={require("../Components/assets/delete.svg").default}
              alt="Delete"
            />
          </ActionButton>
        </RightContainer>
      </ListItem>
    ));
  };
  return (
    <Container>
      <Heading>ToDo List</Heading>
      <ToDoContainer>
        <Subheading>Things to be done</Subheading>
        <ToDolist>
          {renderTasks()}
        </ToDolist>
      </ToDoContainer>
      <NewtodoForm>
        <FormInput
          placeholder="Type new Task..."
          value={newTask}
          onChange={(event)=>setNewTask(event.target.value)}
        />
        <FormSubmitButton onClick={(e)=>addNewTask(e)}>
          Add New
        </FormSubmitButton>
      </NewtodoForm>
      <ToDoContainer>
        <Subheading>Things to be done</Subheading>
        <ToDolist>
         {renderCompleted()}
        </ToDolist>
      </ToDoContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 90%auto;
  max-width: 1000px;
  padding: 50px 10%;
  border-left: 2px solid #f5f5f5;
  border-right: 2px solid #f5f5f5;
  margin: 0 auto;
  min-height: 100vh;
`;
const Heading = styled.h1`
  font-size: 52px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
`;
const ToDoContainer = styled.div``;
const Subheading = styled.h3`
  font-size: 36px;
  color: #050241;
`;
const ToDolist = styled.ul``;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;
const CheckContainer = styled.span`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #050241;
  display: inline-block;
  margin-right: 15px;
  cursor: pointer;
`;
const ItemContent = styled.span`
  font-size: 28px;
`;
const RightContainer = styled.div``;
const ActionButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  margin-right: 20px;
  outline: none;
  &:last-child {
    margin-right: 0;
  }
`;
const ButtonImage = styled.img``;
const NewtodoForm = styled.form`
  display: flex;
  margin-left: 40px;
  margin-top: 30px;
  position: relative;
  &::before {
    content: "";
    background-image: url(${require("../Components/assets/plus.svg").default});
    width: 16px;
    height: 16px;
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 10px;
    margin: auto 0;
    z-index: 2;
  }
`;
const FormInput = styled.input`
  display: block;
  outline: none;
  width: 100%;
  border: 1px solid #c6c6c6;
  border-right: none;
  padding: 0 10px 0 35px;
  font-size: 22px;
`;
const FormSubmitButton = styled.button`
  padding: 15px 25px;
  white-space: nowrap;
  border: none;
  background: #050241;
  color: #fff;
  cursor: pointer;
  border-radius: 6px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 24px;
`;
const CheckContainerCompleted = styled(CheckContainer)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: #06c692;
`;
const ItemContentCompleted = styled(ItemContent)`
  color: #06c692;
`;
const TickImage = styled.img``;
