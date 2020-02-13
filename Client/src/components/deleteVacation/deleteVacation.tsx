import React, { Component } from "react";
import "./deleteVacation.css";
import { store } from "../../redux/store";

interface DeleteVacationProps{
    vacationID: number;
}

export class DeleteVacation extends Component<DeleteVacationProps> {
    
    private deleteVacation():void {

        let deleteConfirm = window.confirm("Are you sure you want to delete?");
        if(deleteConfirm){
            fetch("http://localhost:3001/api/vacations/" + this.props.vacationID, {
            method: "DELETE",
        })
            .catch(err => alert(err.message));
        }
    }

    public render():JSX.Element{
        return(
            <div className="delete-vacation"  style={{ display: store.getState().user.userType === "admin" ? "inline-block" : "none" }} onClick={() => this.deleteVacation() }></div>
        )
    }
}