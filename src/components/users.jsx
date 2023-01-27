import React from "react"
import User from "./user";

const Users = (props) => {
    if (props.users.length > 0)
        return (
            <>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col">Избранное</th>
                        <th scope="col">x</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.users.map(user => <User key={user._id} {...user} onDelete={props.onDelete} onBookmark={props.onBookmark}/>)}
                    </tbody>
                </table>
            </>
        )
    return ''

}

export default Users
