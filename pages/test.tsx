import StudentModal from "../components/Modals/StudentModal";
import { useState } from "react";

export default () => {
    const [show,setShow] = useState(true);
    return <div>
    <button onClick={()=>setShow(!show)}>Modal</button>
    <StudentModal show={show} onHide={()=>setShow(false)} studentId={2}></StudentModal>
</div>
}