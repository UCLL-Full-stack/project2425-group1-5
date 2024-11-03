import React from "react";
import { Doctor } from "@/types";

type Props = {
    doctor : Doctor;
};

const ServicesOverView : React.FC<Props> =({doctor} : Props) =>{
    return(
        <>
        {doctor&&(
            <div>
                <h2>Services Provided by {doctor.user.name} </h2>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* {doctor.} */}
                    </tbody>
                </table>
            </div>
        )
        }
        </>
    )
}